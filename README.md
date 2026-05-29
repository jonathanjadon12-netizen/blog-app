# Blog Application

## Overview

The Blog Application is a full-stack blogging platform. It allows users to read articles, register accounts, sign in, write posts, edit content, and upload header images.

The application is built using a React frontend and a Node.js and Express backend. It provides a complete user experience with secure authentication, role-based access levels, and a responsive interface that looks beautiful on desktop and mobile screens.

---

## Directory Structure

The project is divided into two primary directories.

* backend: This folder contains the server-side application logic, database models, route handlers, and utility configurations.
* frontend: This folder contains the user interface components, style declarations, and browser-side routes.

---

## Technical Features

### User Authentication
* Register and log in options for authors and standard readers.
* Security layers using JSON Web Token authentication.
* Session verification using Express middleware.

### Post Management
* Standard readers can browse and read published articles.
* Authors can write and upload new articles.
* Authors can edit or update their existing articles.
* Authors can view their own profile and their direct list of written articles.

### Role-Based Access Control
* Admin role for administrative tasks.
* Author role for creating and editing posts.
* User role for reading posts.

### Media Upload
* Integration with Cloudinary for handling media uploads.
* File handling configured via Multer on the backend.

### Responsive Design
* A responsive layout that adapts to different screen sizes.
* Tailwind CSS grid layout that dynamically adjusts from one column on mobile screens to four columns on desktop displays.

---

## Technology Stack

### Client Side
* React
* Vite
* Tailwind CSS
* Zustand for state management
* React Router for navigation
* React Hot Toast for user alerts

### Server Side
* Node.js
* Express
* MongoDB database
* Mongoose object modeling
* JSON Web Tokens for authentication
* Multer and Cloudinary for file handling

---

## Installation and Setup

### Prerequisites
Make sure you have Node.js installed on your machine. You will also need a MongoDB database and a Cloudinary account.

### Step 1: Clone or Open the Workspace
Ensure you are in the root directory of the project.

### Step 2: Configure Environment Variables
Inside the backend directory, create a configuration file named `.env` and define the following variables:
* DB_URL: Your MongoDB connection string.
* PORT: The port number for your backend server.
* JWT_SECRET: A strong password for web token encryption.
* CLOUD_NAME: Your Cloudinary cloud name.
* API_KEY: Your Cloudinary API key.
* API_SECRET: Your Cloudinary API secret.

### Step 3: Install Dependencies
Open your command terminal and run the following commands:

For the backend:
1. Open the backend directory in your terminal.
2. Run `npm install` to download backend dependencies.

For the frontend:
1. Open the frontend directory in your terminal.
2. Run `npm install` to download frontend dependencies.

---

## How to Run the Application

### Starting the Backend
1. Open the backend folder.
2. Run `npm start` in your terminal.
3. The server will start on the port specified in your configuration file.

### Starting the Frontend
1. Open the frontend folder.
2. Run `npm run dev` in your terminal.
3. Open your browser and go to the link printed in the terminal (usually http://localhost:5173).

---

## Backend Application Details

### Backend Overview
The backend of the Blog Application is a server application built with Node.js and the Express framework. It communicates with a MongoDB database using Mongoose and provides REST APIs for managing users, authors, administrators, and articles. It also handles secure token verification and media uploading.

### Directory Modules
The backend directory contains the following core folders:

* APIs: Contains the routing logic and route handlers for different types of actors and actions in the system.
  * CommonAPI.js: Handles generic routes shared across the application.
  * UserAPI.js: Handles reader-specific requests.
  * AuthorAPI.js: Handles author-specific features such as articles.
  * AdminAPI.js: Handles administrative endpoints.

* config: Holds system configuration files.
  * cloudinary.js: Setting up Cloudinary account access.
  * multer.js: Configures temporary storage for files uploaded through forms.

* middlewares: Houses functions that intercept and validate HTTP requests.
  * verifyToken.js: Decodes and validates JSON Web Tokens sent by the client.
  * checkAuthor.js: Validates if the user role corresponds to an Author before granting permission.

* models: Contains database schemas representing the data structures in MongoDB.
  * UserModel.js: User account profiles and credentials.
  * ArticleModel.js: Article details, contents, and metadata.

* services: Contains auxiliary logic and service methods that can be shared across API routes.

* server.js: The main server script that initializes connection to the database and starts listening on the network.

### Authentication Flow
1. Users register their account specifying username, password, email, and selected role.
2. The registration and login processes use a common service helper to verify inputs.
3. Passwords are encrypted before saving using bcrypt.
4. Upon successful login, the server generates a JSON Web Token containing the user profile details and signs it using a secret key.
5. This token is returned to the client and included in subsequent requests to verify identity.

---

## Frontend Application Details

### Frontend Overview
The frontend of the Blog Application is a single-page application built using React, Vite, and styled with Tailwind CSS. It connects to the backend REST APIs to perform operations such as user registration, login authentication, viewing blog articles, writing new articles, and modifying existing article content.

### Directory Structures
The frontend project consists of these key directories:

* public: Static public assets that are delivered directly to the browser.
* src: The core source code containing application logic, components, routes, and styling files.
  * assets: Images and utility media files.
  * components: Reusable React elements that construct the user interface.

### Key Modules and Components
* Header: Located at the top of the interface. It displays the application logo and handles navigation tabs based on user login status.
* Footer: Displayed at the bottom of all pages, containing general credits and copyright information.
* Home: The landing page that displays introductory text and guides users to start browsing or writing.
* UserProfile: A customized page for reader accounts. It reads articles written by all authors and displays them in a grid layout.
* AuthorProfile: A dedicated page for authors. It shows their active profile information and provides navigation options.
* AuthorArticles: Fetches and displays all articles created by the logged-in author.
* ArticleByID: Renders a detailed view of a selected article including the full text body, category, author name, and date of creation formatted in Indian Standard Time (IST).
* EditArticleForm: A form layout allowing authors to update article details, header images, and content.
* ErrorBoundary: A component that catches runtime exceptions in the component tree and shows a clean fallback message instead of freezing the user screen.

### Interface Responsiveness
To provide a consistent visual layout across all screen resolutions, the article listings are styled using a Tailwind CSS grid configuration. The cards scale dynamically as follows:

* Extra Small Screens: Shows 1 card per row.
* Small Screens: Shows 2 cards per row.
* Medium Screens: Shows 3 cards per row.
* Large Screens and above: Shows 4 cards per row.

### Notification Toasts
The client uses the `react-hot-toast` library to notify users when operations are completed.

* The toast provider is declared at the application root level in App.jsx.
* Success and error notifications are automatically triggered upon user registration, login, and post creation actions.
