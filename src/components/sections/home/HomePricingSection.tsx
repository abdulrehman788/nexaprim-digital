import Link from "next/link";
import {
  BarChart3,
  Check,
  Headphones,
  Rocket,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { homePricingSection, homePricingTrust } from "@/data/home-sections";
import { pricingPackages } from "@/data/growth-catalog";
import { ctaLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

const packageIcons: Record<string, { icon: LucideIcon; color: string; ring: string }> = {
  launch: { icon: Rocket, color: "text-sky-600", ring: "border-sky-200 bg-sky-50" },
  growth: { icon: BarChart3, color: "text-violet-600", ring: "border-violet-200 bg-violet-50" },
  scale: { icon: TrendingUp, color: "text-orange-600", ring: "border-orange-200 bg-orange-50" },
  enterprise: { icon: Users, color: "text-rose-600", ring: "border-rose-200 bg-rose-50" },
};

const trustIcons = [Shield, Headphones, Shield, TrendingUp];

export function HomePricingSection() {
  return (
    <Section variant="light" aria-labelledby="home-pricing-heading">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-600">
            {homePricingSection.overline}
          </p>
          <h2
            id="home-pricing-heading"
            className="mt-3 font-display text-display-sm font-bold text-slate-900 sm:text-display-md"
          >
            {homePricingSection.titleLine1}{" "}
            <span className="text-gold-gradient">{homePricingSection.titleAccent}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            {homePricingSection.description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pricingPackages.map((pkg) => {
            const meta = packageIcons[pkg.id];
            const Icon = meta?.icon ?? Rocket;
            const isEnterprise = pkg.price === null;

            return (
              <div
                key={pkg.id}
                className={cn(
                  "relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm",
                  pkg.highlighted
                    ? "border-violet-300 ring-2 ring-violet-200"
                    : "border-slate-200",
                )}
              >
                {pkg.highlighted ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Most popular
                  </span>
                ) : null}

                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl border",
                    meta?.ring,
                  )}
                >
                  <Icon className={cn("h-5 w-5", meta?.color)} aria-hidden="true" />
                </div>

                <h3 className="mt-4 font-display text-xl font-bold text-slate-900">{pkg.name}</h3>
                <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {pkg.idealFor}
                </p>

                <p className="mt-4 font-display text-3xl font-bold text-slate-900">
                  {pkg.priceLabel}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{pkg.description}</p>

                <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={isEnterprise ? ctaLinks.consultation : ctaLinks.strategyCall}
                  className={cn(
                    "mt-6 inline-flex h-11 w-full items-center justify-center rounded-full px-6 text-sm font-semibold transition-colors",
                    pkg.highlighted
                      ? "bg-gold-gradient text-white shadow-glow hover:opacity-90"
                      : "border border-slate-300 text-slate-800 hover:border-violet-400 hover:text-violet-700",
                  )}
                >
                  {isEnterprise ? "Request a Quote" : "Get started"}
                </Link>
              </div>
            );
          })}
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homePricingTrust.map((item, index) => {
            const Icon = trustIcons[index] ?? Shield;
            return (
              <li key={item.id} className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-violet-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
