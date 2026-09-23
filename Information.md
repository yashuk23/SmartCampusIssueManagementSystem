# Smart Campus Issue Management System – Backend

## 1. Configuration

### Database Connection

* Uses **Mongoose** to connect the application with MongoDB.
* `mongoose.connect()` is used to establish the database connection.

---

## 2. Routes

### Authentication Routes

Used for user registration and login.

| Route    | Method | Purpose                            |
| -------- | ------ | ---------------------------------- |
| Register | `POST` | Create a new user                  |
| Login    | `POST` | Authenticate user and generate JWT |

---

### Issue Routes

Used for creating, viewing, assigning, and updating issues.

| Operation           | Method | Access  | Purpose                                            |
| ------------------- | ------ | ------- | -------------------------------------------------- |
| Create Issue        | `POST` | Student | Create a new campus issue                          |
| Get My Issues       | `GET`  | Student | View issues created by the logged-in student       |
| Get All Issues      | `GET`  | Admin   | View all issues                                    |
| Assign Issue        | `PUT`  | Admin   | Assign an issue to a staff member                  |
| Get Assigned Issues | `GET`  | Staff   | View issues assigned to the logged-in staff member |
| Change Issue Status | `PUT`  | Staff   | Update the status of an assigned issue             |

---

## 3. Models

### User Model

Stores information about users of the system.

| Field      | Type   | Description                               |
| ---------- | ------ | ----------------------------------------- |
| `name`     | String | User's name                               |
| `email`    | String | User's email address                      |
| `password` | String | Hashed user password                      |
| `role`     | String | User role: `student`, `staff`, or `admin` |

---

### Issue Model

Stores information about campus issues.

| Field         | Type     | Description                                      |
| ------------- | -------- | ------------------------------------------------ |
| `title`       | String   | Title of the issue                               |
| `description` | String   | Detailed description of the issue                |
| `category`    | String   | Type of issue such as hostel, lab, library, etc. |
| `status`      | String   | Current status of the issue                      |
| `createdBy`   | ObjectId | Reference to the User who created the issue      |
| `assignedTo`  | ObjectId | Reference to the User assigned to the issue      |

### Issue Status

```text
pending
in-progress
resolved
```

The default status is:

```text
pending
```

If an issue has not been assigned yet:

```text
assignedTo = null
```

---

## 4. Middlewares

### Auth Middleware

Responsible for **authentication**.

* Reads the JWT token from the request.
* Verifies the token.
* Finds the logged-in user.
* Stores the user in `req.user`.
* Rejects requests with an invalid or expired token.

```text
Request
   ↓
JWT Token
   ↓
Verify Token
   ↓
Find User
   ↓
req.user
```

---

### Database Middleware

`ensureDb`

Responsible for making sure the **database connection is available before processing the request**.

```text
Request
   ↓
ensureDb
   ↓
Connect to MongoDB
   ↓
next()
```

If the database connection fails, it returns:

```text
503 Service Unavailable
```

---

### Error Middleware

Responsible for handling errors in the application.

It includes:

#### Not Found Middleware

If the user requests a route that does not exist, it returns:

```text
404 Route Not Found
```

Example:

```text
GET /api/unknown
        ↓
Route does not exist
        ↓
404
```

#### Error Handler

Handles application/server errors and returns an appropriate error response.

---

### Role Middleware

Responsible for **authorization**.

It checks whether the logged-in user's role is allowed to access a particular route.

Example:

```text
roleMiddleware("admin")
```

Only an admin can access the route.

```text
Student → ❌
Staff   → ❌
Admin   → ✅
```

Multiple roles can also be allowed:

```text
roleMiddleware("admin", "staff")
```

In this case:

```text
Student → ❌
Staff   → ✅
Admin   → ✅
```

---

# 5. Authorization Flow

The protected routes generally follow this flow:

```text
Client Request
      ↓
Auth Middleware
      ↓
Is JWT valid?
      ↓
Role Middleware
      ↓
Does user have permission?
      ↓
Controller
      ↓
Database
      ↓
Response
```

### Example

For an admin-only route:

```text
Request
   ↓
authMiddleware
   ↓
Verify JWT
   ↓
roleMiddleware("admin")
   ↓
Check role
   ↓
Admin? ── Yes ──→ Controller
   │
   No
   ↓
403 Forbidden
```

---

# 6. Overall Backend Structure

```text
Backend
│
├── config
│   └── db.js
│
├── models
│   ├── User.js
│   └── Issue.js
│
├── routes
│   ├── authRoutes.js
│   └── issueRoutes.js
│
├── middleware
│   ├── authMiddleware.js
│   ├── ensureDb.js
│   ├── roleMiddleware.js
│   └── errorMiddleware.js
│
├── controllers
│   ├── authController.js
│   └── issueController.js
│
└── server.js
```

---

# 7. Role Responsibilities

| Role        | Main Responsibilities                                      |
| ----------- | ---------------------------------------------------------- |
| **Student** | Register/login, create issues, view own issues             |
| **Staff**   | View assigned issues, update issue status                  |
| **Admin**   | View all issues, assign issues to staff, manage the system |

---

# 8. Simple Project Flow

```text
Student
   ↓
Creates Issue
   ↓
Issue Status = Pending
   ↓
Admin Views Issue
   ↓
Admin Assigns Issue to Staff
   ↓
Staff Views Assigned Issue
   ↓
Staff Changes Status
   ↓
In-Progress
   ↓
Resolved
```
