import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { industries, industriesPage } from "@/data/industries";
import { ctaLinks } from "@/lib/constants";

import { IndustryPageCard } from "./IndustryPageCard";

export function IndustriesGrid() {
  return (
    <>
      <section
        aria-labelledby="industries-grid-heading"
        className="bg-white py-12 sm:py-14 lg:py-16"
      >
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between sm:pb-10">
              <div>
                <h2
                  id="industries-grid-heading"
                  className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl"
                >
                  Industries we serve
                </h2>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
                  {industriesPage.description}
                </p>
              </div>
              <p className="shrink-0 text-sm font-medium text-slate-500">
                {industries.length} sectors
              </p>
            </div>

            <ul className="mt-8 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {industries.map((industry) => (
                <li key={industry.id}>
                  <IndustryPageCard industry={industry} />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="industries-cta-heading"
        className="border-t border-white/[0.06] bg-[#111118] py-12 sm:py-14"
      >
        <Container>
          <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                Next step
              </p>
              <h2
                id="industries-cta-heading"
                className="mt-2 font-serif text-xl font-bold text-white sm:text-2xl"
              >
                Not sure which industry system fits?
              </h2>
              <p className="mt-2 max-w-md text-sm text-content-secondary">
                Book a free call — we&apos;ll map the funnel and channels for your market.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button href={ctaLinks.strategyCall} size="lg" pill className="w-full sm:w-auto">
                Book a Strategy Call
              </Button>
              <Link
                href="/case-studies"
                className="inline-flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent sm:w-auto"
              >
                Case studies
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
