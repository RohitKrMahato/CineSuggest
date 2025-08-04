from models.theatre import Theatre
from models.show import Show
from models.movie import Movie

class SuggestionService:
    @staticmethod
    def suggest_movies(location, interests):
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
        return suggestions[:5]
