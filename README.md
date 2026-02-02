# Working Hours - Full Stack Workbench

A full-stack application for managing working hours and bookings, demonstrating multiple backend implementations with a unified React frontend.

## Live Demo

- **Application:** [http://15.161.188.174](http://15.161.188.174)
- **GitHub:** [github.com/marcozammuto/full_stack_workbench](https://github.com/marcozammuto/full_stack_workbench)

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
     │    ✓     │  │ (Soon)   │  │ (Soon)   │
     └────┬─────┘  └────┬─────┘  └────┬─────┘
          │             │             │
          └─────────────┼─────────────┘
                        ▼
              ┌──────────────────┐
              │    PostgreSQL    │
              │   (Supabase)     │
              └──────────────────┘
                        │
              ┌──────────────────┐
              │    DynamoDB      │
              │   (Bookings)     │
              └──────────────────┘
```

> **Note:** This project demonstrates a multi-backend architecture. Currently, only the Node.js backend is fully implemented. Spring Boot and Flask backends are planned for future development to showcase the same API across different technologies.

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** with dark/light mode support
- **React Context** for state management (Theme, User, Backend)
- **Axios** for API calls
- **HeadlessUI** for accessible components

### Backends

| Backend | Framework | Port | Status |
|---------|-----------|------|--------|
| Node.js | Express 5 + Prisma | 3001 | ✅ Production |
| Java | Spring Boot 3 | 8080 | 🚧 Coming Soon |
| Python | Flask | 5000 | 🚧 Coming Soon |

### Databases
- **PostgreSQL** (Prisma) - Users, Days, DayModifiers
- **DynamoDB** - Bookings with cursor-based pagination

### Infrastructure
- **AWS EC2** (Ubuntu 24.04)
- **Nginx** reverse proxy
- **PM2** process manager
- **GitHub Actions** CI/CD

## Features

- **Multi-backend architecture** - Switch between Node.js, Spring Boot, Flask from the UI
- **Dark/Light mode** - Full theme support across all components
- **Working hours tracking** - Log daily work hours with modifiers
- **Booking management** - DynamoDB with cursor-based pagination
- **JWT authentication** - Secure login with token refresh
- **Holiday detection** - Automatic national holiday lookup

## Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn
- Java 17+ (for Spring Boot backend) (coming soon)
- Python 3.10+ (for Flask backend) (coming soon)

### Installation

```bash
# Clone the repository
git clone https://github.com/marcozammuto/full_stack_workbench.git
cd full_stack_workbench

# Install frontend dependencies
cd client && npm install

# Install Node.js backend dependencies
cd ../node && npm install

# Generate Prisma client
npx prisma generate --schema=src/prisma/schema.prisma
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Ports
NODE_PORT=3000
SPRING_PORT=8080
FLASK_PORT=5000

# Frontend API Endpoints
VITE_NODE_ENDPOINT=http://localhost:3000
VITE_SPRING_ENDPOINT=http://localhost:8080
VITE_FLASK_ENDPOINT=http://localhost:5000

# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# JWT Authentication
JWT_SECRET_KEY=your_secret_key
JWT_EXPIRES_IN=30m

# AWS DynamoDB
AWS_REGION=eu-south-1
AWS_DYNAMO_DB_USER_ACCESS_ID=your_access_key
AWS_DYNAMO_DB_USER_ACCESS_SECRET_KEY=your_secret_key

# External APIs
NATIONAL_HOLIDAYS_API_HOST=https://openholidaysapi.org/PublicHolidays
```

### Running Locally

```bash
# Terminal 1: Start frontend
cd client && npm run dev

# Terminal 2: Start Node.js backend
cd node && npm run dev
```

### Running Tests

```bash
# Frontend tests
cd client && npm test

# Backend tests
cd node && npm test
```

## Deployment

### CI/CD Pipeline

Push to `study-case` branch triggers automatic deployment:

1. **Build** - Compiles React frontend and TypeScript backend
2. **Deploy** - Copies files to EC2 via SCP
3. **Configure** - Sets up nginx and environment variables
4. **Start** - Manages processes with PM2

### Production Architecture

```
Internet → Nginx (port 80)
              ├── /        → Static files (React)
              └── /api/*   → Proxy to Node.js (port 3001)
```

### Manual Deployment

```bash
# SSH into EC2
ssh -i key.pem ubuntu@<EC2_IP>

# Update and restart
cd ~/working_hours/node
git pull
npm ci --omit=dev
pm2 restart working-hours-backend
```

## Project Structure

```
working_hours/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # UI components
│   │   │   ├── features/    # Feature components
│   │   │   └── views/       # Page components
│   │   ├── context/         # React contexts
│   │   ├── hooks/           # Custom hooks
│   │   ├── styles/          # Shared styles
│   │   └── types/           # TypeScript interfaces
│   └── vite.config.ts
├── node/                      # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── middlewares/     # Auth, error handling
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── prisma/          # Database schema
│   └── package.json
├── java/                      # Spring Boot backend (WIP)
│   ├── src/main/java/
│   └── pom.xml
├── py/                        # Flask backend
│   ├── app.py
│   └── requirements.txt
├── .github/workflows/         # CI/CD pipelines
└── .env                       # Environment variables
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | User login |
| POST | `/auth/register` | User registration |
| POST | `/auth/logout` | User logout |

### Days
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/day` | Get all days for user |
| POST | `/day` | Create new day entry |
| PUT | `/day/:id` | Update day entry |

### Bookings (DynamoDB)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/booking` | Get paginated bookings |
| POST | `/booking/seed` | Seed sample data |

### Lookup
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/lookup` | Get day modifiers and holidays |


## Roadmap

### Planned Features
- [ ] **Spring Boot Backend** - Java implementation with Spring Security, JPA, and the same API contract
- [ ] **Flask Backend** - Python implementation with SQLAlchemy and JWT authentication
- [ ] **Docker** - Containerization for all services
- [ ] **API Documentation** - OpenAPI/Swagger specification
- [ ] **E2E Tests** - Cypress or Playwright integration tests

### Recently Completed
- [x] JWT Authentication with refresh tokens
- [x] DynamoDB integration for bookings
- [x] CI/CD pipeline with GitHub Actions
- [x] Dark/Light theme support
- [x] Unit tests for auth services

## Author

Giuseppe Zammuto

## License

MIT

# Scientific Calculator

A modern, feature-rich scientific calculator built with React and TypeScript. This application provides both basic and advanced mathematical operations with a clean, responsive interface.

## Features

### Core Functionality

- **Basic Operations**: Addition, subtraction, multiplication, division
- **Scientific Functions**:
  - Trigonometric: sin, cos, tan
  - Logarithmic: ln (natural log), log (base 10)
  - Other: square root, exponential, factorial, power
- **Memory Functions**: MC, MR, M+, M-
- **Utility Functions**: Percentage, sign toggle, backspace

### User Experience

- **Dual Mode**: Toggle between Basic and Scientific calculator views
- **Theme Support**: Light and Dark mode with persistent storage
- **Calculation History**: Track your last 50 calculations
- **Keyboard Support**: Full keyboard navigation for efficient use
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Angle Modes**: Switch between Degrees (DEG) and Radians (RAD)

### Technical Highlights

- **Type-Safe**: Built with TypeScript for robust code
- **Safe Evaluation**: Custom expression parser (no eval())
- **Custom Hooks**: Modular architecture with reusable hooks
- **Modern UI**: CSS variables for theming, smooth animations
- **Production Ready**: Optimized build with Vite

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling with CSS variables

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

3. Open your browser and navigate to the printed local endpoint

## Project Structure

```
src/
├── Calculator/         # Main calculator component
├── components/         # Reusable UI components
│   ├── Button.tsx
│   ├── Display.tsx
│   └── History.tsx
├── hooks/             # Custom React hooks
│   ├── useCalculator.ts
│   ├── useKeyboard.ts
│   └── useTheme.ts
├── styles/            # Component styles
│   ├── Button.css
│   ├── Display.css
│   └── History.css
├── utils/             # Utility functions
│   └── calculator.ts
├── App.tsx
└── main.tsx
```

## Keyboard Shortcuts

- **Numbers**: 0-9
- **Operators**: +, -, \*, /
- **Decimal**: . or ,
- **Equals**: Enter or =
- **Clear**: Escape or C
- **Backspace**: Backspace
- **Percentage**: %

## Architecture Decisions

### Custom Expression Parser

Instead of using `eval()`, this calculator implements a safe expression parser using the Shunting Yard algorithm to convert infix notation to postfix, then evaluates the result. This prevents code injection vulnerabilities.

### State Management

The calculator uses React hooks for state management, with custom hooks separating concerns:

- `useCalculator`: Core calculator logic
- `useTheme`: Theme management and persistence
- `useKeyboard`: Keyboard event handling

### Component Architecture

Components are modular and reusable, with clear separation between presentation and logic. Each component has its own CSS file for styling.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
