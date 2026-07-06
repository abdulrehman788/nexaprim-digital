import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { IndustryCarousel } from "@/components/sections/IndustryCarousel";
import { Container } from "@/components/ui/Container";
import { industries, industriesSection } from "@/data/industries";

export function IndustriesSection() {
  return (
    <section
      aria-labelledby="industries-heading"
      className="border-t border-slate-200/80 bg-[#f8f7f4] py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-14 xl:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              {industriesSection.overline}
            </p>
            <h2
              id="industries-heading"
              className="mt-4 max-w-md font-serif text-[2rem] font-bold leading-[1.12] text-slate-900 sm:text-[2.35rem] lg:text-[2.5rem]"
            >
              {industriesSection.title}
            </h2>
          </div>

          <div className="flex flex-col gap-6 lg:max-w-sm lg:justify-self-end">
            <p className="text-base leading-relaxed text-slate-600 sm:text-[1.05rem] sm:leading-7">
              {industriesSection.description}
            </p>
            <Link
              href={industriesSection.ctaHref}
              className="inline-flex w-fit items-center gap-2.5 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(15,23,42,0.45)] transition-colors hover:bg-slate-800"
            >
              {industriesSection.ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <IndustryCarousel industries={industries} className="mt-12 sm:mt-14 lg:mt-16" />
      </Container>
    </section>
  );
}
