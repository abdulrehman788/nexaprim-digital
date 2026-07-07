"use client";

import Link from "next/link";
import { ArrowRight, FileText, Search } from "lucide-react";
import { useMemo, useState } from "react";

import {
  ContentStatusBadge,
  formatRelativeDate,
  PublishDate,
} from "@/components/admin/ContentStatusBadge";
import { cn } from "@/lib/utils";

export interface BlogRow {
  id: string;
  title: string;
  slug: string;
  status: string;
  publishAt: string | null;
  updatedAt: string;
}

const filters = [
  { key: "ALL", label: "All" },
  { key: "PUBLISHED", label: "Published" },
  { key: "DRAFT", label: "Drafts" },
  { key: "SCHEDULED", label: "Scheduled" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

export function BlogTable({ posts }: { posts: BlogRow[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("ALL");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesFilter = filter === "ALL" || post.status === filter;
      if (!matchesFilter) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) || post.slug.toLowerCase().includes(q)
      );
    });
  }, [posts, query, filter]);

  return (
    <div>
      <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search posts..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100"
          />
        </div>
        <div className="inline-flex flex-wrap gap-1 rounded-xl bg-gray-100 p-0.5">
          {filters.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                filter === item.key
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <p className="text-sm font-medium text-gray-900">No posts match your filters</p>
          <p className="mt-1 text-xs text-gray-500">Try a different search or status.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70 text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-5 py-3.5">Title</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="hidden px-5 py-3.5 md:table-cell">Publish date</th>
                <th className="hidden px-5 py-3.5 lg:table-cell">Updated</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((post) => (
                <tr key={post.id} className="group transition-colors hover:bg-gray-50/70">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-500">
                        <FileText className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-gray-900">{post.title}</p>
                        <p className="mt-0.5 truncate font-mono text-xs text-gray-400">
                          /blog/{post.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <ContentStatusBadge status={post.status} publishAt={post.publishAt} />
                  </td>
                  <td className="hidden px-5 py-4 md:table-cell">
                    <PublishDate value={post.publishAt} />
                  </td>
                  <td className="hidden px-5 py-4 text-gray-500 lg:table-cell">
                    {formatRelativeDate(post.updatedAt)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-violet-700 transition-colors hover:bg-violet-50"
                    >
                      Edit
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
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
