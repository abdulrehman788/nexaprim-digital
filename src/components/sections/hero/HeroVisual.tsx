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
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <path
        d="M0 34 L18 28 L36 31 L54 20 L72 24 L90 10 L108 14 L120 8 L120 40 L0 40 Z"
        fill={`url(#${id}-fill)`}
      />
      <path
        d="M0 34 L18 28 L36 31 L54 20 L72 24 L90 10 L108 14 L120 8"
        stroke={`url(#${id}-stroke)`}
        strokeWidth="2.5"
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
  "rounded-2xl border border-white/15 bg-[#0a0a12]/80 p-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9),0_0_40px_-12px_rgba(124,58,237,0.4)] backdrop-blur-xl sm:p-5";

export function HeroVisual() {
  const { totalGrowth, revenue, activeProjects } = heroStatCards;

  return (
    <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:ml-auto lg:max-w-none lg:min-h-[480px] xl:min-h-[520px]">
      <div
        className="pointer-events-none absolute -right-6 top-4 h-44 w-44 rounded-full bg-violet-600/30 blur-3xl lg:h-56 lg:w-56"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 right-4 h-32 w-32 rounded-full bg-orange-500/25 blur-3xl lg:h-44 lg:w-44"
        aria-hidden="true"
      />

      <div className="relative grid grid-cols-2 gap-3 sm:gap-4 lg:absolute lg:inset-0 lg:grid-cols-1 lg:gap-0">
        {/* Total Growth */}
        <div className={`${glassCard} col-span-1 lg:absolute lg:left-0 lg:top-0 lg:w-[48%] xl:w-60`}>
          <div className="flex items-center justify-between">
            <span className="text-[0.7rem] font-medium text-slate-400 sm:text-xs">
              {totalGrowth.label}
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
            </span>
          </div>
          <p className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
            {totalGrowth.value}
          </p>
          <p className="mt-1 text-xs font-semibold text-emerald-400">+122% this quarter</p>
          <Sparkline id="growth" className="mt-3 h-9 w-full sm:h-10" />
        </div>

        {/* Revenue + reviews */}
        <div className={`${glassCard} col-span-1 lg:absolute lg:right-0 lg:top-[14%] lg:w-[54%] xl:w-72`}>
          <span className="text-[0.7rem] font-medium text-slate-400 sm:text-xs">
            {revenue.label}
          </span>
          <p className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
            {revenue.value}
          </p>
          <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
            <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
            {revenue.delta}
          </div>
          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
            ))}
            <span className="ml-2 text-xs font-medium text-slate-400">98% client satisfaction</span>
          </div>
          <Sparkline id="revenue" className="mt-3 h-9 w-full sm:h-11" />
        </div>

        {/* Active Projects */}
        <div
          className={`${glassCard} col-span-2 lg:absolute lg:bottom-2 lg:left-[6%] lg:w-[52%] xl:left-8 xl:w-64`}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-[0.7rem] font-medium text-slate-400 sm:text-xs">
                {activeProjects.label}
              </span>
              <p className="mt-1.5 font-display text-3xl font-bold text-white sm:text-4xl">
                {activeProjects.value}
              </p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wide text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
              {activeProjects.note}
            </span>
          </div>
          <div className="mt-4 flex -space-x-2.5">
            {avatarColors.map((color) => (
              <span
                key={color}
                className={`h-8 w-8 rounded-full border-2 border-[#0a0a12] bg-gradient-to-br sm:h-9 sm:w-9 ${color}`}
                aria-hidden="true"
              />
            ))}
            <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0a0a12] bg-violet-500/40 text-[0.65rem] font-bold text-white sm:h-9 sm:w-9">
              +9
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
