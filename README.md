# The Tea Shelf

An inventory management web application for tracking tea products and
categories. The application provides CRUD functionality, server-side data
validation, file uploads for product images, and PostgreSQL persistence.

## Features

- Manage tea categories and products with categorized views.
- Upload product images handled via Multer with validation.
- Input validation and sanitization using express-validator.
- PostgreSQL database integration using node-postgres connection pooling.
- Server-rendered templates using EJS.

## Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Template Engine:** EJS
- **File Handling:** Multer
- **Code Quality:** ESLint, Prettier, Husky

## Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL instance running locally or remotely

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sadwipe/The-Tea-Shelf.git
   cd The-Tea-Shelf
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables: Copy `.env.example` to a new `.env` file:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and fill in your database credentials:
   ```env
   PORT=3000
   USER=postgres
   HOST=localhost
   DATABASE=the_tea_shelf
   USER_PASSWORD=your_password
   DB_PORT=5432
   ```

## Database Setup

Initialize the database schema and populate it with sample categories and
products:

```bash
npm run seed
```

## Running the Application

### Development Mode

Runs the application with Node's native file watcher:

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The application will be accessible at `http://localhost:3000` (or the configured
`PORT`).

## Scripts

- `npm run dev`: Starts the application in watch mode.
- `npm start`: Starts the application in production mode.
- `npm run seed`: Resets and seeds the PostgreSQL database.
- `npm run format`: Formats source files using Prettier.
