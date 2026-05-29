# Blog Application Frontend Client

## Overview

The frontend of the Blog Application is a single-page application built using React, Vite, and styled with Tailwind CSS. It connects to the backend REST APIs to perform operations such as user registration, login authentication, viewing blog articles, writing new articles, and modifying existing article content.

---

## Directory Structures

The frontend project consists of these key directories:

* public: Static public assets that are delivered directly to the browser.
* src: The core source code containing application logic, components, routes, and styling files.
  * assets: Images and utility media files.
  * components: Reusable React elements that construct the user interface.

---

## Key Modules and Components

* Header: Located at the top of the interface. It displays the application logo and handles navigation tabs based on user login status.
* Footer: Displayed at the bottom of all pages, containing general credits and copyright information.
* Home: The landing page that displays introductory text and guides users to start browsing or writing.
* UserProfile: A customized page for reader accounts. It reads articles written by all authors and displays them in a grid layout.
* AuthorProfile: A dedicated page for authors. It shows their active profile information and provides navigation options.
* AuthorArticles: Fetches and displays all articles created by the logged-in author.
* ArticleByID: Renders a detailed view of a selected article including the full text body, category, author name, and date of creation formatted in Indian Standard Time (IST).
* EditArticleForm: A form layout allowing authors to update article details, header images, and content.
* ErrorBoundary: A component that catches runtime exceptions in the component tree and shows a clean fallback message instead of freezing the user screen.

---

## Interface Responsiveness

To provide a consistent visual layout across all screen resolutions, the article listings are styled using a Tailwind CSS grid configuration. The cards scale dynamically as follows:

* Extra Small Screens: Shows 1 card per row.
* Small Screens: Shows 2 cards per row.
* Medium Screens: Shows 3 cards per row.
* Large Screens and above: Shows 4 cards per row.

---

## Notification Toasts

The client uses the `react-hot-toast` library to notify users when operations are completed.

### Integration Details
The toast provider is declared at the application root level in `App.jsx`:

```jsx
<Toaster position="top-center" reverseOrder={false} />
```

### Usage Example
Whenever an operation like register or article submission succeeds, a toast alerts the user:

```javascript
import toast from "react-hot-toast";

if (response.status === 201) {
    toast.success("Account created successfully");
    navigate("/login");
}
```

---

## Installation and Execution

### Install Dependencies
Navigate to the frontend folder and run:

```bash
npm install
```

### Start Development Server
To launch the Vite development server locally, run:

```bash
npm run dev
```

### Production Build
To package the app for production deployment, use:

```bash
npm run build
```
