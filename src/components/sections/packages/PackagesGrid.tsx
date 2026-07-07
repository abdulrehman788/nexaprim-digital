import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { packages, packagesPage } from "@/data/packages";
import { cn } from "@/lib/utils";

const BENTO_LAYOUT: Record<string, string> = {
  "all-in-one": "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  "niche-growth": "lg:col-span-1",
  "complete-growth": "lg:col-span-1",
  "brand-acceleration": "lg:col-span-1",
  "performance-engine": "lg:col-span-1",
  enterprise: "sm:col-span-2 lg:col-span-3",
};

export function PackagesGrid() {
  return (
    <section
      aria-labelledby="packages-grid-heading"
      className="relative overflow-hidden border-t border-navy-100 bg-[#f6f4ef] py-14 sm:py-16 lg:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(197,163,88,0.07),transparent_65%)]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-600">Programs</p>
          <h2
            id="packages-grid-heading"
            className="mt-3 font-serif text-2xl font-bold text-slate-900 sm:text-3xl"
          >
            Pick your starting point
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {packagesPage.description}
          </p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-5 lg:auto-rows-fr">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            const isFeatured = pkg.featured;
            const isEnterprise = pkg.isEnterprise;

            return (
              <li key={pkg.id} className={cn(BENTO_LAYOUT[pkg.id])}>
                <Link
                  href={pkg.href}
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 sm:p-7",
                    isFeatured
                      ? "border-accent/30 bg-gradient-to-br from-[#12121a] via-[#0d0d12] to-[#08080c] text-white shadow-[0_24px_48px_-20px_rgba(0,0,0,0.45)] hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_32px_64px_-24px_rgba(197,163,88,0.28)]"
                      : isEnterprise
                        ? "border-dashed border-slate-300 bg-white/80 hover:-translate-y-1 hover:border-gold-400 hover:bg-white hover:shadow-[0_20px_48px_-18px_rgba(15,23,42,0.14)]"
                        : "border-slate-200/90 bg-white hover:-translate-y-1 hover:border-gold-300/60 hover:shadow-[0_20px_48px_-18px_rgba(15,23,42,0.14)]",
                  )}
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100",
                      isFeatured ? "via-accent/70" : "via-gold-400/50",
                    )}
                    aria-hidden="true"
                  />

                  {pkg.badge ? (
                    <Badge className="absolute right-5 top-5 sm:right-6 sm:top-6">{pkg.badge}</Badge>
                  ) : null}

                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1",
                        isFeatured
                          ? "bg-accent/15 text-accent ring-accent/25"
                          : "bg-gold-100 text-gold-700 ring-gold-200/80",
                      )}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                    </span>
                    {isFeatured ? (
                      <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                        Flagship
                      </span>
                    ) : null}
                  </div>

                  <h3
                    className={cn(
                      "mt-5 font-display font-bold",
                      isFeatured
                        ? "text-xl text-white sm:text-2xl"
                        : "text-lg text-slate-900 group-hover:text-gold-700",
                    )}
                  >
                    {pkg.title}
                  </h3>

                  <p
                    className={cn(
                      "mt-2 flex-1 text-sm leading-relaxed",
                      isFeatured ? "text-content-secondary" : "text-slate-600",
                    )}
                  >
                    {pkg.description}
                  </p>

                  {isFeatured && pkg.highlights ? (
                    <ul className="mt-4 space-y-2 border-t border-white/[0.08] pt-4">
                      {pkg.highlights.slice(0, 2).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-content-secondary">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div
                    className={cn(
                      "mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-5",
                      isFeatured ? "border-white/[0.08]" : "border-slate-100",
                    )}
                  >
                    <p
                      className={cn(
                        "flex items-center gap-1.5 text-xs font-medium",
                        isFeatured ? "text-content-muted" : "text-slate-500",
                      )}
                    >
                      <Clock3 className="h-3.5 w-3.5 shrink-0 text-gold-600" aria-hidden="true" />
                      <span className="line-clamp-1">{pkg.timeline.split(";")[0]}</span>
                    </p>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
                        isFeatured
                          ? "bg-accent text-black group-hover:bg-gold-300"
                          : "bg-slate-900 text-white group-hover:bg-gold-600",
                      )}
                    >
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
