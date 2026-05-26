# The Tea Shelf

A full-stack inventory management application for a tea store, built with
Node.js, Express, and PostgreSQL. This project is part of
[The Odin Project](https://www.theodinproject.com/) Node.js curriculum.

## Overview

The Tea Shelf lets you browse and manage a curated tea inventory organized by
category. Visitors can explore the full catalog, while admins can create,
update, and delete both categories and individual tea items.

## Features

- Browse teas by category
- View detailed information for each tea item
- Full CRUD operations for categories and items
- Admin password protection for destructive actions (update & delete)
- Seed script for populating the database with initial data

## Tech Stack

- **Backend:** Node.js, Express
- **Templating:** EJS
- **Database:** PostgreSQL
- **ORM/Query:** pg (node-postgres)

## Database Schema

Two main entities with a one-to-many relationship:

- **Category** — `id`, `name`, `description`
- **Item** — `id`, `name`, `description`, `price`, `stock`, `category_id` (FK →
  Category)

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

```bash
git clone https://github.com/sadwipe/tea-shop.git
cd tea-shop
npm install
```

### Environment Variables

Create a `.env` file in the root:

```
DATABASE_URL=postgresql://user:password@localhost:5432/tea_shelf
ADMIN_PASSWORD=your_secret_password
```

### Database Setup

```bash
# Run migrations / create tables
npm run db:init

# Seed with sample data
npm run db:seed
```

### Run the App

```bash
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
tea-shop/
├── controllers/
├── db/
│   ├── pool.js
│   └── queries.js
├── routes/
├── views/
├── public/
└── app.js
```

## Assignment

This project was built as part of the
[Inventory Application](https://www.theodinproject.com/lessons/nodejs-inventory-application)
lesson from The Odin Project's Node.js path.
