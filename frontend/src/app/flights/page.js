"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FlightCard from "@/components/FlghtCard";
import FiltersSidebar from "@/components/FiltersSidebar";

function getDurationMins(flight) {
  const [dh, dm] = flight.departure_time.split(":").map(Number);
  const [ah, am] = flight.arrival_time.split(":").map(Number);
  return ah * 60 + am - (dh * 60 + dm);
}

export default function FlightsPage() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source");
  const destination = searchParams.get("destination");
  const date = searchParams.get("date");

  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("price_asc");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchFlights() {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:8000/api/flights/?source=${source}&destination=${destination}&date=${date}`,
        );
        const data = await res.json();
        setFlights(data);
        setFilteredFlights(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    if (source && destination && date) fetchFlights();
  }, [source, destination, date]);

  useEffect(() => {
    let updated = [...flights];
    if (maxPrice)
      updated = updated.filter((f) => f.base_price <= Number(maxPrice));
    updated.sort((a, b) => {
      if (sortBy === "price_asc") return a.base_price - b.base_price;
      if (sortBy === "price_desc") return b.base_price - a.base_price;
      if (sortBy === "dep_asc")
        return a.departure_time.localeCompare(b.departure_time);
      if (sortBy === "dep_desc")
        return b.departure_time.localeCompare(a.departure_time);
      return 0;
    });
    setFilteredFlights(updated);
  }, [maxPrice, sortBy, flights]);

  const minPrice = flights.length
    ? Math.min(...flights.map((f) => f.base_price))
    : null;
  const minDuration = flights.length
    ? Math.min(...flights.map(getDurationMins))
    : null;

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  function handleFilterChange({ maxPrice: newMaxPrice, sortBy: newSortBy }) {
    setMaxPrice(newMaxPrice);
    setSortBy(newSortBy);
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-5xl mx-auto px-10 py-12">
        {/* Route heading */}
        <div className="mb-10">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-stone-400 mb-3">
            Machine Learning · Flight Pricing
          </p>
          <h1 className="text-4xl font-light text-stone-800 leading-tight tracking-tight">
            {source} <span className="font-light text-stone-300">→</span>{" "}
            <span className="font-semibold text-stone-900">{destination}</span>
          </h1>
          <p className="text-stone-400 text-sm font-light mt-2">
            {formattedDate}
            {flights.length > 0 && ` · ${flights.length} flights available`}
            {minPrice && ` · from ₹${minPrice.toLocaleString("en-IN")}`}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-stone-200 mb-10" />

        <div className="flex gap-12 items-start">
          {/* SIDEBAR */}
          <FiltersSidebar
            flights={flights}
            filteredFlights={filteredFlights}
            minPrice={minPrice}
            onFilterChange={handleFilterChange}
          />

          {/* RESULTS */}
          <div className="flex-1">
            {loading && (
              <p className="text-sm font-light text-stone-400 text-center py-16">
                Searching flights...
              </p>
            )}

            {!loading && filteredFlights.length === 0 && (
              <div className="text-center py-16">
                <p className="text-sm font-light text-stone-500">
                  No flights found
                </p>
                <p className="text-xs font-light text-stone-400 mt-1">
                  Try adjusting your filters.
                </p>
              </div>
            )}

            {!loading &&
              filteredFlights.map((flight, i) => (
                <div
                  key={flight.id}
                  style={{ animation: `fadeUp 0.3s ease ${i * 0.05}s both` }}
                >
                  <FlightCard
                    flight={flight}
                    isCheapest={flight.base_price === minPrice}
                    isFastest={getDurationMins(flight) === minDuration}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
      `}</style>
    </div>
  );
}
