import Link from "next/link";

import { StarryNightBackground } from "@/components/sections/services/StarryNightBackground";
import { Container } from "@/components/ui/Container";
import { contactPage } from "@/data/contact";
import { ctaLinks } from "@/lib/constants";

export function ContactHero() {
  return (
    <section
      aria-labelledby="contact-hero-heading"
      className="relative overflow-hidden px-4 pb-12 pt-36 sm:px-6 sm:pb-16 sm:pt-40 lg:pt-44"
    >
      <StarryNightBackground />
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent sm:text-sm">
            {contactPage.overline}
          </p>

          <h1
            id="contact-hero-heading"
            className="mt-5 font-display text-[2rem] font-bold leading-[1.12] text-white sm:text-[2.75rem] lg:text-[3.25rem] lg:leading-[1.1]"
          >
            {contactPage.titleLine1}{" "}
            <span className="text-gold-gradient">{contactPage.titleAccent}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-content-secondary sm:text-lg sm:leading-8">
            {contactPage.description}
          </p>

          <Link
            href={ctaLinks.strategyCall}
            className="bg-gold-gradient mt-10 inline-flex min-h-[3.25rem] items-center justify-center rounded-lg px-10 py-3.5 text-sm font-semibold text-black shadow-glow transition-opacity hover:opacity-90 sm:mt-12 sm:text-base"
          >
            {contactPage.bookCtaLabel}
          </Link>
        </div>
      </Container>
    </section>
  );
}
