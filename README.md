# Smart Campus Issue Management System

A full-stack MERN application for reporting, assigning, and resolving campus issues with secure JWT authentication and role-based access control.

## Tech Stack

- MongoDB with Mongoose
- Express.js and Node.js
- React.js with Vite
- Tailwind CSS
- JWT authentication with bcrypt password hashing

## Features

- User registration and login
- Role-based dashboards for `student`, `staff`, and `admin`
- Students can create issues and track their own submissions
- Admins can view all issues, search and filter them, and assign staff
- Staff can view assigned issues and update status
- Protected routes on both backend and frontend
- Toast notifications, loading states, form validation, and error handling

## Folder Structure

```text
backend/
  config/
  controllers/
  middleware/
  models/
  routes/
frontend/
  src/
    components/
    context/
    layouts/
    pages/
    services/
```

## Local Setup

### 1. Install dependencies

```bash
npm install
npm run install:all
```

### 2. Configure environment files

Create `backend/.env` from `backend/.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/smart-campus-issues
JWT_SECRET=replace_with_a_strong_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
ALLOW_ADMIN_REGISTRATION=false
```

Create `frontend/.env` from `frontend/.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

Make sure your MongoDB server is running locally or update `MONGO_URI` to point to your MongoDB instance.

### 4. Run the app

```bash
npm run dev
```

Backend runs on `http://localhost:5000` and frontend runs on `http://localhost:5173`.

## API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Issues

- `POST /api/issues`
- `GET /api/issues/my`
- `GET /api/issues`
- `GET /api/issues/assigned`
- `PUT /api/issues/:id/assign`
- `PUT /api/issues/:id/status`

## Notes

- By default, admin self-registration is disabled for safety. Set `ALLOW_ADMIN_REGISTRATION=true` in `backend/.env` if you want to allow it for demos.
- JWTs are stored in local storage on the frontend in this implementation.
- Optional advanced features like email notifications, uploads, and sockets are not included in this base version, but the code structure is ready for extension.
