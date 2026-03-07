export function SeatsIndicator({ seats }) {
  if (seats == null) return null;
  const isLow = seats <= 50;
  const isMedium = seats <= 90;

  return (
    <div className="flex items-center gap-1.5 mt-1">
      <div className="flex gap-0.5">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full ${
              isLow
                ? i === 0
                  ? "bg-red-400"
                  : "bg-stone-200"
                : isMedium
                  ? i < 2
                    ? "bg-amber-400"
                    : "bg-stone-200"
                  : "bg-emerald-400"
            }`}
          />
        ))}
      </div>
      <p
        className={`text-[10px] font-light ${
          isLow
            ? "text-red-400"
            : isMedium
              ? "text-amber-500"
              : "text-stone-400"
        }`}
      >
        {isLow ? `Only ${seats} left` : `${seats} seats`}
      </p>
    </div>
  );
}
