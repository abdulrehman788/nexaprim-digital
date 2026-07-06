import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants";
import { siteRoutes } from "@/lib/site-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  return siteRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
