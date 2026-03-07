export default function SeatLegend() {
  return (
    <div className="flex items-center gap-6 mt-5 pt-4 border-t border-neutral-100">
      <div className="flex items-center gap-2">
        <div className="w-8 h-5 rounded border border-neutral-200 bg-white" />
        <span className="text-xs text-neutral-400">Available</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-5 rounded bg-neutral-900 border-2 border-neutral-900" />
        <span className="text-xs text-neutral-400">Selected</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-5 rounded border border-dashed border-neutral-300 bg-neutral-100" />
        <span className="text-xs text-neutral-400">Booked</span>
      </div>
    </div>
  );
}
