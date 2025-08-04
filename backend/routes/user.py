from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from models.models import db, User, Theatre, Movie, Show, Booking

user_bp = Blueprint('user', __name__)

@user_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    user = User(username=data['username'], password=data['password'], location=data['location'], role='user')
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'})

@user_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username'], password=data['password']).first()
    if user:
        login_user(user)
        return jsonify({'message': 'Login successful', 'role': user.role, 'location': user.location})
    return jsonify({'message': 'Invalid credentials'}), 401

@user_bp.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out'})

@user_bp.route('/theatres', methods=['GET'])
@login_required
def get_theatres():
    location = request.args.get('location', current_user.location)
    theatres = Theatre.query.filter_by(location=location).all()
    return jsonify([{'id': t.id, 'name': t.name} for t in theatres])

@user_bp.route('/shows/<int:theatre_id>', methods=['GET'])
@login_required
def get_shows(theatre_id):
    shows = Show.query.filter_by(theatre_id=theatre_id).all()
    result = []
    for show in shows:
        movie = Movie.query.get(show.movie_id)
        result.append({'id': show.id, 'movie': movie.title, 'timing': show.timing, 'price': show.price, 'seats': show.seats})
    return jsonify(result)

@user_bp.route('/book', methods=['POST'])
@login_required
def book_seat():
    data = request.json
    show = Show.query.get(data['show_id'])
    if show.seats > 0:
        show.seats -= 1
        booking = Booking(user_id=current_user.id, show_id=show.id, seat_number=show.seats)
        db.session.add(booking)
        db.session.commit()
        return jsonify({'message': 'Booking successful', 'seat_number': booking.seat_number})
    return jsonify({'message': 'No seats available'}), 409
