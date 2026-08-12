# EduTrack — Student Management Dashboard

A Student Management Dashboard built as part of the Junior Fullstack Developer technical assignment for FlyNest Global PLC (EduAyna).

The application allows an administrator to manage student records through a responsive dashboard with search, filtering, CRUD operations, validation, and PostgreSQL persistence.

---

## Live Demo

- Frontend: https://edutrack-frontend-tau.vercel.app/
- Backend: https://edutrack-backend-nine.vercel.app/
- Backend Health Check: https://edutrack-backend-nine.vercel.app/api/health

## Repository

https://github.com/Sifat-Ikram/EduTrack

---

## 1. Project Overview

EduTrack is a small Student Management Dashboard designed to demonstrate full-stack development skills using React, Next.js, TypeScript, Redux Toolkit, Express.js, PostgreSQL, and Prisma.

The administrator can:

- View all students
- Search students by name or email
- Filter students by class
- Filter students by status
- Add new students
- Edit existing students
- Delete students
- Confirm before deleting a student
- View loading, empty, and error states
- Use the dashboard on both desktop and mobile devices

The application is split into two parts:

- **Frontend** — Next.js App Router + TypeScript + Redux Toolkit + Tailwind CSS
- **Backend** — Express.js + TypeScript + Prisma ORM + PostgreSQL

---

## 2. Technical Decisions

### Redux Toolkit

Redux Toolkit is used for student data and state that needs to be shared across components and affects API requests.

The Redux store manages:

- Student list
- Loading state
- Error state
- Current student
- Search value
- Status filter
- Class filter
- API metadata

Form input state for the Add/Edit Student forms is kept locally with React `useState` because those values only belong to the individual component.

This keeps the global state focused and avoids putting unnecessary form state into Redux.

### Prisma

Prisma is used as the ORM for PostgreSQL.

It provides:

- Type-safe database queries
- A clear database schema
- Database migrations
- Generated Prisma Client

### Zod

Zod is used on the backend for request validation, including required fields and email format validation.

### Backend Architecture

The backend follows a simple layered structure:

```text
Routes → Controllers → Prisma → PostgreSQL
```

A centralized error handler is also used so API errors return consistent JSON responses with appropriate HTTP status codes.

### UI State Handling

The frontend explicitly handles:

- Loading states
- Empty states
- Error states
- Form validation errors
- Delete confirmation
- API success/failure states

This ensures the user always receives clear feedback while interacting with the application.

### Responsive Design

The student list uses:

- A table layout on desktop and tablet
- A stacked card layout on mobile

---

## 3. Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Axios
- React Icons
- Framer Motion

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod
- CORS
- dotenv
- cookie-parser

### Database

- PostgreSQL
- Neon

### Deployment

- Vercel — Frontend
- Vercel — Backend
- Neon — PostgreSQL

---

## 4. Requirements

To run the project locally, you need:

- Node.js v18 or higher
- npm
- A PostgreSQL database

This project uses Neon PostgreSQL, but any compatible PostgreSQL database can be used.

---

## 5. Project Structure

```text
EduTrack/
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   └── ...
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── redux/
│   │   └── types/
│   └── ...
│
└── README.md
```

---

## 6. Installation

Clone the repository:

```bash
git clone https://github.com/Sifat-Ikram/EduTrack.git
cd EduTrack
```

### Backend

```bash
cd backend
npm install
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
```

---

## 7. Environment Variables

Environment files containing secrets are not committed to this repository.

### Backend — `backend/.env`

Create a `.env` file:

```env
DATABASE_URL=
PORT=5000
CLIENT_URL=
JWT_SECRET=
```

Example:

```env
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
PORT=5000
CLIENT_URL="http://localhost:3000"
JWT_SECRET="your_random_secret"
```

`JWT_SECRET` is included for future authentication support but authentication is not required for this assignment.

### Frontend — `frontend/.env.local`

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=
```

For local development:

```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```

For production:

```env
NEXT_PUBLIC_API_URL="https://edutrack-backend-nine.vercel.app/api"
```

Production environment variables are configured through Vercel.

---

## 8. Database Setup

EduTrack uses PostgreSQL with Prisma ORM.

### 1. Create a PostgreSQL database

You can use Neon, Supabase, a local PostgreSQL installation, or another PostgreSQL provider.

### 2. Add the database connection string

Set the PostgreSQL connection string in:

```text
backend/.env
```

Example:

```env
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
```

### 3. Run the Prisma migration

From the `backend` directory:

```bash
npx prisma migrate dev --name init
```

This creates the required database tables and generates the Prisma Client.

### 4. Optional — Prisma Studio

To inspect the database visually:

```bash
npx prisma studio
```

---

## 9. Database Schema

The main student model contains all required fields from the assignment, along with an additional `updatedAt` field.

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

| Assignment Field | Database Field |
|---|---|
| id | `id` |
| name | `name` |
| email | `email` |
| phone | `phone` |
| class | `class` |
| status | `status` |
| createdAt | `createdAt` |

---

## 10. Running the Application

Run the backend and frontend in separate terminals.

### Backend

```bash
cd backend
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

### Frontend

In another terminal:

```bash
cd frontend
npm run dev
```

The frontend runs on:

```text
http://localhost:3000
```

---

## 11. Available Scripts

### Backend

| Script | Description |
|---|---|
| `npm run dev` | Start the API in development mode with auto-reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start` | Run the compiled production build |
| `npm run prisma:migrate` | Run Prisma migrations |
| `npm run prisma:studio` | Open Prisma Studio |

### Frontend

| Script | Description |
|---|---|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build the application for production |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

---

## 12. API Endpoints

### Local Base URL

```text
http://localhost:5000/api
```

### Production Base URL

```text
https://edutrack-backend-nine.vercel.app/api
```

### Student Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/students` | Get all students |
| GET | `/students/:id` | Get a single student |
| POST | `/students` | Create a student |
| PATCH | `/students/:id` | Update a student |
| DELETE | `/students/:id` | Delete a student |

### Search and Filtering

The `GET /students` endpoint supports query parameters for search and filtering.

Search by name or email:

```text
GET /api/students?search=rahim
```

Filter by status:

```text
GET /api/students?status=active
```

Filter by class:

```text
GET /api/students?class=9
```

Multiple filters can also be combined:

```text
GET /api/students?search=rahim&status=active&class=9
```

Pagination parameters are also supported:

```text
GET /api/students?page=1&limit=10
```

---

## 13. API Response Format

Successful responses follow a consistent structure.

Example:

```json
{
  "success": true,
  "data": {},
  "meta": {
    "total": 0,
    "page": 1,
    "limit": 10,
    "totalPages": 0
  }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Email is required."
}
```

### HTTP Status Codes

The API uses appropriate HTTP status codes, including:

- `200` — Successful request
- `201` — Resource created
- `400` — Validation or bad request
- `404` — Resource not found
- `500` — Internal server error

---

## 14. Features Implemented

### Student Management

- View all students
- Add a new student
- Edit an existing student
- Delete a student
- Confirmation before deletion

### Search

Students can be searched by:

- Name
- Email

Search requests are debounced on the frontend to avoid unnecessary API requests while typing.

### Filters

Students can be filtered by:

- Class
- Active/inactive status

The class filter supports values such as:

```text
9
```

or:

```text
Class 9
```

### Form Validation

The Add/Edit form validates:

- Name is required
- Email is required
- Email must have a valid format
- Phone is required
- Class is required
- Status is required

Validation is handled on both the frontend and backend.

### UI States

The application includes:

- Loading state
- Empty state
- Error state
- Validation error state
- Delete confirmation dialog

### Responsive UI

The student list adapts to screen size:

- Desktop/tablet — table layout
- Mobile — card layout

---

## 15. Authentication

Authentication was not implemented because it was not required by the assignment.

The application focuses on the requested student management functionality and API/database integration.

---

## 16. Short Explanation

### 1. What was the most challenging part of the assignment?

The most challenging part was keeping the student data flow consistent across the frontend, backend, and PostgreSQL database. I needed to make sure that searching and filtering correctly affected the API request while creating, updating, and deleting students also kept the UI state synchronized with the database.

### 2. What technical decision are you most proud of?

I am most proud of using Redux Toolkit for the shared student state while keeping form state local to the Add/Edit forms. This keeps the global state focused on data that actually needs to be shared and avoids unnecessary global state for individual form fields.

I also separated the backend into routes, controllers, validation, and database access, which keeps the code organized and easier to maintain.

### 3. If you had another 4 hours, what would you improve?

With another 4 hours, I would focus on polishing the application further rather than adding major new features. I would improve user feedback with more refined success/error messages and transition states, and add a few more edge-case validations.

I would also add automated tests for the most important API endpoints and frontend interactions to improve reliability and maintainability.

### 4. What part of the application would you change before deploying it to production?

Before a production deployment, I would strengthen security and operational concerns such as stricter CORS configuration, rate limiting, more comprehensive API validation, automated testing, and production monitoring/logging.

---

## 17. Deployment

### Frontend

The frontend is deployed on Vercel:

```text
https://edutrack-frontend-tau.vercel.app/
```

The production frontend uses the deployed backend API through:

```env
NEXT_PUBLIC_API_URL=https://edutrack-backend-nine.vercel.app/api
```

### Backend

The backend is deployed on Vercel:

```text
https://edutrack-backend-nine.vercel.app/
```

Health check:

```text
https://edutrack-backend-nine.vercel.app/api/health
```

The backend uses environment variables configured through Vercel:

```text
DATABASE_URL
CLIENT_URL
PORT
```

### Database

The PostgreSQL database is hosted on Neon.

The deployed Express backend connects to PostgreSQL using the configured `DATABASE_URL`.

### Deployment Architecture

```text
User
  │
  ▼
Next.js Frontend
Vercel
  │
  │ Axios / REST API
  ▼
Express Backend
Vercel
  │
  │ Prisma ORM
  ▼
PostgreSQL
Neon
```

---

## 18. Production Considerations

This project was intentionally kept within the scope of the technical assignment rather than being treated as a production-ready system.

Before a real production deployment, I would consider adding:

- Authentication and authorization
- Role-based access control
- Rate limiting
- Strict CORS configuration
- Automated frontend and backend tests
- API documentation
- Production monitoring and logging
- Better audit/history tracking
- Additional security validation
- CI/CD checks before deployment

---

## 19. Assignment Requirements Checklist

| Requirement | Status |
|---|---|
| React.js | ✅ |
| Next.js | ✅ |
| TypeScript | ✅ |
| Redux Toolkit | ✅ |
| Express.js | ✅ |
| PostgreSQL | ✅ |
| View students | ✅ |
| Search by name | ✅ |
| Search by email | ✅ |
| Filter by status | ✅ |
| Filter by class | ✅ |
| Add student | ✅ |
| Edit student | ✅ |
| Delete student | ✅ |
| Delete confirmation | ✅ |
| Form validation | ✅ |
| PostgreSQL persistence | ✅ |
| REST API | ✅ |
| Loading state | ✅ |
| Empty state | ✅ |
| Error state | ✅ |
| Responsive UI | ✅ |
| Frontend deployment | ✅ |
| Backend deployment | ✅ |
| README documentation | ✅ |

---

## 20. Final Notes

The goal of this project was to build a clean, understandable, and functional Student Management Dashboard while keeping the architecture simple and aligned with the assignment requirements.

The application demonstrates full-stack integration between a Next.js frontend, Express REST API, Prisma ORM, and PostgreSQL database, with Redux Toolkit managing shared frontend state.
