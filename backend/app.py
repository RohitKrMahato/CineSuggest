from flask import Flask, jsonify
from flask_cors import CORS
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from models.models import db, User
from routes.user import user_bp
from routes.admin import admin_bp
from routes.rep import rep_bp
from routes.suggest import suggest_bp
from routes.auth import auth_bp
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app, origins=Config.CORS_ORIGINS, supports_credentials=True)
db.init_app(app)
login_manager = LoginManager(app)
jwt = JWTManager(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()

with app.app_context():
    db.create_all()

# Add a basic route for the root
@app.route('/')
def home():
    return jsonify({
        'message': 'Movie Vibe API Server',
        'status': 'running',
        'endpoints': {
            'auth': '/api/login, /api/register, /api/google-login',
            'user': '/api/theatres, /api/shows, /api/book',
            'admin': '/api/admin/*',
            'frontend': 'http://localhost:4200'
        }
    })

@app.route('/api')
def api_info():
    return jsonify({
        'message': 'Movie Vibe API',
        'version': '1.0.0',
        'endpoints': [
            'POST /api/register',
            'POST /api/login', 
            'POST /api/google-login',
            'POST /api/logout',
            'GET /api/me',
            'GET /api/theatres',
            'GET /api/shows/<theatre_id>',
            'POST /api/book'
        ]
    })

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api')
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(admin_bp, url_prefix='/api')
app.register_blueprint(rep_bp, url_prefix='/api')
app.register_blueprint(suggest_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)
