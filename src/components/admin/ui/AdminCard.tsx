import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function AdminCard({
  children,
  className,
  padding = true,
}: {
  children: ReactNode;
  className?: string;
  padding?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm ring-1 ring-zinc-900/5",
        padding && "p-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AdminCardHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 px-5 py-4 sm:px-6">
      <div>
        <h2 className="text-sm font-semibold text-zinc-900">{title}</h2>
        {description ? <p className="mt-0.5 text-xs text-zinc-600">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
