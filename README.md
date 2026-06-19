# SimpleLogin with Database

A full-stack login and registration web app with a real PostgreSQL database, session-based authentication, and a clean modern UI.

**Live demo:**  https://login-portal--lamnguyen222.replit.app/



**GitHub:** https://github.com/NguyenTungLam411/SimpleLogin_withDatabase

---

## Features

- **User Registration** — create an account with your name, email, and password
- **User Login** — sign in with email and password
- **Session Management** — stay logged in across page refreshes (7-day session)
- **Password Security** — passwords are hashed with bcrypt (never stored in plain text)
- **Dashboard** — view your account info and sign out
- **Form Validation** — real-time client-side validation with clear error messages
- **Error Handling** — server errors (e.g. "Email already in use") shown in the UI

---

## Tech Stack

### Frontend
- **React** + **Vite** — fast, modern frontend tooling
- **TypeScript** — fully typed
- **Tailwind CSS** + **shadcn/ui** — polished component library
- **React Hook Form** + **Zod** — form handling and validation
- **Wouter** — lightweight client-side routing
- **React Query** — server state and API calls

### Backend
- **Node.js** + **Express 5** — REST API server
- **PostgreSQL** — relational database
- **Drizzle ORM** — type-safe database queries
- **express-session** — server-side session management
- **bcryptjs** — password hashing

### Tooling
- **pnpm workspaces** — monorepo package management
- **OpenAPI** + **Orval** — contract-first API with auto-generated hooks and Zod schemas
- **esbuild** — fast server bundling

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Create a new account |
| `POST` | `/api/auth/login` | Sign in |
| `POST` | `/api/auth/logout` | Sign out |
| `GET` | `/api/auth/me` | Get current logged-in user |
| `GET` | `/api/healthz` | Health check |

---

## Database Schema

**Table: `users`**

| Column | Type | Notes |
|--------|------|-------|
| `id` | integer | Auto-incrementing primary key |
| `email` | text | Unique |
| `name` | text | Full name |
| `password_hash` | text | bcrypt hash |
| `created_at` | timestamp | Set automatically |

---

## Project Structure

```
├── artifacts/
│   ├── api-server/        # Express backend
│   │   └── src/
│   │       ├── routes/    # auth + health routes
│   │       └── app.ts     # Express app + session middleware
│   └── login-app/         # React frontend
│       └── src/
│           ├── pages/     # LoginPage, RegisterPage, DashboardPage
│           └── App.tsx    # Router setup
├── lib/
│   ├── db/                # Drizzle ORM schema + client
│   ├── api-spec/          # OpenAPI spec (source of truth)
│   ├── api-zod/           # Generated Zod validation schemas
│   └── api-client-react/  # Generated React Query hooks
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `SESSION_SECRET` | Secret key for signing sessions |
| `PORT` | Port for the API server |

---

## Getting Started (Local)

```bash
# Install dependencies
pnpm install

# Push database schema
pnpm --filter @workspace/db run push

# Start the API server
pnpm --filter @workspace/api-server run dev

# Start the frontend
pnpm --filter @workspace/login-app run dev
```

---

## License

MIT
