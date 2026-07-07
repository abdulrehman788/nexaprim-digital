import dynamic from "next/dynamic";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  Cog,
  Phone,
  ShoppingBag,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { CapabilityCardGrid } from "@/components/sections/services/CapabilityCard";
import { StarryNightBackground } from "@/components/sections/services/StarryNightBackground";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { serviceCategories } from "@/data/services";
import { featureGridCardClass, featureGridCardLightClass } from "@/lib/service-card-styles";
import { siteConfig, ctaLinks } from "@/lib/constants";
import { isLightBand } from "@/lib/section-surfaces";
import { cn } from "@/lib/utils";
import type {
  ServiceDetail,
  ServiceFeatureIcon,
  ServiceFeatureSection,
  ServiceHighlightSection,
} from "@/types";

const ServiceFaqAccordion = dynamic(
  () =>
    import("@/components/sections/services/ServiceFaqAccordion").then((mod) => ({
      default: mod.ServiceFaqAccordion,
    })),
  {
    loading: () => (
      <div className="h-32 animate-pulse rounded-xl border border-white/[0.06] bg-[#111118]" />
    ),
  },
);

interface ServiceDetailArticleProps {
  service: ServiceDetail;
}

const phoneHref = `tel:${siteConfig.phone.replace(/\D/g, "")}`;

const featureIcons: Record<ServiceFeatureIcon, LucideIcon> = {
  wallet: Wallet,
  "trending-up": TrendingUp,
  cog: Cog,
  "shopping-bag": ShoppingBag,
};

function SectionCtas({
  ctaLabel,
  showPhone = false,
  centered,
  className,
  light = false,
}: {
  ctaLabel: string;
  showPhone?: boolean;
  centered?: boolean;
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={cn("mt-8 flex flex-wrap items-center gap-3", centered && "justify-center", className)}>
      <Button href={ctaLinks.strategyCall} size="lg" pill>
        {ctaLabel}
      </Button>
      {showPhone ? (
        <a
          href={phoneHref}
          className={cn(
            "inline-flex min-h-[3rem] items-center gap-2 rounded-full border px-6 text-sm font-semibold transition-colors",
            light
              ? "border-slate-300 text-slate-800 hover:border-accent hover:text-accent"
              : "border-white/20 text-white hover:border-accent hover:text-accent",
          )}
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call now
        </a>
      ) : null}
    </div>
  );
}

function FeatureVisual({ label, icon, light = false }: { label: string; icon: ServiceFeatureIcon; light?: boolean }) {
  const Icon = featureIcons[icon];

  return (
    <div
      className={cn(
        "relative flex h-full min-h-[220px] flex-col items-center justify-center overflow-hidden rounded-2xl px-6 py-10 sm:min-h-[280px] sm:py-12",
        light
          ? "border border-slate-200 bg-slate-50"
          : "border border-white/[0.1] bg-[#111118]",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,163,88,0.14),transparent_65%)]"
        aria-hidden="true"
      />
      <span className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/25 shadow-[0_0_40px_-8px_rgba(197,163,88,0.35)]">
        <Icon className="h-9 w-9" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <p
        className={cn(
          "relative mt-6 text-center font-display text-lg font-bold sm:text-xl",
          light ? "text-slate-900" : "text-white",
        )}
      >
        {label}
      </p>
    </div>
  );
}

function NarrativeBlock({
  id,
  headingId,
  step,
  titleWhite,
  titleAccent,
  paragraphs,
  ctaLabel,
  showPhone,
  light = false,
  cardLabel,
  cardIcon,
  cardPosition,
  withDropCap,
}: {
  id: string;
  headingId: string;
  step?: string;
  titleWhite: string;
  titleAccent: string;
  paragraphs: string[];
  ctaLabel: string;
  showPhone?: boolean;
  light?: boolean;
  cardLabel?: string;
  cardIcon?: ServiceFeatureIcon;
  cardPosition?: "left" | "right";
  withDropCap?: boolean;
}) {
  const cardOnRight = cardPosition === "right";
  const visual =
    cardLabel && cardIcon ? <FeatureVisual label={cardLabel} icon={cardIcon} light={light} /> : null;

  const copy = (
    <div className="min-w-0">
      {step ? (
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">{step}</p>
      ) : null}
      <h2
        id={headingId}
        className={cn(
          "font-serif text-2xl font-bold leading-snug sm:text-3xl lg:text-[2rem]",
          light ? "text-slate-900" : "text-white",
          step && "mt-3",
        )}
      >
        {titleWhite}{" "}
        <span className="text-gold-gradient">{titleAccent}</span>
      </h2>
      <div className="mt-6 space-y-4">
        {paragraphs.map((paragraph, index) => {
          const isFirstWithDropCap = withDropCap && index === 0;

          return (
            <p
              key={paragraph.slice(0, 48)}
              className={cn(
                "text-base leading-relaxed sm:text-lg",
                light ? "text-slate-600" : "text-content-secondary",
              )}
            >
              {isFirstWithDropCap ? (
                <>
                  <span
                    className="float-left mr-2 mt-0.5 font-serif text-5xl font-bold leading-none text-accent"
                    aria-hidden="true"
                  >
                    {paragraph.charAt(0)}
                  </span>
                  {paragraph.slice(1)}
                </>
              ) : (
                paragraph
              )}
            </p>
          );
        })}
      </div>
      <SectionCtas ctaLabel={ctaLabel} showPhone={showPhone} light={light} />
    </div>
  );

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        "scroll-mt-28 border-b py-12 sm:py-16 lg:py-20",
        light
          ? "border-slate-200/80 bg-white"
          : "border-white/[0.06] bg-[#050505]",
      )}
    >
      <Container>
        {visual ? (
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
        ) : (
          <div className="mx-auto max-w-3xl">{copy}</div>
        )}
      </Container>
    </section>
  );
}

function featureToNarrative(
  section: ServiceFeatureSection,
  index: number,
  ctaLabel: string,
): ReactNode {
  const step = String(index + 1).padStart(2, "0");

  return (
    <NarrativeBlock
      key={section.id}
      id={`service-section-${section.id}`}
      headingId={`service-heading-${section.id}`}
      step={`Phase ${step}`}
      titleWhite={section.titleWhite}
      titleAccent={section.titleAccent}
      paragraphs={section.paragraphs}
      ctaLabel={section.ctaLabel ?? ctaLabel}
      showPhone={index % 2 === 1}
      light={isLightBand(index + 1)}
      cardLabel={section.cardLabel}
      cardIcon={section.cardIcon}
      cardPosition={section.cardPosition}
      withDropCap={section.withDropCap}
    />
  );
}

function highlightToNarrative(
  section: ServiceHighlightSection,
  ctaLabel: string,
  light: boolean,
): ReactNode {
  return (
    <NarrativeBlock
      key={section.id}
      id={`service-section-${section.id}`}
      headingId={`service-heading-${section.id}`}
      step="Why us"
      titleWhite={section.titleWhite}
      titleAccent={section.titleAccent}
      paragraphs={section.paragraphs}
      ctaLabel={section.ctaLabel ?? ctaLabel}
      light={light}
      cardLabel="NexaPrime"
      cardIcon="trending-up"
      cardPosition="left"
    />
  );
}

export function ServiceDetailArticle({ service }: ServiceDetailArticleProps) {
  const Icon = service.icon;
  const ctaLabel = service.heroCtaLabel ?? "Get Your Free Consultation";
  const titleBefore = service.heroTitleBefore ?? service.headline;
  const titleAccent = service.heroTitleAccent ?? "";
  const overline = service.heroOverline ?? service.title;
  const categoryLabel =
    serviceCategories.find((c) => c.id === service.category)?.label ?? "Services";
  const featureSections = service.featureSections ?? [];
  const capabilityItems = [
    ...(service.capabilitiesSection?.items ?? []),
    ...(service.capabilitiesSection?.secondaryItems ?? []),
  ];
  const showDeliverablesGrid = service.deliverables.length > 0 && capabilityItems.length === 0;
  const faqTitle = service.faqSection?.title ?? `${service.title} FAQs`;
  const includedAnchor = service.capabilitiesSection
    ? "#service-capabilities"
    : showDeliverablesGrid
      ? "#service-deliverables"
      : service.faqSection
        ? "#service-faq"
        : "#service-page-title";

  const capabilitiesBand = 1 + featureSections.length;
  const capabilitiesLight = isLightBand(capabilitiesBand);
  const deliverablesBand = capabilitiesBand + (service.capabilitiesSection ? 1 : 0);
  const deliverablesLight = isLightBand(deliverablesBand);
  const highlightBand = deliverablesBand + (showDeliverablesGrid ? 1 : 0);
  const faqBand =
    highlightBand +
    (service.highlightSection ? 1 : 0) +
    (service.closingFeatureSection ? 1 : 0);
  const faqLight = isLightBand(faqBand);

  return (
    <article itemScope itemType="https://schema.org/Service">
      <meta itemProp="name" content={service.title} />
      <meta itemProp="description" content={service.longDescription} />

      {/* Premium dossier hero */}
      <header className="relative overflow-hidden border-b border-white/[0.06] bg-[#050505] pb-10 pt-28 sm:pb-12 sm:pt-32 lg:pt-36">
        <StarryNightBackground />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(197,163,88,0.12),transparent_55%)]"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: siteConfig.name, href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />

          <div className="overflow-hidden rounded-3xl border border-white/[0.1] bg-[#0d0d12] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">{overline}</p>
                <p className="mt-2 text-xs font-medium text-content-muted">{categoryLabel}</p>
                <h1
                  id="service-page-title"
                  className="mt-4 font-serif text-[1.65rem] font-bold leading-[1.12] text-white sm:text-3xl lg:text-[2.35rem]"
                >
                  {titleBefore}
                  {titleAccent ? (
                    <>
                      {" "}
                      <span className="text-gold-gradient">{titleAccent}</span>
                    </>
                  ) : null}
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-content-secondary sm:text-lg">
                  {service.longDescription}
                </p>
                {service.heroSecondaryLine ? (
                  <p className="mt-3 text-sm font-medium text-accent/90">{service.heroSecondaryLine}</p>
                ) : null}
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href={ctaLinks.strategyCall} size="lg" pill>
                    {ctaLabel}
                  </Button>
                  <a
                    href={includedAnchor}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
                  >
                    See what&apos;s included
                  </a>
                </div>
              </div>

              <div className="relative min-h-[240px] lg:min-h-[400px]">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(145deg, ${service.gradientFrom} 0%, ${service.gradientVia} 45%, ${service.gradientTo} 100%)`,
                  }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-[#0d0d12]/80 via-transparent to-transparent lg:from-[#0d0d12]/40"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm sm:h-32 sm:w-32">
                    <Icon className="h-14 w-14 text-white sm:h-16 sm:w-16" strokeWidth={1.25} aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>

            <ul className="grid divide-y divide-white/[0.08] border-t border-white/[0.08] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <li className="px-6 py-5 text-center sm:py-6">
                <p className="font-display text-2xl font-bold text-white">{service.deliverables.length}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-content-muted">Deliverables</p>
              </li>
              <li className="px-6 py-5 text-center sm:py-6">
                <p className="font-display text-2xl font-bold text-white">{service.outcomes.length}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-content-muted">Key outcomes</p>
              </li>
              <li className="px-6 py-5 text-center sm:py-6">
                <p className="font-display text-lg font-bold leading-snug text-white sm:text-xl">{categoryLabel}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-content-muted">Practice area</p>
              </li>
            </ul>
          </div>
        </Container>
      </header>

      {featureSections.map((section, index) => featureToNarrative(section, index, ctaLabel))}

      {service.capabilitiesSection ? (
        <section
          id="service-capabilities"
          aria-labelledby="service-capabilities-heading"
          className={cn(
            "relative scroll-mt-28 overflow-hidden border-b py-12 sm:py-16 lg:py-20",
            capabilitiesLight
              ? "border-slate-200/80 bg-white"
              : "border-white/[0.06] bg-[#050505]",
          )}
        >
          {!capabilitiesLight ? (
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,163,88,0.08),transparent_55%)]"
              aria-hidden="true"
            />
          ) : null}
          <Container className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Capabilities</p>
              <h2
                id="service-capabilities-heading"
                className={cn(
                  "mt-3 font-serif text-2xl font-bold leading-snug sm:text-3xl lg:text-[2rem]",
                  capabilitiesLight ? "text-slate-900" : "text-white",
                )}
              >
                {service.capabilitiesSection.titleWhite}{" "}
                <span className="text-gold-gradient">{service.capabilitiesSection.titleAccent}</span>
              </h2>
              <p
                className={cn(
                  "mt-5 text-base leading-relaxed sm:text-lg",
                  capabilitiesLight ? "text-slate-600" : "text-content-secondary",
                )}
              >
                {service.capabilitiesSection.description}
              </p>
            </div>
            <div className="mx-auto mt-10 max-w-5xl">
              <CapabilityCardGrid items={service.capabilitiesSection.items} />
              {service.capabilitiesSection.secondaryItems?.length ? (
                <div className="mt-6">
                  <CapabilityCardGrid items={service.capabilitiesSection.secondaryItems} />
                </div>
              ) : null}
            </div>
            <SectionCtas ctaLabel={ctaLabel} centered light={capabilitiesLight} />
          </Container>
        </section>
      ) : null}

      {showDeliverablesGrid ? (
        <section
          id="service-deliverables"
          aria-labelledby="service-deliverables-heading"
          className={cn(
            "scroll-mt-28 border-b py-12 sm:py-16 lg:py-20",
            deliverablesLight
              ? "border-slate-200/80 bg-[#f8f7f4]"
              : "border-white/[0.06] bg-[#0c0c12]",
          )}
        >
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Scope</p>
              <h2
                id="service-deliverables-heading"
                className={cn(
                  "mt-3 font-serif text-2xl font-bold sm:text-3xl",
                  deliverablesLight ? "text-slate-900" : "text-white",
                )}
              >
                What&apos;s included in our {service.title.toLowerCase()} service
              </h2>
              <p className={cn("mt-4 text-base", deliverablesLight ? "text-slate-600" : "text-content-secondary")}>
                {service.deliverables.length} scoped deliverables tied to your goals and timeline.
              </p>
            </div>
            <ul className="mx-auto mt-10 grid max-w-5xl list-none gap-6 p-0 md:grid-cols-3 lg:gap-8">
              {service.deliverables.map((item, index) => (
                <li
                  key={item.title}
                  className={cn(
                    deliverablesLight ? featureGridCardLightClass : featureGridCardClass,
                    "relative overflow-hidden",
                  )}
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-xs font-semibold text-accent/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={cn(
                      "mt-3 font-display text-lg font-bold",
                      deliverablesLight ? "text-slate-900" : "text-white",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 flex-1 text-sm leading-relaxed",
                      deliverablesLight ? "text-slate-600" : "text-content-secondary/80",
                    )}
                  >
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
            <SectionCtas ctaLabel={ctaLabel} showPhone centered light={deliverablesLight} />
          </Container>
        </section>
      ) : null}

      {service.highlightSection
        ? highlightToNarrative(
            service.highlightSection,
            ctaLabel,
            isLightBand(highlightBand),
          )
        : null}

      {service.closingFeatureSection
        ? featureToNarrative(service.closingFeatureSection, featureSections.length + 1, ctaLabel)
        : null}

      {service.faqSection ? (
        <section
          id="service-faq"
          aria-labelledby="service-faq-heading"
          className={cn(
            "scroll-mt-28 py-12 sm:py-16 lg:py-20",
            faqLight ? "bg-white" : "bg-[#050505]",
          )}
        >
          <Container>
            <div className="mx-auto max-w-3xl">
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">FAQs</p>
                <h2
                  id="service-faq-heading"
                  className={cn(
                    "mt-3 font-serif text-2xl font-bold sm:text-3xl",
                    faqLight ? "text-slate-900" : "text-white",
                  )}
                >
                  {faqTitle}
                </h2>
              </div>
              <div
                className={cn(
                  "mt-8 rounded-2xl border p-4 sm:p-6",
                  faqLight
                    ? "border-slate-200 bg-slate-50"
                    : "border-white/[0.08] bg-[#111118]",
                )}
              >
                <ServiceFaqAccordion items={service.faqSection.items} theme={faqLight ? "light" : "dark"} />
              </div>
              <p className={cn("mt-8 text-center text-sm", faqLight ? "text-slate-500" : "text-content-muted")}>
                Still have questions?{" "}
                <Link href="/contact" className="font-medium text-accent hover:underline">
                  Contact our team
                </Link>
              </p>
            </div>
          </Container>
        </section>
      ) : null}
    </article>
  );
}
