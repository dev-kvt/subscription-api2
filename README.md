# SubAPI2

A RESTful API for managing user authentication, user profiles, and subscription services built with Node.js, Express.js, and MongoDB.

## Description

SubAPI2 is a comprehensive backend API designed to handle user authentication, profile management, and subscription lifecycle operations. It provides secure endpoints for user registration, login, and logout, as well as full CRUD operations for user data and subscriptions. The API incorporates security measures including rate limiting, bot detection, and JWT-based authentication.

## Features

- **User Authentication**: Secure sign-up, sign-in, and sign-out with JWT tokens
- **User Management**: Complete CRUD operations for user profiles
- **Subscription Management**: Create, read, update, delete, and cancel subscriptions with automatic renewal tracking
- **Security**: Rate limiting, bot detection, and input validation
- **Error Handling**: Centralized error management with appropriate HTTP status codes
- **Database Integration**: MongoDB with Mongoose ODM for data persistence

## Technologies Used

- **Runtime**: Node.js with ES modules
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: bcryptjs for password hashing, Arcjet for rate limiting and bot detection
- **Development**: Nodemon for hot reloading, Morgan for HTTP request logging
- **Validation**: Mongoose schema validation

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd subapi2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see Environment Setup section)

4. Start the development server:
   ```bash
   npm run dev
   ```

5. For production deployment:
   ```bash
   npm start
   ```

## Environment Setup

Create environment files in the root directory:

### Development (.env.dev.local)
```
PORT=3000
NODE_ENV=dev
DB_URI=mongodb://localhost:27017/subapi2_dev
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES=7d
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

### Production (.env.prod.local)
```
PORT=3000
NODE_ENV=prod
DB_URI=mongodb://your_production_mongodb_uri
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRES=7d
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=production
```

**Note**: Replace placeholder values with actual secure keys. Never commit environment files to version control.

## Usage

The API runs on the specified PORT (default: 3000). All endpoints are prefixed with `/api/v1/`.

### Authentication Flow

1. Register a new user via `POST /api/v1/auth/sign-up`
2. Login to receive a JWT token via `POST /api/v1/auth/sign-in`
3. Include the token in Authorization header for protected routes: `Bearer <token>`

## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/sign-up` | Register a new user | No |
| POST | `/api/v1/auth/sign-in` | User login | No |
| POST | `/api/v1/auth/sign-out` | User logout | Yes |

### User Management Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/users` | Retrieve all users | No |
| GET | `/api/v1/users/:id` | Get user by ID | Yes |
| POST | `/api/v1/users` | Create new user | No |
| PUT | `/api/v1/users/:id` | Update user by ID | No |
| DELETE | `/api/v1/users/:id` | Delete user by ID | No |

### Subscription Management Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/subscriptions` | Get all subscriptions | No |
| GET | `/api/v1/subscriptions/:id` | Get subscription by ID | No |
| POST | `/api/v1/subscriptions` | Create new subscription | Yes |
| PUT | `/api/v1/subscriptions/:id` | Update subscription | No |
| DELETE | `/api/v1/subscriptions` | Delete subscriptions | No |
| GET | `/api/v1/subscriptions/user/:id` | Get user's subscriptions | Yes |
| GET | `/api/v1/subscriptions/:id/cancel` | Cancel subscription | No |
| GET | `/api/v1/subscriptions/upcoming-renewals` | Get upcoming renewals | No |

**Note**: Some endpoints are currently implemented as placeholders and return static responses.

## Request/Response Examples

### User Registration
```bash
POST /api/v1/auth/sign-up
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

Response:
```json
{
  "message": "User created successfully",
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### Create Subscription
```bash
POST /api/v1/subscriptions
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Netflix Premium",
  "price": 15.99,
  "currency": "USD",
  "frequency": "monthly",
  "category": "entertainment",
  "paymentMethod": "Credit Card",
  "startDate": "2024-01-01T00:00:00.000Z"
}
```

## Project Structure

```
subapi2/
├── app.js                          # Main application entry point
├── package.json                    # Dependencies and scripts
├── config/
│   ├── env.js                      # Environment configuration
│   └── arcjet.js                   # Security configuration
├── controllers/
│   ├── auth.controller.js          # Authentication logic
│   ├── user.controller.js          # User management logic
│   └── subscription.controller.js  # Subscription management logic
├── db/
│   └── monogodb.js                 # Database connection (note: filename has typo)
├── middleware/
│   ├── auth.middleware.js          # JWT authentication middleware
│   ├── arcjet.middleware.js        # Security middleware
│   └── error.middleware.js         # Error handling middleware
├── models/
│   ├── user.model.js               # User data model
│   └── subscription.model.js       # Subscription data model
├── routes/
│   ├── auth.route.js               # Authentication routes
│   ├── user.route.js               # User routes
│   └── subscription.route.js       # Subscription routes
└── README.md                       # Project documentation
```

## Error Handling

The API uses centralized error handling with appropriate HTTP status codes:

- `400`: Bad Request (validation errors)
- `401`: Unauthorized (invalid/missing authentication)
- `403`: Forbidden (access denied)
- `404`: Not Found (resource not found)
- `409`: Conflict (duplicate resource)
- `429`: Too Many Requests (rate limited)
- `500`: Internal Server Error

## Security Features

- **JWT Authentication**: Stateless authentication with configurable expiration
- **Password Hashing**: bcryptjs with salt rounds for secure password storage
- **Rate Limiting**: Token bucket algorithm to prevent abuse
- **Bot Detection**: Arcjet integration for automated bot protection
- **Input Validation**: Mongoose schema validation and sanitization
- **CORS**: Configurable cross-origin resource sharing

## Development

### Available Scripts

- `npm run dev`: Start development server with hot reloading
- `npm start`: Start production server

### Code Style

The project uses ES6+ syntax with async/await patterns. All code follows standard JavaScript conventions with proper error handling and logging.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is private and proprietary.