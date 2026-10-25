# Smart Campus Issue Management System

A web-based platform that simplifies how campus issues are reported, tracked, and resolved.

Managing campus-related problems through informal communication can make it difficult to track complaints, assign responsibilities, and monitor progress. The **Smart Campus Issue Management System** provides a centralized platform where students can report issues, staff can manage their assigned tasks, and administrators can oversee the resolution process.

The goal is to make campus issue management more organized, transparent, and efficient.

## Key Features

- **Role-Based Dashboards:** Dedicated interfaces for students, staff, and administrators.
- **Issue Reporting:** Submit campus-related issues through the application.
- **Issue Tracking:** Monitor issue status and follow progress toward resolution.
- **Staff Management:** Support the assignment and handling of reported issues.
- **Administrative Oversight:** Provide administrators with a centralized view of campus issues.
- **Responsive Interface:** Access the application through a modern web interface.

*Features listed above should reflect the functionality available in the current implementation.*

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Deployment | Netlify, Render |
| Version Control | Git, GitHub |

## Application Architecture

The application follows a client-server architecture. The React frontend communicates with the Express backend through HTTP API requests. The backend handles application logic and database operations, while MongoDB Atlas stores application data.

```text
React + Vite Frontend
        |
        | HTTP API Requests
        v
Node.js + Express Backend
        |
        | Database Operations
        v
MongoDB Atlas
```

## Live Deployment

- **Frontend:** Deployed on Netlify
- **Backend API:** [Smart Campus Backend](https://smartcampusissuemanagementsystem-1.onrender.com/api)
- **Database:** MongoDB Atlas

*The frontend link can be added once your Netlify deployment is available.*

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- [Git](https://git-scm.com/)
- A MongoDB Atlas account or a suitable MongoDB instance

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Smart-Campus-Issue-Management-System
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with the actual URL of your GitHub repository.

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory and configure the environment variables required by your implementation.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_ORIGIN=http://localhost:5173
JWT_SECRET=your_secret_key
```

Use `JWT_SECRET` only if your application uses JWT authentication. Keep your actual credentials private and never commit the `.env` file to GitHub.

Start the backend:

```bash
npm run dev
```

The backend should start at `http://localhost:5000`, provided that port is available.

### 3. Set Up the Frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend directory:

```env
VITE_API_URL=http://localhost:5000
```

Make sure your frontend reads this variable when sending requests to the backend.

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually `http://localhost:5173`.

## Deployment Configuration

### Frontend — Netlify

The frontend can be deployed by connecting the GitHub repository to Netlify.

| Setting | Value |
|---|---|
| Base directory | `frontend` |
| Build command | `npm run build` |
| Publish directory | `dist` |

Configure `VITE_API_URL` in Netlify to point to your deployed backend, then trigger a new deployment.

### Backend — Render

The backend is hosted on Render:

https://smartcampusissuemanagementsystem-1.onrender.com/api
Configure the backend's environment variables in Render, including the MongoDB connection string and the production frontend origin. The backend must listen on the port supplied by the hosting platform.

### Database — MongoDB Atlas

MongoDB Atlas provides the cloud database used by the application. Database credentials should be stored in the backend's environment variables rather than in frontend code or source control.

## Security Considerations

- Store database credentials and authentication secrets in environment variables.
- Validate incoming requests on the server.
- Enforce appropriate authentication and role-based authorization.
- Configure CORS to allow the intended frontend origin.
- Use HTTPS for production communication.

## What I Learned

This project has provided practical experience in building a full-stack web application, connecting a React frontend to a REST API, working with MongoDB, managing environment variables, and deploying frontend and backend services independently.

It also highlights the importance of handling application configuration, database connectivity, and cross-origin requests when moving a project from local development to production.

## Author

**Yash Kanawade**

Computer Engineering | Full-Stack Development

[GitHub](https://github.com/yashuk23)

---

*Built to make campus issue reporting and resolution more organized and accessible.*
