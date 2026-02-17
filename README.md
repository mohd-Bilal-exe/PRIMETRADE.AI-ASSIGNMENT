# PrimeTrade.ai - Task Management Application

A drag and drop task management application built with Next.js, TypeScript, TailwindCSS, Node.js, Express, and Prisma ORM for internship assignment.

##  Project Structure

```
primeTrade.ai/
├── backend/          # Node.js/Express API
└── frontend/         # Next.js application
```

## Tech Stack

### Frontend
- **Framework**: Next.js 
- **Language**: TypeScript
- **Styling**: TailwindCSS
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
- Drag and drop tasks to change status
- Edit existing tasks
- Delete tasks with confirmation
- Filter tasks by status (backlog, in-progress, completed)
- Filter tasks by priority (low, medium, high)

### UI/UX
- Responsive design (mobile, tablet, desktop)
- Loading states and spinners
- Error handling with user-friendly messages
- Success notifications (react-toastify)
- Modern gradient backgrounds
- Smooth animations and transitions using motion and tailwindCSS
- Status and priority badges

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/mohd-Bilal-exe/PRIMETRADE.AI-ASSIGNMENT.git
cd PRIMETRADE.AI-ASSIGNMENT
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
# NEXT_PUBLIC_API_URL=http://localhost:5000/backend

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
NEXT_PUBLIC_API_URL=http://localhost:5000/backend
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
- `POST /backend/auth/checkAuth` - Check authentication
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

### Backend
- Add rate limiting per user/IP

### Frontend
- Implement code splitting and lazy loading
- Implement optimistic UI updates


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

## Note 
Readme generated using AI.