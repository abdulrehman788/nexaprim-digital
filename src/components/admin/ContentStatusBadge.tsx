import { CalendarClock } from "lucide-react";

import type { ContentStatus } from "@/lib/content/types";

import { cn } from "@/lib/utils";

const config: Record<
  ContentStatus,
  { label: string; dot: string; bg: string; text: string }
> = {
  DRAFT: {
    label: "Draft",
    dot: "bg-zinc-400",
    bg: "bg-zinc-100",
    text: "text-zinc-600",
  },
  SCHEDULED: {
    label: "Scheduled",
    dot: "bg-blue-500",
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  PUBLISHED: {
    label: "Published",
    dot: "bg-emerald-500",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
  ARCHIVED: {
    label: "Archived",
    dot: "bg-orange-500",
    bg: "bg-orange-50",
    text: "text-orange-700",
  },
};

export function ContentStatusBadge({
  status,
  publishAt,
  className,
}: {
  status: ContentStatus | string;
  publishAt?: Date | string | null;
  className?: string;
}) {
  const key = (status as ContentStatus) in config ? (status as ContentStatus) : "DRAFT";
  const style = config[key];
  const date = publishAt ? new Date(publishAt) : null;
  const isScheduled = key === "SCHEDULED" && date && date.getTime() > Date.now();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        style.bg,
        style.text,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", style.dot)} aria-hidden="true" />
      {isScheduled ? "Scheduled" : style.label}
    </span>
  );
}

export function PublishDate({
  value,
  className,
}: {
  value: Date | string | null | undefined;
  className?: string;
}) {
  if (!value) {
    return <span className={cn("text-gray-400", className)}>—</span>;
  }
  const date = new Date(value);
  const day = date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const time = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <CalendarClock className="h-4 w-4 shrink-0 text-gray-300" aria-hidden="true" />
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-medium text-gray-700">{day}</span>
        <span className="text-[11px] text-gray-400">{time}</span>
      </span>
    </span>
  );
}

export function formatPublishDate(value: Date | string | null | undefined): string {
  if (!value) return "—";
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function formatRelativeDate(value: Date | string): string {
  const date = new Date(value);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
