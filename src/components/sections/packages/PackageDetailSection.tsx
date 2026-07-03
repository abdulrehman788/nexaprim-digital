import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ctaLinks } from "@/lib/constants";
import type { PackageDetail } from "@/types";

interface PackageDetailSectionProps {
  pkg: PackageDetail;
}

export function PackageDetailSection({ pkg }: PackageDetailSectionProps) {
  const Icon = pkg.icon;

  return (
    <>
      <section
        aria-labelledby="package-heading"
        className="relative overflow-hidden bg-[#050505] pb-12 pt-32 lg:pt-36"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_40%_20%,rgba(197,163,88,0.08),transparent_55%)]" />
        <Container className="relative">
          <Link
            href="/packages"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-content-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All packages
          </Link>

          <div className="max-w-3xl">
            {pkg.badge ? <Badge className="mb-4">{pkg.badge}</Badge> : null}
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              {pkg.title}
            </p>
            <h1
              id="package-heading"
              className="mt-4 font-serif text-[2rem] font-bold leading-[1.12] text-white sm:text-display-md"
            >
              {pkg.headline}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-content-secondary sm:text-lg">
              {pkg.longDescription}
            </p>
            <p className="mt-4 text-sm text-content-muted">
              <span className="font-semibold text-accent">Timeline:</span> {pkg.timeline}
            </p>
          </div>
        </Container>
      </section>

      <Section variant="light" divider={false}>
        <Container>
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
              What&apos;s included
            </h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {pkg.includes.map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
                >
                  <h3 className="font-display text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto mt-14 max-w-5xl rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-slate-900">Best fit for</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">{pkg.idealFor}</p>
          </div>

          <div className="mx-auto mt-14 max-w-5xl text-center">
            <p className="text-base text-slate-600">
              Want a proposal scoped to your goals and budget?
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
