import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2.5"
      aria-label="Expandova — Home"
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg font-display text-sm font-extrabold tracking-tight text-white shadow-[0_8px_18px_-10px_rgba(249,115,22,0.8)]"
        style={{
          background: "linear-gradient(145deg, #ea580c, #f97316 55%, #fb923c)",
        }}
      >
        EX
      </span>
      <span className="hidden font-display text-[13px] font-bold uppercase tracking-[0.14em] text-white sm:block">
        Expandova
      </span>
    </Link>
  );
}
