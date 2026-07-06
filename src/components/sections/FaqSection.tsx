import dynamic from "next/dynamic";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqItems, faqSection } from "@/data/faq";

const Accordion = dynamic(
  () => import("@/components/ui/Accordion").then((mod) => ({ default: mod.Accordion })),
  {
    loading: () => (
      <div className="h-56 animate-pulse rounded-xl border border-slate-200 bg-slate-50" />
    ),
  },
);

export function FaqSection() {
  return (
    <Section id="faq" variant="light" aria-labelledby="faq-heading">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14 xl:gap-16">
          <div className="max-lg:mx-auto max-lg:max-w-2xl max-lg:text-center lg:col-span-4">
            <SectionHeading
              headingId="faq-heading"
              title={faqSection.title}
              description={faqSection.description}
              align="left"
            />
          </div>

          <div className="lg:col-span-8">
            <Accordion items={faqItems} theme="light" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
