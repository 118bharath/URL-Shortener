# URL Shortener

A URL shortening service built with Node.js, Express, and MongoDB. Users can create shortened links, track click analytics, and manage their URLs through a web interface.

## Features

- User authentication with JWT tokens
- Create and manage shortened URLs
- Click tracking and basic analytics
- Role-based access control (User/Admin)
- Server-side rendered views with EJS
- Docker support for containerized deployment

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT, bcrypt
- **Templating:** EJS
- **Styling:** Tailwind CSS
- **Containerization:** Docker

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB instance (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/118bharath/URL-Shortener.git
cd URL-Shortener
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory

```
MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
PORT=3001
```

4. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:3001`

### Docker

Build and run using Docker:

```bash
docker build -t url-shortener .
docker run -p 3001:3001 --env-file .env url-shortener
```

## API Reference

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user/` | Register a new user |
| POST | `/user/login` | Login and receive JWT token |
| GET | `/user/logout` | Logout and clear session |

### URL Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/url/` | Create a shortened URL | Authenticated |
| GET | `/url/:shortId` | Redirect to original URL | Public |
| GET | `/url/analytics/:shortId` | Get click analytics | Authenticated |
| DELETE | `/url/:id` | Delete a URL | Owner or Admin |

### Pages

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Home page with user's URLs | Authenticated |
| GET | `/signup` | Registration page | Public |
| GET | `/login` | Login page | Public |
| GET | `/admin/urls` | Admin dashboard | Admin only |

## Project Structure

```
├── controllers/       # Route handlers
├── middlewares/       # Auth and validation middleware
├── models/           # Mongoose schemas
├── routes/           # Express route definitions
├── service/          # Business logic (auth, etc.)
├── views/            # EJS templates
├── utils/            # Helper functions
├── index.js          # Application entry point
└── connection.js     # Database connection
```

## License

MIT