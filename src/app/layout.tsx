import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { DevChunkRecovery } from "@/components/dev/DevChunkRecovery";
import { JsonLd } from "@/components/seo/JsonLd";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/lib/constants";

import "./globals.css";

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

/** Runs before any Next chunk — recovers stale tabs after dev server restarts. */
const devChunkRecoveryInlineScript = `
(function () {
  var KEY = "nexaprime-dev-reload";
  function bustReload() {
    if (sessionStorage.getItem(KEY)) return;
    sessionStorage.setItem(KEY, "1");
    var url = new URL(window.location.href);
    url.searchParams.set("__dev", String(Date.now()));
    window.location.replace(url.toString());
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
    }, 4000);
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
      <body>
        {process.env.NODE_ENV === "development" ? (
          <script dangerouslySetInnerHTML={{ __html: devChunkRecoveryInlineScript }} />
        ) : null}
        <DevChunkRecovery />
        <JsonLd />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
