import { heroTrustStats } from "@/data/hero";

export function HeroTrustBar() {
  return (
    <div className="mt-10 border-t border-white/10 sm:mt-12">
      <ul className="grid grid-cols-2 gap-x-3 gap-y-5 py-6 sm:grid-cols-4 sm:gap-4 sm:py-8 lg:py-9">
        {heroTrustStats.map((stat) => (
          <li key={stat.id} className="min-w-0 text-center sm:text-left">
            <p className="font-display text-xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-[2rem]">
              {stat.value}
            </p>
            <p className="mt-1.5 text-[0.6rem] font-semibold uppercase leading-snug tracking-[0.12em] text-slate-400 sm:text-xs sm:tracking-[0.16em]">
              {stat.label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
