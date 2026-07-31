import type { LucideIcon } from "lucide-react";

export function AdminListHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
  live = false,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  live?: boolean;
  actions?: React.ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 border-b border-slate-200/80 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-100">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-600">
            {eyebrow}
          </p>
        </div>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>
        <p className="mt-1.5 max-w-xl text-sm text-slate-500">{description}</p>
      </div>

      {(live || actions) && (
        <div className="flex flex-wrap items-center gap-2">
          {live ? (
            <span className="mr-1 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Live
            </span>
          ) : null}
          {actions}
        </div>
      )}
    </header>
  );
}
