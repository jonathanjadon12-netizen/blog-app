# Blog App

## Overview

Blog App is a full-stack web application developed to allow users to create, manage, and read blog articles. The application follows a client-server architecture with a React frontend and a Node.js + Express backend. Users can register, log in, create articles, edit content, and manage blog-related activities.

The project demonstrates full-stack development concepts such as authentication, REST APIs, database integration, role-based access, and responsive user interfaces.

---

## Project Structure

```text
blog-app-main/
│
├── backend/
│   ├── APIs/
│   ├── config/
│   ├── middlewares/
│   ├── models/
│   ├── services/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── assets/
│   └── App.jsx
```

---

## Main Features

### User Authentication

* User registration and login functionality
* Secure authentication system
* Token verification using middleware

### Article Management

* Create blog articles
* Edit existing articles
* View articles
* Manage author-specific posts

### Role-Based Access

* Admin access
* Author access
* User access

### Image Upload Support

* Cloudinary integration for image handling
* File upload management using Multer

### Responsive Interface

* User-friendly frontend design
* Component-based structure using React

---

## Technologies Used

### Frontend

* React.js
* Vite
* JavaScript
* HTML
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Additional Libraries

* JWT Authentication
* Multer
* Cloudinary
* Middleware functions

---

# Backend README.md

## Backend Overview

The backend handles API creation, database operations, authentication, and server-side logic. It provides endpoints for users, authors, and administrators.

### Folder Structure

```text
backend/
│
├── APIs/
├── config/
├── middlewares/
├── models/
├── services/
├── server.js
└── package.json
```

### APIs Folder

Contains route files:

* AdminAPI.js
* AuthorAPI.js
* UserAPI.js
* CommonAPI.js

These APIs manage requests and responses for different modules.

### Models Folder

Contains MongoDB schema definitions.

Files:

* UserModel.js
* ArticleModel.js

### Middlewares

Middleware files handle:

* Token verification
* Authorization checking
* User role validation

Files:

* verifyToken.js
* checkAuthor.js

### Configuration

Contains setup files for:

* Cloudinary
* Multer
* Upload configuration

### Running Backend

Install dependencies:

```bash
npm install
```

Start server:

```bash
npm start
```

Development mode:

```bash
npm run dev
```

---

# Frontend README.md

## Frontend Overview

The frontend is developed using React and Vite. It provides the user interface for users to interact with blog articles and application features.

### Folder Structure

```text
frontend/
│
├── src/
├── components/
├── assets/
├── App.jsx
└── package.json
```

### Components Included

Main components include:

* Header
* Footer
* Home
* ArticleByID
* AuthorProfile
* AuthorArticles
* EditArticleForm
* ErrorBoundary

These components are responsible for rendering different sections of the application.

### Frontend Features

* Navigation system
* Blog article display
* Article editing
* Author profile handling
* Error handling
* Responsive layouts

### Running Frontend

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open browser:

```text
http://localhost:5173
```

---

## Installation Steps

1. Clone the repository

```bash
git clone repository-link
```

2. Open backend folder:

```bash
cd backend
npm install
```

3. Open frontend folder:

```bash
cd frontend
npm install
```

4. Start backend server

```bash
npm start
```

5. Start frontend server

```bash
npm run dev
```

---

## Learning Outcomes

This project helps in understanding:

* Full-stack development workflow
* API creation and routing
* Authentication systems
* MongoDB integration
* React component architecture
* Middleware implementation
* File upload functionality

---

## Purpose

The project is developed for learning and practicing modern web development concepts using the MERN stack architecture. It combines frontend and backend technologies to build a complete blogging platform.
