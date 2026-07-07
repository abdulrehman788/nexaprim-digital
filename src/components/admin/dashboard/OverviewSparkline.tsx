interface OverviewSparklineProps {
  color: string;
  points: readonly number[];
  className?: string;
}

const WIDTH = 120;
const HEIGHT = 44;
const PAD_Y = 5;

function buildCoords(points: readonly number[]) {
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const range = max - min || 1;
  const stepX = WIDTH / (points.length - 1 || 1);

  return points.map((value, index) => {
    const x = index * stepX;
    const normalized = (value - min) / range;
    const y = HEIGHT - PAD_Y - normalized * (HEIGHT - PAD_Y * 2);
    return { x, y };
  });
}

function toSmoothPath(coords: { x: number; y: number }[]) {
  if (coords.length === 0) return "";
  let d = `M ${coords[0]!.x} ${coords[0]!.y}`;
  for (let i = 1; i < coords.length; i += 1) {
    const prev = coords[i - 1]!;
    const curr = coords[i]!;
    const midX = (prev.x + curr.x) / 2;
    d += ` C ${midX} ${prev.y}, ${midX} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  return d;
}

export function OverviewSparkline({ color, points, className }: OverviewSparklineProps) {
  const coords = buildCoords(points);
  const linePath = toSmoothPath(coords);
  const areaPath = `${linePath} L ${WIDTH} ${HEIGHT} L 0 ${HEIGHT} Z`;
  const last = coords[coords.length - 1];
  const gradientId = `spark-${color.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={className ?? "h-12 w-full"}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradientId})`} />
      <path
        d={linePath}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {last ? (
        <>
          <circle cx={last.x} cy={last.y} r="4.5" fill={color} fillOpacity="0.18" />
          <circle cx={last.x} cy={last.y} r="2.25" fill={color} />
        </>
      ) : null}
    </svg>
  );
}
