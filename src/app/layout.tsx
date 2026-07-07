import type { Metadata, Viewport } from "next";

import { WebVitals } from "@/components/analytics/WebVitals";
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
  var PAGE_KEY = "nexaprime-package-page-ver";
  var MAX_ATTEMPTS = 6;

  function hardReload() {
    var attempts = parseInt(sessionStorage.getItem(KEY) || "0", 10);
    if (attempts >= MAX_ATTEMPTS) return;
    sessionStorage.setItem(KEY, String(attempts + 1));
    var url = new URL(window.location.href);
    url.searchParams.set("__r", String(Date.now()));
    window.location.replace(url.toString());
  }

  // Recover immediately when webpack serves a stale/missing module factory.
  var _prevOnError = window.onerror;
  window.onerror = function (message) {
    var msg = (message || "") + "";
    if (msg.indexOf("reading 'call'") !== -1 || msg.indexOf("ChunkLoadError") !== -1) {
      hardReload();
      return true;
    }
    if (typeof _prevOnError === "function") {
      return _prevOnError.apply(this, arguments);
    }
    return false;
  };

  window.addEventListener(
    "error",
    function (event) {
      var target = event.target;
      var message = (event.message || "") + "";
      if (
        message.indexOf("reading 'call'") !== -1 ||
        message.indexOf("ChunkLoadError") !== -1
      ) {
        hardReload();
        return;
      }
      if (!target) return;
      var assetUrl = target.src || target.href || "";
      if (
        assetUrl.indexOf("/_next/static/") !== -1 ||
        assetUrl.indexOf("/_next/webpack") !== -1
      ) {
        hardReload();
      }
    },
    true
  );

  window.addEventListener("unhandledrejection", function (event) {
    var reason = (event.reason && (event.reason.message || event.reason + "")) || "";
    if (
      reason.indexOf("reading 'call'") !== -1 ||
      reason.indexOf("ChunkLoadError") !== -1 ||
      reason.indexOf("Loading chunk") !== -1
    ) {
      hardReload();
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    var main = document.querySelector("main[data-page-ver], main[data-package-page]");
    if (main) {
      var version =
        main.getAttribute("data-page-ver") || main.getAttribute("data-package-page") || "";
      var seen = sessionStorage.getItem(PAGE_KEY);
      if (seen && seen !== version) {
        sessionStorage.setItem(PAGE_KEY, version);
        hardReload();
        return;
      }
      sessionStorage.setItem(PAGE_KEY, version);
    }
  });

  window.addEventListener("load", function () {
    window.setTimeout(function () {
      sessionStorage.removeItem(KEY);
      var url = new URL(window.location.href);
      if (url.searchParams.has("__r")) {
        url.searchParams.delete("__r");
        window.history.replaceState({}, "", url.toString());
      }
    }, 5000);
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
      <body className="antialiased">
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
