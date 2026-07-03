import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { whyUsFeatures, whyUsSection } from "@/data/testimonials";

export function WhyUsSection() {
  return (
    <Section variant="light" aria-labelledby="why-us-heading">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="why-us-heading"
            className="font-display text-display-sm text-content-inverse sm:text-display-md"
          >
            {whyUsSection.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-500 sm:text-lg">
            {whyUsSection.description}
          </p>
        </div>

        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {whyUsFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <li key={feature.id} className="text-center lg:text-left">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-gold-200 bg-gold-50 lg:mx-0">
                  <Icon className="h-5 w-5 text-gold-600" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-content-inverse">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">
                  {feature.description}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
