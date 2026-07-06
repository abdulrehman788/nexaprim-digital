import { ContactFormWithIntent } from "@/components/forms/ContactFormWithIntent";
import { ContactDetailsList } from "@/components/ui/ContactDetailsList";
import { Container } from "@/components/ui/Container";
import { contactDetails, contactPage } from "@/data/contact";

interface ContactMainSectionProps {
  defaultIntent?: string;
}

export function ContactMainSection({ defaultIntent }: ContactMainSectionProps) {
  return (
    <section aria-labelledby="contact-form-heading" className="bg-surface-primary pb-16 sm:pb-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="rounded-2xl border border-white/10 bg-[#111118] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              {contactPage.detailsOverline}
            </p>
            <h2
              id="contact-form-heading"
              className="mt-4 font-display text-xl font-bold text-white sm:text-2xl"
            >
              {contactPage.detailsTitle}
            </h2>

            <div className="mt-8">
              <ContactDetailsList details={contactDetails} variant="dark" />
            </div>

            <p className="mt-8 rounded-xl border border-white/[0.06] bg-black/30 px-5 py-4 text-sm leading-relaxed text-content-secondary">
              {contactPage.officeNote}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111118] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              {contactPage.formOverline}
            </p>
            <h2 className="mt-4 font-display text-xl font-bold text-white sm:text-2xl">
              {contactPage.formTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-content-secondary sm:text-base">
              {contactPage.formDescription}
            </p>

            <div className="mt-8">
              <ContactFormWithIntent defaultIntent={defaultIntent} theme="dark" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
