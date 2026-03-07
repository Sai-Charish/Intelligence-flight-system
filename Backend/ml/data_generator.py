import random
from datetime import datetime, timedelta, time

from apps.flights.models import Flight, City, Booking, PriceHistory, User


def generate_seat_map():

    rows = range(1, 31)
    cols = ["A", "B", "C", "D", "E", "F"]

    return [f"{r}{c}" for r in rows for c in cols]


def generate_users():

    print("Generating users...")

    User.objects.all().delete()

    users = []

    # Admin user
    users.append(
        User(
            id=1,
            first_name="Ananthoji",
            last_name="Charish"
        )
    )

    # Bot users
    for i in range(2, 501):
        users.append(
            User(
                id=i,
                first_name="Bot",
                last_name=f"User{i}"
            )
        )

    User.objects.bulk_create(users)

    print("500 users generated")


def generate_flights():

    cities = list(City.objects.all())

    if not cities:
        print("No cities found")
        return

    Flight.objects.all().delete()

    today = datetime.today().date()

    DAYS = 7

    flight_slots = [
        time(6, 0),
        time(12, 0),
        time(18, 0),
        time(22, 0)
    ]

    aircraft_codes = [f"FL{i:03}" for i in range(1, 21)]

    routes = []

    for source in cities:
        for destination in cities:
            if source != destination:
                routes.append((source, destination))

    for day in range(DAYS):

        flight_date = today + timedelta(days=day)

        for slot in flight_slots:

            random.shuffle(routes)

            for aircraft, (source, destination) in zip(aircraft_codes, routes):

                duration = random.randint(2, 4)
                arrival_hour = (slot.hour + duration) % 24

                Flight.objects.create(
                    flight_number=aircraft,
                    source=source,
                    destination=destination,
                    departure_time=slot,
                    arrival_time=time(arrival_hour, slot.minute),
                    date=flight_date,
                    base_price=random.randint(3500, 8000),
                    total_seats=180
                )

    print("Flights generated successfully")


def generate_bookings_and_price_history():

    flights = list(Flight.objects.all())

    Booking.objects.all().delete()
    PriceHistory.objects.all().delete()

    users = list(User.objects.exclude(id=1))  # exclude admin

    for flight in flights:

        departure_datetime = datetime.combine(
            flight.date,
            flight.departure_time
        )

        base_price = flight.base_price

        all_seats = generate_seat_map()
        available_seats = all_seats.copy()

        booking_count = random.randint(15, 40)

        for _ in range(booking_count):

            if not available_seats:
                break

            user = random.choice(users)

            passengers = random.randint(1, 5)

            if passengers > len(available_seats):
                passengers = len(available_seats)

            selected_seats = random.sample(available_seats, passengers)

            for seat in selected_seats:
                available_seats.remove(seat)

            days_before = random.randint(1, 30)

            booking_time = departure_datetime - timedelta(days=days_before)

            # realistic pricing logic
            demand_multiplier = 1 + ((30 - days_before) * 0.03)

            price_paid = round(
                base_price * demand_multiplier * random.uniform(0.95, 1.1),
                2
            )

            Booking.objects.create(
                flight=flight,
                user=user,
                passengers=passengers,
                seats=selected_seats,
                booking_time=booking_time,
                price_paid=price_paid
            )

        price_points = [30, 20, 15, 10, 7, 5, 3, 2, 1]

        for days in price_points:

            timestamp = departure_datetime - timedelta(days=days)

            multiplier = 1 + (0.02 * (30 - days))

            price = round(base_price * multiplier, 2)

            PriceHistory.objects.create(
                flight=flight,
                price=price,
                timestamp=timestamp
            )

    print("Bookings and Price History Generated")


def run():

    print("Generating users...")
    generate_users()

    print("Generating flights...")
    generate_flights()

    print("Generating bookings and price history...")
    generate_bookings_and_price_history()

    print("Data generation completed.")