# 📰 ScrollCast

> A modern, full-stack news aggregation and weather platform built with React and Express.js

ScrollCast is a comprehensive web application that allows users to aggregate RSS feeds, manage news sources, check weather information, and provides administrative capabilities for content management. Built with modern technologies for performance, scalability, and user experience.

---
**User View:**
![ScrollCast Demo](https://raw.githubusercontent.com/c2p-cmd/scroll_cast/master/Screenshot%202025-09-21%20at%2015.58.30.png)

---
**Admin View:**
<img width="1510" height="804" alt="Screenshot 2025-09-21 at 16 51 29" src="https://github.com/user-attachments/assets/7e0196e1-f178-4313-8d47-34ad7bf43b9e" />


## ✨ Features

### 🔐 User Management

- **Secure Authentication**: JWT-based login and registration system
- **Role-based Access Control**: User and Admin roles with different permissions
- **Password Security**: bcrypt encryption for secure password storage

### 📡 RSS Feed Management

- **Multi-source Aggregation**: Add and manage multiple RSS feed sources
- **Real-time Parsing**: Live RSS feed content parsing and display
- **Favorites System**: Save and organize preferred news feeds
- **Admin Controls**: Complete CRUD operations for feed sources

### 🌤️ Weather Dashboard

- **Location-based Weather**: Weather information for multiple cities
- **Interactive Charts**: Data visualization using Plotly.js
- **Weather Metrics**: Temperature, humidity, and weather conditions

### 📊 Analytics & Admin

- **Usage Statistics**: Platform analytics and user engagement metrics
- **Feed Performance**: RSS feed performance and popularity tracking
- **User Management**: Administrative user control and monitoring

## 🏗️ Architecture

```
ScrollCast/
├── backend/          # Express.js API Server
│   ├── routes/       # API endpoints
│   ├── utils/        # Database & RSS utilities
│   └── tests/        # Backend testing
├── frontend/         # React Web Application
│   ├── src/          # React components & pages
│   ├── public/       # Static assets
│   └── components/   # Reusable UI components
├── prisma/           # Database schema & migrations
└── generated/        # Prisma client
```

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js with Bun
- **Framework**: Express.js
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT tokens with bcrypt
- **RSS Processing**: rss-parser
- **Testing**: Jest

### Frontend

- **Framework**: React 19
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Data Visualization**: Plotly.js
- **Styling**: Emotion (CSS-in-JS)

### DevOps & Tools

- **Package Manager**: Bun
- **Database Migrations**: Prisma Migrate
- **Code Quality**: ESLint
- **Version Control**: Git

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (latest version)

### Installation

1. **Clone the repository**:

```bash
git clone https://github.com/c2p-cmd/scroll_cast.git
cd scroll_cast
```

2. **Install dependencies**:

```bash
# Install backend dependencies
bun install

# Install frontend dependencies
cd frontend
bun install
cd ..
```

3. **Environment setup**:

```bash
# Create .env file in project root
echo 'DATABASE_URL="file:./prisma/my.db"' > .env
echo 'JWT_SECRET="your-super-secret-jwt-key"' >> .env
# Create another .env in frontend folder
cd frotend
echo 'VITE_BACKEND_URL="http://localhost:4000"' >> .env
```

4. **Database setup**:

```bash
# Generate Prisma client
bun prisma generate

# Run migrations
bun prisma migrate deploy

# (Optional) Populate cities data
bun run backend/utils/populate_cities.js
```

5. **Start the application**:

```bash
# Terminal 1: Start backend (port 4000)
bun run dev

# Terminal 2: Start frontend (port 5173)
cd frontend
bun run dev
```

🎉 **Access the application**:

- Frontend: <http://localhost:5173>
- Backend API: <http://localhost:4000>

## 🔐 API Endpoints

### Authentication Routes

#### POST `/auth/register`

Register a new user.

**Request Body:**

```json
{
    "email": "mark@example.com",
    "password": "securepassword123",
    "name": "MarkChen"
}
```

**Response:**

```json
{
    "message": "User registered successfully",
    "name": "MarkChen",
    "email": "mark@example.com",
    "token": "jwt_token_here"
}
```

---

#### POST `/auth/login`

User Authentication.

**Request Body:**

```json
{
    "email": "mark@example.com",
    "password": "securepassword123",
    "name": "MarkChen"
}
```

**Response:**

```json
{
    "message": "Login successful for User",
    "name": "MarkChen",
    "email": "mark@example.com",
    "token": "jwt_token_here"
}
```

---

#### POST `/auth/login`

Admin Authentication.

**Request Body:**

```json
{
    "email": "admin@example.com",
    "password": "securepassword123",
    "name": "Admin"
}
```

**Response:**

```json
{
    "message": "Login successful for User",
    "name": "Admin",
    "email": "admin@example.com",
    "token": "jwt_token_here"
}
```

---

### Feed Routes

#### GET `/feed/current`

Admin - Get all the RSS feed sources.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
    "feedTitle": "Cricket news from ESPN Cricinfo.com",
    "feedLink": "https://www.espncricinfo.com/",
    "availableKeys": [
        "title",
        "link",
        "pubDate",
        "content",
        "contentSnippet",
        "author",
        "guid",
        "isoDate"
    ],
    "items": [
        {
            "title": "Former Delhi cricketer Mithun Manhas set to take over as BCCI president",
            "link": "https://www.espncricinfo.com/ci/content/story/1503948.html?ex_cid=OTC-RSS",
            "pubDate": "Sun, 21 Sep 2025 08:11:33 GMT",
            "content": "Raghuram Bhat, the former Karnataka and India spinner, is in line to become the BCCI treasurer",
            "contentSnippet": "Raghuram Bhat, the former Karnataka and India spinner, is in line to become the BCCI treasurer",
            "guid": "https://www.espncricinfo.com/ci/content/story/1503948.html",
            "isoDate": "2025-09-21T08:11:33.000Z"
        },
        {
            "title": "'It's about controlling those emotions' in high-stakes CPL 2025 final",
            "link": "https://www.espncricinfo.com/ci/content/story/1503927.html?ex_cid=OTC-RSS",
            "pubDate": "Sun, 21 Sep 2025 03:37:45 GMT",
            "content": "The CPL 2025 final pits the two fiercest rivals in the competition - Guyana Amazon Warriors and Trinbago Knight Riders - against each other",
            "contentSnippet": "The CPL 2025 final pits the two fiercest rivals in the competition - Guyana Amazon Warriors and Trinbago Knight Riders - against each other",
            "guid": "https://www.espncricinfo.com/ci/content/story/1503927.html",
            "isoDate": "2025-09-21T03:37:45.000Z"
        },
    ]
}
```

---

#### POST `/feed/current`

Admin - Post a RSS feeds source.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request:**

```json
{
    "name": "Canada Post",
    "link": "https://nationalpost.com/feed/",
    "properties": ["link", "isoDate", "pubDate", "title", "contentSnippet"]
}
```

**Response:**

```json
{
    "id": 15,
    "name": "Canada Post",
    "link": "https://nationalpost.com/feed/",
    "properties": [
        "link",
        "isoDate",
        "pubDate",
        "title",
        "contentSnippet"
    ],
    "createdAt": "2025-09-21T11:02:41.784Z",
    "updatedAt": "2025-09-21T11:02:41.784Z",
    "createdBy": 4
}
```

---

#### PATCH `/feed/current`

Admin - Update a current RSS feed sources.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
    "id": 5,
    "name": "BBC World",
    "link": "http://feeds.bbci.co.uk/news/world/rss.xml",
    "properties": [
        "author",
        "content",
        "title",
        "isoDate",
        "guid"
    ],
    "createdAt": "2025-08-28T16:46:13.152Z",
    "updatedAt": "2025-09-21T10:47:24.785Z",
    "createdBy": 4
}
```

---

#### DELETE `/feed/current?feed_id=1`

Admin - Delete a current RSS feed sources.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

---

#### GET `/feed/current`

User - Get all current RSS feed sources.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
[
        {
        "id": 2,
        "name": "Hacker News Frontpage",
        "properties": [
            "content",
            "contentSnippet",
            "author",
            "title",
            "isoDate",
            "guid"
        ],
        "createdAt": "2025-08-28T16:19:57.048Z",
        "favourite": true
    },
]
```

---

#### GET `/feed/view?id=1`

User - View a RSS feeds sources.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
[
    {
        "link": "https://www.ign.com/articles/best-deals-for-september-20-2025",
        "isoDate": "2025-09-20T18:39:29.000Z",
        "pubDate": "Sat, 20 Sep 2025 18:39:29 +0000",
        "title": "The Best Deals Today: AirPods Pro 3, Donkey Kong Bananza, and More"
    },
]
```

---

#### GET `/feed/favourite`

User/Admin - Get all favorite RSS feeds sources.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
[
    {
        "id": 2,
        "name": "Hacker News Frontpage",
        "properties": [
            "content",
            "contentSnippet",
            "author",
            "title",
            "isoDate",
            "guid"
        ],
        "createdAt": "2025-08-28T16:19:57.048Z",
        "updatedAt": "2025-08-28T16:42:45.016Z"
    },
]
```

---

#### POST `/feed/favourite`

User/Admin - Add a favorite RSS feeds sources.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
    "message": "Feed added to favourites",
    "user": {
        "id": 6,
        "name": "TesterUser35",
        "email": "tester_user@student-housing.com",
        "faker": false,
        "role": "User",
        "createdAt": "2025-08-28T19:41:17.893Z",
        "updatedAt": "2025-08-28T19:41:17.893Z"
    }
}
```

---

#### DELETE `/feed/favourite`

User/Admin - Delete a favorite RSS feeds sources.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request:**

```json
{
    "feed_id": 2
}
```

---

### Weather Routes

#### GET `/weather?cityName=Mumbai`

Get weather information for a specific city.

**Response:**

```json
{
    "feedTitle": "Mumbai, IN - AccuWeather.com Forecast",
    "feedLink": "https://www.accuweather.com/get/weather?page=extended&locationid=204842",
    "availableKeys": [
        "title",
        "link",
        "pubDate",
        "content",
        "contentSnippet",
        "author",
        "guid",
        "isoDate"
    ],
    "items": [
        {
            "title": "Currently: Mostly Cloudy: 82F",
            "link": "https://www.accuweather.com/get/weather?locationid=204842",
            "pubDate": "Sun, 21 Sep 2025 11:10:31 GMT",
            "content": "Currently in Mumbai, IN: 82 °F and Mostly Cloudy\r\n\t\t\t\t<img src=\"https://vortex.accuweather.com/phoenix2/images/common/icons/06_31x31.gif\">\r\n\t\t\t\t",
            "contentSnippet": "Currently in Mumbai, IN: 82 °F and Mostly Cloudy",
            "guid": "https://www.accuweather.com",
            "isoDate": "2025-09-21T11:10:31.000Z"
        },
    ]
}
```

---

#### GET `/weather/cities`

Get a list of all the cities

**Response:**

```json
[
    {
        "name": "Aachen, DE",
        "location": "EUR|DE|GM011|AACHEN",
        "country": "Germany"
    },
    {
        "name": "Aalborg, DK",
        "location": "EUR|DK|DA007|AALBORG",
        "country": "Denmark"
    },
    {
        "name": "Aalesund, NO",
        "location": "EUR|NO|NO007|AALESUND",
        "country": "Norway"
    },
]
```

---

## 🗄️ Database Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  faker     Boolean  @default(false)
  role      Role     @default(User)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  favouriteFeeds FeedSource[] @relation("UserFavourites")
}

model FeedSource {
  id         Int      @id @default(autoincrement())
  name       String
  link       String   @unique
  properties Json     @default("[]")
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  favouritedBy User[] @relation("UserFavourites")
  createdBy    Int
}

model City {
  name     String @id
  location String
  country  String
}

enum Role {
  User
  Admin
}
```

## 📱 Frontend Features

### 🔑 Authentication Pages

- **Login**: Email/username and password authentication
- **Register**: New user registration with validation

### 🏠 User Dashboard

- **Home**: RSS feed browsing and favorites management
- **Weather**: Location-based weather with interactive charts

### ⚙️ Admin Panel

- **Dashboard**: Feed source management (CRUD operations)
- **Analytics**: Platform statistics and user engagement metrics

### 🧩 Component Architecture

- **ProtectedRoute**: Authentication-required route wrapper
- **AdminProtectedRoute**: Admin-only route protection
- **NavigationBar**: Dynamic navigation based on user role
- **Material-UI Integration**: Consistent, responsive design system

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt encryption for user passwords
- **Role-based Authorization**: Different access levels for users and admins
- **CORS Protection**: Cross-origin request security
- **Input Validation**: Request validation and sanitization

## 🧪 Testing

### Backend Testing

```bash
# Run all tests
bun test

# Run specific test file
bun test backend/tests/auth.test.js
```

### Frontend Development

```bash
cd frontend

# Run development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Lint code
bun run lint
```

## 📦 Project Scripts

### Root Level Scripts

```bash
bun run dev          # Start backend development server
```

### Frontend Scripts

```bash
cd frontend
bun run dev          # Start frontend development server
bun run build        # Build for production
bun run preview      # Preview production build
bun run lint         # Run ESLint
```

### Database Scripts

```bash
bun prisma generate  # Generate Prisma client
bun prisma migrate dev --name <migration_name>  # Create and apply migration
bun prisma studio    # Open Prisma Studio
```

## 🌍 Environment Variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="file:./prisma/my.db"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-here"

# Server (optional)
PORT=4000
```

## 📁 Project Structure

```
scroll_cast/
├── 📁 backend/
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Server entry point
│   ├── middleware.js          # JWT authentication middleware
│   ├── 📁 routes/
│   │   ├── 📁 auth/           # Authentication routes
│   │   ├── 📁 feed/           # Feed management routes
│   │   └── 📁 weather/        # Weather endpoints
│   ├── 📁 utils/
│   │   ├── db.js              # Prisma database client
│   │   ├── rss.js             # RSS parsing utilities
│   │   └── populate_cities.js # Database seeding
│   └── 📁 tests/              # Backend test files
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── App.jsx            # Main application component
│   │   ├── 📁 pages/          # Application pages
│   │   ├── 📁 components/     # Reusable components
│   │   ├── 📁 api/            # API configuration
│   │   └── 📁 utils/          # Utility functions
│   ├── 📁 public/             # Static assets
│   ├── index.html             # HTML template
│   ├── vite.config.js         # Vite configuration
│   └── package.json           # Frontend dependencies
├── 📁 prisma/
│   ├── schema.prisma          # Database schema
│   ├── my.db                  # SQLite database
│   └── 📁 migrations/         # Database migrations
├── 📁 generated/              # Generated Prisma client
├── package.json               # Root dependencies
├── cities.txt                 # City data for seeding
└── README.md                  # This file
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Express.js** team for the robust backend framework
- **React** team for the excellent frontend library
- **Material-UI** for the comprehensive component library
- **Prisma** team for the excellent ORM and database toolkit
- **Vite** team for the fast build tool
- **Bun** team for the fast JavaScript runtime
- Open source community for various libraries and tools

---

<div align="center">

**Built with ❤️ by [Sharan Thakur](https://github.com/c2p-cmd)**

[⭐ Star this repo](https://github.com/c2p-cmd/scroll_cast) | [🐛 Report Bug](https://github.com/c2p-cmd/scroll_cast/issues) | [💡 Request Feature](https://github.com/c2p-cmd/scroll_cast/issues)

</div>
