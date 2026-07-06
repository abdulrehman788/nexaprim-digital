import { CapabilityCardGrid } from "@/components/sections/services/CapabilityCard";
import { Container } from "@/components/ui/Container";
import type { ServiceCapabilitiesSection as ServiceCapabilitiesSectionData } from "@/types";

interface ServiceCapabilitiesSectionProps {
  content: ServiceCapabilitiesSectionData;
}

export function ServiceCapabilitiesSection({ content }: ServiceCapabilitiesSectionProps) {
  return (
    <section
      aria-labelledby={`service-capabilities-${content.id}`}
      className="border-t border-white/[0.06] bg-[#111118] py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Capabilities</p>
          <h2
            id={`service-capabilities-${content.id}`}
            className="mt-4 text-balance font-display text-[1.75rem] font-bold leading-[1.15] text-white sm:text-3xl lg:text-[2.25rem]"
          >
            {content.titleWhite}{" "}
            <span className="text-gold-gradient">{content.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-content-secondary sm:text-lg">
            {content.description}
          </p>
        </div>

        <div className="mt-14">
          <CapabilityCardGrid items={content.items} />
        </div>

        {content.secondaryItems?.length ? (
          <div className="mt-6 lg:mt-8">
            <CapabilityCardGrid items={content.secondaryItems} />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
