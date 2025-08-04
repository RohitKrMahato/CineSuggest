from models.show import Show
from models.booking import Booking

class BookingService:
    @staticmethod
    def book_seat(user_id, show_id, db):
        show = Show.query.get(show_id)
        if show and show.seats > 0:
            show.seats -= 1
            booking = Booking(user_id=user_id, show_id=show.id, seat_number=show.seats)
            db.session.add(booking)
            db.session.commit()
            return booking
        return None
