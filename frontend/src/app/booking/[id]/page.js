"use client";

import { useParams } from "next/navigation";
import { useBooking } from "@/hooks/useBooking";
import LoadingScreen from "@/components/LoadindScreen";
import SeatMap from "@/components/SeatMap";
import BookingSummary from "@/components/BookinfSummary";

/**
 * BookingPage
 *
 * Top-level page component. Responsible only for:
 * - Reading the flight ID from the URL
 * - Wiring the useBooking hook to child components
 */
export default function BookingPage() {
  const { id } = useParams();

  const {
    bookedSeats,
    selectedSeats,
    loading,
    totalPrice,
    availableCount,
    toggleSeat,
    handleBooking,
  } = useBooking(id);

  if (loading) return <LoadingScreen />;

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
        <div className="flex gap-8 items-start">
          <SeatMap
            bookedSeats={bookedSeats}
            selectedSeats={selectedSeats}
            onToggle={toggleSeat}
          />

          <BookingSummary
            selectedSeats={selectedSeats}
            availableCount={availableCount}
            totalPrice={totalPrice}
            onToggleSeat={toggleSeat}
            onConfirm={handleBooking}
          />
        </div>
      </div>
    </div>
  );
}
