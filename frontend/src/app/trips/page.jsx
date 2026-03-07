"use client";
import { useEffect, useState } from "react";

export default function TripPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrips() {
      try {
        const res = await fetch("http://localhost:8000/api/bookings/?user=1");
        const bookings = await res.json();

        // Fetch flight details for each booking in parallel
        const enriched = await Promise.all(
          bookings.map(async (booking) => {
            try {
              const flightRes = await fetch(
                `http://localhost:8000/api/flights/${booking.flight}/`,
              );
              const flight = await flightRes.json();

              // Compute duration from departure and arrival time
              const [depH, depM] = flight.departure_time.split(":").map(Number);
              const [arrH, arrM] = flight.arrival_time.split(":").map(Number);
              const totalMins = arrH * 60 + arrM - (depH * 60 + depM);
              const hrs = Math.floor(totalMins / 60);
              const mins = totalMins % 60;
              const duration =
                hrs > 0 && mins > 0
                  ? `${hrs}h ${mins}m`
                  : hrs > 0
                    ? `${hrs}h`
                    : `${mins}m`;

              return { ...booking, flightDetails: { ...flight, duration } };
            } catch {
              return { ...booking, flightDetails: null };
            }
          }),
        );

        setTrips(enriched);
      } catch (err) {
        console.error("Failed to fetch trips", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTrips();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 px-6 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12 pb-6 border-b border-stone-200">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-2">
            My Account
          </p>
          <h1 className="text-3xl font-light tracking-tight text-stone-800">
            Your <span className="font-medium">Trips</span>
          </h1>
          {!loading && (
            <p className="mt-1.5 text-xs text-stone-400 font-mono">
              {trips.length} booking{trips.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="flex flex-col gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-28 rounded bg-stone-200 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && trips.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-stone-400">
            <span className="text-4xl mb-4 opacity-30">✈</span>
            <p className="text-sm font-light">No trips booked yet.</p>
          </div>
        )}

        {/* Trip Cards */}
        {!loading && trips.length > 0 && (
          <div className="flex flex-col gap-2">
            {trips
              .slice()
              .reverse()
              .map((trip) => {
                const flight = trip.flightDetails;
                return (
                  <div
                    key={trip.id}
                    className="bg-white border  border-stone-200 rounded-xl px-7 py-6 hover:border-stone-300 hover:shadow-sm transition-all duration-150"
                  >
                    {/* Card Top */}
                    <div className="flex items-start justify-between mb-5">
                      <span className="font-mono text-lg font-medium tracking-wide text-stone-800">
                        {trip.flight_number}
                      </span>

                      <div className="flex items-center gap-5">
                        {/* Source */}
                        <div>
                          <p className="text-2xl font-light text-stone-800 tracking-tight leading-none">
                            {flight?.source ?? "—"}
                          </p>
                          <p className="text-[11px] tracking-[0.15em] uppercase text-stone-400 mt-1.5 font-light">
                            {flight
                              ? flight.departure_time.slice(0, 5)
                              : "--:--"}
                          </p>
                        </div>

                        {/* Route line */}
                        <div className="flex flex-col items-center gap-1 min-w-20">
                          <span className="text-[11px] font-light text-stone-400">
                            {flight?.duration ?? "—"}
                          </span>
                          <div className="flex items-center w-full">
                            <div className="w-1 h-1 rounded-full bg-stone-300 shrink-0" />
                            <div className="flex-1 h-px bg-stone-200" />
                            <div className="w-1 h-1 rounded-full bg-stone-300 shrink-0" />
                          </div>
                        </div>

                        {/* Destination */}
                        <div>
                          <p className="text-2xl font-light text-stone-800 tracking-tight leading-none">
                            {flight?.destination ?? "—"}
                          </p>
                          <p className="text-[11px] tracking-[0.15em] uppercase text-stone-400 mt-1.5 font-light">
                            {flight ? flight.arrival_time.slice(0, 5) : "--:--"}
                          </p>
                        </div>
                      </div>

                      <span className="font-mono text-xs text-stone-400 text-right leading-relaxed">
                        {new Date(trip.booking_time).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                        <br />
                        {new Date(trip.booking_time).toLocaleTimeString(
                          "en-IN",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-stone-100 mb-5" />

                    {/* Meta Grid */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[10px] font-medium tracking-widest uppercase text-stone-400">
                          Seats
                        </span>
                        <span className="text-sm text-stone-600">
                          {trip.seats.join(", ")}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[10px] font-medium tracking-widest uppercase text-stone-400">
                          Passengers
                        </span>
                        <span className="text-sm text-stone-600">
                          {trip.passengers}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[10px] font-medium tracking-widest uppercase text-stone-400">
                          Price Paid
                        </span>
                        <span className="font-mono text-sm font-medium text-stone-800">
                          ₹{Number(trip.price_paid).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
