import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { industries, industriesPage } from "@/data/industries";
import { ctaLinks } from "@/lib/constants";
import { industryIcons } from "@/lib/industry-icons";
import type { IndustryDetail } from "@/types";

function IndustryShowcaseImage({
  industry,
  index,
  priority,
}: {
  industry: IndustryDetail;
  index: number;
  priority?: boolean;
}) {
  return (
    <div className="relative w-full min-w-0 self-center">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-[0_20px_48px_-24px_rgba(15,23,42,0.2)]">
        <OptimizedImage
          src={industry.image}
          alt={industry.imageAlt}
          fill
          priority={priority}
          placeholder="empty"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent"
          aria-hidden="true"
        />
        <span className="pointer-events-none absolute left-4 top-4 z-10 font-display text-4xl font-bold text-white/30">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

function IndustryShowcaseCopy({
  industry,
  Icon,
}: {
  industry: IndustryDetail;
  Icon: LucideIcon;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
          <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
            {industry.title}
          </p>
          <p className="text-sm text-slate-500">{industry.subtitle}</p>
        </div>
      </div>

      <h3 className="mt-5 font-serif text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
        {industry.headline}
      </h3>
      <p className="mt-4 text-base leading-relaxed text-slate-600">{industry.description}</p>

      {industry.painPoints[0] ? (
        <p className="mt-4 border-l-2 border-gold-400 pl-4 text-sm italic text-slate-500">
          {industry.painPoints[0]}
        </p>
      ) : null}

      <Link
        href={industry.href}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gold-600"
      >
        View {industry.title.toLowerCase()} solutions
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

export function IndustriesPageContent() {
  return (
    <>
      <section
        aria-labelledby="industries-hero-heading"
        className="border-b border-white/[0.06] bg-[#050505] py-12 pt-28 sm:py-14 sm:pt-32 lg:pt-36"
      >
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            {industriesPage.overline}
          </p>
          <h1
            id="industries-hero-heading"
            className="mt-4 max-w-3xl font-serif text-[1.75rem] font-bold leading-[1.12] text-white sm:text-4xl lg:text-[2.75rem]"
          >
            {industriesPage.titleLine1}{" "}
            <span className="text-gold-gradient">{industriesPage.titleAccent}</span>
          </h1>
        </Container>
      </section>

      <section aria-labelledby="industries-list-heading" className="bg-white">
        <Container>
          <div className="border-b border-slate-200 py-8 sm:py-10">
            <h2 id="industries-list-heading" className="sr-only">
              All industries
            </h2>
            <nav aria-label="Jump to industry" className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {industries.map((industry) => (
                <a
                  key={industry.id}
                  href={`#industry-${industry.id}`}
                  className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-gold-400 hover:bg-gold-50 hover:text-gold-800"
                >
                  {industry.title}
                </a>
              ))}
            </nav>
          </div>

          <div className="divide-y divide-slate-200">
            {industries.map((industry, index) => {
              const Icon = industryIcons[industry.iconId];
              const reversed = index % 2 === 1;
              const image = (
                <IndustryShowcaseImage
                  industry={industry}
                  index={index}
                  priority={index < 2}
                />
              );
              const copy = <IndustryShowcaseCopy industry={industry} Icon={Icon} />;

              return (
                <article
                  key={industry.id}
                  id={`industry-${industry.id}`}
                  className="scroll-mt-28 py-12 sm:py-16 lg:py-20"
                >
                  <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14 xl:gap-16">
                    {reversed ? (
                      <>
                        {copy}
                        {image}
                      </>
                    ) : (
                      <>
                        {image}
                        {copy}
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="industries-cta-heading"
        className="border-t border-white/[0.06] bg-[#111118] py-12 sm:py-14"
      >
        <Container>
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2
                id="industries-cta-heading"
                className="font-serif text-xl font-bold text-white sm:text-2xl"
              >
                Not sure which system fits your market?
              </h2>
              <p className="mt-2 max-w-md text-sm text-content-secondary">
                Book a free strategy call — we&apos;ll map channels, funnel, and reporting for your
                sector.
              </p>
            </div>
            <Button href={ctaLinks.strategyCall} size="lg" pill>
              Book a Strategy Call
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
