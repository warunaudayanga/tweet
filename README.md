# Tweet Backend API

A simple backend application for managing users and tweets with JWT authentication.

## Tech Stack

- NestJS with TypeScript
- PostgreSQL with TypeORM
- JWT for authentication
- Mailtrap for email services
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

Note: Database migrations will run automatically when the application starts. Docker uses the `docker.env` file for environment configuration.

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up your environment variables using the `.env` file in the root directory

3. Run database migrations:
```bash
npm run migration:run
```

4. Run the application:
```bash
npm run start:dev
```

## Environment Configuration

The project uses different environment files for different deployment scenarios:

- **`.env`** - Used for local development. Contains configuration for localhost services (database, Redis, etc.)
- **`docker.env`** - Used automatically by Docker Compose. Contains configuration for containerized services
- **`example.env`** - Template file included in the repository showing all required environment variables with placeholder values. Use this as a reference when setting up your environment

### For Local Development
Use the `.env` file in the root directory. This file is already configured with localhost settings for database, Redis, and other services.

### For Docker Deployment
The `docker.env` file is automatically used by Docker Compose and contains the appropriate service hostnames for the containerized environment.

When using Docker, set these environment variables as follows since the database and Redis are also running in Docker containers:

```bash
#Redis
REDIS_URL=redis://redis:6379
REDIS_PREFIX=tweet
REDIS_CACHE_TTL=7890000

#Database
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=tweets
DATABASE_PASSWORD=root
DATABASE_NAME=tweets
DATABASE_SCHEMA=public
DATABASE_SYNC=false
DATABASE_LOGGING=false

#Microservices
MS_GATEWAY_HOST=tweet-gateway
MS_GATEWAY_PORT=3000
MS_USER_HOST=user-ms
MS_USER_PORT=3001
MS_TWEET_HOST=tweet-ms
MS_TWEET_PORT=3002
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

## Email Configuration

The application uses **Mailtrap** for email services, including:
- Email verification for new user registrations
- Password reset functionality

Mailtrap is configured via environment variables in the `.env` file:
- `SMTP_HOST` - Mailtrap SMTP server
- `SMTP_USER` - Your Mailtrap username
- `SMTP_PASS` - Your Mailtrap password

For development and testing, emails are captured in your Mailtrap inbox instead of being sent to real email addresses.

### Demo Mailtrap Access

For demo purposes, the application is configured with the following Mailtrap test inbox:

- **Inbox URL**: https://mailtrap.io/inboxes/3943134/messages
- **Login Email**: payeho6890@nicext.com
- **Password**: 6js!SUZ.x?K2PV7

You can use these credentials to access the Mailtrap inbox and view emails sent by the application during testing (registration confirmations, password resets, etc.).
