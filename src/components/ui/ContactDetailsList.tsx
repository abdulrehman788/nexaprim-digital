import Link from "next/link";

import { contactDetails } from "@/data/contact";
import { siteConfig } from "@/lib/constants";

type ContactDetail = (typeof contactDetails)[number];

interface ContactDetailsListProps {
  details: readonly ContactDetail[];
  variant?: "light" | "dark";
  showEmailFallback?: boolean;
}

export function ContactDetailsList({
  details,
  variant = "light",
  showEmailFallback = true,
}: ContactDetailsListProps) {
  const isDark = variant === "dark";

  return (
    <>
      <ul className="flex flex-col gap-6">
        {details.map((detail) => {
          const Icon = detail.icon;
          const content = (
            <>
              <div
                className={
                  isDark
                    ? "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent-muted"
                    : "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gold-200 bg-gold-50"
                }
              >
                <Icon
                  className={isDark ? "h-5 w-5 text-accent" : "h-5 w-5 text-gold-600"}
                  aria-hidden="true"
                />
              </div>
              <div>
                <p
                  className={
                    isDark
                      ? "text-xs font-semibold uppercase tracking-wider text-content-muted"
                      : "text-xs font-semibold uppercase tracking-wider text-slate-500"
                  }
                >
                  {detail.label}
                </p>
                <p
                  className={
                    isDark
                      ? "mt-1 text-sm leading-relaxed text-content-primary sm:text-base"
                      : "mt-1 text-sm leading-relaxed text-slate-900 sm:text-base"
                  }
                >
                  {detail.value}
                </p>
              </div>
            </>
          );

          return (
            <li key={detail.id}>
              {"href" in detail && detail.href ? (
                <Link
                  href={detail.href}
                  className={`flex gap-4 transition-colors ${isDark ? "hover:text-accent" : "hover:text-gold-600"}`}
                  {...(detail.id === "address"
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {content}
                </Link>
              ) : (
                <div className="flex gap-4">{content}</div>
              )}
            </li>
          );
        })}
      </ul>

      {showEmailFallback ? (
        <p className={`mt-8 text-sm ${isDark ? "text-content-muted" : "text-slate-500"}`}>
          Prefer email? Reach us directly at{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className={`font-semibold transition-colors ${
              isDark ? "text-accent hover:text-accent-hover" : "text-gold-600 hover:text-gold-700"
            }`}
          >
            {siteConfig.email}
          </a>
        </p>
      ) : null}
    </>
  );
}
