# PrimeTrade.ai - Full-Stack Task Management Application

A modern task management application built with Next.js, TypeScript, TailwindCSS, Node.js, Express, and Prisma ORM.

##  Project Structure

```
primeTrade.ai/
├── backend/          # Node.js/Express API
└── frontend/         # Next.js application
```

## Tech Stack

### Frontend
- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **Validation**: Zod
- **Form Management**: React Hook Form
- **HTTP Client**: Axios
- **State Management**: zustand

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Validation**: express-validator

## Features

### Authentication & Authorization
- User signup with email and password
- User login with JWT tokens
- Password hashing with bcrypt
- Protected routes with JWT middleware
- Auto-redirect for unauthorized users
- Token persistence in localStorage

### User Management
- User profile viewing
- Profile editing (name update)
- Account information display

### Task Management (CRUD)
- Create tasks with title, description, status, priority
- View all tasks with pagination
- Edit existing tasks
- Delete tasks with confirmation
- Search tasks by title/description
- Filter tasks by status (pending, in-progress, completed)
- Filter tasks by priority (low, medium, high)

### UI/UX
- Responsive design (mobile, tablet, desktop)
- Loading states and spinners
- Error handling with user-friendly messages
- Success notifications
- Modern gradient backgrounds
- Smooth animations and transitions
- Password strength indicator
- Empty states for lists
- Status and priority badges

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd primeTrade.ai
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database and JWT secret

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
# Create .env.local file with:
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

## Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://username:password@localhost:5432/primetrade_db"
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Testing the Application

1. **Start both backend and frontend servers**

2. **Create an account**:
   - Navigate to `http://localhost:3000`
   - Click "Sign Up"
   - Fill in email, password, and name
   - You'll be redirected to the dashboard

3. **Create tasks**:
   - Click "Create Task" or "+ Create Task"
   - Fill in task details
   - Submit the form

4. **Manage tasks**:
   - View all tasks in the tasks page
   - Use search and filters
   - Edit or delete tasks
   - Update status and priority

5. **Profile management**:
   - Go to Profile page
   - Update your name
   - View account information

## API Documentation

### Authentication Endpoints
- `POST /backend/auth/signup` - Register new user
- `POST /backend/auth/login` - Login user

### User Endpoints
- `GET /backend/users/profile` - Get user profile (protected)
- `PUT /backend/users/profile` - Update user profile (protected)

### Task Endpoints
- `POST /backend/tasks` - Create task (protected)
- `GET /backend/tasks` - Get all tasks with filters (protected)
- `GET /backend/tasks/:id` - Get single task (protected)
- `PUT /backend/tasks/:id` - Update task (protected)
- `DELETE /backend/tasks/:id` - Delete task (protected)

See backend README for detailed API documentation.

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token authentication
- Input validation (Zod on frontend, express-validator on backend)
- CORS protection
- SQL injection prevention (Prisma ORM)
- Authorization checks (users can only access own data)
- Error handling middleware

## Scalability Recommendations

### Database
- Add database indexes on frequently queried fields
- Implement connection pooling
- Use read replicas for heavy read operations
- Implement caching with Redis

### Backend
- Containerize with Docker
- Implement horizontal scaling
- Add rate limiting per user/IP
- Use message queues for async operations
- Add monitoring and logging (Winston, Sentry)

### Frontend
- Implement code splitting and lazy loading
- Use Next.js Image optimization
- Add service worker for offline support
- Implement optimistic UI updates
- Use React Query or SWR for data caching

### Infrastructure
- Use reverse proxy (Nginx) for load balancing
- Deploy frontend to Vercel/Netlify
- Deploy backend to AWS/GCP/Azure
- Set up CI/CD pipeline
- Implement feature flags

## Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel deploy
```

### Backend (Heroku/Railway/Render)
1. Set up database (PostgreSQL)
2. Set environment variables
3. Run migrations
4. Deploy application

## Project Structure

```
backend/
├── src/
│   ├── config/          # Database & app config
│   ├── middlewares/     # Auth, validation, error handling
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── index.ts         # Entry point
├── prisma/
│   └── schema.prisma    # Database schema
└── README.md

frontend/
├── pages/               # Next.js pages
│   ├── dashboard/       # Protected dashboard pages
│   ├── login.tsx
│   ├── signup.tsx
│   └── index.tsx
├── src/
│   ├── components/      # Reusable components
│   ├── contexts/        # React contexts
│   ├── services/        # API client
│   ├── types/           # TypeScript types
│   └── utils/           # Zod validation schemas
└── README.md
```

## Screenshots

- Landing page with hero section and features
- Login/Signup pages with validation
- Dashboard with task statistics
- Task list with search and filters
- Task creation and editing forms
- Profile management page

## License

ISC

## Author

Mohammad Bilal