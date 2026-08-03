"use client";

import { useEffect, useRef, useState } from "react";

import type { BookingConfig } from "@/lib/booking";

interface CalEmbedProps {
  config: BookingConfig;
}

function EmbedSkeleton() {
  return (
    <div
      className="min-h-[28rem] w-full max-w-full animate-pulse rounded-xl border border-white/[0.06] bg-white/[0.03] sm:min-h-[640px]"
      aria-hidden="true"
    />
  );
}

export function CalEmbed({ config }: CalEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || config.provider !== "calendly") {
      return;
    }

    const existing = document.querySelector('script[src*="calendly.com/assets/external/widget.js"]');
    if (existing) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [config.provider, isVisible]);

  return (
    <div ref={containerRef} className="w-full max-w-full overflow-x-clip">
      {!isVisible ? (
        <EmbedSkeleton />
      ) : config.provider === "calendly" ? (
        <div
          className="calendly-inline-widget min-h-[28rem] w-full max-w-full overflow-hidden rounded-xl border border-white/[0.06] bg-black/20 sm:min-h-[640px]"
          data-url={config.embedUrl}
        />
      ) : (
        <iframe
          title="Book a free consultation"
          src={config.embedUrl}
          loading="lazy"
          className="min-h-[28rem] w-full max-w-full rounded-xl border border-white/[0.06] bg-black/20 sm:min-h-[640px]"
          allow="payment"
        />
      )}
    </div>
  );
}
