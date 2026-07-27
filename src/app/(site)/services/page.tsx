import type { Metadata } from "next";

import { ServicesCatalog } from "@/components/sections/services/ServicesCatalog";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Services",
  description:
    "An interactive catalog across Build, Brand, Market, Automate, and Scale — from websites, apps, and branding to SEO, ads, AI automation, and growth consulting. Add services and build a proposal with a live total.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main className="bg-white">
      <ServicesHero />
      <ServicesCatalog />
    </main>
  );
}
