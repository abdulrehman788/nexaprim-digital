import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2.5"
      aria-label="NexaPrime Digital — Home"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent font-display text-sm font-extrabold tracking-tight text-black">
        NX
      </span>
      <span className="hidden font-display text-sm font-bold uppercase tracking-wider sm:block">
        <span className="text-white">NexaPrime</span>{" "}
        <span className="text-white">Digital</span>
      </span>
    </Link>
  );
}
