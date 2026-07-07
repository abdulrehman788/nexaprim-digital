import { ServiceFaqAccordion } from "@/components/sections/services/ServiceFaqAccordion";
import { Container } from "@/components/ui/Container";
import { contactPageFaq } from "@/data/contact";
import { sectionLightWarm, sectionPadding } from "@/lib/section-surfaces";
import { cn } from "@/lib/utils";

export function ContactFaqSection() {
  return (
    <section
      aria-labelledby="contact-faq-heading"
      className={cn(sectionLightWarm, sectionPadding, "pb-16 sm:pb-20")}
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-gold-600">
            Questions
          </p>
          <h2
            id="contact-faq-heading"
            className="mt-4 text-center font-display text-[1.75rem] font-bold text-slate-900 sm:text-3xl"
          >
            Before you <span className="text-gold-gradient">write</span>
          </h2>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <ServiceFaqAccordion items={[...contactPageFaq]} theme="light" />
          </div>
        </div>
      </Container>
    </section>
  );
}
