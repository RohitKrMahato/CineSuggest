from models.user import User
from models.theatre import Theatre
from models.movie import Movie
from models.show import Show
from models.booking import Booking

# User management service
class UserService:
    @staticmethod
    def register_user(data, db):
        user = User(username=data['username'], password=data['password'], location=data['location'], role='user')
        db.session.add(user)
        db.session.commit()
        return user

    @staticmethod
    def authenticate(username, password):
        return User.query.filter_by(username=username, password=password).first()
