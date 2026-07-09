# 🚗 Parking Lot Management System

A full-stack web application that manages vehicle parking using a fixed-slot parking lot. The system allows users to park vehicles, generate parking tickets, calculate parking charges during exit, and monitor live parking slot availability.

---

# 📌 Project Overview

The Parking Lot Management System is designed to automate parking operations by maintaining records of vehicle entry and exit, allocating parking slots based on vehicle type, and calculating parking fees according to the duration of stay.

The application prevents overbooking by checking slot availability before issuing a parking ticket. All parking information is stored in a PostgreSQL database and updated in real time.

---

# ✨ Features

### 🚗 Park Vehicle
- Enter Vehicle Number
- Select Vehicle Type (Bike, Car, Truck)
- Automatically checks slot availability
- Generates a unique parking ticket
- Stores entry time

---

### 🚙 Exit Vehicle
- Exit using:
  - Ticket ID
  - Vehicle Number
- Calculates parking duration
- Calculates parking fare
- Updates exit time
- Generates receipt

---

### 📊 Live Slot Availability

Displays available parking slots for:

- Bike
- Car
- Truck

The availability updates automatically whenever a vehicle enters or exits.

---

### 📋 Current Parked Vehicles

Displays all vehicles currently parked with:

- Ticket ID
- Vehicle Number
- Vehicle Type
- Entry Time

---

### 💰 Automatic Fare Calculation

Parking charges are calculated based on the parking duration.

| Duration | Amount |
|----------|---------|
| Up to 3 Hours | ₹30 |
| 4–6 Hours | ₹85 |
| Above 6 Hours | ₹120 |

The duration is rounded up to the nearest hour.

Example:

- 2.2 Hours → 3 Hours
- 3.1 Hours → 4 Hours

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- CSS

## Backend

- Node.js
- Express.js

## Database

- PostgreSQL

---

# 📂 Project Structure

```
Parking-Lot-System
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── utils
│   ├── db.js
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── README.md
└── schema.sql
```

---

# 🗄 Database Schema

The project uses a single table called **tickets**.

| Column | Description |
|---------|-------------|
| id | Primary Key |
| ticket_id | Unique Ticket Number |
| vehicle_number | Vehicle Registration Number |
| vehicle_type | Bike / Car / Truck |
| entry_time | Parking Entry Time |
| exit_time | Parking Exit Time |
| amount | Parking Fee |
| status | Parked / Exited |

---

# 🚘 Parking Slot Limits

| Vehicle Type | Total Slots |
|--------------|-------------|
| Bike | 5 |
| Car | 5 |
| Truck | 2 |

The system checks availability before allowing a vehicle to park.

---

# 🌐 REST API Endpoints

## Get Slot Availability

```
GET /api/slots
```

Returns available parking slots.

---

## Park Vehicle

```
POST /api/park
```

Request

```json
{
  "vehicleNumber":"KA01AB1234",
  "vehicleType":"car"
}
```

---

## Exit Vehicle

```
POST /api/exit
```

Request

```json
{
  "ticketId":"TKT-1001"
}
```

or

```json
{
  "vehicleNumber":"KA01AB1234"
}
```

---

## Get Parked Vehicles

```
GET /api/parked
```

Returns all currently parked vehicles.

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/YourUsername/Parking-Lot-System.git
```

---

## Backend

```bash
cd backend
npm install
npm start
```

Runs on

```
http://localhost:5000
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on

```
http://localhost:5173
```

---

## PostgreSQL Setup

Create a database

```sql
CREATE DATABASE parking_lot;
```

Import

```
schema.sql
```

Configure database credentials in

```
backend/.env
```

Example

```
DB_HOST=localhost
DB_PORT=5433
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=parking_lot
```

---

# 🔄 Project Workflow

1. User enters vehicle details.
2. System checks available slots.
3. Ticket is generated.
4. Entry time is stored.
5. User exits using Ticket ID or Vehicle Number.
6. System calculates parking duration.
7. Parking fee is calculated.
8. Database is updated.
9. Slot becomes available again.

---

# 🚀 Future Enhancements

- QR Code Based Tickets
- Online Payment Integration
- Parking Slot Number Allocation
- Admin Dashboard
- Daily Revenue Report
- Parking History
- Email Receipt
- Vehicle Search
- Analytics Dashboard

---

# 👨‍💻 Author

Developed using:

- React.js
- Node.js
- Express.js
- PostgreSQL
