import { Container } from "@/components/ui/Container";
import { aboutStory } from "@/data/about";

export function AboutStorySection() {
  return (
    <section
      id={aboutStory.id}
      aria-labelledby="about-story-heading"
      className="border-t border-white/[0.06] bg-surface-primary py-20 lg:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="lg:col-span-5 lg:pt-2">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              {aboutStory.overline}
            </p>
            <h2
              id="about-story-heading"
              className="mt-4 font-display text-[1.75rem] font-bold leading-tight text-white sm:text-3xl lg:text-[2.25rem]"
            >
              {aboutStory.title}
            </h2>

            <blockquote className="mt-8 border-l-2 border-accent pl-5">
              <p className="font-display text-xl font-bold leading-snug text-white sm:text-2xl">
                &ldquo;{aboutStory.pullQuote}&rdquo;
              </p>
              <footer className="mt-3 text-sm text-content-muted">
                {aboutStory.pullQuoteAttribution}
              </footer>
            </blockquote>

            <ol className="mt-10 space-y-0 border-t border-white/[0.06]">
              {aboutStory.milestones.map((milestone) => (
                <li
                  key={milestone.year}
                  className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-white/[0.06] py-5"
                >
                  <span className="font-display text-lg font-bold text-accent">{milestone.year}</span>
                  <div>
                    <p className="font-display text-sm font-bold text-white">{milestone.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-content-secondary">
                      {milestone.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-5">
              {aboutStory.paragraphs.map((paragraph, index) => (
                <article
                  key={paragraph.slice(0, 40)}
                  className="rounded-2xl border border-white/[0.06] bg-[#111118] p-6 sm:p-8"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-content-muted">
                    Chapter {index + 1}
                  </span>
                  <p className="mt-4 text-base leading-[1.8] text-content-secondary sm:text-[1.05rem]">
                    {paragraph}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
