import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants";
import { siteRoutes } from "@/lib/site-routes";

export const revalidate = 3600;

/** Lean public sitemap — home, about, services hub + details, reviews, contact. */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  return siteRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path || "/"}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
