import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your_secret_key_change_in_production')
    SQLALCHEMY_DATABASE_URI = 'sqlite:///database.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-string')
    JWT_ACCESS_TOKEN_EXPIRES = False  # Set to a timedelta for token expiration
    
    # Google OAuth
    GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID', '')
    GOOGLE_CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET', '')
    
    # CORS settings
    CORS_ORIGINS = ['http://localhost:4200', 'http://127.0.0.1:4200']
