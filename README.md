# Working Hours

A full-stack application for managing working hours and bookings, built with multiple backend implementations.

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
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Context** for state management
- **Axios** for API calls

### Backends
| Backend | Framework | Port |
|---------|-----------|------|
| Node.js | Express 5 | 3000 |
| Java | Spring Boot | 8080 |
| Python | Flask | 3001 |

### Databases
- **PostgreSQL** (Supabase) - Users, Days, DayModifiers
- **DynamoDB** - Bookings with cursor-based pagination

## Features

- Multi-backend architecture (switch between Node.js, Spring Boot, Flask)
- Dark/Light mode theming
- Working hours tracking
- Booking management with DynamoDB pagination
- JWT authentication

## Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd working_hours

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
VITE_FLASK_ENDPOINT=http://localhost:3001

# Database
DATABASE_URL=your_postgresql_connection_string

# JWT
JWT_SECRET_KEY=your_secret_key

# AWS (for DynamoDB)
AWS_REGION=eu-south-1
AWS_DYNAMO_DB_USER_ACCESS_ID=your_access_key
AWS_DYNAMO_DB_USER_ACCESS_SECRET_KEY=your_secret_key
```

### Running Locally

```bash
# Start the frontend
cd client
npm run dev

# Start Node.js backend (in another terminal)
cd node
npm run dev
```

## Deployment

The application is deployed to AWS EC2 using GitHub Actions.

### CI/CD Pipeline

Push to `study-case` branch triggers automatic deployment:
1. Builds React frontend with production API URL
2. Compiles TypeScript backend
3. Deploys to EC2 via SSH
4. Configures nginx as reverse proxy
5. Manages processes with PM2

### Production URLs
- **Frontend:** `http://<EC2_IP>/`
- **API:** Proxied through `/api`

## Project Structure

```
working_hours/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── context/       # React contexts
│   │   ├── hooks/         # Custom hooks
│   │   └── types/         # TypeScript types
│   └── vite.config.ts
├── node/                   # Node.js backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── prisma/        # Prisma schema
│   └── package.json
├── java/                   # Spring Boot backend
├── py/                     # Flask backend
└── .github/workflows/      # CI/CD pipelines
```

## License

MIT
