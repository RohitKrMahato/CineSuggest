from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.models import db, User, Theatre, Movie, Show, Booking

user_bp = Blueprint('user', __name__)

@user_bp.route('/theatres', methods=['GET'])
@jwt_required()
def get_theatres():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    location = request.args.get('location', user.location)
    theatres = Theatre.query.filter_by(location=location).all() if location else Theatre.query.all()
    
    return jsonify([{
        'id': t.id, 
        'name': t.name, 
        'location': t.location,
        'representative_id': t.representative_id
    } for t in theatres])

@user_bp.route('/shows/<int:theatre_id>', methods=['GET'])
@jwt_required()
def get_shows(theatre_id):
    shows = Show.query.filter_by(theatre_id=theatre_id).all()
    result = []
    for show in shows:
        movie = Movie.query.get(show.movie_id)
        result.append({
            'id': show.id, 
            'movie': movie.title, 
            'timing': show.timing, 
            'price': show.price, 
            'seats': show.seats
        })
    return jsonify(result)

@user_bp.route('/book', methods=['POST'])
@jwt_required()
def book_seat():
    user_id = get_jwt_identity()
    data = request.json
    show = Show.query.get(data['show_id'])
    if show and show.seats > 0:
        show.seats -= 1
        booking = Booking(user_id=user_id, show_id=show.id, seat_number=show.seats)
        db.session.add(booking)
        db.session.commit()
        return jsonify({'message': 'Booking successful', 'seat_number': booking.seat_number})
    return jsonify({'message': 'No seats available'}), 409

@user_bp.route('/bookings', methods=['GET'])
@jwt_required()
def get_user_bookings():
    """Get all bookings for the current user"""
    user_id = get_jwt_identity()
    bookings = db.session.query(Booking, Show, Movie, Theatre).join(
        Show, Booking.show_id == Show.id
    ).join(
        Movie, Show.movie_id == Movie.id  
    ).join(
        Theatre, Show.theatre_id == Theatre.id
    ).filter(Booking.user_id == user_id).all()
    
    result = []
    for booking, show, movie, theatre in bookings:
        result.append({
            'id': booking.id,
            'seat_number': booking.seat_number,
            'movie': movie.title,
            'theatre': theatre.name,
            'timing': show.timing,
            'price': show.price
        })
    
    return jsonify(result)
