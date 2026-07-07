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
      className="border-b border-white/[0.06] bg-[#050505] py-10 sm:py-12 lg:py-14"
    >
      <Container>
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Capabilities</p>
          <h2
            id={`service-capabilities-${content.id}`}
            className="mt-2 max-w-2xl font-serif text-2xl font-bold text-white sm:text-3xl"
          >
            {content.titleWhite}{" "}
            <span className="text-gold-gradient">{content.titleAccent}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-content-secondary sm:text-base">
            {content.description}
          </p>

          <div className="mt-10">
            <CapabilityCardGrid items={content.items} />
          </div>

          {content.secondaryItems?.length ? (
            <div className="mt-6 lg:mt-8">
              <CapabilityCardGrid items={content.secondaryItems} />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
