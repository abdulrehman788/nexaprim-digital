import { heroTrustStats } from "@/data/hero";

export function HeroTrustBar() {
  return (
    <div className="border-t border-white/10 bg-black/25 backdrop-blur-sm">
      <ul className="grid grid-cols-2 gap-6 py-6 sm:grid-cols-4 sm:gap-4 sm:py-7 lg:py-8">
        {heroTrustStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <li key={stat.id} className="flex items-center gap-3 sm:gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-violet-300 sm:h-11 sm:w-11">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-xl font-bold leading-none text-white sm:text-2xl lg:text-[1.65rem]">
                  {stat.value}
                </p>
                <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-slate-400 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
