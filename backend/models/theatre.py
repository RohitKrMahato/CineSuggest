from . import db

class Theatre(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    representative_id = db.Column(db.Integer, db.ForeignKey('user.id'))
