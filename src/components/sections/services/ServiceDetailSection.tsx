import { ServiceFaqSection } from "@/components/sections/services/ServiceFaqSection";
import { ServiceHighlightSection } from "@/components/sections/services/ServiceHighlightSection";
import { ServiceCapabilitiesSection } from "@/components/sections/services/ServiceCapabilitiesSection";
import { ServiceCenteredHero } from "@/components/sections/services/ServiceCenteredHero";
import { ServiceFeatureSection } from "@/components/sections/services/ServiceFeatureSection";
import { ServiceOutcomesSection } from "@/components/sections/services/ServiceOutcomesSection";
import { ServicePageCta } from "@/components/sections/services/ServicePageCta";
import type { ServiceDetail } from "@/types";

interface ServiceDetailSectionProps {
  service: ServiceDetail;
}

export function ServiceDetailSection({ service }: ServiceDetailSectionProps) {
  return (
    <div className="bg-surface-primary">
      <ServiceCenteredHero service={service} />
      {service.capabilitiesSection ? (
        <ServiceCapabilitiesSection content={service.capabilitiesSection} />
      ) : null}
      <ServiceOutcomesSection service={service} />
      {service.featureSections?.map((section, index) => (
        <ServiceFeatureSection key={section.id} content={section} index={index} />
      ))}
      {service.highlightSection ? (
        <ServiceHighlightSection content={service.highlightSection} />
      ) : null}
      {service.closingFeatureSection ? (
        <ServiceFeatureSection
          content={service.closingFeatureSection}
          index={service.featureSections?.length ?? 0}
        />
      ) : null}
      {service.faqSection ? <ServiceFaqSection content={service.faqSection} /> : null}
      <ServicePageCta service={service} />
    </div>
  );
}
