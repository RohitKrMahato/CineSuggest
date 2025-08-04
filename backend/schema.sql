-- Schema for Movie Ticket Booking App
CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    location TEXT,
    role TEXT,
    interests TEXT
);

CREATE TABLE IF NOT EXISTS theatre (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    representative_id INTEGER,
    FOREIGN KEY (representative_id) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS movie (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    popularity INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS show (
    id INTEGER PRIMARY KEY,
    theatre_id INTEGER,
    movie_id INTEGER,
    timing TEXT,
    price REAL,
    seats INTEGER,
    FOREIGN KEY (theatre_id) REFERENCES theatre(id),
    FOREIGN KEY (movie_id) REFERENCES movie(id)
);

CREATE TABLE IF NOT EXISTS booking (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    show_id INTEGER,
    seat_number INTEGER,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (show_id) REFERENCES show(id)
);
