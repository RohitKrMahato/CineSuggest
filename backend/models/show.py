from . import db

class Show(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    theatre_id = db.Column(db.Integer, db.ForeignKey('theatre.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'))
    timing = db.Column(db.String(50))
    price = db.Column(db.Float)
    seats = db.Column(db.Integer)
