"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BookingPage() {
  const { id } = useParams();

  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    async function fetchBookedSeats() {
      try {
        const res = await fetch(
          `http://localhost:8000/api/flights/${id}/booked_seats/`,
        );
        const data = await res.json();
        setBookedSeats(data.booked_seats || []);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    async function fetchBase_price() {
      try {
        const res = await fetch(`http://localhost:8000/api/flights/${id}/`);
        const data = await res.json();
        setPrice(data.base_price);
      } catch (error) {
        console.error(error);
      }
    }
    fetchBookedSeats();
    fetchBase_price();
  }, [id]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length >= 5) return; // Add this line
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBooking = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/bookings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flight: id,
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

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400">
          Loading seat map…
        </p>
      </div>
    );
  }

  const renderSeat = (row, letter) => {
    const seat = `${row}${letter}`;
    const isBooked = bookedSeats.includes(seat);
    const isSelected = selectedSeats.includes(seat);

    if (isBooked) {
      return (
        <div
          key={seat}
          title={seat}
          className="w-8 h-7 rounded border border-dashed border-neutral-300 bg-neutral-100 flex items-center justify-center cursor-not-allowed"
        >
          <span className="text-[9px] font-medium text-neutral-300">
            {seat}
          </span>
        </div>
      );
    }

    if (isSelected) {
      return (
        <button
          key={seat}
          onClick={() => toggleSeat(seat)}
          title={seat}
          className="w-8 h-7 rounded border-2 border-neutral-900 bg-neutral-900 flex items-center justify-center shadow-sm transition-all active:scale-95"
        >
          <span className="text-[9px] font-bold text-white">{seat}</span>
        </button>
      );
    }

    return (
      <button
        key={seat}
        onClick={() => toggleSeat(seat)}
        title={seat}
        className="w-8 h-7 rounded border border-neutral-200 bg-white flex items-center justify-center hover:border-neutral-400 hover:bg-neutral-50 transition-all cursor-pointer"
      >
        <span className="text-[9px] font-medium text-neutral-400">{seat}</span>
      </button>
    );
  };

  return (
    <div className="max-h-screen bg-neutral-50 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-1">
            Flight #{id}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
            Choose Your Seats
          </h1>
        </div>

        {/* Main layout */}
        <div className="flex gap-8  items-start">
          {/* Seat map card */}
          <div className="flex-1 bg-white overflow-auto rounded-2xl border border-neutral-100 shadow-sm px-6 py-5">
            <div className="overflow-x-auto scroll-smooth  pb-2">
              {/*
                Layout structure (rotated 90°):
                - Left fixed column: row labels (1–30) + letter labels (A B C ✈ D E F)
                - Each subsequent column = one row's seats stacked vertically

                We build a flex-row where:
                  col 0 = label column (letters stacked)
                  col 1..30 = seat columns (row number on top, then seats)
              */}

              <div className="flex gap-1.5">
                {/* Label column — letter labels aligned with seat rows */}
                <div className="flex flex-col shrink-0">
                  {/* Spacer for row number at top */}
                  <div className="h-5 mb-1.5" />
                  {/* A B C labels */}
                  {["A", "B", "C"].map((l) => (
                    <div
                      key={l}
                      className="w-6 h-7 flex items-center justify-end pr-1 mb-1.5"
                    >
                      <span className="text-xs font-semibold text-neutral-300 tracking-widest">
                        {l}
                      </span>
                    </div>
                  ))}
                  {/* Aisle label */}
                  <div className="h-4 flex items-center justify-end pr-1 mb-1.5">
                    <span className="text-xs text-neutral-200">✈</span>
                  </div>
                  {/* D E F labels */}
                  {["D", "E", "F"].map((l) => (
                    <div
                      key={l}
                      className="w-6 h-7 flex items-center justify-end pr-1 mb-1.5"
                    >
                      <span className="text-xs font-semibold text-neutral-300 tracking-widest">
                        {l}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Seat columns — one per row */}
                {Array.from({ length: 30 }, (_, i) => {
                  const row = i + 1;
                  return (
                    <div
                      key={row}
                      className="flex flex-col items-center shrink-0 gap-1.5"
                    >
                      {/* Row number */}
                      <span className="text-xs text-neutral-300 tabular-nums h-5 leading-5">
                        {row}
                      </span>
                      {/* A B C seats */}
                      {["A", "B", "C"].map((l) => renderSeat(row, l))}
                      {/* Aisle gap */}
                      <div className="h-4" />
                      {/* D E F seats */}
                      {["D", "E", "F"].map((l) => renderSeat(row, l))}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-5 pt-4 border-t border-neutral-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-5 rounded border border-neutral-200 bg-white" />
                <span className="text-xs text-neutral-400">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-5 rounded bg-neutral-900 border-2 border-neutral-900" />
                <span className="text-xs text-neutral-400">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-5 rounded border border-dashed border-neutral-300 bg-neutral-100" />
                <span className="text-xs text-neutral-400">Booked</span>
              </div>
            </div>
          </div>

          {/* Summary panel */}
          <div className="w-56 shrink-0 bg-white rounded-2xl border border-neutral-100 shadow-sm px-5 py-5 flex flex-col gap-5">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-2">
                Summary
              </p>
              <div className="flex justify-between text-xs text-neutral-500 mb-1">
                <span>Selected</span>
                <span className="font-semibold text-neutral-800">
                  {selectedSeats.length}
                </span>
              </div>
              <div className="flex justify-between text-xs text-neutral-500 mb-1">
                <span>Available</span>
                <span className="font-semibold text-neutral-800">
                  {180 - bookedSeats.length}
                </span>
              </div>
              <div className="flex justify-between text-xs text-neutral-500">
                <span>Total Price</span>
                <span className="font-semibold text-neutral-800">
                  {price * selectedSeats.length}
                </span>
              </div>
            </div>

            {/* Selected seat tags */}

            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-2">
                Seats
              </p>
              {selectedSeats.length == 0 ? (
                <div className=" bg-neutral-100  rounded">
                  <p className="px-2 py-0.5 text-xs text-neutral-400 font-bold overflow-x-scroll scroll-smooth">
                    no seats is selected
                  </p>
                </div>
              ) : (
                <div className="flex gap-1.5  overflow-x-scroll">
                  {selectedSeats.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSeat(s)}
                      className="px-2 py-0.5 rounded bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-700 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-auto">
              <button
                onClick={handleBooking}
                disabled={selectedSeats.length === 0}
                className={`w-full py-3 rounded-xl text-sm font-semibold transition-all
                  ${
                    selectedSeats.length === 0
                      ? "bg-neutral-100 text-neutral-300 cursor-not-allowed"
                      : "bg-neutral-900 text-white hover:bg-neutral-700 active:scale-95"
                  }`}
              >
                {selectedSeats.length === 0
                  ? "Select seats"
                  : `Confirm ${selectedSeats.length}/5 seat${selectedSeats.length > 1 ? "s" : ""}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
