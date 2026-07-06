import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { industries } from "@/data/industries";

import { IndustryPageCard } from "./IndustryPageCard";

export function IndustriesGrid() {
  return (
    <Section variant="light" aria-labelledby="industries-grid-heading" divider={false}>
      <Container>
        <h2 id="industries-grid-heading" className="sr-only">
          All industries
        </h2>

        <ul className="grid list-none gap-8 p-0 sm:grid-cols-2 sm:gap-9 lg:grid-cols-3 lg:gap-10">
          {industries.map((industry) => (
            <li key={industry.id}>
              <IndustryPageCard industry={industry} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
