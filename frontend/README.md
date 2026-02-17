# PrimeTrade.ai Frontend

Built with Next.js, TypeScript, TailwindCSS, and Zod validation.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Backend API running on port 5000

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
frontend/
├── pages/                    # Page Router pages
│   ├── _app.tsx             # App wrapper with AuthProvider
│   ├── _document.tsx        # HTML document
│   ├── index.tsx            # Landing page
│   ├── login.tsx            # Login page
│   ├── signup.tsx           # Signup page
│   └── dashboard/
│       ├── index.tsx        # Dashboard home
│       ├── profile.tsx      # User profile
│       └── tasks/
│           ├── index.tsx    # Tasks list
│           ├── new.tsx      # Create task
│           └── [id].tsx     # Edit task
├── src/
│   ├── components/          # Reusable components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── DashboardLayout.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx  # Authentication context
│   ├── services/
│   │   └── api.ts           # Axios API client
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   └── utils/
│       └── validation.ts    # Zod schemas
└── app/
    └── globals.css          # Global styles
```

## ✨ Features

### Authentication
- **Signup** with email validation and password strength indicator
- **Login** with remember me functionality
- **JWT token** management with auto-refresh
- **Protected routes** that redirect to login if not authenticated

### Dashboard
- **Overview** with task statistics
- **Recent tasks** display
- **Profile management** - update name and view account info

### Task Management
- **Create** tasks with title, description, status, and priority
- **View all tasks** with search and filter capabilities
- **Edit** tasks with pre-populated forms
- **Delete** tasks with confirmation
- **Search** by title or description
- **Filter** by status (pending, in-progress, completed)
- **Filter** by priority (low, medium, high)

### Validation
- All forms use **Zod** for schema validation
- **React Hook Form** for form management
- **Client-side** validation with error messages
- **Server-side** error handling

### UI/UX
- **Responsive design** for mobile, tablet, and desktop
- **Loading states** for async operations
- **Error handling** with user-friendly messages
- **Success notifications** for completed actions
- **Modern design** with TailwindCSS
- **Smooth animations** and transitions

## 🔐 Authentication Flow

1. User signs up or logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token included in all API requests via Axios interceptor
5. Protected routes check authentication status
6. Auto-redirect to login if token invalid/expired

## 🎨 Design System

### Colors
- Primary: Blue 600
- Secondary: Indigo 600
- Success: Green 600
- Warning: Yellow 500
- Error: Red 600

### Components
- **Button**: Primary, Secondary, Danger, Outline variants
- **Input**: With label and error display
- **Card**: Container for content sections
- **Badge**: For status and priority indicators

## 📝 Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🔧 Configuration

### Next.js Config
- Page Router enabled
- TailwindCSS v4 integration
- TypeScript configuration
- Environment variables support

### API Integration
- Base URL configured via environment variable
- Axios interceptors for authentication
- Error handling for 401 responses
- Auto-redirect on token expiration

## 📱 Pages Overview

### Public Pages
- **/** - Landing page with features and CTAs
- **/login** - User login form
- **/signup** - User registration form

### Protected Pages  
- **/dashboard** - Overview with stats and recent tasks
- **/dashboard/profile** - User profile management
- **/dashboard/tasks** - All tasks with search/filter
- **/dashboard/tasks/new** - Create new task
- **/dashboard/tasks/[id]** - Edit existing task

## 🚀 Deployment

Build for production:
```bash
npm run build
npm start
```

Deploy to Vercel:
```bash
vercel deploy
```

## 📄 Environment Variables

Required variables:
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:5000/api)

## 🛡️ Security

- JWT tokens stored securely in localStorage
- CSRF protection via token-based auth
- Input validation with Zod
- XSS prevention with React's built-in escaping
- Secure API communication

## 📈 Performance

- Code splitting with Next.js
- Lazy loading of components
- Optimized images
- Minimal bundle size
- Fast page transitions

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📞 API Endpoints Used

- `POST /backend/auth/signup` - Register new user
- `POST /backend/auth/login` - Login user
- `GET /backend/users/profile` - Get user profile
- `PUT /backend/users/profile` - Update user profile
- `GET /backend/tasks` - Get all tasks (with filters)
- `POST /backend/tasks` - Create new task
- `GET /backend/tasks/:id` - Get single task
- `PUT /backend/tasks/:id` - Update task
- `DELETE /backend/tasks/:id` - Delete task

## 👨‍💻 Development

Built with modern best practices:
- TypeScript for type safety
- Zod for runtime validation
- React Hook Form for form management
- TailwindCSS for styling
- Axios for HTTP requests
- Context API for state management
