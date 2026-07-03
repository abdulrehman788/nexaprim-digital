import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqItems, faqSection } from "@/data/faq";

export function FaqSection() {
  return (
    <Section id="faq" variant="light" aria-labelledby="faq-heading">
      <Container>
        <SectionHeading
          headingId="faq-heading"
          title={faqSection.title}
          description={faqSection.description}
          align="center"
          className="mb-12 lg:mb-14"
        />

        <div className="mx-auto max-w-3xl">
          <Accordion items={faqItems} theme="light" />
        </div>
      </Container>
    </Section>
  );
}
