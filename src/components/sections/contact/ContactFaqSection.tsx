import { ServiceFaqAccordion } from "@/components/sections/services/ServiceFaqAccordion";
import { Container } from "@/components/ui/Container";
import { contactPageFaq } from "@/data/contact";

export function ContactFaqSection() {
  return (
    <section
      aria-labelledby="contact-faq-heading"
      className="border-t border-white/[0.06] bg-surface-primary py-16 sm:py-20"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Questions
          </p>
          <h2
            id="contact-faq-heading"
            className="mt-4 text-center font-display text-[1.75rem] font-bold text-white sm:text-3xl"
          >
            Before you <span className="text-gold-gradient">write</span>
          </h2>

          <div className="mt-10">
            <ServiceFaqAccordion items={[...contactPageFaq]} />
          </div>
        </div>
      </Container>
    </section>
  );
}
