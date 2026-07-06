import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { aboutStory } from "@/data/about";

export function AboutStorySection() {
  return (
    <Section variant="light" aria-labelledby="about-story-heading" divider={false} id={aboutStory.id}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="lg:pt-2">
            <h2
              id="about-story-heading"
              className="font-serif text-display-sm font-bold text-slate-900 sm:text-[2.5rem] sm:leading-tight"
            >
              {aboutStory.title}
            </h2>

            <p className="mt-6 font-serif text-xl font-bold leading-snug text-slate-800 sm:text-2xl">
              {aboutStory.pullQuote}
            </p>

            <ul className="mt-8 space-y-4">
              {aboutStory.bullets.map((bullet) => (
                <li key={bullet.slice(0, 32)} className="flex gap-3 text-base leading-relaxed text-slate-600">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-slate-100/90 p-7 sm:p-9 lg:p-10">
            <div className="space-y-6">
              {aboutStory.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-base leading-[1.75] text-slate-600 sm:text-[1.05rem]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
