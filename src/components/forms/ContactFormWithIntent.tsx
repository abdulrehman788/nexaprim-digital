"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { ContactForm } from "@/components/forms/ContactForm";
import { cn } from "@/lib/utils";

type ContactFormWithIntentProps = {
  theme?: "dark" | "light";
  defaultIntent?: string;
  compact?: boolean;
};

function ContactFormIntentInner({ theme, defaultIntent, compact }: ContactFormWithIntentProps) {
  const searchParams = useSearchParams();
  const intentFromUrl = searchParams.get("intent") ?? "";
  const intent = defaultIntent || intentFromUrl;

  return <ContactForm key={intent} defaultIntent={intent} theme={theme} compact={compact} />;
}

function ContactFormFallback({
  theme = "dark",
  compact = false,
}: {
  theme?: "dark" | "light";
  compact?: boolean;
}) {
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl border",
        isDark
          ? "border-border-subtle bg-surface-elevated"
          : "border-slate-200 bg-white",
        compact ? "h-72" : "h-[32rem]",
      )}
      aria-hidden="true"
    />
  );
}

export function ContactFormWithIntent(props: ContactFormWithIntentProps) {
  return (
    <Suspense fallback={<ContactFormFallback theme={props.theme} compact={props.compact} />}>
      <ContactFormIntentInner {...props} />
    </Suspense>
  );
}
