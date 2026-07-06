import { ServiceFaqAccordion } from "@/components/sections/services/ServiceFaqAccordion";
import { Container } from "@/components/ui/Container";
import type { ServiceFaqSection as ServiceFaqSectionData } from "@/types";

interface ServiceFaqSectionProps {
  content: ServiceFaqSectionData;
}

export function ServiceFaqSection({ content }: ServiceFaqSectionProps) {
  const headingId = `service-faq-${content.id}`;

  return (
    <section
      aria-labelledby={headingId}
      className="border-t border-white/[0.06] bg-[#111118] py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Questions</p>
        <h2
          id={headingId}
          className="mt-4 font-display text-[1.75rem] font-bold leading-[1.15] sm:text-3xl lg:text-[2.25rem]"
        >
          {content.titleWhite ? (
            <>
              <span className="block text-white">{content.titleWhite}</span>
              <span className="text-gold-gradient">{content.titleAccent ?? "FAQs"}</span>
            </>
          ) : (
            <span className="text-gold-gradient">{content.title ?? "FAQs"}</span>
          )}
        </h2>

        <div className="mt-10 max-w-4xl">
          <ServiceFaqAccordion items={content.items} />
        </div>
      </Container>
    </section>
  );
}
