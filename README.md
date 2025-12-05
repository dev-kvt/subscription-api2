# SubAPI2

A Node.js API for managing subscriptions, users, and authentication.

## Description

This is a RESTful API built with Express.js and MongoDB for handling user authentication, user management, and subscription services. The API supports CRUD operations for users and subscriptions, along with authentication endpoints.

## Features

- User authentication (sign-up, sign-in, sign-out)
- User CRUD operations
- Subscription management (create, read, update, delete, cancel, renewals)

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see below)
4. Run in development: `npm run dev`
5. Run in production: `npm start`

## Environment Variables

Create `.env.dev.local` for development and `.env.prod.local` for production with the following variables:

- `PORT`: Server port (e.g., 3000)
- `NODE_ENV`: Environment (dev or prod)
- `DB_URI`: MongoDB connection string

## API Endpoints

### Authentication

- `POST /api/v1/auth/sign-up` - User registration
- `POST /api/v1/auth/sign-in` - User login
- `POST /api/v1/auth/sign-out` - User logout

### Users

- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `POST /api/v1/users` - Create new user
- `PUT /api/v1/users/:id` - Update user by ID
- `DELETE /api/v1/users/:id` - Delete user by ID

### Subscriptions

- `GET /api/v1/subscriptions` - Get all subscriptions
- `GET /api/v1/subscriptions/:id` - Get subscription details by ID
- `POST /api/v1/subscriptions` - Create new subscription
- `PUT /api/v1/subscriptions/:id` - Update subscription by ID
- `DELETE /api/v1/subscriptions` - Delete subscriptions
- `GET /api/v1/subscriptions/user/:id` - Get all subscriptions for a user
- `GET /api/v1/subscriptions/:id/cancel` - Cancel subscription by ID
- `GET /api/v1/subscriptions/upcoming-renewals` - Get upcoming renewals

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs for password hashing
- Morgan for logging
- Nodemon for development

## Project Structure

- `app.js` - Main application file
- `config/env.js` - Environment configuration
- `db/mongodb.js` - Database connection
- `routes/` - API route handlers
  - `auth.route.js` - Authentication routes
  - `user.route.js` - User management routes
  - `subscription.route.js` - Subscription routes

## License

This project is private.