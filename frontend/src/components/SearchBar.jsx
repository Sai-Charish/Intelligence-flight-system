"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCities } from "@/services/modules";

export default function SearchBar() {
  const router = useRouter();

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const [showSourceDropdown, setShowSourceDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);

  const sourceRef = useRef(null);
  const destinationRef = useRef(null);

  const [cities, setCity] = useState([]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sourceRef.current && !sourceRef.current.contains(e.target))
        setShowSourceDropdown(false);
      if (destinationRef.current && !destinationRef.current.contains(e.target))
        setShowDestinationDropdown(false);
    };

    async function fetchCities() {
      const data = await getCities();
      setCity(data);
    }
    document.addEventListener("mousedown", handleClickOutside);
    fetchCities();
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSource = cities.filter((city) =>
    city.name.toLowerCase().includes(source.toLowerCase()),
  );

  const filteredDestination = cities.filter((city) =>
    city.name.toLowerCase().includes(destination.toLowerCase()),
  );

  const handleSearch = () => {
    if (!source || !destination || !date) {
      alert("Please fill all fields");
      return;
    }
    router.push(
      `/flights?source=${source}&destination=${destination}&date=${date}`,
    );
  };

  const swapCities = () => {
    setSource(destination);
    setDestination(source);
    setShowSourceDropdown(false);
    setShowDestinationDropdown(false);
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-2 flex items-center gap-1 shadow-sm ">
      {/* From */}
      <div className="relative flex-1" ref={sourceRef}>
        <div className="flex flex-col px-4 py-2">
          <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-stone-400">
            From
          </span>
          <input
            type="text"
            placeholder="City or airport"
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
              setShowSourceDropdown(true);
            }}
            className="text-sm border p-1 pl-3 border-gray-300 rounded-xl text-stone-800 placeholder-stone-300 font-light bg-transparent outline-none mt-0.5 focus:border-gray-500"
          />
        </div>
        {showSourceDropdown && filteredSource.length > 0 && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white border border-stone-100 rounded-xl shadow-lg z-10 overflow-hidden">
            {filteredSource.map((city) => (
              <div
                key={city.id}
                className="px-4 py-2.5 text-sm text-stone-600 hover:bg-stone-50 cursor-pointer transition-colors"
                onClick={() => {
                  setSource(city.name);
                  setShowSourceDropdown(false);
                }}
              >
                <span className="font-medium text-stone-800">{city.name}</span>
                <span className="text-stone-400 ml-2 text-xs">
                  {city.airport_code}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Swap */}
      <button
        onClick={swapCities}
        className="w-8 h-8 flex hover:cursor-pointer items-center justify-center rounded-full border border-stone-200 text-stone-400 hover:text-stone-700 hover:border-stone-400 transition-all text-sm shrink-0"
      >
        ⇄
      </button>

      {/* To */}
      <div className="relative flex-1" ref={destinationRef}>
        <div className="flex flex-col px-4 py-2">
          <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-stone-400">
            To
          </span>
          <input
            type="text"
            placeholder="City or airport"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setShowDestinationDropdown(true);
            }}
            className=" p-1 pl-3 text-sm border border-gray-300 rounded-xl focus:border-gray-500 text-stone-800 placeholder-stone-300 font-light bg-transparent outline-none mt-0.5"
          />
        </div>
        {showDestinationDropdown && filteredDestination.length > 0 && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white border border-stone-100 rounded-xl shadow-lg z-10 overflow-hidden">
            {filteredDestination.map((city) => (
              <div
                key={city.id}
                className=" px-4 py-2.5 text-sm text-stone-600 hover:bg-stone-50 cursor-pointer transition-colors"
                onClick={() => {
                  setDestination(city.name);
                  setShowDestinationDropdown(false);
                }}
              >
                <span className="font-medium text-stone-800">{city.name}</span>
                <span className="text-stone-400 ml-2 text-xs">
                  {city.airport_code}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-stone-100 shrink-0" />

      {/* Date */}
      <div className="flex flex-col px-4 py-2 shrink-0">
        <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-stone-400">
          Date
        </span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className=" text-sm border border-gray-300 p-1 pl-3  focus:border-gray-500 rounded-xl  font-light bg-transparent outline-none mt-0.5 cursor-pointer "
        />
      </div>

      {/* Search */}
      <button
        onClick={handleSearch}
        className="ml-3 bg-stone-900 text-white text-xs font-medium tracking-widest uppercase px-5 rounded-xl hover:bg-stone-700 transition-colors duration-200 shrink-0 self-stretch"
      >
        Search
      </button>
    </div>
  );
}
