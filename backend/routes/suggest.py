from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from models.models import Theatre, Show, Movie

suggest_bp = Blueprint('suggest', __name__)

@suggest_bp.route('/suggest', methods=['GET'])
@login_required
def suggest_movies():
    location = current_user.location
    interests = current_user.interests.split(',') if current_user.interests else []
    theatres = Theatre.query.filter_by(location=location).all()
    theatre_ids = [t.id for t in theatres]
    shows = Show.query.filter(Show.theatre_id.in_(theatre_ids)).all()
    movie_ids = [s.movie_id for s in shows]
    movies = Movie.query.filter(Movie.id.in_(movie_ids)).order_by(Movie.popularity.desc()).all()
    suggestions = []
    for m in movies:
        if any(interest.lower() in m.title.lower() for interest in interests):
            suggestions.append(m.title)
    suggestions += [m.title for m in movies if m.title not in suggestions]
    return jsonify({'suggestions': suggestions[:5]})
