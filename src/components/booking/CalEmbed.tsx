"use client";

import { useEffect, useRef } from "react";

import type { BookingConfig } from "@/lib/booking";

interface CalEmbedProps {
  config: BookingConfig;
}

export function CalEmbed({ config }: CalEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (config.provider !== "calendly" || !containerRef.current) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [config.provider]);

  if (config.provider === "calendly") {
    return (
      <div
        ref={containerRef}
        className="calendly-inline-widget min-h-[640px] w-full overflow-hidden rounded-xl border border-white/[0.06] bg-black/20"
        data-url={config.embedUrl}
      />
    );
  }

  return (
    <iframe
      title="Book a free consultation"
      src={config.embedUrl}
      className="min-h-[640px] w-full rounded-xl border border-white/[0.06] bg-black/20"
      allow="payment"
    />
  );
}
