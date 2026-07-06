"use client";

import { useReportWebVitals } from "next/web-vitals";

type ReportHandler = Parameters<typeof useReportWebVitals>[0];

const reportWebVital: ReportHandler = (metric) => {
  if (process.env.NODE_ENV === "development") {
    const rating =
      metric.rating === "good" ? "✓" : metric.rating === "needs-improvement" ? "!" : "✗";
    console.info(`[Web Vitals] ${rating} ${metric.name}:`, Math.round(metric.value), metric.id);
    return;
  }

  const endpoint = process.env.NEXT_PUBLIC_WEB_VITALS_ENDPOINT;
  if (!endpoint) {
    return;
  }

  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    id: metric.id,
    navigationType: metric.navigationType,
  });

  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    navigator.sendBeacon(endpoint, body);
    return;
  }

  void fetch(endpoint, {
    body,
    method: "POST",
    keepalive: true,
    headers: { "Content-Type": "application/json" },
  });
};

export function WebVitals() {
  useReportWebVitals(reportWebVital);
  return null;
}
