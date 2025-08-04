from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(120))
    role = db.Column(db.String(20))  # 'user', 'admin', 'representative'
    interests = db.Column(db.String(200))

class Theatre(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    representative_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    popularity = db.Column(db.Integer, default=0)

class Show(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    theatre_id = db.Column(db.Integer, db.ForeignKey('theatre.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'))
    timing = db.Column(db.String(50))
    price = db.Column(db.Float)
    seats = db.Column(db.Integer)

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    show_id = db.Column(db.Integer, db.ForeignKey('show.id'))
    seat_number = db.Column(db.Integer)
