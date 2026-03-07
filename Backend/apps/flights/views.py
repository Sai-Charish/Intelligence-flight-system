from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Flight, Booking, PriceHistory, City

from .serializers import (
    FlightSerializer,
    BookingSerializer,
    PriceHistorySerializer,
    CitySerializer
)

from ml.predict import predict_price


class FlightViewSet(viewsets.ModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        source = self.request.query_params.get('source')
        destination = self.request.query_params.get('destination')
        date = self.request.query_params.get('date')

        if source:
            queryset = queryset.filter(source__name__iexact=source)

        if destination:
            queryset = queryset.filter(destination__name__iexact=destination)

        if date:
            queryset = queryset.filter(date=date)

        return queryset

    @action(detail=True, methods=['get'])
    def predict_price(self, request, pk=None):

        try:
            flight = Flight.objects.get(pk=pk)
        except Flight.DoesNotExist:
            return Response({"error": "Flight not found"}, status=404)

        result = predict_price(flight.id)

        if "error" in result:
            return Response(result, status=400)

        return Response(result)
    
    @action(detail=True, methods=["get"])
    def booked_seats(self, request, pk=None):

        bookings = Booking.objects.filter(flight_id=pk)

        booked = []

        for booking in bookings:
            if booking.seats:
                booked.extend(booking.seats)

        booked = list(set(booked))

        return Response({
            "booked_seats": booked
        })


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get("user")

        if user_id:
            return Booking.objects.filter(user_id=user_id)
        
        return Booking.objects.all()


class PriceHistoryViewSet(viewsets.ModelViewSet):
    queryset = PriceHistory.objects.all()
    serializer_class = PriceHistorySerializer


class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer