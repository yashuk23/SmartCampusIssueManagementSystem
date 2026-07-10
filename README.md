# Smart Campus Issue Management System

Full-stack MERN application for campus issue reporting, assignment, and resolution with JWT authentication and role-based access control.

## Stack

- MongoDB with Mongoose
- Express.js and Node.js
- React.js with Vite
- Tailwind CSS
- JWT + bcrypt

## Roles

- `student`: create issues and view personal issue history
- `staff`: view assigned issues and update status
- `admin`: view all issues and assign them to staff

## Backend API

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

## Local setup

### 1. Install dependencies

```bash
npm install
npm run install:all
```

### 2. Configure environment files

Backend: [backend/.env.example](C:\Users\kanaw\OneDrive\Desktop\Smart-Campus-Issue-Management-System\backend\.env.example)

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/smart-campus-issues
JWT_SECRET=change_this_to_a_real_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
ALLOW_ADMIN_REGISTRATION=true
```

Frontend: [frontend/.env.example](C:\Users\kanaw\OneDrive\Desktop\Smart-Campus-Issue-Management-System\frontend\.env.example)

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

Run MongoDB locally, or change `MONGO_URI` to a reachable MongoDB instance.

### 4. Seed demo users

```bash
npm run seed
```

Demo credentials:

- `admin@campus.com` / `Admin123!`
- `staff@campus.com` / `Staff123!`
- `student@campus.com` / `Student123!`

### 5. Run the application

```bash
npm run dev
```

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

## Folder structure

```text
backend/
  config/
  controllers/
  middleware/
  models/
  routes/
  seeds/
frontend/
  src/
    components/
    context/
    layouts/
    pages/
    services/
```

## Notes

- Admin assignment is available from the admin dashboard through `PUT /api/issues/:id/assign`.
- JWTs are stored in local storage on the frontend in this implementation.
- The demo seed updates the three demo users if they already exist.
