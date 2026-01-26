# Working Hours - Full Stack Workbench

A full-stack application for managing working hours and bookings, featuring multiple backend implementations and a React frontend.

## Live Demo

- **GitHub:** https://github.com/marcozammuto/full_stack_workbench/

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│                     React + TypeScript                      │
│                   (Vite, Tailwind CSS)                      │
└─────────────────────────┬───────────────────────────────────┘
                          │
            ┌─────────────┼─────────────┐
            ▼             ▼             ▼
     ┌──────────┐  ┌──────────┐  ┌──────────┐
     │  Node.js │  │  Spring  │  │  Flask   │
     │ Express  │  │   Boot   │  │  Python  │
     └────┬─────┘  └────┬─────┘  └────┬─────┘
          │             │             │
          └─────────────┼─────────────┘
                        ▼
              ┌──────────────────┐
              │    PostgreSQL    │
              │    (Supabase)    │
              └──────────────────┘
                        │
              ┌──────────────────┐
              │    DynamoDB      │
              │   (Bookings)     │
              └──────────────────┘
```

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS with dark/light mode
- React Context for state management
- Axios for API calls

### Backends
| Backend | Framework | Port |
|---------|-----------|------|
| Node.js | Express 5 | 3001 |
| Java | Spring Boot | 8080 |
| Python | Flask | 5000 |

### Databases
- **PostgreSQL** (Supabase) - Users, Days, DayModifiers
- **DynamoDB** - Bookings with cursor-based pagination

### Infrastructure
- AWS EC2 (Ubuntu 24.04)
- Nginx reverse proxy
- PM2 process manager
- GitHub Actions CI/CD

## Features

- Multi-backend architecture (switch between Node.js, Spring Boot, Flask)
- Dark/Light mode theming
- Working hours tracking
- Booking management with DynamoDB cursor-based pagination
- JWT authentication
- Automatic holiday detection

## Getting Started

### Prerequisites
- Node.js 20+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/marcozammuto/full_stack_workbench.git
cd full_stack_workbench

# Install frontend dependencies
cd client
npm install

# Install backend dependencies (Node.js)
cd ../node
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Node.js Backend
NODE_PORT=3000

# Client
VITE_NODE_ENDPOINT=http://localhost:3000
VITE_SPRING_ENDPOINT=http://localhost:8080
VITE_FLASK_ENDPOINT=http://localhost:5000

# Database
DATABASE_URL=your_postgresql_connection_string

# JWT
JWT_SECRET_KEY=your_secret_key
JWT_EXPIRES_IN=30m

# AWS (for DynamoDB)
AWS_REGION=eu-south-1
AWS_DYNAMO_DB_USER_ACCESS_ID=your_access_key
AWS_DYNAMO_DB_USER_ACCESS_SECRET_KEY=your_secret_key

# External APIs
NATIONAL_HOLIDAYS_API_HOST=https://openholidaysapi.org/PublicHolidays
```

### Running Locally

```bash
# Start the frontend (from client directory)
npm run dev

# Start Node.js backend (from node directory)
npm run dev
```

## Deployment

Push to `study-case` branch triggers automatic deployment via GitHub Actions:

1. Builds React frontend with production API URL
2. Compiles TypeScript backend
3. Deploys to EC2 via SSH/SCP
4. Configures nginx as reverse proxy
5. Manages processes with PM2

### Production URLs
- Frontend: `http://<EC2_IP>/` (nginx serves static files)
- Backend API: Proxied through `/api` to port 3001

## Project Structure

```
working_hours/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── context/       # React contexts (Theme, User, Backend)
│   │   ├── hooks/         # Custom hooks (useApi)
│   │   └── types/         # TypeScript interfaces
│   └── vite.config.ts
├── node/                   # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── routes/        # Express routes
│   │   ├── services/      # Business logic (DynamoDB, JWT)
│   │   ├── middlewares/   # Auth middleware
│   │   └── prisma/        # Prisma schema
│   └── package.json
├── java/                   # Spring Boot backend (WIP)
├── py/                     # Flask backend
├── lookup/                 # Static lookup data
└── .github/workflows/      # CI/CD pipelines
```

## Study Case

This project includes a study case demonstrating DynamoDB pagination optimization. See [STUDY_CASE.md](./STUDY_CASE.md) for details.

## Author

Giuseppe Zammuto

## License

MIT
