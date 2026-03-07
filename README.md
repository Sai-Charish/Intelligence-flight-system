#  Intelligent Flight Pricing System

A full-stack application that simulates airline ticket booking with dynamic pricing, combining a Django REST backend, PostgreSQL database, React/Next.js frontend, and a machine learning pricing engine.

---

##  Overview

The goal of this project is to demonstrate a scalable architecture for airline pricing systems by combining:

- **Django REST Framework** for backend APIs
- **PostgreSQL** for data storage
- **React (Next.js)** for frontend UI
- **Machine learning** based price prediction logic

The system also simulates real airline demand using synthetic booking data to analyze pricing behavior.

---

##  System Architecture

```
Frontend (React / Next.js)
        |
Backend API (Django REST Framework)
        |
  PostgreSQL Database
        |
   ML Pricing Engine
```

**Main modules:**
- Flights Service
- Booking Service
- Pricing Engine
- Price History Tracking
- Synthetic Data Generator

---

##  Features

###  Flight Search
- Search flights by source city, destination city, and travel date
- Returns available flights along with current ticket price

###  Booking System
- Book seats for a selected flight
- Each booking stores: User ID, Flight ID, Seats booked, Total price, and Booking timestamp
- Tracks seat availability dynamically

###  Price History Tracking
- Every price change is recorded in the price history table
- Enables analysis of how prices fluctuate based on demand

###  Synthetic Data Generation
- Generates a large dataset to simulate real airline activity:
  - 200+ flights
  - 15,000+ bookings
  - Dynamic demand behavior
- Helps train and test the pricing model

###  Dynamic Pricing (AI Layer)
- Predicts ticket prices based on:
  - Number of seats remaining
  - Days before departure
  - Historical demand
  - Booking patterns

---

##  Tech Stack

| Layer | Technologies |
|---|---|
| **Backend** | Python, Django, Django REST Framework, PostgreSQL |
| **Frontend** | React, Next.js, Tailwind CSS |
| **Machine Learning** | Python, Scikit-learn, Pandas, NumPy |

---

##  Database Structure

### Cities
Stores airport city information.

| Field | Type | Description |
|---|---|---|
| `id` | BigInt (PK) | Unique identifier for each city |
| `name` | VARCHAR | Name of the city |
| `airport_code` | VARCHAR(3) | IATA airport code (e.g., `DEL`) |

### Flights
Stores flight details.

| Field | Type | Description |
|---|---|---|
| `id` | BigInt (PK) | Unique identifier for each flight |
| `flight_number` | VARCHAR | Unique flight number (e.g., `FL0450`) |
| `source_id` | Foreign Key (City) | Departure city |
| `destination_id` | Foreign Key (City) | Arrival city |
| `departure_time` | DateTime | Scheduled departure time |
| `arrival_time` | DateTime | Scheduled arrival time |
| `base_price` | Decimal | Base ticket price before dynamic pricing |
| `total_seats` | Integer | Total number of seats available |

### Bookings
Stores ticket booking records.

| Field | Description |
|---|---|
| `id` | Unique booking identifier |
| `user_id` | ID of the user who made the booking |
| `flight_id` | Associated flight |
| `seats_booked` | Number of seats reserved |
| `total_price` | Total cost of the booking |
| `booking_time` | Timestamp of the booking |

### Price History
Stores historical price updates.

| Field | Description |
|---|---|
| `id` | Unique record identifier |
| `flight_id` | Associated flight |
| `price` | Recorded price at the time |
| `timestamp` | When the price change occurred |

---

##  Project Structure

```
Intelligent-flight-pricing/
├── Backend/
│   ├── apps/
│   │   └── flights/
│   │       └── migrations/
│   ├── config/
│   └── ml/
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── app/
    │   │   ├── booking/
    │   │   │   └── [id]/
    │   │   ├── flights/
    │   │   │   └── [id]/
    │   │   └── trips/
    │   ├── components/
    │   ├── data/
    │   └── services/
    ├── package.json
    └── next.config.js
```

---

##  Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/sai-charish/Intelligent-flight-pricing.git
   cd Intelligent-flight-pricing
   ```

2. **Setup backend and frontend** — refer to the `readme.md` inside each respective folder for detailed instructions.

3. **Generate synthetic data** using the data generator module.

4. **Run the backend server**

5. **Run the frontend application**

6. **Use the app** — search flights, book seats, and view your bookings.

---

##  Future Improvements

- [ ] Authentication and login system
- [ ] Real-time seat availability
- [ ] AI-based price prediction model
- [ ] Booking cancellation
- [ ] Payment integration
- [ ] Admin dashboard for airline analytics

---

> This project demonstrates how airline pricing systems can combine backend services, frontend UI, and machine learning to simulate dynamic ticket pricing.
