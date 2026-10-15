const COLORS = ["bg-teal-600", "bg-amber-400", "bg-sky-500", "bg-rose-400", "bg-slate-900"];

export default function Confetti() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {Array.from({ length: 36 }).map((_, i) => (
        <span
          key={i}
          className={`confetti-piece absolute top-0 h-2.5 w-2 rounded-sm ${COLORS[i % COLORS.length]}`}
          style={{
            left: `${(i * 37) % 100}%`,
            animationDelay: `${(i % 9) * 60}ms`,
            animationDuration: `${1.6 + (i % 5) * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}