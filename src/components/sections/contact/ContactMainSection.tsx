import { ContactFormWithIntent } from "@/components/forms/ContactFormWithIntent";
import { ContactDetailsList } from "@/components/ui/ContactDetailsList";
import { Container } from "@/components/ui/Container";
import { contactDetails, contactPage } from "@/data/contact";
import { sectionLight, sectionPadding } from "@/lib/section-surfaces";
import { cn } from "@/lib/utils";

interface ContactMainSectionProps {
  defaultIntent?: string;
}

export function ContactMainSection({ defaultIntent }: ContactMainSectionProps) {
  return (
    <section
      aria-labelledby="contact-form-heading"
      className={cn(sectionLight, sectionPadding, "pb-16 sm:pb-20")}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-600">
              {contactPage.detailsOverline}
            </p>
            <h2
              id="contact-form-heading"
              className="mt-4 font-display text-xl font-bold text-slate-900 sm:text-2xl"
            >
              {contactPage.detailsTitle}
            </h2>

            <div className="mt-8">
              <ContactDetailsList details={contactDetails} variant="light" />
            </div>

            <p className="mt-8 rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm leading-relaxed text-slate-600">
              {contactPage.officeNote}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-600">
              {contactPage.formOverline}
            </p>
            <h2 className="mt-4 font-display text-xl font-bold text-slate-900 sm:text-2xl">
              {contactPage.formTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {contactPage.formDescription}
            </p>

            <div className="mt-8">
              <ContactFormWithIntent defaultIntent={defaultIntent} theme="light" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
