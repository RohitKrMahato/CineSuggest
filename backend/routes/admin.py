from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.models import db, Theatre, User

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/admin/theatre', methods=['POST'])
@jwt_required()
def add_theatre():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user.role != 'admin':
        return jsonify({'message': 'Unauthorized'}), 403
    data = request.json
    theatre = Theatre(name=data['name'], location=data['location'], representative_id=data['representative_id'])
    db.session.add(theatre)
    db.session.commit()
    return jsonify({'message': 'Theatre added'})

@admin_bp.route('/admin/theatres', methods=['GET'])
@jwt_required()
def get_all_theatres():
    """Get all theatres for admin"""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user.role != 'admin':
        return jsonify({'message': 'Unauthorized'}), 403
    
    theatres = Theatre.query.all()
    result = []
    for theatre in theatres:
        rep = User.query.get(theatre.representative_id) if theatre.representative_id else None
        result.append({
            'id': theatre.id,
            'name': theatre.name,
            'location': theatre.location,
            'representative': rep.username if rep else None
        })
    return jsonify(result)

@admin_bp.route('/admin/users', methods=['GET'])
@jwt_required()
def get_all_users():
    """Get all users for admin"""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user.role != 'admin':
        return jsonify({'message': 'Unauthorized'}), 403
    
    users = User.query.all()
    result = [user.to_dict() for user in users]
    return jsonify(result)
