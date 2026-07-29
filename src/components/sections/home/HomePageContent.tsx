import dynamic from "next/dynamic";

import { HeroSection } from "@/components/sections/HeroSection";

const ClientLogos = dynamic(
  () => import("@/components/sections/ClientLogos").then((mod) => ({ default: mod.ClientLogos })),
  { loading: () => <SectionPlaceholder short /> },
);

const ServicesSection = dynamic(
  () =>
    import("@/components/sections/ServicesSection").then((mod) => ({
      default: mod.ServicesSection,
    })),
  { loading: () => <SectionPlaceholder /> },
);

const GrowthProcessSection = dynamic(
  () =>
    import("@/components/sections/GrowthProcessSection").then((mod) => ({
      default: mod.GrowthProcessSection,
    })),
  { loading: () => <SectionPlaceholder /> },
);

const IndustriesSection = dynamic(
  () =>
    import("@/components/sections/IndustriesSection").then((mod) => ({
      default: mod.IndustriesSection,
    })),
  { loading: () => <SectionPlaceholder /> },
);

const HomePricingSection = dynamic(
  () =>
    import("@/components/sections/home/HomePricingSection").then((mod) => ({
      default: mod.HomePricingSection,
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

const HomeClientReviewsSection = dynamic(
  () =>
    import("@/components/sections/home/HomeClientReviewsSection").then((mod) => ({
      default: mod.HomeClientReviewsSection,
    })),
  { loading: () => <SectionPlaceholder /> },
);

const HomeConnectCta = dynamic(
  () =>
    import("@/components/sections/home/HomeConnectCta").then((mod) => ({
      default: mod.HomeConnectCta,
    })),
  { loading: () => <SectionPlaceholder short /> },
);

function SectionPlaceholder({ tall = false, short = false }: { tall?: boolean; short?: boolean }) {
  return (
    <div
      className={
        tall
          ? "h-[40rem] animate-pulse bg-black"
          : short
            ? "h-24 animate-pulse bg-black"
            : "h-64 animate-pulse bg-black"
      }
      aria-hidden="true"
    />
  );
}

export function HomePageContent() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <GrowthProcessSection />
      <IndustriesSection />
      <ClientLogos />
      <HomePricingSection />
      <TestimonialsSection />
      <HomeClientReviewsSection />
      <HomeConnectCta />
    </>
  );
}
