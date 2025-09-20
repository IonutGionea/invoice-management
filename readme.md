Invoice Management App

⚡ Backend: NestJS
 + Prisma
 + PostgreSQL

🎨 Frontend: React 19
 + Vite
 + Redux Toolkit
 + TanStack Table

🔐 Auth: JWT authentication with Passport

🐳 Database: PostgreSQL (via Docker Compose)

🚀 Features

User authentication (/auth/login) with JWT 

API endpoints for:

POST /auth/login → Login, returns JWT token and user info

GET /invoices → Get all invoices for logged-in user

GET /invoices/:id → Get single invoice details

Database schema with User ↔ Invoice relationship

Database seeding with 3 test users + sample invoices

React frontend with:

Login form (Zod validation + Axios)

Dashboard table of invoices (TanStack Table)

Row click → modal with invoice details



Backend (NestJS + Prisma)
cd server
npm install


Run Database with Docker
docker-compose up -d

Run Migrations + Seed
npx prisma migrate dev --name init
npx prisma db seed

Start Backend
npm run start:dev

Server runs at http://localhost:3000

Frontend (React + Vite)
cd client
npm install

Start Frontend
npm run dev

Frontend runs at http://localhost:5173

🔑 Usage
Login with a seeded user:

email: john@example.com
password: hashedpw1


📖 API Reference
POST /auth/login

GET /invoices
Get all invoices for authenticated user.

GET /invoices/:id
Get single invoice details (belongs to authenticated user only).


🐳 Docker
To run PostgreSQL database in Docker:
docker-compose up -d


Stop:
docker-compose down
