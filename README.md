
# 📝 Task Management System (Node.js + MongoDB)

## 📌 Project Overview

This is a **Task Management System** built with **Node.js**, **Express.js**, and **MongoDB**.  
It supports two roles: `admin` and `user`, with JWT-based authentication and role-based access control.

---

## 🚀 Features

### 👤 Authentication & Authorization
- User Signup & Login with JWT
- Admin vs. User role separation
- Middleware-based access protection

### 🛠️ Admin Functionalities
- Create new tasks
- View all tasks created by the admin
- Delete any of their created tasks
- Manage users (list/delete)

### 🙋 User Functionalities
- View profile
- Update personal data securely

---

## 🧱 Technologies Used

| Technology | Description |
|------------|-------------|
| Node.js    | JavaScript runtime |
| Express.js | Web framework |
| MongoDB + Mongoose | NoSQL database |
| JWT        | Token-based authentication |
| bcrypt     | Password hashing |
| dotenv     | Environment variables |
| validator  | Input validation |

---

## 📁 Project Structure

```
TaskManagementSystem/
│
├── app.js                # Main server file
├── .env                  # Environment variables
├── models/
│   ├── usermodel.js      # User schema and logic
│   └── taskmodel.js      # Task schema
├── routes/
│   ├── registerLoginRoute.js
│   ├── userRoute.js
│   ├── adminRoute.js
│   └── taskRoute.js
├── middlewares/
│   ├── userAuth.js
│   └── adminAuth.js
└── mongoose/
    └── mongoose.js       # DB connection logic
```

---

## 📦 Setup Instructions

### 🔧 Prerequisites:
- Node.js ≥ 14
- MongoDB local or cloud instance (MongoDB Atlas)

### 🛠️ Installation:

```bash
git clone https://github.com/your-username/task-management-system.git
cd task-management-system
npm install
```

### 🧪 Setup `.env`:

Create a `.env` file in the root directory with:

```
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/TaskSystem
JWT_SECRET=yourSecretKey
```

### ▶️ Run the Server

```bash
npm start
```

---

## 📮 API Endpoints

### 🔐 Auth Routes
| Method | Route           | Description      |
|--------|------------------|------------------|
| POST   | `/api/user/signup` | Signup user (role = user only) |
| POST   | `/api/user/login`  | Login and get token |

### 👤 User Routes
| Method | Route              | Auth   |
|--------|---------------------|--------|
| GET    | `/api/user/profile` | ✅ user |
| PATCH  | `/api/user/update`  | ✅ user |

### 🧑‍💼 Admin Routes
| Method | Route                | Auth   |
|--------|-----------------------|--------|
| GET    | `/api/admin/profile`  | ✅ admin |
| GET    | `/api/admin/users`    | ✅ admin |
| DELETE | `/api/admin/user/delete/:id` | ✅ admin |

### ✅ Task Routes
| Method | Route                     | Auth   |
|--------|----------------------------|--------|
| POST   | `/api/admin/tasks/add`     | ✅ admin |
| GET    | `/api/admin/taskes`        | ✅ admin |
| DELETE | `/api/admin/taskes/delete/:id` | ✅ admin |

---

## ✨ To-Do Enhancements

- [ ] Add Swagger API documentation
- [ ] Improve error handling with a global middleware
- [ ] Add input validation with Joi or express-validator
- [ ] Write unit tests using Jest or Mocha
- [ ] Deploy to Render, Vercel, or Cyclic

---

## 🧑‍💻 Author

**Ahmed Sayed**  
Graduate of Computer and Science Faculty – Ain Shams University  
[GitHub Profile](https://github.com/ahmedsayed322)

---

## 📜 License

This project is licensed for educational purposes and open-source contributions.
