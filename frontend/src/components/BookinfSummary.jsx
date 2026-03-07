export default function BookingSummary({
  selectedSeats,
  availableCount,
  totalPrice,
  onToggleSeat,
  onConfirm,
}) {
  const seatCount = selectedSeats.length;
  const maxSeats = 5;

  return (
    <div className="w-56 shrink-0 bg-white rounded-2xl border border-neutral-100 shadow-sm px-5 py-5 flex flex-col gap-5">
      {/* Stats */}
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-2">
          Summary
        </p>
        <div className="flex justify-between text-xs text-neutral-500 mb-1">
          <span>Selected</span>
          <span className="font-semibold text-neutral-800">{seatCount}</span>
        </div>
        <div className="flex justify-between text-xs text-neutral-500 mb-1">
          <span>Available</span>
          <span className="font-semibold text-neutral-800">
            {availableCount}
          </span>
        </div>
        <div className="flex justify-between text-xs text-neutral-500">
          <span>Total Price</span>
          <span className="font-semibold text-neutral-800">{totalPrice}</span>
        </div>
      </div>

      {/* Selected seat tags */}
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-2">
          Seats
        </p>
        {seatCount === 0 ? (
          <div className="bg-neutral-100 rounded">
            <p className="px-2 py-0.5 text-xs text-neutral-400 font-bold">
              No seats selected
            </p>
          </div>
        ) : (
          <div className="flex gap-1.5 overflow-x-scroll">
            {selectedSeats.map((s) => (
              <button
                key={s}
                onClick={() => onToggleSeat(s)}
                className="px-2 py-0.5 rounded bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-700 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Confirm button */}
      <div className="mt-auto">
        <button
          onClick={onConfirm}
          disabled={seatCount === 0}
          className={`w-full py-3 rounded-xl text-sm font-semibold transition-all
            ${
              seatCount === 0
                ? "bg-neutral-100 text-neutral-300 cursor-not-allowed"
                : "bg-neutral-900 text-white hover:bg-neutral-700 active:scale-95"
            }`}
        >
          {seatCount === 0
            ? "Select seats"
            : `Confirm ${seatCount}/${maxSeats} seat${seatCount > 1 ? "s" : ""}`}
        </button>
      </div>
    </div>
  );
}
