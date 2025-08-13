from flask import Blueprint, request, jsonify, redirect, url_for, session
from flask_login import login_user, logout_user, login_required, current_user
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.models import db, User
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token
import re

auth_bp = Blueprint('auth', __name__)

def is_valid_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user with email and password"""
    try:
        data = request.get_json()
        
        # Validation
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        username = data.get('username', '').strip()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        location = data.get('location', '').strip()
        
        # Validate required fields
        if not username or not email or not password:
            return jsonify({'error': 'Username, email, and password are required'}), 400
            
        if len(username) < 3:
            return jsonify({'error': 'Username must be at least 3 characters long'}), 400
            
        if len(password) < 6:
            return jsonify({'error': 'Password must be at least 6 characters long'}), 400
            
        if not is_valid_email(email):
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Check if user already exists
        if User.query.filter_by(username=username).first():
            return jsonify({'error': 'Username already exists'}), 409
            
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'Email already registered'}), 409
        
        # Create new user
        user = User(
            username=username,
            email=email,
            location=location,
            role='user'
        )
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()
        
        # Create JWT token
        access_token = create_access_token(identity=user)
        
        return jsonify({
            'message': 'User registered successfully',
            'access_token': access_token,
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Registration failed. Please try again.'}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login user with email/username and password"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        login_field = data.get('login', '').strip()  # Can be email or username
        password = data.get('password', '')
        
        if not login_field or not password:
            return jsonify({'error': 'Login credentials are required'}), 400
        
        # Find user by email or username
        user = None
        if is_valid_email(login_field):
            user = User.query.filter_by(email=login_field.lower()).first()
        else:
            user = User.query.filter_by(username=login_field).first()
        
        if not user or not user.check_password(password):
            return jsonify({'error': 'Invalid credentials'}), 401
            
        if not user.is_active:
            return jsonify({'error': 'Account is deactivated'}), 401
        
        # Login user (for session-based routes)
        login_user(user)
        
        # Create JWT token
        access_token = create_access_token(identity=user)
        
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Login failed. Please try again.'}), 500

@auth_bp.route('/google-login', methods=['POST'])
def google_login():
    """Handle Google OAuth login"""
    try:
        data = request.get_json()
        token = data.get('token')
        
        if not token:
            return jsonify({'error': 'Google token is required'}), 400
        
        # Verify the Google token
        try:
            # Note: In production, you should use your actual Google Client ID
            idinfo = id_token.verify_oauth2_token(
                token, 
                google_requests.Request(),
                # app.config['GOOGLE_CLIENT_ID']  # Uncomment when you have Google Client ID
            )
            
            google_id = idinfo['sub']
            email = idinfo['email']
            name = idinfo.get('name', '')
            picture = idinfo.get('picture', '')
            
        except ValueError as e:
            return jsonify({'error': 'Invalid Google token'}), 400
        
        # Find or create user
        user = User.query.filter_by(google_id=google_id).first()
        
        if not user:
            # Check if user exists with this email
            user = User.query.filter_by(email=email).first()
            if user:
                # Link Google account to existing user
                user.google_id = google_id
                user.profile_picture = picture
            else:
                # Create new user
                username = email.split('@')[0]  # Use part before @ as username
                # Make username unique if it already exists
                base_username = username
                counter = 1
                while User.query.filter_by(username=username).first():
                    username = f"{base_username}{counter}"
                    counter += 1
                
                user = User(
                    username=username,
                    email=email,
                    google_id=google_id,
                    profile_picture=picture,
                    role='user'
                )
            
            db.session.add(user)
            db.session.commit()
        
        # Login user
        login_user(user)
        
        # Create JWT token
        access_token = create_access_token(identity=user)
        
        return jsonify({
            'message': 'Google login successful',
            'access_token': access_token,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Google login failed. Please try again.'}), 500

@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    """Logout user"""
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Get current user information"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
            
        return jsonify({'user': user.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to get user information'}), 500

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required()
def refresh_token():
    """Refresh JWT token"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.is_active:
            return jsonify({'error': 'User not found or inactive'}), 404
            
        access_token = create_access_token(identity=user)
        
        return jsonify({
            'access_token': access_token,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Token refresh failed'}), 500

@auth_bp.route('/check-auth', methods=['GET'])
@jwt_required()
def check_auth():
    """Check if user is authenticated"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.is_active:
            return jsonify({'authenticated': False}), 401
            
        return jsonify({
            'authenticated': True,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'authenticated': False}), 401 