import { OptimizedImage } from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getIndustryTheme } from "@/lib/case-study-themes";
import { ctaLinks } from "@/lib/constants";
import { industryIcons } from "@/lib/industry-icons";
import type { IndustryDetail } from "@/types";

interface IndustryDetailSectionProps {
  industry: IndustryDetail;
}

export function IndustryDetailSection({ industry }: IndustryDetailSectionProps) {
  const theme = getIndustryTheme(industry.id);
  const Icon = industryIcons[industry.iconId];

  return (
    <>
      <section
        aria-labelledby="industry-heading"
        className="relative overflow-hidden bg-[#050505] pb-12 pt-32 lg:pt-36"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_40%_20%,rgba(197,163,88,0.08),transparent_55%)]" />
        <Container className="relative">
          <Link
            href="/industries"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-content-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All industries
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                {industry.title}
              </p>
              <h1
                id="industry-heading"
                className="mt-4 max-w-2xl font-serif text-[2rem] font-bold leading-[1.12] text-white sm:text-display-md"
              >
                {industry.headline}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-content-secondary sm:text-lg">
                {industry.description}
              </p>
              <p className="mt-2 text-sm text-content-muted">{industry.subtitle}</p>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
              <OptimizedImage
                src={industry.image}
                alt={industry.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 opacity-35 mix-blend-multiply"
                style={{
                  background: `linear-gradient(145deg, ${theme.gradientFrom} 0%, ${theme.gradientVia} 50%, ${theme.gradientTo} 100%)`,
                }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
            </div>
          </div>
        </Container>
      </section>

      <Section variant="light" divider={false}>
        <Container>
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900">What we see most often</h2>
              <ul className="mt-5 space-y-3">
                {industry.painPoints.map((point) => (
                  <li
                    key={point.slice(0, 48)}
                    className="flex gap-3 text-sm leading-relaxed text-slate-600 sm:text-base"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-slate-900">Proof it works</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">{industry.proofPoint}</p>
              {industry.relatedCaseStudySlug ? (
                <Link
                  href={`/case-studies/${industry.relatedCaseStudySlug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 transition-colors hover:text-gold-800"
                >
                  Read the case study
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : null}
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
              How we help {industry.title.toLowerCase()} brands grow
            </h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {industry.capabilities.map((capability) => (
                <li
                  key={capability.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
                >
                  <h3 className="font-display text-base font-bold text-slate-900">{capability.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{capability.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto mt-14 max-w-5xl text-center">
            <p className="text-base text-slate-600">
              Ready to build a system tailored to {industry.title.toLowerCase()}?
            </p>
            <Button href={ctaLinks.strategyCall} size="lg" pill className="mt-4">
              Book a Strategy Call
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
