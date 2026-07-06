"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { ContactForm } from "@/components/forms/ContactForm";

type ContactFormWithIntentProps = {
  theme?: "dark" | "light";
  defaultIntent?: string;
};

function ContactFormIntentInner({ theme, defaultIntent }: ContactFormWithIntentProps) {
  const searchParams = useSearchParams();
  const intentFromUrl = searchParams.get("intent") ?? "";
  const intent = defaultIntent || intentFromUrl;

  return <ContactForm key={intent} defaultIntent={intent} theme={theme} />;
}

function ContactFormFallback({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const isDark = theme === "dark";

  return (
    <div
      className={
        isDark
          ? "h-[32rem] animate-pulse rounded-2xl border border-border-subtle bg-surface-elevated"
          : "h-[32rem] animate-pulse rounded-2xl border border-slate-200 bg-white"
      }
      aria-hidden="true"
    />
  );
}

export function ContactFormWithIntent(props: ContactFormWithIntentProps) {
  return (
    <Suspense fallback={<ContactFormFallback theme={props.theme} />}>
      <ContactFormIntentInner {...props} />
    </Suspense>
  );
}
