import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

import { AdminSparkline } from "@/components/admin/ui/AdminSparkline";
import { cn } from "@/lib/utils";

interface AdminStatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  href?: string;
  change?: string;
  trend?: "up" | "down" | "flat";
  accent?: "violet" | "green";
}

const sparkColors = {
  violet: "#8b5cf6",
  green: "#22c55e",
};

export function AdminStatCard({
  label,
  value,
  icon: Icon,
  href,
  change,
  trend = "up",
  accent = "violet",
}: AdminStatCardProps) {
  const TrendIcon = trend === "down" ? TrendingDown : TrendingUp;
  const sparkColor = sparkColors[accent];

  const content = (
    <div className="flex h-full flex-col py-1">
      <div className="flex items-center justify-between gap-4">
        <Icon className="h-5 w-5 text-gray-400" strokeWidth={1.5} aria-hidden="true" />
        {change ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400">
            <TrendIcon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            {change}
          </span>
        ) : null}
      </div>

      <div className="mt-8 flex items-end justify-between gap-6">
        <div className="min-w-0">
          <p className="text-4xl font-bold tracking-tight text-gray-900 sm:text-[2.75rem] sm:leading-none">
            {value}
          </p>
          <p className="mt-3 text-sm text-gray-500">{label}</p>
        </div>
        <div className="mb-1 w-24 shrink-0 sm:w-28">
          <AdminSparkline color={sparkColor} trend={trend} />
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "block h-full rounded-2xl transition-colors",
          "hover:bg-white/60",
        )}
      >
        {content}
      </Link>
    );
  }

  return content;
}
