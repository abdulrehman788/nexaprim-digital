import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { aboutStory } from "@/data/about";

export function AboutStorySection() {
  return (
    <Section variant="light" aria-labelledby="about-story-heading" divider={false} id={aboutStory.id}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 sm:text-sm">
              {aboutStory.overline}
            </p>
            <h2
              id="about-story-heading"
              className="font-serif text-display-sm font-bold text-slate-900 sm:text-display-md"
            >
              {aboutStory.title}
            </h2>

            <blockquote className="mt-8 border-l-2 border-accent pl-5">
              <p className="font-serif text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
                &ldquo;{aboutStory.pullQuote}&rdquo;
              </p>
              <footer className="mt-3 text-sm text-slate-500">{aboutStory.pullQuoteAttribution}</footer>
            </blockquote>

            <ul className="mt-10 space-y-4 border-t border-slate-200 pt-8">
              {aboutStory.milestones.map((milestone) => (
                <li key={milestone.year} className="flex gap-4">
                  <span className="shrink-0 font-display text-sm font-bold text-accent">
                    {milestone.year}
                  </span>
                  <p className="text-sm leading-relaxed text-slate-600">{milestone.event}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8 lg:p-10">
            {aboutStory.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 40)}
                className={`text-base leading-relaxed text-slate-600 sm:text-lg ${
                  index === 0 ? "text-slate-700" : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
