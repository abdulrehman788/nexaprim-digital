import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  featured?: boolean;
}

export function Card({ children, className, featured = false }: CardProps) {
  return (
    <article
      className={cn(
        "rounded-xl border border-border-subtle bg-surface-elevated p-6 transition-colors",
        featured && "border-accent/50 shadow-glow",
        className,
      )}
    >
      {children}
    </article>
  );
}
