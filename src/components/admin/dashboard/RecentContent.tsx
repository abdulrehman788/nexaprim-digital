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
    <div className="flex h-full flex-col rounded-2xl border border-gray-200/70 bg-[#ffffff] p-5 shadow-[0_1px_3px_rgba(16,24,40,0.04),0_12px_28px_-14px_rgba(16,24,40,0.12)] sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-gray-900">Recent Content</h2>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-gray-500">
            {items.length}
          </span>
        </div>
        <div className="inline-flex rounded-lg bg-gray-100 p-0.5">
          {(["blogs", "stories"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-semibold capitalize transition-colors",
                tab === value ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900",
              )}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
          <span
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ring-inset",
              tab === "blogs"
                ? "bg-violet-50 text-violet-500 ring-violet-100"
                : "bg-rose-50 text-rose-500 ring-rose-100",
            )}
          >
            <Inbox className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <p className="mt-4 text-sm font-semibold text-gray-900">No content yet</p>
          <p className="mt-1 text-xs text-gray-500">
            Start by creating your first {tab === "blogs" ? "blog post" : "story"}.
          </p>
          <Link
            href={tab === "blogs" ? "/admin/blog/new" : "/admin/stories/new"}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-violet-200 transition-colors hover:bg-violet-700"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            {tab === "blogs" ? "Create Blog Post" : "Create Story"}
          </Link>
        </div>
      ) : (
        <ul className="mt-4 flex-1 divide-y divide-gray-100">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="flex items-center gap-3 py-3 transition-colors hover:bg-gray-50/80"
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                    tab === "blogs" ? "bg-violet-50 text-violet-500" : "bg-rose-50 text-rose-500",
                  )}
                >
                  {tab === "blogs" ? (
                    <FileText className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{item.dateLabel}</p>
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
