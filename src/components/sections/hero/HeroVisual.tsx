import {
  BarChart3,
  Grid2X2,
  Info,
  LayoutDashboard,
  Shield,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

import {
  heroPerformanceOverview,
  heroStatCards,
} from "@/data/hero";

const glass =
  "rounded-2xl border border-white/15 bg-[#0a0a12]/88 shadow-[0_24px_64px_-20px_rgba(0,0,0,0.95),0_0_40px_-12px_rgba(124,58,237,0.4)] sm:backdrop-blur-xl";

function PerformanceChart() {
  const id = "perf-main";
  const { months, chartPeak } = heroPerformanceOverview;

  return (
    <div className="relative mt-3">
      <svg
        viewBox="0 0 360 120"
        fill="none"
        preserveAspectRatio="none"
        className="h-28 w-full sm:h-32 lg:h-[8.5rem]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#a855f7" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="55%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
          <linearGradient id={`${id}-alt`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
        </defs>
        {[24, 48, 72, 96].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="360"
            y2={y}
            stroke="white"
            strokeOpacity="0.06"
          />
        ))}
        <path
          d="M0 95 L60 88 L120 92 L180 68 L240 74 L300 38 L360 28 L360 120 L0 120 Z"
          fill={`url(#${id}-fill)`}
        />
        <path
          d="M0 95 L60 88 L120 92 L180 68 L240 74 L300 38 L360 28"
          stroke={`url(#${id}-stroke)`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0 102 L60 98 L120 100 L180 82 L240 86 L300 52 L360 44"
          stroke={`url(#${id}-alt)`}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 4"
          opacity="0.85"
        />
        <circle cx="360" cy="28" r="5" fill="#fb923c" />
        <circle cx="360" cy="28" r="10" fill="#fb923c" fillOpacity="0.25" />
      </svg>
      <span className="absolute right-0 top-1 rounded-md bg-accent px-1.5 py-0.5 text-[0.6rem] font-bold text-white shadow-lg sm:text-[0.65rem]">
        {chartPeak}
      </span>
      <div className="mt-1 flex justify-between px-0.5 text-[0.6rem] font-medium text-slate-500 sm:text-[0.65rem]">
        {months.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

function MiniRevenueChart() {
  return (
    <svg
      viewBox="0 0 140 40"
      fill="none"
      preserveAspectRatio="none"
      className="mt-2 h-10 w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rev-mini-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 32 L20 28 L40 30 L60 18 L80 22 L100 10 L120 14 L140 6 L140 40 L0 40 Z"
        fill="url(#rev-mini-fill)"
      />
      <path
        d="M0 32 L20 28 L40 30 L60 18 L80 22 L100 10 L120 14 L140 6"
        stroke="#a78bfa"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const sidebarIcons = [
  LayoutDashboard,
  Grid2X2,
  BarChart3,
  Shield,
  Users,
  Info,
] as const;

const avatarColors = [
  "from-violet-500 to-fuchsia-500",
  "from-orange-400 to-rose-500",
  "from-sky-400 to-indigo-500",
  "from-amber-400 to-orange-500",
];

export function HeroVisual() {
  const { revenueGrowth, clientSatisfaction, activeProjects } = heroStatCards;
  const overview = heroPerformanceOverview;

  return (
    <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:ml-auto lg:max-w-none lg:min-h-[540px] xl:min-h-[580px]">
      <div
        className="pointer-events-none absolute -right-4 top-0 hidden h-48 w-48 rounded-full bg-violet-600/30 blur-3xl sm:block lg:h-64 lg:w-64"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-8 right-0 hidden h-36 w-36 rounded-full bg-orange-500/25 blur-3xl sm:block"
        aria-hidden="true"
      />

      <div className="relative grid grid-cols-1 gap-3 sm:gap-4 lg:absolute lg:inset-0 lg:block">
        {/* Main Performance Overview — big graph */}
        <div
          className={`${glass} relative overflow-hidden p-0 lg:absolute lg:left-0 lg:top-[6%] lg:z-10 lg:w-[72%] xl:w-[26rem]`}
        >
          <div className="flex">
            <aside
              className="hidden w-11 shrink-0 flex-col items-center gap-3 border-r border-white/10 bg-black/30 py-3 sm:flex"
              aria-hidden="true"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold-gradient text-[0.65rem] font-extrabold text-white">
                E
              </span>
              {sidebarIcons.map((Icon, i) => (
                <span
                  key={Icon.displayName ?? i}
                  className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                    i === 0 ? "bg-violet-500/30 text-violet-300" : "text-slate-500"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                </span>
              ))}
            </aside>

            <div className="min-w-0 flex-1 p-3.5 sm:p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-sm font-bold text-white sm:text-[0.95rem]">
                  {overview.title}
                </h3>
                <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[0.6rem] font-medium text-slate-400 sm:text-[0.65rem]">
                  {overview.period} ▾
                </span>
              </div>

              <p className="mt-3 text-[0.65rem] font-medium text-slate-400 sm:text-xs">
                {overview.metricLabel}
              </p>
              <p className="mt-0.5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-[2.15rem]">
                {overview.metricValue}
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-400">
                <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                {overview.delta}
              </p>

              <PerformanceChart />

              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3 sm:grid-cols-4 sm:gap-1.5">
                {overview.kpis.map((kpi) => (
                  <div key={kpi.id} className="min-w-0">
                    <p className="truncate text-[0.55rem] font-medium uppercase tracking-wide text-slate-500 sm:text-[0.6rem]">
                      {kpi.label}
                    </p>
                    <p className="mt-0.5 font-display text-sm font-bold text-white sm:text-base">
                      {kpi.value}
                    </p>
                    <p className="text-[0.6rem] font-semibold text-emerald-400 sm:text-[0.65rem]">
                      {kpi.delta}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Growth — top right */}
        <div
          className={`${glass} p-3.5 sm:p-4 lg:absolute lg:right-0 lg:top-0 lg:z-20 lg:w-[42%] xl:w-48`}
        >
          <p className="text-[0.7rem] font-medium text-slate-400">{revenueGrowth.label}</p>
          <p className="mt-1 font-display text-2xl font-extrabold tracking-tight text-white sm:text-[1.65rem]">
            {revenueGrowth.value}
          </p>
          <p className="mt-1 text-[0.65rem] font-semibold text-emerald-400 sm:text-xs">
            {revenueGrowth.delta}
          </p>
          <MiniRevenueChart />
        </div>

        {/* Client Satisfaction — mid right */}
        <div
          className={`${glass} p-3.5 sm:p-4 lg:absolute lg:right-0 lg:top-[38%] lg:z-20 lg:w-[40%] xl:w-44`}
        >
          <p className="text-[0.7rem] font-medium text-slate-400">
            {clientSatisfaction.label}
          </p>
          <p className="mt-1 font-display text-3xl font-extrabold tracking-tight text-white">
            {clientSatisfaction.value}
          </p>
          <div className="mt-2 flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-3.5 w-3.5 fill-violet-400 text-violet-400"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {/* Active Projects — bottom */}
        <div
          className={`${glass} p-3.5 sm:p-4 lg:absolute lg:bottom-0 lg:left-[8%] lg:z-20 lg:w-[55%] xl:left-10 xl:w-64`}
        >
          <p className="text-[0.7rem] font-medium text-slate-400">{activeProjects.label}</p>
          <div className="mt-1 flex flex-wrap items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold tracking-tight text-white">
              {activeProjects.value}
            </span>
            <span className="text-sm font-semibold text-violet-300">
              {activeProjects.note}
            </span>
          </div>
          <div className="mt-3 flex items-center">
            <div className="flex -space-x-2">
              {avatarColors.map((color) => (
                <span
                  key={color}
                  className={`h-8 w-8 rounded-full border-2 border-[#0a0a12] bg-gradient-to-br ${color}`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[0.65rem] font-bold text-white">
              {activeProjects.extra}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
