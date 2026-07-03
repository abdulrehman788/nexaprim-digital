import type { ReactNode } from "react";
import Link from "next/link";

import {
  heroContent,
  heroGrowthCard,
  heroLeadsCard,
  heroServiceCards,
} from "@/data/hero";

/**
 * Positions derived from pixel analysis of hero-composition.png (1024×682).
 * Panel edges detected from image luminance / border scans.
 */
const regions = {
  growthHeader: { left: "52.5%", top: "2%", width: "45%", height: "8%" },
  service: [
    { left: "52.5%", top: "35.34%", width: "45%", height: "8.65%", padLeft: "3.5%" },
    { left: "52.5%", top: "44.72%", width: "45%", height: "10.26%", padLeft: "9.8%" },
    { left: "52.5%", top: "55.72%", width: "45%", height: "10.41%", padLeft: "10.5%" },
  ],
  leads: {
    left: "52.5%",
    top: "66.86%",
    width: "45%",
    height: "8.65%",
    padLeft: "3.5%",
    padRight: "24%",
  },
  logo: { left: "3%", top: "5.2%" },
  headline: { left: "3.2%", top: "17.2%" },
  excellence: { left: "2.8%", bottom: "4.2%" },
} as const;

type Box = {
  left: string;
  top: string;
  width: string;
  height: string;
  padLeft?: string;
  padRight?: string;
};

function Region({
  box,
  children,
  className = "",
}: {
  box: Box;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`absolute flex flex-col ${className}`}
      style={{
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height,
        paddingLeft: box.padLeft,
        paddingRight: box.padRight ?? "8%",
      }}
    >
      {children}
    </div>
  );
}

export function HeroImageLabels() {
  return (
    <div
      className="pointer-events-none absolute inset-0 select-none [container-type:size]"
      aria-hidden="true"
    >
      {/* Brand — top left */}
      <div
        className="absolute flex items-center gap-[0.45cqw]"
        style={{ left: regions.logo.left, top: regions.logo.top }}
      >
        <span className="h-0 w-0 border-b-[0.5cqw] border-l-[0.4cqw] border-r-[0.4cqw] border-b-[#D4AF37] border-l-transparent border-r-transparent" />
        <span className="font-sans font-semibold tracking-wide text-white [font-size:1.35cqw]">
          NexaPrime
        </span>
      </div>

      {/* Headline — left column */}
      <div
        className="absolute w-[22%]"
        style={{ left: regions.headline.left, top: regions.headline.top }}
      >
        {heroContent.laptopScreenLines.map((line, index) => (
          <p
            key={line}
            className="font-serif font-bold leading-[1.1] text-white [font-size:2.85cqw]"
            style={{ marginTop: index === 0 ? 0 : "0.55cqw" }}
          >
            {line}
          </p>
        ))}
      </div>

      {/* Growth overview — above graph card (graph starts ~10.5%) */}
      <Region box={regions.growthHeader} className="justify-start">
        <div className="flex w-full items-start justify-between gap-1">
          <p className="font-medium text-white/80 [font-size:1.15cqw]">
            {heroGrowthCard.title}
          </p>
          <span className="shrink-0 rounded-full bg-white/10 px-[0.65cqw] py-[0.1cqw] font-medium text-white/75 [font-size:0.95cqw]">
            {heroGrowthCard.period}
          </span>
        </div>
        <p className="mt-[0.25cqw] font-display font-bold leading-none text-white [font-size:2.7cqw]">
          {heroGrowthCard.value}
        </p>
      </Region>

      {/* Service cards — each region matches a detected panel */}
      {heroServiceCards.map((card, index) => {
        const box = regions.service[index];
        if (!box) return null;

        return (
          <Region key={card.id} box={box} className="justify-center">
            <Link
              href={card.href}
              className="pointer-events-auto block transition-opacity hover:opacity-90"
            >
              <p className="font-bold leading-tight text-white [font-size:1.25cqw]">
                {card.title}
              </p>
              <p className="mt-[0.06cqw] leading-tight text-white/55 [font-size:0.98cqw]">
                {card.subtitle}
              </p>
            </Link>
          </Region>
        );
      })}

      {/* Total leads — inside bottom panel (y 66.86%–75.51%) */}
      <Region box={regions.leads} className="justify-center">
        <div>
          <p className="font-medium text-white/80 [font-size:1.1cqw]">
            {heroLeadsCard.label}
          </p>
          <p className="mt-[0.2cqw] font-display font-bold leading-none text-white [font-size:2.35cqw]">
            {heroLeadsCard.value}
          </p>
          <p className="mt-[0.15cqw] text-white/55 [font-size:0.95cqw]">
            {heroLeadsCard.period}
          </p>
        </div>
      </Region>

      {/* Excellence badge — bottom-left floor */}
      <p
        className="absolute leading-tight [font-size:1.3cqw]"
        style={{
          left: regions.excellence.left,
          bottom: regions.excellence.bottom,
        }}
      >
        <span className="font-display font-bold text-[#D4AF37]">
          {heroContent.excellenceBadge.value}
        </span>{" "}
        <span className="text-white/70">{heroContent.excellenceBadge.label}</span>
      </p>
    </div>
  );
}
