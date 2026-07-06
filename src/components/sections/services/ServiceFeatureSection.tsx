import Link from "next/link";
import { Cog, ShoppingBag, TrendingUp, Wallet, type LucideIcon } from "lucide-react";

import { StarryNightBackground } from "@/components/sections/services/StarryNightBackground";
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

function FeatureParagraph({
  text,
  withDropCap,
  primaryText,
}: {
  text: string;
  withDropCap?: boolean;
  primaryText?: boolean;
}) {
  const textClass = primaryText ? "text-content-primary" : "text-content-secondary";

  if (!withDropCap) {
    return (
      <p className={`text-base leading-relaxed sm:text-[1.05rem] sm:leading-8 ${textClass}`}>
        {text}
      </p>
    );
  }

  const firstChar = text.charAt(0);
  const rest = text.slice(1);

  return (
    <p className="text-base leading-relaxed text-content-secondary sm:text-[1.05rem] sm:leading-8">
      <span
        className="float-left mr-3 mt-1 font-display text-5xl font-bold leading-none text-accent sm:text-6xl"
        aria-hidden="true"
      >
        {firstChar}
      </span>
      {rest}
    </p>
  );
}

function FeatureCard({ label, icon }: { label: string; icon: ServiceFeatureIcon }) {
  const Icon = featureIcons[icon];

  return (
    <div className="flex min-h-[20rem] flex-col items-center justify-center rounded-2xl border border-accent/20 bg-[#1c1c26] px-8 py-14 shadow-[0_0_40px_-12px_rgba(197,163,88,0.35)] sm:min-h-[24rem] sm:px-12 sm:py-16">
      <div className="flex h-32 w-32 items-center justify-center rounded-full border border-accent/25 bg-accent/5">
        <Icon className="h-16 w-16 text-accent" strokeWidth={1.15} aria-hidden="true" />
      </div>
      <p className="mt-10 text-center font-display text-xl font-bold text-white sm:text-2xl">{label}</p>
    </div>
  );
}

function FeatureCopy({
  content,
  step,
}: {
  content: ServiceFeatureSectionData;
  step: string;
}) {
  const usePrimaryText = Boolean(content.ctaLabel);

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">{step}</p>
      <h2
        id={`service-feature-${content.id}`}
        className="mt-4 font-display text-[1.65rem] font-bold leading-[1.2] text-white sm:text-3xl lg:text-[2rem] lg:leading-[1.25]"
      >
        {content.titleWhite}{" "}
        <span className="text-gold-gradient">{content.titleAccent}</span>
      </h2>

      <div className="mt-8 space-y-6">
        {content.paragraphs.map((paragraph, paragraphIndex) => (
          <FeatureParagraph
            key={paragraph.slice(0, 32)}
            text={paragraph}
            withDropCap={!usePrimaryText && content.withDropCap && paragraphIndex === 0}
            primaryText={usePrimaryText}
          />
        ))}
      </div>

      {content.ctaLabel ? (
        <Link
          href={ctaLinks.strategyCall}
          className="bg-gold-gradient mt-10 inline-flex min-h-[3.25rem] items-center justify-center rounded-lg px-8 py-3.5 text-sm font-semibold text-black shadow-glow transition-opacity hover:opacity-90 sm:text-base"
        >
          {content.ctaLabel}
        </Link>
      ) : null}
    </div>
  );
}

export function ServiceFeatureSection({ content, index = 0 }: ServiceFeatureSectionProps) {
  const cardOnRight = content.cardPosition === "right";
  const useSolidBg = index % 2 === 1;
  const step = String(index + 1).padStart(2, "0");

  return (
    <section
      aria-labelledby={`service-feature-${content.id}`}
      className={cn(
        "relative overflow-hidden py-20 sm:py-24 lg:py-28",
        useSolidBg ? "border-t border-white/[0.06] bg-[#111118]" : "",
      )}
    >
      {!useSolidBg ? <StarryNightBackground /> : null}

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 xl:gap-20">
          {cardOnRight ? (
            <>
              <FeatureCopy content={content} step={step} />
              <FeatureCard label={content.cardLabel} icon={content.cardIcon} />
            </>
          ) : (
            <>
              <FeatureCard label={content.cardLabel} icon={content.cardIcon} />
              <FeatureCopy content={content} step={step} />
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
