# INFORM – Smart Student Service

A full-stack web application for **Benedicto College** that gives students a self-service portal to manage enrollment, grades, attendance, payments, and document requests — with an admin verification workflow and an AI assistant (JOBERT) powered by the Gemini API.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript |
| Backend | Node.js, Express 4 |
| Database | MySQL 8 |
| Authentication | JWT (HTTP-only cookies) |
| AI Assistant | Google Gemini API |
| Notifications | Firebase Cloud Messaging (in-app fallback included) |

---

## Project Structure

```
IMPLEMENTATION-OF-A-SMART-STUDENT-SERVICE-/
├── app/                        # Next.js frontend (App Router)
│   ├── admin/
│   │   ├── dashboard/          # Admin dashboard page
│   │   └── login/              # Admin login page
│   ├── api/
│   │   └── jobert/route.ts     # JOBERT AI assistant API route
│   ├── components/
│   │   └── LoadingScreen.tsx
│   ├── dashboard/page.tsx      # Student dashboard
│   ├── login/page.tsx          # Student login
│   └── globals.css
│
└── server/                     # Express backend
    ├── config/
    │   ├── db.js               # MySQL connection pool
    │   └── env.js              # Environment variables
    ├── controllers/            # Request handlers
    ├── database/
    │   ├── migrate.js          # Creates tables + seeds data
    │   └── schema.sql          # Full MySQL schema
    ├── middleware/             # JWT auth guards, error handler
    ├── models/                 # Database query layer
    ├── routes/                 # Express route definitions
    ├── utils/
    │   ├── grading.js          # Philippine Grading Scale helpers
    │   └── notify.js           # Notification helper
    └── index.js                # Express entry point
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL 8+
- A Google Gemini API key (for JOBERT)

---

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/IMPLEMENTATION-OF-A-SMART-STUDENT-SERVICE-.git
cd IMPLEMENTATION-OF-A-SMART-STUDENT-SERVICE-
```

---

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```env
PORT=4000
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=24h
ADMIN_JWT_SECRET=your_admin_jwt_secret_here

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=smart_student_service
```

Run the migration to create all tables and seed initial data:

```bash
npm run migrate
```

Start the backend server:

```bash
npm run dev
```

The API will be available at `http://localhost:4000`.

---

### 3. Set up the frontend

From the project root:

```bash
npm install
```

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Start the frontend:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Database Tables

| Table | Purpose |
|---|---|
| `students` | Student accounts and login info |
| `teachers` | Teacher accounts |
| `admins` | Admin accounts |
| `subjects` | Available subjects with capacity |
| `enrollments` | Enrollment records per student per semester |
| `enrollment_subjects` | Many-to-many: enrollment ↔ subjects |
| `grades` | Student grades per subject |
| `attendance` | Attendance records per subject |
| `payments` | Tuition and fee payment records |
| `documents` | Document requests (TOR, certificates, etc.) |
| `notifications` | In-app and push notification records |
| `audit_log` | Admin action history |
| `enrollment_config` | Active semester and enrollment deadline |

---

## API Reference

### Base URL
```
http://localhost:4000/api
```

### Health Check
```
GET /health
```

### Student Authentication
```
POST /auth/login          { student_id, password }
POST /auth/logout
GET  /auth/me             🔒 student token required
```

### Student Services (all require student token)
```
GET  /enrollment
GET  /enrollment/subjects
POST /enrollment          { subjects: [id, ...] }

GET  /grades
GET  /attendance

GET  /payments
POST /payments            { fee_item, amount }

GET  /documents
GET  /documents/types
POST /documents           { document_type, purpose, copies }

GET  /notifications
POST /notifications/read
POST /notifications/register-token  { device_token }
```

### Admin (all require admin token except login/logout)
```
POST /admin/login         { admin_id, password }
POST /admin/logout

GET  /admin/dashboard
GET  /admin/students/search?q=<name or student_id>
GET  /admin/audit-log

GET  /admin/enrollments
PATCH /admin/enrollments/:id/approve
PATCH /admin/enrollments/:id/reject   { rejection_reason }

GET  /admin/payments
PATCH /admin/payments/:id/verify

GET  /admin/documents
PATCH /admin/documents/:id/approve   { expected_release_date }
PATCH /admin/documents/:id/reject    { rejection_reason }
```

---

## Demo Credentials

### Students
| Student ID | Password | Name | Course |
|---|---|---|---|
| 202400001 | jamie123 | Jamie Santos | BSCS Year 2 |
| 202400002 | maria456 | Maria Reyes | BSED Year 1 |
| 202400003 | carlo789 | Carlo Dela Cruz | BSBA Year 3 |
| 202400004 | ana2024 | Ana Villanueva | BSN Year 2 |
| 202400005 | luis2024 | Luis Fernandez | BSCS Year 4 |

### Admins
| Admin ID | Password | Office |
|---|---|---|
| ADMIN001 | admin2024 | Registrar Office |
| ADMIN002 | cashier2024 | Cashier Office |

---

## Grading Scale

The system uses the **Philippine Grading Scale**:

| Percentage | Letter Grade |
|---|---|
| 99 – 100% | 1.00 |
| 96 – 98% | 1.25 |
| 93 – 95% | 1.50 |
| 90 – 92% | 1.75 |
| 87 – 89% | 2.00 |
| 84 – 86% | 2.25 |
| 81 – 83% | 2.50 |
| 78 – 80% | 2.75 |
| 75 – 77% | 3.00 |
| Below 75% | 5.00 (Failed) |

GWA is computed as the arithmetic mean of letter-grade equivalents.

---

## Workflow

```
Student Login
     ↓
Dashboard (select service)
     ↓
Submit Request (enrollment / payment / document)
     ↓
Admin Reviews Pending Requests
     ↓
Admin Approves or Rejects
     ↓
Student Receives Notification
```

---

## Token Expiry

| Role | Expiry |
|---|---|
| Student | 24 hours |
| Admin | 8 hours |

---

## Security Notes

- Passwords are hashed with **bcrypt** (cost factor 10)
- JWTs are stored in **HTTP-only, SameSite=Strict** cookies
- Student and admin tokens use **separate secrets**
- Admin routes are protected by a dedicated `role: "admin"` JWT claim
- Accounts are locked for **15 minutes** after 5 consecutive failed login attempts
- `.env` files are excluded from version control via `.gitignore`
