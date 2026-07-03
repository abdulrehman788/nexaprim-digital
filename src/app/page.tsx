import type { Metadata } from "next";

import { ClientLogos } from "@/components/sections/ClientLogos";
import { ContactSection } from "@/components/sections/ContactSection";
import { CTASection } from "@/components/sections/CTASection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Digital Marketing Agency",
  description:
    "NexaPrime Digital builds integrated digital systems — strategy, creative, performance marketing, and automation — that drive measurable growth for mid-market brands.",
  path: "/",
});

export default function HomePage({
  searchParams,
}: {
  searchParams?: { intent?: string };
}) {
  return (
    <main>
      <HeroSection />
      <ClientLogos />
      <ServicesSection variant="dark" />
      <IndustriesSection />
      <PackagesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection defaultIntent={searchParams?.intent} variant="dark" />
      <CTASection />
    </main>
  );
}
