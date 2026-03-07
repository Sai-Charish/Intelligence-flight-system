import React from "react";

export default function RouteHeading({
  flightsLen,
  formattedDate,
  source,
  destination,
  minPrice,
}) {
  return (
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
        {flightsLen > 0 && ` · ${flightsLen} flights available`}
        {minPrice && ` · from ₹${minPrice.toLocaleString("en-IN")}`}
      </p>
    </div>
  );
}
