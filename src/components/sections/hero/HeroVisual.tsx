import { Star, TrendingUp } from "lucide-react";

import { heroStatCards } from "@/data/hero";

function Sparkline({
  className,
  id,
}: {
  className?: string;
  id: string;
}) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <path
        d="M0 32 L20 26 L40 30 L60 18 L80 22 L100 8 L120 12 L120 40 L0 40 Z"
        fill={`url(#${id}-fill)`}
      />
      <path
        d="M0 32 L20 26 L40 30 L60 18 L80 22 L100 8 L120 12"
        stroke={`url(#${id}-stroke)`}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const avatarColors = [
  "from-violet-500 to-fuchsia-500",
  "from-orange-400 to-rose-500",
  "from-indigo-400 to-violet-600",
  "from-amber-400 to-orange-500",
];

const glassCard =
  "rounded-xl border border-white/12 bg-[#0b0b14]/75 p-3.5 shadow-[0_16px_48px_-18px_rgba(0,0,0,0.85),0_0_32px_-16px_rgba(124,58,237,0.35)] backdrop-blur-xl sm:rounded-2xl sm:p-5";

export function HeroVisual() {
  const { totalGrowth, revenue, activeProjects } = heroStatCards;

  return (
    <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:mx-0 lg:ml-auto lg:aspect-[5/4] lg:h-auto lg:max-h-[min(420px,52svh)] lg:max-w-none xl:max-h-[min(460px,56svh)]">
      <div
        className="pointer-events-none absolute -right-4 top-8 hidden h-40 w-40 rounded-full bg-violet-600/25 blur-3xl lg:block xl:h-56 xl:w-56"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-6 right-8 hidden h-28 w-28 rounded-full bg-orange-500/20 blur-3xl lg:block xl:h-40 xl:w-40"
        aria-hidden="true"
      />

      {/* Compact stack on mobile; floating layout on lg+ */}
      <div className="grid grid-cols-2 gap-3 lg:absolute lg:inset-0 lg:grid-cols-1 lg:gap-0">
        {/* Total Growth */}
        <div className={`${glassCard} col-span-1 lg:absolute lg:left-0 lg:top-[2%] lg:w-[46%] xl:w-56`}>
          <div className="flex items-center justify-between">
            <span className="text-[0.65rem] font-medium text-slate-400 sm:text-xs">
              {totalGrowth.label}
            </span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 sm:h-6 sm:w-6">
              <TrendingUp className="h-3 w-3 text-emerald-400 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
            </span>
          </div>
          <p className="mt-1.5 font-display text-2xl font-bold text-white sm:mt-2 sm:text-3xl">
            {totalGrowth.value}
          </p>
          <p className="mt-0.5 text-[0.65rem] font-semibold text-emerald-400 sm:text-xs">
            +122%
          </p>
          <Sparkline id="growth" className="mt-2 h-7 w-full sm:mt-3 sm:h-9" />
        </div>

        {/* Revenue Generated */}
        <div
          className={`${glassCard} col-span-1 lg:absolute lg:right-0 lg:top-[18%] lg:w-[52%] xl:w-64`}
        >
          <span className="text-[0.65rem] font-medium text-slate-400 sm:text-xs">
            {revenue.label}
          </span>
          <p className="mt-1.5 font-display text-2xl font-bold text-white sm:mt-2 sm:text-3xl">
            {revenue.value}
          </p>
          <div className="mt-0.5 flex items-center gap-1 text-[0.65rem] font-semibold text-emerald-400 sm:mt-1 sm:gap-1.5 sm:text-xs">
            <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
            {revenue.delta}
          </div>
          <div className="mt-1.5 hidden items-center gap-0.5 text-amber-400 sm:mt-2 sm:flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-amber-400" aria-hidden="true" />
            ))}
            <span className="ml-1.5 text-[0.65rem] font-medium text-slate-400">
              98% satisfaction
            </span>
          </div>
          <Sparkline id="revenue" className="mt-2 h-7 w-full sm:mt-3 sm:h-10" />
        </div>

        {/* Active Projects */}
        <div
          className={`${glassCard} col-span-2 lg:absolute lg:bottom-0 lg:left-[8%] lg:w-[50%] xl:left-10 xl:w-60`}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-[0.65rem] font-medium text-slate-400 sm:text-xs">
                {activeProjects.label}
              </span>
              <p className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                {activeProjects.value}
              </p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wide text-emerald-400 sm:text-[0.65rem]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              {activeProjects.note}
            </span>
          </div>
          <div className="mt-3 flex -space-x-2 sm:mt-4">
            {avatarColors.map((color) => (
              <span
                key={color}
                className={`h-7 w-7 rounded-full border-2 border-[#0b0b14] bg-gradient-to-br sm:h-8 sm:w-8 ${color}`}
                aria-hidden="true"
              />
            ))}
            <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0b0b14] bg-violet-500/30 text-[0.6rem] font-semibold text-white sm:h-8 sm:w-8 sm:text-[0.65rem]">
              +9
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
