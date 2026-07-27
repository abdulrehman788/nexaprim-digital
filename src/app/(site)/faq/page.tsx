import type { Metadata } from "next";
import Link from "next/link";

import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { faqItems, faqSection } from "@/data/faq";
import { ctaLinks } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "FAQ",
  description:
    "Answers to common questions about how Expandova works — services, timelines, pricing, onboarding, and reporting.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-black pb-16 pt-28 sm:pt-32 lg:pt-36">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(139,92,246,0.14),transparent_60%)]"
          aria-hidden="true"
        />
        <Container className="relative text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent sm:text-sm">
            FAQ
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-display-sm font-bold leading-tight text-white sm:text-display-md">
            {faqSection.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-content-secondary sm:text-lg">
            {faqSection.description}
          </p>
        </Container>
      </section>

      {/* FAQ list */}
      <Section variant="light" aria-labelledby="faq-list-heading">
        <Container>
          <h2 id="faq-list-heading" className="sr-only">
            Questions and answers
          </h2>
          <div className="mx-auto max-w-3xl">
            <Accordion items={faqItems} theme="light" />
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="primary">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/20 via-surface-elevated to-surface-secondary px-6 py-14 text-center sm:px-12">
            <h2 className="mx-auto max-w-2xl font-display text-display-sm font-bold text-white">
              Still have questions?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-content-secondary sm:text-lg">
              Book a free consultation and we&apos;ll answer everything specific to your goals.
            </p>
            <Link
              href={ctaLinks.consultation}
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-accent-hover sm:text-base"
            >
              Book a Free Consultation
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
