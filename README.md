# Authentication Service

Backend authentication system built with **Node.js, TypeScript, Express, and PostgreSQL**.

## Features

* User registration
* User login
* JWT authentication
* Protected routes
* Password hashing with bcrypt
* Input validation using Zod
* Global error handling

## Tech Stack

* Node.js
* TypeScript
* Express
* PostgreSQL
* JWT
* Zod
* bcrypt

## Installation

```bash
git clone <repo>
cd Auth
npm install
```

## Environment Variables

Create `.env`

```
DATABASE_URL=postgres://user:password@localhost:5432/authdb
JWT_SECRET=your_secret_key
PORT=5000
```

## Run Development Server

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint       | Description      |
| ------ | -------------- | ---------------- |
| POST   | /auth/register | Register user    |
| POST   | /auth/login    | Login user       |
| GET    | /auth/me       | Get current user |

## Database Schema

```sql
CREATE TABLE users (
 id UUID PRIMARY KEY,
 email VARCHAR(255) UNIQUE NOT NULL,
 password TEXT NOT NULL,
 role VARCHAR(20) DEFAULT 'user',
 created_at TIMESTAMP DEFAULT NOW()
);
```
