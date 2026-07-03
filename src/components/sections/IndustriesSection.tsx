import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { IndustryCarousel } from "@/components/sections/IndustryCarousel";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { industries, industriesSection } from "@/data/industries";

export function IndustriesSection() {
  return (
    <Section variant="light" aria-labelledby="industries-heading" divider={false}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 sm:text-sm">
              {industriesSection.overline}
            </p>
            <h2
              id="industries-heading"
              className="font-serif text-display-sm font-bold text-slate-900 sm:text-display-md"
            >
              {industriesSection.title}
            </h2>
          </div>

          <div className="flex flex-col gap-5 lg:max-w-md lg:justify-self-end">
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              {industriesSection.description}
            </p>
            <Link
              href={industriesSection.ctaHref}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              {industriesSection.ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <IndustryCarousel industries={industries} className="mt-12 sm:mt-14" />
      </Container>
    </Section>
  );
}
