import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface OverviewStat {
  label: string;
  value: number;
  dot: string;
}

interface OverviewCardProps {
  title: string;
  icon: LucideIcon;
  accent?: "slate" | "neutral";
  total: number;
  totalLabel: string;
  stats: OverviewStat[];
  viewAllHref: string;
  viewAllLabel: string;
}

export function OverviewCard({
  title,
  icon: Icon,
  total,
  totalLabel,
  stats,
  viewAllHref,
  viewAllLabel,
}: OverviewCardProps) {
  const published = stats.find((s) => s.label === "Published")?.value ?? 0;
  const drafts = stats.find((s) => s.label === "Drafts")?.value ?? 0;
  const scheduled = stats.find((s) => s.label === "Scheduled")?.value ?? 0;
  const publishedPct = total > 0 ? Math.round((published / total) * 100) : 0;
  const draftPct = total > 0 ? Math.round((drafts / total) * 100) : 0;
  const scheduledPct = Math.max(0, 100 - publishedPct - draftPct);
  const ring = `conic-gradient(#f97316 0 ${publishedPct}%, #94a3b8 ${publishedPct}% ${publishedPct + draftPct}%, #fb923c ${publishedPct + draftPct}% ${publishedPct + draftPct + scheduledPct}%, #e2e8f0 0)`;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_14px_36px_-18px_rgba(15,23,42,0.16)] transition hover:border-orange-200/70 hover:shadow-[0_16px_40px_-18px_rgba(249,115,22,0.28)]">
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-400/10 blur-2xl transition group-hover:bg-orange-400/20"
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            data-icon-badge
            className="flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm"
            style={{
              background: "linear-gradient(145deg, #0f172a, #1e293b)",
              color: "#ffffff",
            }}
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500">{totalLabel}</p>
          </div>
        </div>
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-orange-600 transition hover:bg-orange-50"
        >
          {viewAllLabel}
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>

      <div className="relative mt-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-4xl font-semibold tabular-nums tracking-tight text-slate-900">{total}</p>
          <p className="mt-1.5 text-xs font-medium text-slate-500">
            {published} live · {scheduled} scheduled · {drafts} drafts
          </p>
        </div>
        <div
          className="relative flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-full shadow-[0_8px_20px_-10px_rgba(249,115,22,0.45)]"
          style={{ background: ring }}
          aria-hidden="true"
        >
          <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-white text-center shadow-inner">
            <span className="text-sm font-bold tabular-nums text-slate-900">{publishedPct}%</span>
            <span className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">
              live
            </span>
          </div>
        </div>
      </div>

      <div className="relative mt-5 grid grid-cols-3 gap-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl bg-slate-50/90 px-3 py-2.5 ring-1 ring-inset ring-slate-100 transition group-hover:bg-orange-50/40"
          >
            <div className="flex items-center gap-1.5">
              <span className={cn("h-1.5 w-1.5 rounded-full", stat.dot)} aria-hidden="true" />
              <span className="text-[11px] font-medium text-slate-500">{stat.label}</span>
            </div>
            <p className="mt-1 text-lg font-semibold tabular-nums text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
