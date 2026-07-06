import { Container } from "@/components/ui/Container";
import { contactProcessSection, contactProcessSteps } from "@/data/contact";

export function ContactProcessSection() {
  return (
    <section
      aria-labelledby="contact-process-heading"
      className="border-t border-white/[0.06] bg-[#111118] py-16 sm:py-20"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            {contactProcessSection.overline}
          </p>
          <h2
            id="contact-process-heading"
            className="mt-4 font-display text-[1.75rem] font-bold text-white sm:text-3xl"
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
              className="rounded-2xl border border-white/[0.06] bg-[#1c1c26] p-6 sm:p-7"
            >
              <span className="font-display text-2xl font-bold text-accent">{step.step}</span>
              <h3 className="mt-4 font-display text-lg font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-content-secondary sm:text-base">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
