import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionVariant = "dark" | "light" | "primary";

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: SectionVariant;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  divider?: boolean;
}

const variantStyles: Record<SectionVariant, string> = {
  dark: "bg-surface-secondary text-content-primary",
  light: "bg-white text-content-inverse",
  primary: "bg-surface-primary text-content-primary",
};

export function Section({
  children,
  className,
  variant = "dark",
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  divider = true,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        "py-20 lg:py-28",
        divider && variant === "dark" && "border-t border-border-subtle",
        divider && variant === "light" && "border-t border-navy-100",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </section>
  );
}
