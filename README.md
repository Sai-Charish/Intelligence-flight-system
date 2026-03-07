# Intelligent Flight Pricing System

## Overview

The Intelligent Flight Pricing System is a full-stack application
designed to simulate airline ticket booking with dynamic pricing. The
system allows users to search flights, view prices, book seats, and
track bookings while the backend manages flight data, bookings, and
price history.

The goal of this project is to demonstrate a scalable architecture for
airline pricing systems by combining:

- Django REST Framework for backend APIs
- PostgreSQL for data storage
- React (Next.js) for frontend UI
- Machine learning based price prediction logic

The system also simulates real airline demand using synthetic booking
data to analyze pricing behavior.

---

## System Architecture

Frontend (React / Next.js) \| Backend API (Django REST Framework) \|
PostgreSQL Database \| ML Pricing Engine

Main modules: - Flights Service - Booking Service - Pricing Engine -
Price History Tracking - Synthetic Data Generator

---

## Features

### Flight Search

Users can search flights by: - Source city - Destination city - Travel
date

The system returns available flights along with current ticket price.

### Booking System

Users can book seats for a selected flight.

Each booking stores: - User ID - Flight ID - Seats booked - Total
price - Booking timestamp

The system also tracks seat availability dynamically.

### Price History Tracking

Every time the price changes, a record is stored in the price history
table. This allows analysis of how prices change based on demand.

### Synthetic Data Generation

A large dataset is generated to simulate real airline activity: - 200+
flights - 15000+ bookings - Dynamic demand behavior

This helps train and test the pricing model.

### Dynamic Pricing (AI Layer)

Instead of using a fixed base price, the system can predict ticket
prices based on: - Number of seats remaining - Days before departure -
Historical demand - Booking patterns

---

## Tech Stack

### Backend

- Python
- Django
- Django REST Framework
- PostgreSQL

### Frontend

- React
- Next.js
- Tailwind CSS

### Machine Learning

- Python
- Scikit-learn
- Pandas
- NumPy

---

## Database Structure

### Cities

Stores airport city information.

| Field        | Type                 | Description                               |
| ------------ | -------------------- | ----------------------------------------- |
| id           | BigInt (Primary Key) | Unique identifier for each city           |
| name         | VARCHAR              | Name of the city                          |
| airport_code | VARCHAR(3)           | IATA airport code of the city (e.g., DEL) |

### Flights

Stores flight details.

### Flights Table

| Field            | Type                 | Description                                                |
| ---------------- | -------------------- | ---------------------------------------------------------- |
| id               | BigInt (Primary Key) | Unique identifier for each flight                          |
| flight_number    | VARCHAR              | Unique flight number assigned to the flight (e.g., FL0450) |
| source_city      | Foreign Key (City)   | City from which the flight departs                         |
| destination_city | Foreign Key (City)   | City where the flight arrives                              |
| departure_time   | DateTime             | Scheduled departure time of the flight                     |
| arrival_time     | DateTime             | Scheduled arrival time of the flight                       |
| base_price       | Decimal              | Base ticket price before dynamic pricing                   |
| total_seats      | Integer              | Total number of seats available on the flight              |

### Bookings

Stores ticket bookings. Fields: - id - user_id - flight_id -
seats_booked - total_price - booking_time

### Price History

Stores historical price updates. Fields: - id - flight_id - price -
timestamp

---

## Project Structure

Intelligent-flight-pricing │ ├── Backend │ ├── apps │ │ ├── flights │ │
└── ml │ │ │ ├── config │ ├── manage.py │ └── requirements.txt │ ├──
Frontend │ ├── app │ │ ├── page.js │ │ ├── flights │ │ ├── booking │ │
└── trip │ │ │ └── components │ └── README.md

---

## Backend Setup

### Clone Repository

git clone https://github.com/yourusername/intelligent-flight-pricing.git
cd intelligent-flight-pricing

### Setup Virtual Environment

cd Backend python -m venv venv

Activate environment:

Windows: venv`\Scripts`{=tex}`\activate`{=tex}

Linux / Mac: source venv/bin/activate

### Install Dependencies

pip install -r requirements.txt

### Configure Database

Update PostgreSQL credentials in: Backend/config/settings.py

Example:

DATABASES = { 'default': { 'ENGINE': 'django.db.backends.postgresql',
'NAME': 'flight_pricing', 'USER': 'postgres', 'PASSWORD': 'password',
'HOST': 'localhost', 'PORT': '5432', } }

### Run Migrations

python manage.py makemigrations python manage.py migrate

### Create Superuser

python manage.py createsuperuser

### Run Server

python manage.py runserver

Backend will run at: http://127.0.0.1:8000

---

## Frontend Setup

Install dependencies:

cd Frontend npm install

Run frontend:

npm run dev

Frontend will run at: http://localhost:3000

---

## API Endpoints

Get Flights: GET /api/flights/

Search Flights: GET
/api/flights/search?source=DEL&destination=BOM&date=2026-04-10

Create Booking: POST /api/bookings/

Example request: { "user_id": 1, "flight_id": 25, "seats_booked": 2 }

Get User Bookings: GET /api/bookings/?user=1

---

## Future Improvements

- Authentication and login system
- Real-time seat availability
- AI based price prediction model
- Booking cancellation
- Payment integration
- Admin dashboard for airline analytics

---

## How to Use This Repository

1.  Clone the repository.
2.  Setup backend and frontend as described above.
3.  Generate synthetic data using the data generator module.
4.  Run the backend server.
5.  Run the frontend application.
6.  Search flights, book seats, and view bookings.

This project demonstrates how airline pricing systems can combine
backend services, frontend UI, and machine learning to simulate dynamic
ticket pricing.
