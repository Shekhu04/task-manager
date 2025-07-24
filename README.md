# 📝 Task Manager API

A simple RESTful Task Management System built with **Node.js**, **Express**, **TypeScript**, **Prisma**, and **SQLite**, featuring **Swagger API documentation**.

## 🚀 Features

- Create, Read, Update, and Delete (CRUD) tasks
- Input validation using Zod
- Auto-generated API docs via Swagger
- SQLite database via Prisma ORM
- TypeScript support for type safety

---

## 📦 Tech Stack

- **Backend**: Node.js, Express
- **ORM**: Prisma
- **Database**: SQLite
- **Validation**: Zod
- **Docs**: Swagger (OpenAPI 3.0)
- **Language**: TypeScript

---


---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Shekhu04/task-manager.git
cd backend
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Set up Environment Variables
Create a .env file in the root:
```bash
DATABASE_URL="file:./dev.db"
```
### 4. Prisma Setup
```bash
npx prisma generate     # Generate Prisma client
npx prisma migrate dev --name init   # Create DB and apply schema
```
### 5. Run the Server
```bash
npm run dev
```
Server will run at: http://localhost:3000

Swagger UI: http://localhost:3000/api-docs

