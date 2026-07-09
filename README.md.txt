# Parking Lot Management System

## Tech Stack

- Frontend: React (Vite)
- Backend: Node.js + Express
- Database: PostgreSQL

## Installation

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Database

Create a PostgreSQL database named:

```
parking_lot
```

Import the SQL schema from `schema.sql`.

## API Endpoints

- GET /api/slots
- POST /api/park
- POST /api/exit
- GET /api/parked