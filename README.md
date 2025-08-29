# Skill Assessment Frontend

A React-based frontend for the Skill Assessment Platform.
This connects to the backend API
 (Node.js + Express + MySQL + Redis) and provides a user-friendly interface for candidates, admins, and evaluators.


---

## 🚀 Features

- Authentication & Authorization
  User registration & login
  JWT-based auth with protected routes
  Role-based access (Admin/User)

- User Dashboard
  Take skill assessments
  Test history

- Admin Panel
  Manage users (CRUD)
  Manage skills & questions
  Generate reports (user performance, skill gap, time-based trends)

- Assessments
  Start and submit attempts
  Timed questions and auto-submit
  History of attempts

- Reports & Analytics
  Graphical representation of user scores
  Skill gap identification

---

## 🛠️ Tech Stack

- React (UI framework)
- React Router (routing & protected routes)
- Axios (API calls)
- TailwindCSS / Material UI (styling)
- Chart.js / Recharts (data visualization)

---

## 📂 Project Structure

```
frontend/
│── public/               # Static assets
│── src/
│   ├── api/              # Axios setup & API services
│   ├── components/       # Shared components (Navbar, Loader, etc.)
│   ├── features/         # Helpers (auth, validators, etc.)
│   ├── pages/            # Page components (Login, Dashboard, Admin, etc.)
│   ├── routes/           # Protected & public route definitions
│   ├── utils/            # Entry point
│   ├── App.js            # Root component
│   └── index.js          
│
│── package.json
│── .env
│── Dockerfile
│── README.md
```

## ⚙️ Setup & Installation

- Clone repository
- Install dependencies
- Change backend URL
- Run locally - npm start

