"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SiteTracker = dynamic(
  () => import("@/components/analytics/SiteTracker").then((m) => m.SiteTracker),
  { ssr: false },
);

const WebVitals = dynamic(
  () => import("@/components/analytics/WebVitals").then((m) => m.WebVitals),
  { ssr: false },
);

/**
 * Loads analytics after the browser is idle so it doesn't compete with LCP/images.
 */
export function DeferredAnalytics() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const enable = () => {
      if (!cancelled) setReady(true);
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(enable, { timeout: 4000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const t = window.setTimeout(enable, 2500);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <WebVitals />
      <SiteTracker />
    </>
  );
}
