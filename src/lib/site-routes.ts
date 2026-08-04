import type { MetadataRoute } from "next";

import { services } from "@/data/services";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

export type SiteRoute = {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
};

/** Sitemap-only indexable routes: hubs + every service detail page. */
const hubRoutes: SiteRoute[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services", priority: 0.95, changeFrequency: "weekly" },
  { path: "/reviews", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
];

const serviceDetailRoutes: SiteRoute[] = services.map((service) => ({
  path: service.href,
  priority: 0.85,
  changeFrequency: "monthly" as const,
}));

export const siteRoutes: SiteRoute[] = [...hubRoutes, ...serviceDetailRoutes];
