import { Container } from "@/components/ui/Container";
import { aboutStats, aboutStatsSection } from "@/data/about";

export function AboutStatsSection() {
  return (
    <section
      aria-labelledby="about-stats-heading"
      className="relative overflow-hidden border-y border-accent/20 bg-[#0d0b08]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(197,163,88,0.08),transparent_70%)]"
        aria-hidden="true"
      />
      <Container className="relative py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            {aboutStatsSection.overline}
          </p>
          <h2
            id="about-stats-heading"
            className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl"
          >
            {aboutStatsSection.title}
          </h2>
          <p className="mt-3 text-sm text-content-secondary sm:text-base">
            {aboutStatsSection.description}
          </p>
        </div>

        <ul className="mt-10 grid divide-y divide-white/[0.06] sm:mt-12 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {aboutStats.map((stat) => (
            <li key={stat.id} className="px-4 py-8 text-center sm:py-6 lg:px-6">
              <span className="font-display text-4xl font-bold text-gold-gradient sm:text-5xl">
                {stat.value}
              </span>
              <p className="mt-2 text-sm font-medium text-content-secondary">{stat.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
