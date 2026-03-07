from rest_framework import serializers
from django.db.models import Sum

from .models import Flight, Booking, PriceHistory, City


class CitySerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = [
            "id",
            "name",
            "airport_code"
        ]


class FlightSerializer(serializers.ModelSerializer):

    # show airport codes instead of ids
    source = serializers.CharField(source="source.airport_code", read_only=True)
    destination = serializers.CharField(source="destination.airport_code", read_only=True)

    # computed field
    available_seats = serializers.SerializerMethodField()

    class Meta:
        model = Flight
        fields = [
            "id",
            "flight_number",
            "source",
            "destination",
            "date",
            "departure_time",
            "arrival_time",
            "base_price",
            "total_seats",
            "available_seats"
        ]

    def get_available_seats(self, obj):

        bookings = Booking.objects.filter(flight=obj)

        booked_seats = []

        for booking in bookings:
            if booking.seats:
                booked_seats.extend(booking.seats)

        booked_seats = list(set(booked_seats))

        return obj.total_seats - len(booked_seats)


class BookingSerializer(serializers.ModelSerializer):

    flight_number = serializers.CharField(
        source="flight.flight_number",
        read_only=True
    )

    class Meta:
        model = Booking
        fields = "__all__"
        read_only_fields = ["passengers", "booking_time", "price_paid"]

    def validate(self, data):

        flight = data["flight"]
        seats = data.get("seats", [])

        passengers = len(seats)

        if passengers == 0:
            raise serializers.ValidationError(
                "Select at least one seat"
            )

        if len(seats) != len(set(seats)):
            raise serializers.ValidationError(
                {"seats": "Duplicate seats selected"}
            )

        booked_seats = []

        bookings = flight.bookings.values_list("seats", flat=True)

        for seat_list in bookings:
            if seat_list:
                booked_seats.extend(seat_list)

        conflict = set(seats) & set(booked_seats)

        if conflict:
            raise serializers.ValidationError(
                {"seats": f"Seats already booked: {list(conflict)}"}
            )

        data["passengers"] = passengers

        return data

    def create(self, validated_data):

        flight = validated_data["flight"]
        seats = validated_data["seats"]

        # simple pricing logic (can later be ML prediction)
        price = flight.base_price
        passenger = len(seats)

        validated_data["price_paid"] = price*passenger

        return Booking.objects.create(**validated_data)    

class PriceHistorySerializer(serializers.ModelSerializer):

    flight_number = serializers.CharField(
        source="flight.flight_number",
        read_only=True
    )

    class Meta:
        model = PriceHistory
        fields = [
            "id",
            "flight",
            "flight_number",
            "price",
            "timestamp"
        ]