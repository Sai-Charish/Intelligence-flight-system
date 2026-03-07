import os
import django
import joblib
from django.db.models import Avg, Count
from datetime import datetime
import pandas as pd

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from apps.flights.models import Flight, Booking, PriceHistory


# Load trained model and encoders once
MODEL_PATH = "ml/price_model.pkl"
SOURCE_ENCODER_PATH = "ml/source_encoder.pkl"
DEST_ENCODER_PATH = "ml/destination_encoder.pkl"

model = joblib.load(MODEL_PATH)
le_source = joblib.load(SOURCE_ENCODER_PATH)
le_destination = joblib.load(DEST_ENCODER_PATH)


def predict_price(flight_id):

    try:
        flight = Flight.objects.get(id=flight_id)
    except Flight.DoesNotExist:
        return {"error": "Flight not found"}

    # Days to departure (assuming prediction made today)
    today = datetime.now(flight.departure_time.tzinfo)
    days_to_departure = (flight.departure_time - today).days

    if days_to_departure < 0:
        return {"error": "Flight already departed"}

    # Demand signal
    booking_count = Booking.objects.filter(
        flight=flight
    ).count()

    # Historical average price
    historical_avg = PriceHistory.objects.filter(
        flight=flight
    ).aggregate(avg_price=Avg("price"))["avg_price"] or flight.base_price

    # Encode categorical values
    try:
        encoded_source = le_source.transform([flight.source])[0]
        encoded_destination = le_destination.transform([flight.destination])[0]
    except ValueError:
        return {"error": "Unknown source or destination for encoder"}

    # Feature vector (same order as training)


    features = pd.DataFrame([{
        "source": encoded_source,
        "destination": encoded_destination,
        "base_price": flight.base_price,
        "days_to_departure": days_to_departure,
        "booking_count": booking_count,
        "historical_avg_price": historical_avg
    }])

    predicted_price = float(model.predict(features)[0])

    return {
        "flight_id": flight_id,
        "source": flight.source,
        "destination": flight.destination,
        "base_price": flight.base_price,
        "predicted_price": round(predicted_price, 2),
        "days_to_departure": days_to_departure,
        "booking_count": booking_count,
        "historical_avg_price": round(historical_avg, 2)
    }