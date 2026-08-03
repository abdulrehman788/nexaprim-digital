import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2.5"
      aria-label="Expandova — Home"
    >
      <span
        className="shadow-glow flex h-9 w-9 items-center justify-center rounded-lg font-display text-sm font-extrabold tracking-tight text-white"
        style={{
          background: "linear-gradient(145deg, #7c3aed 0%, #a855f7 48%, #f97316 100%)",
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
