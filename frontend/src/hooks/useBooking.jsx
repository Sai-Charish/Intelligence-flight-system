"use client";

import { useEffect, useState } from "react";

const MAX_SEATS = 5;

export function useBooking(flightId) {
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFlightData() {
      try {
        const [seatsRes, flightRes] = await Promise.all([
          fetch(`http://localhost:8000/api/flights/${flightId}/booked_seats/`),
          fetch(`http://localhost:8000/api/flights/${flightId}/`),
        ]);

        const seatsData = await seatsRes.json();
        const flightData = await flightRes.json();

        setBookedSeats(seatsData.booked_seats || []);
        setPrice(flightData.base_price);
      } catch (error) {
        console.error("Failed to fetch flight data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFlightData();
  }, [flightId]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats((prev) => prev.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length >= MAX_SEATS) return;
      setSelectedSeats((prev) => [...prev, seat]);
    }
  };

  const handleBooking = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/bookings/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flight: flightId,
          seats: selectedSeats,
          user: 1,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Booking failed: " + JSON.stringify(data));
        return;
      }

      alert("Booking Successful!");
      console.log("Booking response:", data);
    } catch (error) {
      console.error(error);
      alert("Server error. Booking not completed.");
    }
  };

  const totalPrice = price * selectedSeats.length;
  const availableCount = 180 - bookedSeats.length;

  return {
    bookedSeats,
    selectedSeats,
    loading,
    price,
    totalPrice,
    availableCount,
    toggleSeat,
    handleBooking,
  };
}
