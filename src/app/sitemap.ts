import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants";

/** Refresh sitemap periodically for crawlers. */
export const revalidate = 3600;

const sitemapPages = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/reviews", priority: 0.8, changeFrequency: "weekly" as const },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  return sitemapPages.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path === "/" ? "/" : path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
