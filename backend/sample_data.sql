-- Sample SQLite database for Movie Ticket Booking App

-- Users
INSERT INTO user (id, username, password, location, role, interests) VALUES
(1, 'admin', 'adminpass', 'New York', 'admin', 'action,comedy'),
(2, 'rep1', 'reppass1', 'New York', 'representative', 'drama,romance'),
(3, 'rep2', 'reppass2', 'Los Angeles', 'representative', 'action,thriller'),
(4, 'john_doe', 'userpass1', 'New York', 'user', 'action,comedy'),
(5, 'jane_smith', 'userpass2', 'Los Angeles', 'user', 'drama,romance'),
(6, 'alice_wong', 'userpass3', 'New York', 'user', 'comedy,romance'),
(7, 'bob_lee', 'userpass4', 'Los Angeles', 'user', 'action,thriller'),
(8, 'rep3', 'reppass3', 'Chicago', 'representative', 'comedy,action'),
(9, 'charlie_kim', 'userpass5', 'Chicago', 'user', 'comedy,action'),
(10, 'diana_ross', 'userpass6', 'Chicago', 'user', 'romance,drama');

-- Theatres
INSERT INTO theatre (id, name, location, representative_id) VALUES
(1, 'NYC Grand Cinema', 'New York', 2),
(2, 'LA Movie Palace', 'Los Angeles', 3),
(3, 'Chicago Film Center', 'Chicago', 8);

-- Movies
INSERT INTO movie (id, title, popularity) VALUES
(1, 'Action Blast', 120),
(2, 'Romantic Escape', 95),
(3, 'Comedy Night', 110),
(4, 'Thriller Zone', 80),
(5, 'Drama Heights', 90),
(6, 'Epic Adventure', 130),
(7, 'Family Fun', 100);

-- Shows
INSERT INTO show (id, theatre_id, movie_id, timing, price, seats) VALUES
(1, 1, 1, '2025-08-04 18:00', 12.5, 50),
(2, 1, 2, '2025-08-04 20:30', 10.0, 40),
(3, 2, 3, '2025-08-04 19:00', 11.0, 60),
(4, 2, 4, '2025-08-04 21:00', 13.0, 55),
(5, 3, 5, '2025-08-04 17:00', 9.5, 45),
(6, 3, 6, '2025-08-04 19:30', 14.0, 50),
(7, 3, 7, '2025-08-04 21:00', 8.0, 40);

-- Bookings
INSERT INTO booking (id, user_id, show_id, seat_number) VALUES
(1, 4, 1, 10),
(2, 5, 3, 15),
(3, 6, 2, 5),
(4, 7, 4, 20),
(5, 9, 5, 12),
(6, 10, 7, 8);
