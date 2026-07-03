import Link from "next/link";

import {
  heroContent,
  heroGrowthCard,
  heroLeadsCard,
  heroServiceCards,
} from "@/data/hero";

export function HeroImageLabels() {
  return (
    <div
      className="pointer-events-none absolute inset-0 select-none [container-type:size]"
      aria-hidden="true"
    >
      {/* Laptop screen copy */}
      <div
        className="absolute left-[9.5%] top-[12.5%] w-[21%]"
        style={{
          transform: "perspective(700px) rotateY(-7deg) rotateX(2deg)",
          transformOrigin: "left top",
        }}
      >
        <div className="flex items-center gap-[0.4cqw]">
          <span className="h-0 w-0 border-b-[0.45cqw] border-l-[0.35cqw] border-r-[0.35cqw] border-b-[#D4AF37] border-l-transparent border-r-transparent" />
          <span className="font-serif font-semibold tracking-wide text-white/90 [font-size:1.15cqw]">
            NexaPrime
          </span>
        </div>

        <div className="mt-[2.4cqw]">
          {heroContent.laptopScreenLines.map((line, index) => (
            <p
              key={line}
              className="font-serif font-bold leading-[1.08] text-white [font-size:1.95cqw] [text-shadow:0_2px_8px_rgba(0,0,0,0.85)]"
              style={{ marginTop: index === 0 ? 0 : "0.28cqw" }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Growth overview — top card, left of graph */}
      <p className="absolute left-[55.5%] top-[5.2%] font-medium text-white/80 [font-size:1.25cqw]">
        {heroGrowthCard.title}
      </p>
      <span className="absolute right-[5.5%] top-[4.8%] rounded-full bg-white/10 px-[0.75cqw] py-[0.15cqw] font-medium text-white/70 [font-size:1.05cqw]">
        {heroGrowthCard.period}
      </span>
      <p className="absolute left-[56.5%] top-[10.5%] font-display font-bold leading-none text-white [font-size:2.75cqw]">
        {heroGrowthCard.value}
      </p>

      {/* Service cards — middle panels */}
      {heroServiceCards.map((card, index) => {
        const top = 34.5 + index * 10.6;
        return (
          <Link
            key={card.id}
            href={card.href}
            className="pointer-events-auto absolute left-[64.8%] w-[22%] transition-opacity hover:opacity-90"
            style={{ top: `${top}%` }}
          >
            <p className="font-bold leading-tight text-white [font-size:1.4cqw]">
              {card.title}
            </p>
            <p className="mt-[0.1cqw] leading-tight text-white/55 [font-size:1.1cqw]">
              {card.subtitle}
            </p>
          </Link>
        );
      })}

      {/* Total leads — bottom card */}
      <p className="absolute left-[55.5%] top-[67.5%] font-medium text-white/80 [font-size:1.25cqw]">
        {heroLeadsCard.label}
      </p>
      <p className="absolute left-[55.8%] top-[72.2%] font-display font-bold leading-none text-white [font-size:2.65cqw]">
        {heroLeadsCard.value}
      </p>
      <p className="absolute left-[55.5%] top-[77.2%] text-white/55 [font-size:1.05cqw]">
        {heroLeadsCard.period}
      </p>

      {/* Excellence badge — bottom-left floor */}
      <p className="absolute bottom-[5%] left-[4.5%] leading-tight [font-size:1.25cqw]">
        <span className="font-display font-bold text-[#D4AF37]">
          {heroContent.excellenceBadge.value}
        </span>{" "}
        <span className="text-white/70">{heroContent.excellenceBadge.label}</span>
      </p>
    </div>
  );
}
