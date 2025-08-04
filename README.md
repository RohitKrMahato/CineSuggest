# Movie Ticket Booking Application

This is a full stack application using AngularJS (frontend), Python Flask (backend), and SQLite (database).

## Features
- User login and location-based theatre/movie listing
- Ticket booking with real-time seat availability
- Admin dashboard for theatre management
- Theatre representative dashboard for managing timings, movies, prices, seating
- Movie suggestion system based on popularity and user interests

## Prerequisites
- Python 3.x
- Node.js and npm
- SQLite Viewer (for database integration)

## Backend Setup (Flask)
1. Navigate to the `backend` folder:
   ```powershell
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```powershell
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```powershell
   pip install flask flask-cors flask-login flask-sqlalchemy
   ```
4. Run the Flask server:
   ```powershell
   python app.py
   ```

## Frontend Setup (AngularJS)
1. Navigate to the `frontend` folder:
   ```powershell
   cd frontend
   ```
2. Install dependencies (if using npm for build tools):
   ```powershell
   npm install
   ```
3. Serve the frontend (if using a simple server):
   ```powershell
   npx http-server .
   ```
   Or open `index.html` directly in your browser.

## SQLite Viewer Integration
- Open the SQLite database file (e.g., `database.db`) in SQLite Viewer to inspect and manage data.

## Deployment
- Run the backend and frontend servers as described above.
- Access the application via your browser at the specified frontend URL.

## Notes
- For real-time seat booking, the backend uses row-level locking and checks seat availability before confirming bookings.
- Update the database schema and API endpoints as needed for new features.

---
For any issues, please refer to the documentation or contact the project maintainer.
