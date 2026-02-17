# PrimeTrade.ai Backend API

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Validation**: express-validator

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── config.ts    # Environment config
│   │   └── database.ts  # Prisma database connection
│   ├── middlewares/
│   │   ├── auth.middleware.ts       # JWT authentication
│   │   ├── error.middleware.ts      # Global error handling
│   │   └── validate.middleware.ts   # Input validation
│   ├── routes/
│   │   ├── auth.routes.ts    # Authentication endpoints
│   │   ├── user.routes.ts    # User profile endpoints
│   │   └── task.routes.ts    # Task CRUD endpoints
│   ├── services/
│   │   ├── auth.service.ts   # Auth business logic
│   │   ├── token.service.ts  # JWT operations
│   │   ├── user.service.ts   # User operations
│   │   └── task.service.ts   # Task operations
│   └── index.ts         # Entry point
├── prisma/
│   └── schema.prisma    # Database schema
├── .env                 # Environment variables (not in git)
├── .env.example         # Environment template
├── package.json
└── tsconfig.json

```

##  Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Update the variables with your configuration:
     ```env
     DATABASE_URL="postgresql://username:password@localhost:5432/primetrade_db"
     PORT=5000
     JWT_SECRET=your_super_secret_key_here
     JWT_EXPIRES_IN=7d
     FRONTEND_URL=http://localhost:3000
     ```

3. **Set up database**
   ```bash
   # Generate Prisma Client
   npm run prisma:generate

   # Run database migrations
   npm run prisma:migrate

   # (Optional) Open Prisma Studio to view/edit data
   npm run prisma:studio
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The API will be running at `http://localhost:5000`

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/backend/auth/signup` | Register new user | No |
| POST | `/backend/auth/login` | Login user | No |

### User Profile
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/backend/users/profile` | Get current user profile | Yes |
| PUT | `/backend/users/profile` | Update user profile | Yes |

### Tasks
| Method | Endpoint | Description | Auth Required |
|---|----------|-------------|---------------|
| POST | `/backend/tasks` | Create new task | Yes |
| GET | `/backend/tasks` | Get all tasks (with filters) | Yes |
| GET | `/backend/tasks/:id` | Get single task | Yes |
| PUT | `/backend/tasks/:id` | Update task | Yes |
| DELETE | `/backend/tasks/:id` | Delete task | Yes |

### Query Parameters for GET /backend/tasks
- `status`: Filter by status (pending, in-progress, completed)
- `priority`: Filter by priority (low, medium, high)
- `search`: Search in title and description
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Request/Response Examples

### Signup
**POST** `/backend/auth/signup`
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

### Create Task
**POST** `/backend/tasks`  
Headers: `Authorization: Bearer <token>`
```json
{
  "title": "Complete frontend",
  "description": "Build the Next.js frontend",
  "status": "pending",
  "priority": "high"
}
```

### Get Tasks with Filters
**GET** `/backend/tasks?status=pending&priority=high&page=1&limit=10`

## Database Schema

### User Model
- id (UUID)
- email (unique)
- password (hashed)
- name
- createdAt
- updatedAt

### Task Model
- id (UUID)
- title
- description (optional)
- status (pending, in-progress, completed)
- priority (low, medium, high)
- userId (foreign key)
- createdAt
- updatedAt

## Development Scripts

```bash
# Run development server with auto-reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Generate Prisma Client
npm run prisma:generate

# Create and apply database migrations
npm run prisma:migrate

# Open Prisma Studio
npm run prisma:studio
```

## Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token authentication
- ✅ Input validation and sanitization
- ✅ CORS protection
- ✅ SQL injection prevention (Prisma ORM)
- ✅ Error handling middleware
- ✅ Authorization checks (users can only access own data)

## Scalability Recommendations

### For Production Deployment:

1. **Database**
   - Use connection pooling
   - Add database indexes on frequently queried fields
   - Implement database replication for read-heavy loads

2. **Caching**
   - Add Redis for session management
   - Cache frequently accessed data
   - Implement API response caching

3. **Security**
   - Use HTTPS
   - Implement rate limiting
   - Add refresh token rotation
   - Use secure environment variable management (e.g., AWS Secrets Manager)
   - Add helmet.js for security headers

4. **Infrastructure**
   - Containerize with Docker
   - Use reverse proxy (Nginx)
   - Implement horizontal scaling
   - Add monitoring and logging (Winston, Sentry)
   - Set up CI/CD pipeline

5. **Performance**
   - Add compression middleware
   - Implement pagination for all list endpoints
   - Use database query optimization
   - Add request/response compression

## Error Handling

All errors return a consistent format:
```json
{
  "success": false,
  "message": "Error description"
}
```

Status codes used:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## License

ISC

## Author

Mohammad Bilal
