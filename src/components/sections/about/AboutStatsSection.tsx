import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { aboutStats, aboutStatsSection } from "@/data/about";

export function AboutStatsSection() {
  return (
    <Section variant="dark" aria-labelledby="about-stats-heading" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,163,88,0.06),transparent_50%)]" />
      <Container className="relative">
        <div className="text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-accent sm:text-sm">
            {aboutStatsSection.overline}
          </p>
          <h2
            id="about-stats-heading"
            className="font-serif text-display-sm font-bold text-content-primary sm:text-display-md"
          >
            {aboutStatsSection.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-content-secondary">
            {aboutStatsSection.description}
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {aboutStats.map((stat) => (
            <li
              key={stat.id}
              className="rounded-2xl border border-border-subtle bg-surface-elevated/50 px-6 py-8 text-center backdrop-blur-sm"
            >
              <span className="font-display text-4xl font-bold text-gold-gradient sm:text-5xl">
                {stat.value}
              </span>
              <p className="mt-3 text-sm leading-snug text-content-muted sm:text-base">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
