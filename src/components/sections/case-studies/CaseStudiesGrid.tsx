import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { CaseStudy } from "@/types";

interface CaseStudiesGridProps {
  studies: CaseStudy[];
}

export function CaseStudiesGrid({ studies }: CaseStudiesGridProps) {
  return (
    <Section variant="light" aria-labelledby="case-studies-grid-heading" divider={false}>
      <Container>
        <h2 id="case-studies-grid-heading" className="sr-only">
          All case studies
        </h2>

        <ul className="grid gap-8 sm:grid-cols-2 sm:gap-9 lg:grid-cols-3 lg:gap-10">
          {studies.map((study) => (
            <li key={study.id}>
              <CaseStudyCard study={study} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
