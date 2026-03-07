import os
import django
import pandas as pd
from django.db.models import Avg, Count

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from apps.flights.models import Booking, PriceHistory


def build_training_dataframe():

    data = []

    bookings = Booking.objects.select_related("flight").all()

    for booking in bookings:

        flight = booking.flight

        days_to_departure = (
            flight.departure_time - booking.booking_time
        ).days

        booking_count = Booking.objects.filter(
            flight=flight
        ).count()

        historical_avg = PriceHistory.objects.filter(
            flight=flight
        ).aggregate(avg_price=Avg("price"))["avg_price"] or flight.base_price

        data.append({
            "source": flight.source,
            "destination": flight.destination,
            "base_price": flight.base_price,
            "days_to_departure": days_to_departure,
            "booking_count": booking_count,
            "historical_avg_price": historical_avg,
            "price_paid": booking.price_paid
        })

    df = pd.DataFrame(data)

    return df