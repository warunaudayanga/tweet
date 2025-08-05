# Tweet Backend API

A simple backend application for managing users and tweets with JWT authentication.

## Tech Stack

- NestJS with TypeScript
- PostgreSQL with TypeORM
- JWT for authentication
- Docker for deployment

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js (for local development)

### Running with Docker

1. Clone the repository
2. Run the application:
```bash
docker-compose up
```

The API will be available at `http://localhost:3000`

Note: Database migrations will run automatically when the application starts.

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up your environment variables (copy from `.env` file)

3. Run database migrations:
```bash
npm run migration:run
```

4. Run the application:
```bash
npm run start:dev
```

## API Endpoints

### Authentication (Public)
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Authentication (Protected)
- `GET /auth/me` - Get current user info
- `POST /auth/refresh` - Refresh JWT token
- `POST /auth/logout` - Logout user

### Users (Protected)
- `GET /user/:id` - Get user profile
- `PUT /user/:id` - Update user profile (own profile only)
- `DELETE /user/:id` - Delete user profile (own profile only)

### Tweets (Protected)
- `GET /tweet` - Get all tweets with pagination
- `GET /tweet/:id` - Get specific tweet
- `POST /tweet` - Create new tweet
- `PUT /tweet/:id` - Update tweet (owner only)
- `DELETE /tweet/:id` - Delete tweet (owner only)
- `POST /tweet/:id/like` - Like/unlike a tweet
- `POST /tweet/:id/reply` - Reply to a tweet
- `GET /tweet/:id/replies` - Get tweet replies

## Features

- User registration and authentication
- JWT-based security
- Tweet CRUD operations
- User profile management
- Tweet likes and replies
- Pagination support
- Owner-only access control for updates/deletes

## Database

The application uses PostgreSQL with TypeORM for data persistence. Database schema is managed through TypeORM migrations.

### Migration Commands

- `npm run migration:run` - Run pending migrations
- `npm run migration:revert` - Revert the last migration
- `npm run migration:generate --name=MigrationName` - Generate a new migration based on entity changes
- `npm run migration:create --name=MigrationName` - Create a blank migration file

### Database Schema

The database includes the following tables:
- **users** - User accounts with authentication details
- **tweets** - Tweet content and metadata
- **tweet-likes** - User likes on tweets
- **tweet-replies** - Replies to tweets

All tables include standard fields: id (UUID), created_at, updated_at, and deleted_at for soft deletes.
