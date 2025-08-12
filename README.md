# Movie Ticket Booking Application

This is a full stack application using AngularJS (frontend), Python Flask (backend), and SQLite (database).

## Features
- 🔐 **Complete Authentication System**
  - User registration with email/password
  - Login with email or username
  - Google OAuth Sign-in/Sign-up integration
  - JWT token-based authentication
  - Role-based access control (User, Admin, Representative)
- 🎬 **Movie & Theatre Management**
  - Location-based theatre/movie listing
  - Real-time seat availability
  - Ticket booking system
- 👥 **User Roles & Dashboards**
  - User dashboard with booking history
  - Admin dashboard for system management
  - Theatre representative dashboard for show management
- ✨ **Movie Suggestions**
  - Personalized recommendations based on user interests
  - Popularity-based movie suggestions

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
   pip install -r requirements.txt
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

## Authentication Setup

For complete functionality including Google OAuth:

1. **Google OAuth Configuration:**
   - Get Client ID from [Google Cloud Console](https://console.cloud.google.com/)
   - Update client ID in login/register components
   - See `SETUP_GUIDE.md` for detailed instructions

2. **Environment Variables:**
   - Create `.env` file with your secrets
   - Set JWT keys and Google OAuth credentials

## Notes
- The system now uses JWT tokens for authentication instead of sessions
- Database schema has been updated with new user fields (email, google_id, etc.)
- All routes are protected with role-based access control
- For real-time seat booking, the backend uses row-level locking and checks seat availability before confirming bookings.
- See `SETUP_GUIDE.md` for complete setup instructions

---
For any issues, please refer to the documentation or contact the project maintainer.
