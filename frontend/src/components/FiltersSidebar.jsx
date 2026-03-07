"use client";

import { useState } from "react";

export default function FiltersSidebar({
  flights = [],
  filteredFlights = [],
  minPrice,
  onFilterChange,
}) {
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("price_asc");

  function handleChange(newMaxPrice, newSortBy) {
    onFilterChange({ maxPrice: newMaxPrice, sortBy: newSortBy });
  }

  return (
    <aside className="sticky top-20 w-44 shrink-0">
      <p className="text-xs font-medium tracking-[0.2em] uppercase text-stone-400 mb-5">
        Filters
      </p>

      <div className="mb-5">
        <label className="block text-xs font-light text-stone-500 mb-2">
          Max Price (₹)
        </label>
        <input
          type="number"
          placeholder="e.g. 8000"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
            handleChange(e.target.value, sortBy);
          }}
          className="w-full px-3 py-2 text-xs font-light text-stone-700 bg-white border border-stone-200 rounded-lg outline-none placeholder:text-stone-300 focus:border-stone-400 transition-colors"
        />
      </div>

      <div className="h-px bg-stone-200 my-5" />

      <div className="mb-5">
        <label className="block text-xs font-light text-stone-500 mb-2">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            handleChange(maxPrice, e.target.value);
          }}
          className="w-full px-3 py-2 text-xs font-light text-stone-600 bg-white border border-stone-200 rounded-lg outline-none cursor-pointer focus:border-stone-400 transition-colors"
        >
          <option value="price_asc">Price — Low to High</option>
          <option value="price_desc">Price — High to Low</option>
          <option value="dep_asc">Departure — Earliest</option>
          <option value="dep_desc">Departure — Latest</option>
        </select>
      </div>

      {flights.length > 0 && (
        <>
          <div className="h-px bg-stone-200 my-5" />
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-stone-400 mb-4">
            Summary
          </p>
          {[
            { label: "Total", value: flights.length },
            { label: "Showing", value: filteredFlights.length },
            {
              label: "Lowest",
              value: `₹${minPrice?.toLocaleString("en-IN")}`,
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex justify-between py-2 border-b border-stone-100 last:border-0"
            >
              <span className="text-xs font-light text-stone-400">{label}</span>
              <span className="text-xs font-medium text-stone-600">
                {value}
              </span>
            </div>
          ))}
        </>
      )}
    </aside>
  );
}
