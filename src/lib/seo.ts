import type { Metadata } from "next";

import { siteConfig } from "@/lib/constants";

interface PageMetadataOptions {
  title: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description = siteConfig.description,
  path = "",
  ogImage = "/images/hero/hero-devices-hd.png",
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonicalUrl,
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
