"use client";

import { useState } from "react";
import { SeatsIndicator } from "./SeatIndicator";
import { useRouter } from "next/navigation";

function formatTime(timeString) {
  return timeString?.slice(0, 5) ?? "--:--";
}

function getDuration(departure, arrival) {
  if (!departure || !arrival) return null;
  const [dh, dm] = departure.split(":").map(Number);
  const [ah, am] = arrival.split(":").map(Number);
  let diff = ah * 60 + am - (dh * 60 + dm);
  if (diff < 0) diff += 24 * 60; // handle overnight flights
  if (diff === 0) return null;
  return `${Math.floor(diff / 60)}h ${diff % 60}m`;
}

export default function FlightCard({
  flight,
  isCheapest = false,
  isFastest = false,
}) {
  const [hovered, setHovered] = useState(false);

  const router = useRouter();

  const dep = formatTime(flight.departure_time);
  const arr = formatTime(flight.arrival_time);
  const duration = getDuration(flight.departure_time, flight.arrival_time);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        bg-white rounded-xl border px-6 py-5 mb-3 
        grid grid-cols-[1fr_auto] gap-6 items-center
        transition-all duration-200
        ${hovered ? "border-stone-300 shadow-sm" : "border-stone-200"}
      `}
    >
      {/* LEFT */}
      <div className="flex items-center gap-10">
        {/* Flight number + badges */}
        <div className="min-w-20">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-stone-700">
            {flight.flight_number}
          </p>
          <p className="text-xs font-light text-stone-400 mt-0.5">Non-stop</p>
          <div className="flex gap-1.5 flex-col mt-2.5 ">
            {isCheapest && (
              <span className="text-[9px] font-medium tracking-[0.15em] uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-500">
                Cheapest
              </span>
            )}
            {isFastest && (
              <span className="text-[9px] font-medium tracking-[0.15em] uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-500">
                Fastest
              </span>
            )}
          </div>
        </div>

        {/* Times + duration */}
        <div className="flex items-center gap-5">
          <div>
            <p className="text-2xl font-light text-stone-800 tracking-tight leading-none">
              {dep}
            </p>
            <p className="text-[11px] tracking-[0.15em] uppercase text-stone-400 mt-1.5 font-light">
              {flight.source}
            </p>
          </div>

          <div className="flex flex-col items-center gap-1 min-w-20">
            {duration && (
              <span className="text-[11px] font-light text-stone-400">
                {duration}
              </span>
            )}
            <div className="flex items-center w-full">
              <div className="w-1 h-1 rounded-full bg-stone-300 shrink-0" />
              <div className="flex-1 h-px bg-stone-200" />
              <div className="w-1 h-1 rounded-full bg-stone-300 shrink-0" />
            </div>
          </div>

          <div>
            <p className="text-2xl font-light text-stone-800 tracking-tight leading-none">
              {arr}
            </p>
            <p className="text-[11px] tracking-[0.15em] uppercase text-stone-400 mt-1.5 font-light">
              {flight.destination}
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="text-right">
        <p className="text-2xl font-semibold text-stone-900 tracking-tight leading-none">
          ₹{flight.base_price?.toLocaleString("en-IN")}
        </p>
        <p className="text-[11px] font-light text-stone-400 mt-1">per person</p>
        <div className="flex justify-end">
          <SeatsIndicator seats={flight.available_seats} />
        </div>
        <button
          className={`
            mt-3 px-4 py-2 rounded-lg text-xs font-medium tracking-wide
            border transition-all duration-200
            ${
              hovered
                ? "bg-stone-900 text-white border-stone-900 "
                : "bg-stone-50 text-stone-600 border-stone-200"
            }
          `}
          onClick={() => router.push(`/booking/${flight.id}`)}
        >
          Book
        </button>
      </div>
    </div>
  );
}
