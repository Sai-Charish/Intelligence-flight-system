import Seat from "./Seat";
import { LEFT_LETTERS, RIGHT_LETTERS } from "@/services/modules";

export default function SeatRow({ row, bookedSeats, selectedSeats, onToggle }) {
  return (
    <div className="flex flex-col items-center shrink-0 gap-1.5">
      {/* Row number */}
      <span className="text-xs text-neutral-300 tabular-nums h-5 leading-5">
        {row}
      </span>

      {/* Left seats: A B C */}
      {LEFT_LETTERS.map((letter) => (
        <Seat
          key={letter}
          row={row}
          letter={letter}
          bookedSeats={bookedSeats}
          selectedSeats={selectedSeats}
          onToggle={onToggle}
        />
      ))}

      {/* Aisle gap */}
      <div className="h-4" />

      {/* Right seats: D E F */}
      {RIGHT_LETTERS.map((letter) => (
        <Seat
          key={letter}
          row={row}
          letter={letter}
          bookedSeats={bookedSeats}
          selectedSeats={selectedSeats}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
