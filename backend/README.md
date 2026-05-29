# Blog Application Backend Server

## Overview

The backend of the Blog Application is a server application built with Node.js and the Express framework. It communicates with a MongoDB database using Mongoose and provides REST APIs for managing users, authors, administrators, and articles. It also handles secure token verification and media uploading.

---

## Directory Modules

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

---

## Technical Details

### Authentication Flow
1. Users register their account specifying username, password, email, and selected role.
2. The registration and login processes use a common service helper to verify inputs.
3. Passwords are encrypted before saving using bcrypt.
4. Upon successful login, the server generates a JSON Web Token containing the user profile details and signs it using a secret key.
5. This token is returned to the client and included in subsequent requests to verify identity.

### Image Management
* Authors can attach images to their articles.
* Images are parsed via Multer and uploaded to Cloudinary.
* The image URL returned from Cloudinary is saved under the article model in the MongoDB database.

---

## Environment Configuration

To run the backend server, you must set up a `.env` file in the backend root directory. Define the following variables inside that file:

* DB_URL: The MongoDB database connection string.
* PORT: The network port on which the Express server runs (for example: 4000).
* JWT_SECRET: A secret passphrase used to secure JSON Web Tokens.
* CLOUD_NAME: The Cloudinary account identifier name.
* API_KEY: The Cloudinary developer API key.
* API_SECRET: The Cloudinary developer API secret.

---

## Installation and Execution

### Install Dependencies
Open your terminal inside the backend directory and run:

```bash
npm install
```

### Start the Server
To run the server in standard production mode, execute:

```bash
npm start
```

For development mode (if nodemon is configured), run:

```bash
npm run dev
```
