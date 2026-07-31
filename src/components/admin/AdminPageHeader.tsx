import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

export function AdminPageHeader({
  title,
  description,
  eyebrow,
  icon: Icon,
  iconClassName,
  back,
  action,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  back?: { label: string; href: string };
  action?: { label: string; href: string; icon?: LucideIcon };
}) {
  const ActionIcon = action?.icon ?? Plus;

  return (
    <div className="mb-8">
      {back ? (
        <Link
          href={back.href}
          className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {back.label}
        </Link>
      ) : null}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {Icon ? (
            <span
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
                iconClassName ?? "from-orange-500 to-amber-500 shadow-orange-500/25",
              )}
              aria-hidden="true"
            >
              <Icon className="h-6 w-6" strokeWidth={1.75} />
            </span>
          ) : null}
          <div>
            {eyebrow ? (
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-orange-600">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">{title}</h1>
            {description ? (
              <p className="mt-1.5 text-sm text-zinc-500">{description}</p>
            ) : null}
          </div>
        </div>
        {action ? (
          <Link
            href={action.href}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm shadow-orange-200 transition-colors hover:bg-orange-400"
          >
            <ActionIcon className="h-4 w-4" aria-hidden="true" />
            {action.label}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
