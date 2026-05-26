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

### Run the App

```bash
npm run dev
```

Visit `http://localhost:3000`
