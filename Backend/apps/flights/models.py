from django.db import models
from django.core.exceptions import ValidationError


class City(models.Model):
    name = models.CharField(max_length=100)
    airport_code = models.CharField(max_length=10,unique=True,null=True,blank=True)

    def __str__(self):
        return self.name


class Flight(models.Model):
    flight_number = models.CharField(max_length=10)

    source = models.ForeignKey(
        City,
        on_delete=models.CASCADE,
        related_name="departing_flights"
    )

    destination = models.ForeignKey(
        City,
        on_delete=models.CASCADE,
        related_name="arriving_flights"
    )

    date = models.DateField()

    departure_time = models.TimeField()
    arrival_time = models.TimeField()

    base_price = models.FloatField()

    total_seats = models.IntegerField(default=180)

    def clean(self):
        if self.source == self.destination:
            raise ValidationError("Source and destination cannot be the same")

    class Meta:
        unique_together = ("flight_number", "date", "departure_time")
        indexes = [
            models.Index(fields=["source", "destination", "date"]),
        ]

    def __str__(self):
        return f"{self.flight_number} {self.source} → {self.destination} {self.date}"
    
class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Booking(models.Model):

    flight = models.ForeignKey(
        Flight,
        on_delete=models.CASCADE,
        related_name="bookings"
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="bookings"
    )

    passengers = models.IntegerField()

    seats = models.JSONField(null=True, blank=True)

    price_paid = models.FloatField()

    booking_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.passengers} passengers for {self.flight.flight_number}"

    
class PriceHistory(models.Model):

    flight = models.ForeignKey(
        Flight,
        on_delete=models.CASCADE,
        related_name="price_history"
    )

    price = models.FloatField()

    timestamp = models.DateTimeField()

    def __str__(self):
        return f"{self.flight.flight_number} - {self.price}"


