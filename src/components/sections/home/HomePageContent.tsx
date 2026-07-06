import dynamic from "next/dynamic";

import { ClientLogos } from "@/components/sections/ClientLogos";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";

const IndustriesSection = dynamic(
  () =>
    import("@/components/sections/IndustriesSection").then((mod) => ({
      default: mod.IndustriesSection,
    })),
  { loading: () => <SectionPlaceholder /> },
);

const PackagesSection = dynamic(
  () =>
    import("@/components/sections/PackagesSection").then((mod) => ({
      default: mod.PackagesSection,
    })),
  { loading: () => <SectionPlaceholder /> },
);

const TestimonialsSection = dynamic(
  () =>
    import("@/components/sections/TestimonialsSection").then((mod) => ({
      default: mod.TestimonialsSection,
    })),
  { loading: () => <SectionPlaceholder /> },
);

const FaqSection = dynamic(
  () =>
    import("@/components/sections/FaqSection").then((mod) => ({
      default: mod.FaqSection,
    })),
  { loading: () => <SectionPlaceholder /> },
);

const ContactSection = dynamic(
  () =>
    import("@/components/sections/ContactSection").then((mod) => ({
      default: mod.ContactSection,
    })),
  { loading: () => <SectionPlaceholder tall /> },
);

const CTASection = dynamic(
  () =>
    import("@/components/sections/CTASection").then((mod) => ({
      default: mod.CTASection,
    })),
  { loading: () => <SectionPlaceholder /> },
);

function SectionPlaceholder({ tall = false }: { tall?: boolean }) {
  return (
    <div
      className={tall ? "h-[40rem] animate-pulse bg-black" : "h-64 animate-pulse bg-black"}
      aria-hidden="true"
    />
  );
}

export function HomePageContent() {
  return (
    <>
      <HeroSection />
      <ClientLogos />
      <ServicesSection variant="dark" />
      <IndustriesSection />
      <PackagesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection variant="dark" />
      <CTASection />
    </>
  );
}
