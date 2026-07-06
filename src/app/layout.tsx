import type { Metadata, Viewport } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WebVitals } from "@/components/analytics/WebVitals";
import { JsonLd } from "@/components/seo/JsonLd";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/lib/constants";

import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05080f",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/** Runs in <head> before Next assets — recovers stale tabs after dev server restarts. */
const devChunkRecoveryInlineScript = `
(function () {
  var KEY = "nexaprime-dev-reload-attempts";
  var MAX_ATTEMPTS = 4;

  function bustReload() {
    var attempts = parseInt(sessionStorage.getItem(KEY) || "0", 10);
    if (attempts >= MAX_ATTEMPTS) return;
    sessionStorage.setItem(KEY, String(attempts + 1));
    window.setTimeout(function () {
      window.location.reload();
    }, attempts === 0 ? 400 : 1200 + attempts * 400);
  }

  window.addEventListener(
    "error",
    function (event) {
      var target = event.target;
      if (!target) return;
      var assetUrl = target.src || target.href || "";
      if (
        assetUrl.indexOf("/_next/static/") !== -1 ||
        assetUrl.indexOf("/_next/webpack") !== -1
      ) {
        bustReload();
      }
    },
    true
  );

  window.addEventListener("load", function () {
    window.setTimeout(function () {
      sessionStorage.removeItem(KEY);
      if (window.location.search.indexOf("__dev=") !== -1) {
        var clean = new URL(window.location.href);
        clean.searchParams.delete("__dev");
        window.history.replaceState({}, "", clean.toString());
      }
    }, 6000);
  });
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://cal.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        {process.env.NODE_ENV === "development" ? (
          <script dangerouslySetInnerHTML={{ __html: devChunkRecoveryInlineScript }} />
        ) : null}
      </head>
      <body>
        <WebVitals />
        <JsonLd />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
