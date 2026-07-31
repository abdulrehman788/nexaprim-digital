"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import {
  CheckCheck,
  Download,
  Inbox,
  Mail,
  MailOpen,
  MessageSquareText,
  Phone,
  RefreshCw,
  Search,
} from "lucide-react";

import { AdminListHeader } from "@/components/admin/AdminListHeader";
import { EmptyState, Pagination, StatusPill, usePagedFetch } from "@/components/admin/ops/ui";
import { adminFetchJson } from "@/lib/admin/client-fetch";
import { cn } from "@/lib/utils";

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  intent: string | null;
  message: string;
  isRead: boolean;
  responded: boolean;
  createdAt: string;
};

type Payload = {
  items: Contact[];
  total: number;
  page: number;
  totalPages: number;
  stats?: { unread: number; open: number };
};

const STATUS_FILTERS = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "read", label: "Read" },
] as const;

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function TableSkeleton() {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 border-b border-slate-100 px-5 py-4 last:border-0"
        >
          <div className="h-10 w-10 animate-pulse rounded-full bg-slate-100" />
          <div className="h-4 w-32 animate-pulse rounded bg-slate-100" />
          <div className="h-4 flex-1 animate-pulse rounded bg-slate-100" />
          <div className="h-5 w-16 animate-pulse rounded-full bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

export function ContactsTable() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const urlBuilder = useCallback(
    (query: string, p: number) =>
      `/api/admin/contacts?q=${encodeURIComponent(query)}&status=${status}&page=${p}`,
    [status],
  );

  const { data, loading, error, reload } = usePagedFetch<Payload>(urlBuilder, q, page, {
    pollMs: 20000,
  });

  const total = data?.total ?? 0;
  const unread = data?.stats?.unread ?? 0;
  const open = data?.stats?.open ?? 0;

  async function patch(id: string, body: Partial<Contact>) {
    setActionError(null);
    setBusyId(id);
    try {
      await adminFetchJson(`/api/admin/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await reload({ silent: true });
    } catch (err) {
      if (err instanceof Error && err.message === "UNAUTHORIZED") return;
      setActionError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-5 overflow-x-hidden">
      <AdminListHeader
        eyebrow="Inbox"
        title="Contact submissions"
        description="Messages from the Contact Us form — auto-refreshes every few seconds."
        icon={Inbox}
        live
        actions={
          <>
            <a
              href={`/api/admin/contacts?export=csv&q=${encodeURIComponent(q)}&status=${status}`}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Export CSV
            </a>
            <button
              type="button"
              onClick={() => void reload({ silent: true })}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Refresh
            </button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_-14px_rgba(15,23,42,0.1)]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <Mail className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                In view
              </p>
              <p className="text-xl font-semibold tabular-nums text-slate-900">
                {loading && !data ? "—" : total}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_-14px_rgba(15,23,42,0.1)]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
              <MailOpen className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Need a look
              </p>
              <p className="text-xl font-semibold tabular-nums text-slate-900">
                {loading && !data ? "—" : unread}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_-14px_rgba(15,23,42,0.1)]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <MessageSquareText className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Awaiting reply
              </p>
              <p className="text-xl font-semibold tabular-nums text-slate-900">
                {loading && !data ? "—" : open}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-16px_rgba(15,23,42,0.12)]">
        <div className="space-y-4 border-b border-slate-100 px-4 py-4 sm:px-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={q}
                onChange={(e) => {
                  setPage(1);
                  setQ(e.target.value);
                }}
                placeholder="Search name, email, or message…"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
              />
            </div>
            <p className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-slate-500">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Live · {loading && !data ? "…" : `${total.toLocaleString()} message${total === 1 ? "" : "s"}`}
            </p>
          </div>

          <div
            className="flex flex-wrap gap-1.5 rounded-xl bg-slate-100/80 p-1"
            role="tablist"
            aria-label="Filter by read status"
          >
            {STATUS_FILTERS.map((item) => {
              const active = status === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setPage(1);
                    setStatus(item.key);
                  }}
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

        {actionError ? (
          <div className="border-b border-rose-100 bg-rose-50 px-5 py-2.5 text-sm text-rose-700">
            {actionError}
          </div>
        ) : null}

        {loading && !data ? (
          <TableSkeleton />
        ) : error ? (
          <div className="p-6">
            <EmptyState message={error} />
          </div>
        ) : !data?.items.length ? (
          <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 ring-1 ring-slate-200/80">
              <Inbox className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="text-base font-semibold text-slate-900">No real messages yet</p>
            <p className="mt-1.5 max-w-sm text-sm text-slate-500">
              Submit the public{" "}
              <Link href="/contact" className="font-semibold text-orange-600 hover:underline">
                Contact Us
              </Link>{" "}
              form to see live inbox entries here.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50/80 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                    <th className="px-5 py-3.5">Contact</th>
                    <th className="px-5 py-3.5">Message</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5">Submitted</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.items.map((row) => {
                    const expanded = expandedId === row.id;
                    const busy = busyId === row.id;
                    return (
                      <tr
                        key={row.id}
                        className={cn(
                          "group align-top transition",
                          row.isRead ? "hover:bg-slate-50/90" : "bg-orange-50/35 hover:bg-orange-50/55",
                        )}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-start gap-3">
                            <span
                              className="relative mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                              style={{
                                background: "linear-gradient(145deg, #1e293b 0%, #0f172a 100%)",
                              }}
                            >
                              {initials(row.name) || "?"}
                              {!row.isRead ? (
                                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-orange-500 ring-2 ring-white" />
                              ) : null}
                            </span>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="truncate font-semibold text-slate-900">{row.name}</span>
                                {row.company ? (
                                  <span className="hidden truncate text-xs text-slate-400 sm:inline">
                                    · {row.company}
                                  </span>
                                ) : null}
                              </div>
                              <a
                                href={`mailto:${row.email}`}
                                className="mt-0.5 block truncate text-xs text-slate-500 hover:text-orange-600"
                              >
                                {row.email}
                              </a>
                              {row.phone ? (
                                <div className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500">
                                  <Phone className="h-3 w-3" aria-hidden="true" />
                                  {row.phone}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </td>
                        <td className="max-w-md px-5 py-4">
                          <button
                            type="button"
                            onClick={() => setExpandedId(expanded ? null : row.id)}
                            className="w-full text-left"
                          >
                            <p
                              className={cn(
                                "text-slate-700",
                                expanded ? "whitespace-pre-wrap" : "line-clamp-2",
                              )}
                            >
                              {row.message}
                            </p>
                            <span className="mt-1 inline-block text-[11px] font-semibold text-orange-600">
                              {expanded ? "Show less" : "Read more"}
                            </span>
                          </button>
                          {row.intent ? (
                            <span className="mt-2 inline-flex rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                              {row.intent}
                            </span>
                          ) : null}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex flex-col gap-1.5">
                            <StatusPill status={row.isRead ? "READ" : "UNREAD"} />
                            <StatusPill status={row.responded ? "RESPONDED" : "OPEN"} />
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4">
                          <div className="font-medium text-slate-800">{formatDate(row.createdAt)}</div>
                          <div className="text-xs text-slate-400">{formatTime(row.createdAt)}</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex flex-col items-end gap-1.5">
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => void patch(row.id, { isRead: !row.isRead })}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700 disabled:opacity-50"
                            >
                              {row.isRead ? (
                                <>
                                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                                  Mark unread
                                </>
                              ) : (
                                <>
                                  <MailOpen className="h-3.5 w-3.5" aria-hidden="true" />
                                  Mark read
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => void patch(row.id, { responded: !row.responded })}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-50"
                            >
                              <CheckCheck className="h-3.5 w-3.5" aria-hidden="true" />
                              {row.responded ? "Undo response" : "Mark responded"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination page={data.page} totalPages={data.totalPages} onPage={setPage} />
          </>
        )}
      </section>
    </div>
  );
}
