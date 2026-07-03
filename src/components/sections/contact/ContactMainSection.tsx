import { ContactForm } from "@/components/forms/ContactForm";
import { ContactDetailsList } from "@/components/ui/ContactDetailsList";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { contactDetails, contactPage } from "@/data/contact";

interface ContactMainSectionProps {
  defaultIntent?: string;
}

export function ContactMainSection({ defaultIntent }: ContactMainSectionProps) {
  return (
    <Section variant="light" aria-labelledby="contact-form-heading" divider={false}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <h2
              id="contact-form-heading"
              className="font-serif text-display-sm font-bold text-slate-900 sm:text-[2rem]"
            >
              {contactPage.formTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {contactPage.formDescription}
            </p>

            <div className="mt-10">
              <ContactDetailsList details={contactDetails} variant="light" />
            </div>

            <p className="mt-8 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-relaxed text-slate-600">
              {contactPage.officeNote}
            </p>
          </div>

          <ContactForm defaultIntent={defaultIntent} theme="light" />
        </div>
      </Container>
    </Section>
  );
}
