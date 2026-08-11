# EduTrack — Student Management Dashboard

A small Student Management Dashboard built as part of the Junior Fullstack Developer
technical assignment for FlyNest Global PLC (EduAyna).

Live Demo:
- Frontend: [https://your-frontend.vercel.app]
- Backend: [https://your-backend.vercel.app] / [https://your-backend-host.com]

Repository: [https://github.com/your-username/edutrack]

---

## 1. Project Overview

This project is a simple admin dashboard that allows an administrator to manage students —
view, search, filter, add, edit, and delete student records.

The app is split into two parts:

- **Frontend** — Next.js (App Router) + TypeScript + Redux Toolkit + Tailwind CSS
- **Backend** — Express.js + TypeScript + Prisma ORM + PostgreSQL

**Key implementation choices:**
- **Redux Toolkit** is used only for state that is shared across multiple components and
  drives API calls: the student list, loading/error state, and search/filter values.
  Form input state (Add/Edit forms) is kept in local component state (`useState`) since it
  is only relevant to that one component.
- **Prisma** is used as the ORM to talk to PostgreSQL — it gives type-safe queries and
  handles schema migrations cleanly.
- **Zod** is used on the backend for request validation (required fields, email format).
- The backend follows a simple layered structure: `routes → controllers → prisma`, with a
  centralized error handler so every failure returns a consistent JSON shape and proper
  HTTP status code.
- The frontend shows explicit **loading**, **empty**, and **error** states everywhere data
  is fetched, so the user is never left looking at a blank screen.
- The UI is responsive — a table layout on desktop/tablet, and a stacked card layout on
  mobile.

---

## 2. Tech Stack

**Frontend**
- Next.js (App Router)
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Axios
- React Icons
- Framer Motion

**Backend**
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod (validation)
- cors, dotenv, cookie-parser

---

## 3. Requirements

- Node.js v18 or higher
- npm
- A PostgreSQL database (this project uses [Neon](https://neon.tech) — any PostgreSQL
  instance works, including local Postgres)

---

## 4. Project Structure

```
edutrack/
├── backend/     # Express + Prisma + PostgreSQL API
└── frontend/    # Next.js + Redux Toolkit dashboard
```

---

## 5. Installation

Clone the repository:

```bash
git clone https://github.com/your-username/edutrack.git
cd edutrack
```

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## 6. Environment Variables

Neither `.env` file is committed to this repository. Copy the example files and fill in
your own values — **do not commit real credentials or secrets.**

### Backend — `backend/.env`

```bash
cp .env.example .env
```

```env
# PostgreSQL connection string (Neon, Supabase, or any PostgreSQL instance)
DATABASE_URL=

# Port the Express server runs on
PORT=5000

# URL of the frontend app, used for CORS
CLIENT_URL=

# Secret used if/when JWT-based auth is added (not required for this assignment)
JWT_SECRET=
```

### Frontend — `frontend/.env.local`

```bash
cp .env.example .env.local
```

```env
# Base URL of the backend API
NEXT_PUBLIC_API_URL=
```

Example values for local development:

```env
# backend/.env
DATABASE_URL="postgresql://user:password@ep-xxxx.neon.tech/edutrack?sslmode=require"
PORT=5000
CLIENT_URL="http://localhost:3000"
JWT_SECRET="any_random_string"

# frontend/.env.local
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```

---

## 7. Database Setup

This project uses **PostgreSQL** with **Prisma** as the ORM.

1. Create a PostgreSQL database (e.g. a free project on [Neon](https://neon.tech)).
2. Copy the connection string into `DATABASE_URL` in `backend/.env`.
3. From the `backend` folder, run the migration to create the `students` table:

```bash
cd backend
npx prisma migrate dev --name init
```

This will:
- Create the `students` table according to `prisma/schema.prisma`
- Generate the Prisma Client used by the API

Optional — inspect the database visually:

```bash
npx prisma studio
```

### Schema

```prisma
model Student {
  id        Int           @id @default(autoincrement())
  name      String
  email     String        @unique
  phone     String
  class     String
  status    StudentStatus @default(active)
  createdAt DateTime      @default(now()) @map("created_at")
  updatedAt DateTime      @updatedAt @map("updated_at")

  @@map("students")
}

enum StudentStatus {
  active
  inactive
}
```

---

## 8. Running the Application

Run the backend and frontend in two separate terminals.

### Backend

```bash
cd backend
npm run dev
```

Runs on `http://localhost:5000` (health check at `/api/health`).

### Frontend

```bash
cd frontend
npm run dev
```

Runs on `http://localhost:3000`.

---

## 9. Available Scripts

### Backend (`backend`)

| Script | Description |
|---|---|
| `npm run dev` | Start the API in development mode with auto-reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start` | Run the compiled production build |
| `npm run prisma:migrate` | Run Prisma migrations |
| `npm run prisma:studio` | Open Prisma Studio to browse the database |

### Frontend (`frontend`)

| Script | Description |
|---|---|
| `npm run dev` | Start the Next.js app in development mode |
| `npm run build` | Build the app for production |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

---

## 10. API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/students` | List students (supports `search`, `status`, `class`, `page`, `limit` query params) |
| GET | `/students/:id` | Get a single student by id |
| POST | `/students` | Create a new student |
| PATCH | `/students/:id` | Update an existing student |
| DELETE | `/students/:id` | Delete a student |

**Response format:**

```json
{
  "success": true,
  "data": { },
  "meta": { "total": 0, "page": 1, "limit": 10, "totalPages": 0 }
}
```

**Error format:**

```json
{
  "success": false,
  "message": "Email is required."
}
```

**Status codes used:** `200` (success), `201` (created), `400` (validation/bad request),
`404` (not found), `500` (server error).

Authentication is not implemented, as it was not required by the assignment.

---

## 11. Features Implemented

- View all students in a table (desktop) / card list (mobile)
- Search students by name or email (debounced)
- Filter students by status and by class
- Add a new student with client-side and server-side validation
- Edit an existing student
- Delete a student with a confirmation dialog
- Loading, empty, and error states across the app
- Pagination support on the API (bonus)

---

## 12. Short Explanation

**1. What was the most challenging part of the assignment?**
[Write your honest answer here.]

**2. What technical decision are you most proud of?**
[Write your honest answer here.]

**3. If you had another 4 hours, what would you improve?**
[Write your honest answer here.]

**4. What part of the application would you change before deploying it to production?**
[Write your honest answer here.]

---

## 13. Deployment Notes

- Frontend deployed on Vercel; `NEXT_PUBLIC_API_URL` is set to the deployed backend URL
  in Vercel's Environment Variables.
- Backend deployed on [Vercel / Railway / Render — whichever you use]; `DATABASE_URL`,
  `PORT`, and `CLIENT_URL` are set in its environment variables.
- Database is hosted on Neon (PostgreSQL), accessible from both local development and the
  deployed backend using the same connection string.