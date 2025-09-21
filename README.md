# 📰 ScrollCast

> A modern, full-stack news aggregation and weather platform built with React and Express.js

ScrollCast is a comprehensive web application that allows users to aggregate RSS feeds, manage news sources, check weather information, and provides administrative capabilities for content management. Built with modern technologies for performance, scalability, and user experience.

---
**User View:**
![ScrollCast Demo](https://raw.githubusercontent.com/c2p-cmd/scroll_cast/master/Screenshot%202025-09-21%20at%2015.58.30.png)

---
**Admin View:**
<img width="1510" height="804" alt="Screenshot 2025-09-21 at 16 51 29" src="https://github.com/user-attachments/assets/7e0196e1-f178-4313-8d47-34ad7bf43b9e" />

---

## 🎥 Video Showcase

Watch the complete application demonstration showcasing all features:

[![ScrollCast Video Demo](https://img.youtube.com/vi/UjMPYivrAcI/maxresdefault.jpg)](https://youtu.be/UjMPYivrAcI)

**[🎬 View Full Demo on YouTube](https://youtu.be/UjMPYivrAcI)**

<https://youtu.be/UjMPYivrAcI>

The video demonstrates:

- User authentication and registration flow
- RSS feed browsing and management
- Favorites system functionality
- Weather dashboard with interactive charts
- Admin panel and feed source management
- Real-time data updates and user interface

---

## 📚 Assignment Overview

This project was developed as a comprehensive full-stack web application demonstrating modern software development practices and technologies. The application showcases:

### **Core Learning Objectives Addressed**

- **Full-stack Development**: Complete web application with separate frontend and backend
- **RESTful API Design**: Well-structured API endpoints following REST principles
- **Database Design & ORM**: Relational database modeling with Prisma ORM
- **User Authentication**: Secure JWT-based authentication and authorization
- **Frontend Framework Mastery**: Modern React development with hooks and routing
- **Third-party Integration**: RSS feed parsing and weather data integration
- **Code Quality**: Testing, documentation, and best practices implementation

### **Technical Competencies Demonstrated**

- ✅ **Backend API Development** with Express.js and Node.js
- ✅ **Frontend UI Development** with React and Material-UI
- ✅ **Database Schema Design** and migration management
- ✅ **Authentication & Security** implementation
- ✅ **Real-time Data Processing** with RSS feeds
- ✅ **Data Visualization** using Plotly.js
- ✅ **Code Testing** and quality assurance
- ✅ **Project Documentation** and deployment preparation

### **Industry-Standard Technologies**

The project utilizes cutting-edge technologies and follows modern development practices, including:

- **Bun Runtime**: Next-generation JavaScript runtime for superior performance
- **React 19**: Latest React version with concurrent features
- **Prisma ORM**: Type-safe database access with automated migrations
- **JWT Authentication**: Industry-standard stateless authentication
- **Material-UI**: Production-ready component library
- **Vite**: Lightning-fast development and build tooling

---

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

## � Technical Challenges & Solutions

### Challenge 1: RSS Feed Parsing Reliability

**Problem**: Different RSS feeds have varying structures and may contain malformed XML or missing fields.
**Solution**: Implemented robust error handling with rss-parser library and fallback mechanisms for missing fields. Added validation layers to ensure consistent data structure regardless of source feed quality.

### Challenge 2: Real-time Data Updates

**Problem**: Users expect fresh RSS content without manual refresh, but frequent API calls can impact performance.
**Solution**: Implemented efficient caching strategy with time-based expiration and optimized API calls to balance performance with data freshness. Used conditional rendering to show loading states during updates.

### Challenge 3: Role-based Access Control

**Problem**: Different user types (User vs Admin) need different levels of access to features and data.
**Solution**: Created middleware-based authentication system with JWT tokens and role-based route protection. Implemented both backend API guards and frontend route protection components.

### Challenge 4: Weather Data Integration

**Problem**: Weather APIs have rate limits and varying response formats across different providers.
**Solution**: Designed a unified weather service layer that handles multiple data sources and implements graceful degradation when services are unavailable. Added comprehensive error handling for API failures.

### Challenge 5: Database Performance

**Problem**: Complex queries involving user favorites and feed relationships could slow down response times.
**Solution**: Optimized database queries using Prisma's include/select patterns and implemented proper indexing. Used database connection pooling for better resource management.

## �🛠️ Tech Stack

### Backend

- **Runtime**: Node.js with Bun
  - *Chosen for significantly faster package installation and superior JavaScript/TypeScript execution performance compared to npm/yarn*
- **Framework**: Express.js
  - *Industry-standard, lightweight framework with extensive middleware ecosystem and proven scalability*
- **Database**: SQLite with Prisma ORM
  - *SQLite provides zero-configuration, serverless database perfect for development and small-to-medium applications. Prisma offers type-safe database access, automated migrations, and excellent developer experience*
- **Authentication**: JWT tokens with bcrypt
  - *Stateless authentication ideal for distributed systems, with bcrypt providing industry-standard password hashing security*
- **RSS Processing**: rss-parser
  - *Reliable, lightweight library specifically designed for RSS/Atom feed parsing with excellent error handling*

### Frontend

- **Framework**: React 19
  - *Latest React version with improved performance, better concurrent features, and enhanced developer experience*
- **Build Tool**: Vite
  - *Lightning-fast development server with hot module replacement, optimized production builds, and native ES modules support - significantly faster than traditional bundlers*
- **UI Library**: Material-UI (MUI)
  - *Production-ready React components following Google's Material Design principles, ensuring consistent and accessible user interfaces*
- **HTTP Client**: Axios
  - *Feature-rich HTTP client with request/response interceptors, automatic JSON parsing, and excellent error handling*
- **Routing**: React Router DOM
  - *Declarative routing solution with dynamic route matching and excellent integration with React's component lifecycle*
- **Data Visualization**: Plotly.js
  - *Powerful, interactive charting library with extensive chart types and excellent performance for weather data visualization*

### DevOps & Tools

- **Package Manager**: Bun
  - *Up to 25x faster than npm for package installation, with built-in bundler, test runner, and superior performance*
- **Database Migrations**: Prisma Migrate
  - *Type-safe database migrations with automatic schema generation and version control integration*

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

> **Note**: The SQLite database (`prisma/my.db`) is already included in the repository and comes pre-populated with cities data and sample feed sources. You can start using the application immediately after generating the Prisma client.

```bash
# Generate Prisma client (required)
bun prisma generate

# Database is already set up with migrations applied and data populated
# No additional setup needed - you're ready to go!

# (Optional) If you want to reset and repopulate cities data
bun run backend/utils/populate_cities.js
```

User Details

```json
[
    // admin details
    {
        "email": "admin2@live.com",
        "password": "admin123",
    },
    // user details (non-admin)
    {
        "email": "react_tester@123.co.uk",
        "password": "ReactTester"
    }
]
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

## 🎓 Key Learnings & Reflections

### **Technical Skills Developed**

- **Modern JavaScript & ES6+**: Enhanced understanding of async/await patterns, destructuring, and modular programming
- **Database Design & ORM**: Practical experience with relational database modeling, migrations, and query optimization using Prisma
- **API Security**: Implemented industry-standard authentication patterns including JWT tokens, password hashing, and role-based authorization
- **React Development**: Advanced component architecture, hooks, state management, and routing with React Router
- **Full-stack Integration**: Seamless connection between frontend and backend with proper error handling and data flow

### **Best Practices Applied**

- **Code Organization**: Implemented modular structure with clear separation of concerns between frontend, backend, and database layers
- **Documentation**: Comprehensive API documentation with examples, inline code comments, and project setup instructions
- **Error Handling**: Graceful error handling throughout the application with user-friendly error messages and fallback mechanisms
- **Security**: Input validation, password hashing with bcrypt, JWT token security, and protection against common vulnerabilities
- **Testing**: Backend unit testing for critical functions and API endpoints validation

### **Development Methodology**

- **Iterative Development**: Started with core features (authentication, basic CRUD) then progressively added advanced functionality
- **API-First Approach**: Designed and tested backend endpoints before implementing frontend features
- **User Experience Focus**: Implemented responsive design, loading states, and intuitive navigation for both user and admin interfaces
- **Performance Optimization**: Database query optimization, efficient caching strategies, and minimized API calls

### **Industry Standards & Tools**

- **Modern Runtime**: Leveraged Bun for faster development workflow and improved performance
- **Type Safety**: Utilized Prisma for type-safe database operations and reduced runtime errors
- **Build Optimization**: Implemented Vite for fast development builds and optimized production bundles
- **Component Libraries**: Used Material-UI for consistent, accessible, and production-ready user interfaces

### **Problem-Solving Approach**

- **RSS Feed Challenges**: Developed robust parsing strategies to handle inconsistent feed formats and malformed data
- **Real-time Updates**: Balanced performance with data freshness through intelligent caching and update strategies
- **Authentication Flow**: Created secure, stateless authentication system supporting multiple user roles
- **Data Visualization**: Integrated Plotly.js for interactive weather charts with responsive design

### **Future Enhancement Opportunities**

- **Scalability**: Consider implementing Redis for distributed caching and session management
- **Testing Coverage**: Expand to include frontend component testing and end-to-end testing
- **Deployment**: Add Docker containerization and CI/CD pipeline for automated deployment
- **Performance**: Implement pagination for large datasets and lazy loading for improved user experience
- **Mobile**: Develop React Native mobile application or Progressive Web App (PWA) capabilities

---

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
