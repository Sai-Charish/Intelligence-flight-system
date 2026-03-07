import { seatId, getSeatStatus } from "@/services/modules";

export default function Seat({
  row,
  letter,
  bookedSeats,
  selectedSeats,
  onToggle,
}) {
  const seat = seatId(row, letter);
  const status = getSeatStatus(seat, bookedSeats, selectedSeats);

  if (status === "booked") {
    return (
      <div
        key={seat}
        title={seat}
        className="w-8 h-7 rounded border border-dashed border-neutral-300 bg-neutral-100 flex items-center justify-center cursor-not-allowed"
      >
        <span className="text-[9px] font-medium text-neutral-300">{seat}</span>
      </div>
    );
  }

  if (status === "selected") {
    return (
      <button
        key={seat}
        onClick={() => onToggle(seat)}
        title={seat}
        className="w-8 h-7 rounded border-2 border-neutral-900 bg-neutral-900 flex items-center justify-center shadow-sm transition-all active:scale-95"
      >
        <span className="text-[9px] font-bold text-white">{seat}</span>
      </button>
    );
  }

  // available
  return (
    <button
      key={seat}
      onClick={() => onToggle(seat)}
      title={seat}
      className="w-8 h-7 rounded border border-neutral-200 bg-white flex items-center justify-center hover:border-neutral-400 hover:bg-neutral-50 transition-all cursor-pointer"
    >
      <span className="text-[9px] font-medium text-neutral-400">{seat}</span>
    </button>
  );
}
