import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { OverviewSparkline } from "@/components/admin/dashboard/OverviewSparkline";
import { cn } from "@/lib/utils";

export interface OverviewStat {
  label: string;
  value: number;
  dot: string;
}

interface OverviewCardProps {
  title: string;
  icon: LucideIcon;
  accent: "violet" | "rose";
  total: number;
  totalLabel: string;
  stats: OverviewStat[];
  viewAllHref: string;
  viewAllLabel: string;
}

const accentStyles = {
  violet: {
    badge: "bg-violet-100 text-violet-600 ring-1 ring-inset ring-violet-200/70",
    pill: "bg-violet-50 text-violet-600 hover:bg-violet-100",
    bar: "from-violet-500 to-indigo-500",
    chipHover: "hover:border-violet-200 hover:bg-violet-50/60",
    spark: "#8b5cf6",
    points: [8, 14, 11, 20, 17, 26, 22, 34],
    glow: "from-violet-500/[0.07]",
  },
  rose: {
    badge: "bg-rose-100 text-rose-600 ring-1 ring-inset ring-rose-200/70",
    pill: "bg-rose-50 text-rose-600 hover:bg-rose-100",
    bar: "from-rose-500 to-pink-500",
    chipHover: "hover:border-rose-200 hover:bg-rose-50/60",
    spark: "#f43f5e",
    points: [6, 12, 18, 15, 24, 21, 30, 38],
    glow: "from-rose-500/[0.07]",
  },
} as const;

export function OverviewCard({
  title,
  icon: Icon,
  accent,
  total,
  totalLabel,
  stats,
  viewAllHref,
  viewAllLabel,
}: OverviewCardProps) {
  const style = accentStyles[accent];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200/70 bg-[#ffffff] p-5 shadow-[0_1px_3px_rgba(16,24,40,0.04),0_12px_28px_-14px_rgba(16,24,40,0.12)] transition-shadow duration-200 hover:shadow-[0_1px_3px_rgba(16,24,40,0.05),0_18px_40px_-16px_rgba(16,24,40,0.18)] sm:p-6">
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
          style.bar,
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent",
          style.glow,
        )}
        aria-hidden="true"
      />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", style.badge)}>
              <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
          </div>
          <Link
            href={viewAllHref}
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
              style.pill,
            )}
          >
            {viewAllLabel}
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-4xl font-bold tracking-tight text-gray-900">{total}</p>
            <p className="mt-1 text-xs text-gray-500">{totalLabel}</p>
          </div>
          <div className="mb-1 w-28 shrink-0 sm:w-36">
            <p className="mb-1 text-right text-[10px] font-medium uppercase tracking-wide text-gray-400">
              Last 7 days
            </p>
            <OverviewSparkline color={style.spark} points={style.points} />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={cn(
                "rounded-xl border border-transparent bg-gray-50 px-3 py-2.5 transition-colors",
                style.chipHover,
              )}
            >
              <div className="flex items-center gap-1.5">
                <span className={cn("h-1.5 w-1.5 rounded-full", stat.dot)} aria-hidden="true" />
                <span className="text-[11px] font-medium text-gray-500">{stat.label}</span>
              </div>
              <p className="mt-1 text-base font-bold tabular-nums text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
