import { ContactFormWithIntent } from "@/components/forms/ContactFormWithIntent";
import { ContactDetailsList } from "@/components/ui/ContactDetailsList";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactDetails, contactSection } from "@/data/contact";

interface ContactSectionProps {
  variant?: "light" | "dark";
}

export function ContactSection({ variant = "light" }: ContactSectionProps) {
  const isDark = variant === "dark";

  return (
    <Section id="contact" variant={variant} aria-labelledby="contact-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              headingId="contact-heading"
              title={contactSection.title}
              description={contactSection.description}
              dark={isDark}
            />

            <div className="mt-10">
              <ContactDetailsList details={contactDetails} variant={variant} />
            </div>
          </div>

          <ContactFormWithIntent theme={variant} />
        </div>
      </Container>
    </Section>
  );
}
