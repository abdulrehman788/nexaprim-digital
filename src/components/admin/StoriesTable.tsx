"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { ContentStatusBadge, PublishDate } from "@/components/admin/ContentStatusBadge";
import { cn } from "@/lib/utils";

export interface StoryRow {
  id: string;
  client: string;
  slug: string;
  industry: string;
  status: string;
  publishAt: string | null;
}

const filters = [
  { key: "ALL", label: "All" },
  { key: "PUBLISHED", label: "Published" },
  { key: "DRAFT", label: "Drafts" },
  { key: "SCHEDULED", label: "Scheduled" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

export function StoriesTable({ stories }: { stories: StoryRow[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("ALL");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return stories.filter((story) => {
      const matchesFilter = filter === "ALL" || story.status === filter;
      if (!matchesFilter) return false;
      if (!q) return true;
      return (
        story.client.toLowerCase().includes(q) ||
        story.slug.toLowerCase().includes(q) ||
        story.industry.toLowerCase().includes(q)
      );
    });
  }, [stories, query, filter]);

  return (
    <div>
      <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="relative w-full sm:max-w-sm">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search client, slug, or industry…"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
          />
        </div>
        <div
          className="inline-flex flex-wrap gap-1.5 rounded-xl bg-slate-100/80 p-1"
          role="tablist"
          aria-label="Filter by status"
        >
          {filters.map((item) => {
            const active = filter === item.key;
            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(item.key)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold transition",
                  active
                    ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/80"
                    : "text-slate-500 hover:text-slate-800",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <p className="text-sm font-semibold text-slate-900">No stories match your filters</p>
          <p className="mt-1 text-xs text-slate-500">Try a different search or status.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                <th className="px-5 py-3.5">Client</th>
                <th className="hidden px-5 py-3.5 sm:table-cell">Industry</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="hidden px-5 py-3.5 md:table-cell">Publish</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((story) => (
                <tr key={story.id} className="group transition hover:bg-slate-50/90">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-100">
                        <BookOpen className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-900">{story.client}</p>
                        <p className="mt-0.5 truncate font-mono text-xs text-slate-400">
                          /case-studies/{story.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-5 py-4 sm:table-cell">
                    <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      {story.industry}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <ContentStatusBadge status={story.status} publishAt={story.publishAt} />
                  </td>
                  <td className="hidden px-5 py-4 md:table-cell">
                    <PublishDate value={story.publishAt} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/stories/${story.id}`}
                      className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-semibold text-orange-700 transition hover:bg-orange-50"
                    >
                      Edit
                      <ArrowRight
                        className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
