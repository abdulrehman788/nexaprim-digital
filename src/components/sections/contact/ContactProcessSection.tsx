import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { contactProcessSection, contactProcessSteps } from "@/data/contact";

export function ContactProcessSection() {
  return (
    <Section variant="dark" aria-labelledby="contact-process-heading" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(197,163,88,0.05),transparent_50%)]" />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-accent sm:text-sm">
            {contactProcessSection.overline}
          </p>
          <h2
            id="contact-process-heading"
            className="font-serif text-display-sm font-bold text-content-primary sm:text-display-md"
          >
            {contactProcessSection.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-content-secondary">
            {contactProcessSection.description}
          </p>
        </div>

        <ol className="mt-12 grid gap-5 lg:grid-cols-3">
          {contactProcessSteps.map((step) => (
            <li
              key={step.id}
              className="rounded-2xl border border-border-subtle bg-surface-elevated/50 p-6 sm:p-7"
            >
              <span className="font-display text-2xl font-bold text-accent">{step.step}</span>
              <h3 className="mt-4 font-display text-lg font-bold text-content-primary">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-content-secondary sm:text-base">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
