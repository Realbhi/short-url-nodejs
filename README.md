# Short URL - URL Shortener Service

A  URL shortening service built with Node.js, Express, MongoDB, and EJS. Features JWT-based authentication, and URL analytics.

## Features

- **URL Shortening**: Convert long URLs into short, shareable links
- **User Authentication**: Secure JWT-based authentication system
- **Role-Based Access Control**: Support for NORMAL and ADMIN user roles
- **URL Analytics**: Track click counts and visit history for each shortened URL
- **Basic User Dashboard**: View and manage all your shortened URLs
- **Basic Admin Panel**: Administrators can view all URLs in the system

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or connection string)
- [npm](https://www.npmjs.com/)
  
##  Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Realbhi/short-url-nodejs.git
   cd short-url-nodejs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   Create a `.env` file in the root directory:
   ```env
   MONGODB=mongodb://127.0.0.1:27017/short-url
   JWT_SECRET=your-secret-key-here
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system:
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # Or run directly
   mongod
   ```

5. **Start the server**
   ```bash
   npm start
   ```

   The server will start on `http://localhost:8001`

## 📁 Project Structure

```
short-url-nodejs/
├── controllers/          # Request handlers
│   ├── url.js           # URL-related operations
│   └── user.js          # User authentication operations
├── middlewares/         # Express middlewares
│   └── auth.js          # Authentication & authorization middleware
├── models/              # MongoDB schemas
│   ├── url.js           # URL model
│   └── user.js          # User model
├── routes/              # Route definitions
│   ├── staticRouter.js  # Static page routes
│   ├── url.js           # URL API routes
│   └── user.js          # User authentication routes
├── service/             # Business logic services
│   └── auth.js          # JWT token management
├── views/               # EJS templates
│   ├── home.ejs         # Dashboard page
│   ├── login.ejs        # Login page
│   └── signup.ejs       # Signup page
├── connect.js           # MongoDB connection
├── index.js             # Application entry point
└── package.json         # Project dependencies
```

## Authentication & Authorization

### User Roles

- **NORMAL**: Can create and manage their own shortened URLs
- **ADMIN**: Can view all URLs in the system and manage their own

### Authentication Flow

1. **Signup**: Create a new account at `/signup`
2. **Login**: Authenticate at `/login` (receives JWT token stored in cookie)
3. **Protected Routes**: Access requires valid JWT token

### API Endpoints

#### Public Routes
- `GET /` - Home page (redirects to login if not authenticated)
- `GET /signup` - Signup page
- `GET /login` - Login page
- `POST /user` - Create new user account
- `POST /user/login` - User login
- `GET /url/:shortId` - Redirect to original URL

#### Protected Routes (NORMAL users)
- `POST /url` - Create new short URL
- `GET /url/analytics/:shortId` - Get URL analytics

#### Admin Routes
- `GET /admin/urls` - View all URLs (ADMIN only)

## Usage

### Creating a Short URL

1. Sign up or log in to your account
2. Enter a long URL in the form on the home page
3. Click "Generate" to create a short URL
4. Copy and share the generated short URL (e.g., `http://localhost:8001/url/abc123`)

### Viewing Analytics

Access analytics for any of your shortened URLs:
```
GET /url/analytics/:shortId
```

Response includes:
- Total click count
- Visit history with timestamps

### Admin Access

Admins can view all URLs in the system at:
```
GET /admin/urls
```

## Configuration

### MongoDB Connection

By default, the app connects to:
```
mongodb://127.0.0.1:27017/short-url
```

To use a different database, set the `MONGODB` environment variable:
```bash
export MONGODB=mongodb://your-connection-string
```

### JWT Secret

The JWT secret is defined in `service/auth.js`. For production, use an environment variable:
```javascript
const jwt_secret = process.env.JWT_SECRET || "your-secret-key";
```

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required),
  role: String (default: "NORMAL"),
  timestamps: true
}
```

### URL Model
```javascript
{
  shortId: String (required, unique),
  redirectURL: String (required),
  visitHistory: [{
    timestamp: Number
  }],
  createdBy: ObjectId (ref: "user"),
  timestamps: true
}
```

## Security Features

- JWT token-based authentication
- Role-based access control
- Cookie-based token storage
- Input validation

## Author

**Realbhi**

- GitHub: [@Realbhi](https://github.com/Realbhi)

## Acknowledgments

- Built with [Express.js](https://expressjs.com/)
- Database: [MongoDB](https://www.mongodb.com/)
- Template Engine: [EJS](https://ejs.co/)

---

If you found this project helpful, please give it a star!
