import type { Metadata } from "next";

import { AboutCtaSection } from "@/components/sections/about/AboutCtaSection";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutMethodologiesSection } from "@/components/sections/about/AboutMethodologiesSection";
import { AboutPrinciplesSection } from "@/components/sections/about/AboutPrinciplesSection";
import { AboutStatsSection } from "@/components/sections/about/AboutStatsSection";
import { AboutStorySection } from "@/components/sections/about/AboutStorySection";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "About Us",
  description:
    "NexaPrime Digital is an Austin-based marketing studio founded in 2019. We build connected digital systems for mid-market brands — strategy, creative, media, and automation under one team.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutStorySection />
      <AboutPrinciplesSection />
      <AboutMethodologiesSection />
      <AboutStatsSection />
      <AboutCtaSection />
    </main>
  );
}
