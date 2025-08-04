from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from models.models import db, User
from routes.user import user_bp
from routes.admin import admin_bp
from routes.rep import rep_bp
from routes.suggest import suggest_bp
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db.init_app(app)
login_manager = LoginManager(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

with app.app_context():
    db.create_all()

# Register blueprints
app.register_blueprint(user_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(rep_bp)
app.register_blueprint(suggest_bp)

if __name__ == '__main__':
    app.run(debug=True)
