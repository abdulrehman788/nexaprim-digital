import Link from "next/link";
import { Cog, ShoppingBag, TrendingUp, Wallet, type LucideIcon } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { ctaLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { ServiceFeatureIcon, ServiceFeatureSection as ServiceFeatureSectionData } from "@/types";

interface ServiceFeatureSectionProps {
  content: ServiceFeatureSectionData;
  index?: number;
}

const featureIcons: Record<ServiceFeatureIcon, LucideIcon> = {
  wallet: Wallet,
  "trending-up": TrendingUp,
  cog: Cog,
  "shopping-bag": ShoppingBag,
};

function FeatureVisual({ label, icon }: { label: string; icon: ServiceFeatureIcon }) {
  const Icon = featureIcons[icon];

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.1] bg-[#111118] px-6 py-10 sm:py-12">
      <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
        <Icon className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <p className="mt-5 text-center font-display text-lg font-bold text-white">{label}</p>
    </div>
  );
}

export function ServiceFeatureSection({ content, index = 0 }: ServiceFeatureSectionProps) {
  const cardOnRight = content.cardPosition === "right";
  const isAlt = index % 2 === 1;
  const step = String(index + 1).padStart(2, "0");

  const copy = (
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Phase {step}</p>
      <h2
        id={`service-feature-${content.id}`}
        className="mt-3 font-serif text-xl font-bold leading-snug text-white sm:text-2xl lg:text-3xl"
      >
        {content.titleWhite}{" "}
        <span className="text-gold-gradient">{content.titleAccent}</span>
      </h2>
      <div className="mt-5 space-y-4">
        {content.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="text-sm leading-relaxed text-content-secondary sm:text-base">
            {paragraph}
          </p>
        ))}
      </div>
      {content.ctaLabel ? (
        <Link
          href={ctaLinks.strategyCall}
          className="mt-6 inline-flex min-h-[3rem] items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-black transition-opacity hover:opacity-90"
        >
          {content.ctaLabel}
        </Link>
      ) : null}
    </div>
  );

  const visual = <FeatureVisual label={content.cardLabel} icon={content.cardIcon} />;

  return (
    <section
      aria-labelledby={`service-feature-${content.id}`}
      className={cn(
        "border-b border-white/[0.06] py-10 sm:py-12 lg:py-14",
        isAlt ? "bg-[#111118]" : "bg-[#050505]",
      )}
    >
      <Container>
        <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2 lg:gap-14">
          {cardOnRight ? (
            <>
              {copy}
              {visual}
            </>
          ) : (
            <>
              {visual}
              {copy}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
