import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  action?: ReactNode;
  headingId?: string;
}

export function SectionHeading({
  title,
  description,
  align = "left",
  dark = false,
  className,
  action,
  headingId,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        align === "left" && "lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        <h2
          id={headingId}
          className={cn(
            "font-display text-display-sm sm:text-display-md",
            dark ? "text-content-primary" : "text-content-inverse",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-4 text-base leading-relaxed sm:text-lg",
              dark ? "text-content-secondary" : "text-navy-500",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
