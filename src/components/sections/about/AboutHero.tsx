import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { clients } from "@/data/clients";
import { aboutHero } from "@/data/about";

function HeroDecorations() {
  return (
    <>
      <svg
        className="pointer-events-none absolute -right-[8%] top-[-5%] h-[110%] w-[50%] opacity-[0.12] lg:-right-[5%]"
        viewBox="0 0 500 500"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="260" cy="260" r="200" stroke="#D4AF37" strokeWidth="0.9" />
        <circle cx="260" cy="260" r="245" stroke="#D4AF37" strokeWidth="0.7" opacity="0.65" />
        <circle cx="260" cy="260" r="155" stroke="#D4AF37" strokeWidth="0.8" opacity="0.8" />
        <circle cx="260" cy="260" r="110" stroke="#D4AF37" strokeWidth="0.6" opacity="0.5" />
      </svg>
      <span
        className="absolute right-[18%] top-[28%] h-2 w-2 rounded-full bg-accent opacity-50 shadow-[0_0_14px_#D4AF37]"
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(197,163,88,0.08),transparent_55%)]" />
      <HeroDecorations />

      <Container className="relative pb-10 lg:pb-12">
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
              className="bg-gold-gradient inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 text-sm font-semibold text-black transition-opacity hover:opacity-90 sm:w-auto"
            >
              {aboutHero.primaryCta}
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
            <Link
              href={aboutHero.secondaryCtaHref}
              className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/40 px-7 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/5 sm:w-auto"
            >
              <Play className="h-4 w-4 shrink-0" aria-hidden="true" />
              {aboutHero.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 lg:mt-16">
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
            {aboutHero.highlights.map((item) => (
              <li key={item.id} className="text-center lg:text-left">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-content-muted sm:text-xs">
                  {item.label}
                </p>
                <p className="mt-1.5 font-display text-xl font-bold text-accent sm:text-2xl">{item.value}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 bg-black/40 py-8 lg:py-10">
        <Container>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14 lg:justify-between">
            {clients.slice(0, 4).map((client) => (
              <li key={client.id} className="flex shrink-0 items-center justify-center opacity-60 grayscale transition-opacity hover:opacity-90">
                <Image
                  src={client.logo}
                  alt={client.logoAlt}
                  width={120}
                  height={40}
                  className="h-8 w-auto max-w-[7rem] object-contain sm:h-9 sm:max-w-[8.5rem]"
                />
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
