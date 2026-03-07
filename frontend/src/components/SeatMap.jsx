import SeatRow from "./SeatRow";
import SeatLegend from "./SeatLegend";

import { LEFT_LETTERS, ROWS, RIGHT_LETTERS } from "@/services/modules";

export default function SeatMap({ bookedSeats, selectedSeats, onToggle }) {
  return (
    <div className="flex-1 bg-white overflow-auto rounded-2xl border border-neutral-100 shadow-sm px-6 py-5">
      <div className="overflow-x-auto scroll-smooth pb-2">
        <div className="flex gap-1.5">
          {/* Label column: letter labels aligned with seat positions */}
          <div className="flex flex-col shrink-0">
            {/* Spacer for the row number at top */}
            <div className="h-5 mb-1.5" />

            {LEFT_LETTERS.map((l) => (
              <div
                key={l}
                className="w-6 h-7 flex items-center justify-end pr-1 mb-1.5"
              >
                <span className="text-xs font-semibold text-neutral-300 tracking-widest">
                  {l}
                </span>
              </div>
            ))}

            {/* Aisle icon */}
            <div className="h-4 flex items-center justify-end pr-1 mb-1.5">
              <span className="text-xs text-neutral-200">✈</span>
            </div>

            {RIGHT_LETTERS.map((l) => (
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

          {/* One column per aircraft row */}
          {Array.from({ length: ROWS }, (_, i) => i + 1).map((row) => (
            <SeatRow
              key={row}
              row={row}
              bookedSeats={bookedSeats}
              selectedSeats={selectedSeats}
              onToggle={onToggle}
            />
          ))}
        </div>
      </div>

      <SeatLegend />
    </div>
  );
}
