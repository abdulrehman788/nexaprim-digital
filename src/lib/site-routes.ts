import type { MetadataRoute } from "next";

import { caseStudies } from "@/data/case-studies";
import { industries } from "@/data/industries";
import { packages } from "@/data/packages";
import { services } from "@/data/services";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

export type SiteRoute = {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
};

const hubRoutes: SiteRoute[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "weekly" },
  { path: "/packages", priority: 0.9, changeFrequency: "weekly" },
  { path: "/industries", priority: 0.9, changeFrequency: "weekly" },
  { path: "/case-studies", priority: 0.85, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.85, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/book", priority: 0.95, changeFrequency: "weekly" },
  { path: "/reviews", priority: 0.8, changeFrequency: "weekly" },
];

const detailRoutes: SiteRoute[] = [
  ...services.map((service) => ({
    path: service.href,
    priority: 0.75,
    changeFrequency: "monthly" as const,
  })),
  ...packages.map((pkg) => ({
    path: pkg.href,
    priority: 0.75,
    changeFrequency: "monthly" as const,
  })),
  ...industries.map((industry) => ({
    path: industry.href,
    priority: 0.75,
    changeFrequency: "monthly" as const,
  })),
  ...caseStudies.map((study) => ({
    path: `/case-studies/${study.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),
];

/** All indexable public routes for sitemap generation. */
export const siteRoutes: SiteRoute[] = [...hubRoutes, ...detailRoutes];
