import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { aboutHero } from "@/data/about";
import { ctaLinks } from "@/lib/constants";

function HeroDecorations() {
  return (
    <>
      <svg
        className="pointer-events-none absolute -right-[10%] top-[-10%] h-[120%] w-[55%] opacity-[0.1]"
        viewBox="0 0 500 500"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="260" cy="260" r="200" stroke="#D4AF37" strokeWidth="0.9" />
        <circle cx="260" cy="260" r="245" stroke="#D4AF37" strokeWidth="0.7" opacity="0.65" />
        <circle cx="260" cy="260" r="155" stroke="#D4AF37" strokeWidth="0.8" opacity="0.8" />
      </svg>
      <span
        className="absolute right-[15%] top-[30%] h-2 w-2 rounded-full bg-accent opacity-40 shadow-[0_0_12px_#D4AF37]"
        aria-hidden="true"
      />
      <span
        className="absolute right-[28%] top-[18%] h-1 w-1 rounded-full bg-accent opacity-25"
        aria-hidden="true"
      />
    </>
  );
}

export function AboutHero() {
  return (
    <section
      aria-labelledby="about-hero-heading"
      className="relative overflow-hidden bg-[#050505] pb-0 pt-32 lg:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,163,88,0.1),transparent_60%)]" />
      <HeroDecorations />

      <Container className="relative pb-12 lg:pb-16">
        <div className="mx-auto max-w-4xl text-center lg:mx-0 lg:max-w-3xl lg:text-left">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-accent sm:text-sm">
            {aboutHero.overline}
          </p>

          <h1
            id="about-hero-heading"
            className="font-display text-[2rem] font-bold leading-[1.12] text-white sm:text-display-md lg:text-[3.5rem] lg:leading-[1.08]"
          >
            <span className="block">{aboutHero.titleLine1}</span>
            <span className="mt-2 block font-serif text-gold-gradient">{aboutHero.titleAccent}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-content-secondary sm:text-lg lg:mx-0">
            {aboutHero.description}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
            <Link
              href={aboutHero.primaryCtaHref}
              className="bg-gold-gradient inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-sm font-semibold text-black transition-opacity hover:opacity-90 sm:w-auto"
            >
              {aboutHero.primaryCta}
              <ArrowDown className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
            <Link
              href={ctaLinks.methodologies}
              className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/40 px-6 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/5 sm:w-auto"
            >
              {aboutHero.secondaryCta}
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 lg:mt-14">
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
            {aboutHero.highlights.map((item) => (
              <li key={item.id} className="text-center lg:text-left">
                <p className="text-xs font-medium uppercase tracking-wider text-content-muted">
                  {item.label}
                </p>
                <p className="mt-1 font-display text-xl font-bold text-accent sm:text-2xl">
                  {item.value}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
