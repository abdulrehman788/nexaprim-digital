"use client";

import Link from "next/link";
import { BookOpen, FileText, Inbox, Plus } from "lucide-react";
import { useState } from "react";

import { ContentStatusBadge } from "@/components/admin/ContentStatusBadge";
import { cn } from "@/lib/utils";

export interface RecentItem {
  id: string;
  title: string;
  status: string;
  dateLabel: string;
  href: string;
}

interface RecentContentProps {
  blogs: RecentItem[];
  stories: RecentItem[];
}

type Tab = "blogs" | "stories";

export function RecentContent({ blogs, stories }: RecentContentProps) {
  const [tab, setTab] = useState<Tab>("blogs");
  const items = tab === "blogs" ? blogs : stories;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_14px_36px_-18px_rgba(15,23,42,0.16)]">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-orange-50/40 via-white to-white px-5 py-4 sm:px-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-orange-600">
            Activity
          </p>
          <div className="mt-0.5 flex items-center gap-2">
            <h2 className="text-sm font-semibold text-slate-900">Recent content</h2>
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-slate-500">
              {items.length}
            </span>
          </div>
        </div>
        <div className="inline-flex rounded-xl bg-slate-100/90 p-1 ring-1 ring-inset ring-slate-200/70">
          {(["blogs", "stories"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition",
                tab === value
                  ? "bg-white text-slate-900 shadow-sm ring-1 ring-orange-200/80"
                  : "text-slate-500 hover:text-slate-800",
              )}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 ring-1 ring-inset ring-orange-100">
            <Inbox className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <p className="mt-4 text-sm font-semibold text-slate-900">No content yet</p>
          <p className="mt-1 max-w-xs text-xs text-slate-500">
            Create your first {tab === "blogs" ? "blog post" : "case study"} to fill this feed.
          </p>
          <Link
            href={tab === "blogs" ? "/admin/blog/new" : "/admin/stories/new"}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-orange-500/25 transition hover:bg-orange-600"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            {tab === "blogs" ? "Create blog post" : "Create story"}
          </Link>
        </div>
      ) : (
        <ul className="flex-1 divide-y divide-slate-100 px-2 py-1 sm:px-3">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-orange-50/50"
              >
                <span
                  data-icon-badge={tab === "stories" ? "" : undefined}
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                    tab === "blogs"
                      ? "bg-orange-50 text-orange-600 ring-1 ring-inset ring-orange-100"
                      : "text-white",
                  )}
                  style={
                    tab === "stories"
                      ? { backgroundColor: "#0f172a", color: "#ffffff" }
                      : undefined
                  }
                >
                  {tab === "blogs" ? (
                    <FileText className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{item.dateLabel}</p>
                </div>
                <ContentStatusBadge status={item.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
