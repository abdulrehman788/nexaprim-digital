import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { contactPageFaq } from "@/data/contact";

export function ContactFaqSection() {
  return (
    <Section variant="light" aria-labelledby="contact-faq-heading">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2
            id="contact-faq-heading"
            className="text-center font-serif text-display-sm font-bold text-slate-900 sm:text-[2rem]"
          >
            Before you write
          </h2>

          <ul className="mt-10 space-y-5">
            {contactPageFaq.map((item) => (
              <li
                key={item.id}
                className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-soft sm:px-7 sm:py-6"
              >
                <h3 className="font-display text-base font-bold text-slate-900 sm:text-lg">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {item.answer}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
