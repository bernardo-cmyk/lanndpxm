// Divisor ondulado, como la línea de la ola en la arena.
export default function Wave({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      className={`${className} ${flip ? "rotate-180" : ""}`}
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden
      style={{ height: 60, width: "100%" }}
    >
      <path
        fill="currentColor"
        d="M0 48c120-26 240-26 360 0s240 26 360 0 240-26 360 0 240 26 360 0v32H0z"
      />
    </svg>
  );
}
