interface AdminSparklineProps {
  color?: string;
  trend?: "up" | "down" | "flat";
  className?: string;
}

const paths = {
  up: "M1 12 C4 10, 7 11, 10 8 S16 6, 23 3",
  down: "M1 4 C4 6, 7 5, 10 8 S16 10, 23 13",
  flat: "M1 8 C5 7.5, 9 8.5, 13 8 S17 7.5, 23 8",
};

export function AdminSparkline({
  color = "#8b5cf6",
  trend = "up",
  className,
}: AdminSparklineProps) {
  return (
    <svg
      viewBox="0 0 24 14"
      className={className ?? "h-7 w-full"}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d={paths[trend]}
        fill="none"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
