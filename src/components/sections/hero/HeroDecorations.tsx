export function HeroDecorations() {
  return (
    <>
      <svg
        className="pointer-events-none absolute left-[5%] top-[-5%] h-[110%] w-[90%] opacity-20"
        viewBox="0 0 500 500"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="220" cy="280" r="180" stroke="#D4AF37" strokeWidth="1.2" />
        <circle cx="220" cy="280" r="230" stroke="#D4AF37" strokeWidth="0.9" opacity="0.7" />
        <circle cx="220" cy="280" r="280" stroke="#D4AF37" strokeWidth="0.7" opacity="0.45" />
        <path
          d="M 60 380 Q 200 120 420 200"
          stroke="#D4AF37"
          strokeWidth="1.5"
          opacity="0.35"
          fill="none"
        />
      </svg>

      <span
        className="absolute left-[10%] top-[6%] h-1.5 w-1.5 rounded-full bg-[#D4AF37] opacity-50 shadow-[0_0_8px_#D4AF37]"
        aria-hidden="true"
      />
      <span
        className="absolute left-[22%] top-[14%] h-1 w-1 rounded-full bg-[#D4AF37] opacity-30"
        aria-hidden="true"
      />
      <span
        className="absolute right-[18%] top-[22%] h-1 w-1 rounded-full bg-[#D4AF37] opacity-25"
        aria-hidden="true"
      />
    </>
  );
}
