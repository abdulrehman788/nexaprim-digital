import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { aboutStats, aboutStatsSection } from "@/data/about";

export function AboutStatsSection() {
  return (
    <Section
      variant="dark"
      aria-labelledby="about-stats-heading"
      className="relative overflow-hidden bg-[#0a0c12]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,163,88,0.06),transparent_50%)]" />
      <Container className="relative">
        <h2
          id="about-stats-heading"
          className="text-center font-serif text-display-sm font-bold text-white sm:text-[2.5rem]"
        >
          {aboutStatsSection.title}
        </h2>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {aboutStats.map((stat) => (
            <li key={stat.id} className="text-center">
              <span className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-[3.25rem]">
                {stat.value}
              </span>
              <p className="mt-2 text-sm font-medium text-accent sm:text-base">{stat.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
