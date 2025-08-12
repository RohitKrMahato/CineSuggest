# Movie Ticket Booking System - Setup Guide

This guide will help you set up the complete authentication system with Google OAuth integration.

## Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn
- Google Developer Account (for OAuth)

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set Application type to "Web application"
6. Add authorized origins:
   - `http://localhost:4200`
   - `http://127.0.0.1:4200`
7. Add authorized redirect URIs:
   - `http://localhost:4200/login`
   - `http://localhost:4200/register`

### 3. Environment Configuration

Create a `.env` file in the backend directory:

```env
SECRET_KEY=your_secret_key_change_in_production
JWT_SECRET_KEY=your_jwt_secret_key_change_in_production
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

### 4. Database Migration

Since we've updated the User model with new fields, you'll need to handle the database migration:

**Option 1: Fresh Start (Development)**
```bash
rm database.db  # Remove existing database
python app.py   # This will create new tables
```

**Option 2: Manual Migration (Production)**
```bash
# Backup existing data first
# Then add new columns manually or use Flask-Migrate
```

### 5. Start Backend Server

```bash
python app.py
```

The backend will run on `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Update Google Client ID

Edit the following files and replace `YOUR_GOOGLE_CLIENT_ID` with your actual Google Client ID:
- `frontend/src/app/features/auth/login.component.ts`
- `frontend/src/app/features/auth/register.component.ts`

### 3. Start Frontend Server

```bash
npm start
# or
ng serve
```

The frontend will run on `http://localhost:4200`

## Features Implemented

### Authentication System
- ✅ User registration with email/password
- ✅ User login with email or username
- ✅ Google OAuth Sign-in/Sign-up
- ✅ JWT token-based authentication
- ✅ Password hashing with Werkzeug
- ✅ Role-based access control (user, admin, representative)

### Frontend Components
- ✅ Beautiful login page with Google Sign-in
- ✅ Registration page with form validation
- ✅ User dashboard with profile information
- ✅ Route guards for protected routes
- ✅ Updated home page with auth links

### Backend API Endpoints
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/google-login` - Google OAuth login
- `POST /api/logout` - User logout
- `GET /api/me` - Get current user
- `POST /api/refresh` - Refresh JWT token
- `GET /api/check-auth` - Check authentication status

### Database Schema Updates
- Added `email` field (required, unique)
- Added `password_hash` field (nullable for OAuth users)
- Added `google_id` field for Google OAuth
- Added `profile_picture` field
- Added `created_at` timestamp
- Added `is_active` boolean flag

## User Roles

1. **Regular User** (`user`)
   - Can browse theaters
   - Can book tickets
   - Can view personal bookings

2. **Admin** (`admin`)
   - Full system access
   - Can manage theaters and users
   - Admin dashboard access

3. **Theatre Representative** (`representative`)
   - Can manage assigned theater
   - Can update shows and pricing
   - Representative dashboard access

## Usage Instructions

### For Users
1. Visit the home page
2. Click "Join Now" to register or "Sign In" to login
3. Complete registration with email/password or use Google Sign-in
4. Access the dashboard to browse theaters and book tickets

### For Admins
1. Create an admin account by registering normally
2. Manually update the user role in the database to `admin`
3. Access `/admin` route for admin features

### For Theater Representatives
1. Admin creates theater representative accounts
2. Representatives can access `/rep` route for theater management

## Security Features

- Passwords are hashed using Werkzeug's secure methods
- JWT tokens for stateless authentication
- CORS configured for frontend access
- Input validation on all forms
- Role-based route protection
- Google OAuth for secure third-party authentication

## Troubleshooting

### Common Issues

1. **Google Sign-in not working**
   - Check if Client ID is correctly set
   - Verify authorized origins in Google Console
   - Check browser console for errors

2. **Database errors**
   - Ensure database migration is complete
   - Check if all required fields are present

3. **CORS issues**
   - Verify frontend URL is in CORS_ORIGINS
   - Check if backend is running on correct port

4. **JWT token issues**
   - Check if JWT_SECRET_KEY is set
   - Verify token is being sent in Authorization header

### Development Tips

- Use browser dev tools to inspect network requests
- Check Flask console for backend errors
- Monitor database changes with SQLite browser
- Test authentication flows with different user roles

## Next Steps

To extend the system further, consider:

1. **Email Verification** - Add email confirmation for new accounts
2. **Password Reset** - Implement forgot password functionality
3. **Social Login** - Add Facebook, Twitter OAuth
4. **2FA** - Two-factor authentication for enhanced security
5. **User Profiles** - Extended profile management
6. **Audit Logging** - Track user actions for security

## Support

If you encounter any issues:
1. Check the setup steps carefully
2. Verify all dependencies are installed
3. Check the console logs for error messages
4. Ensure Google OAuth is configured correctly

The system is now ready for production use with proper environment configuration and security measures in place. 