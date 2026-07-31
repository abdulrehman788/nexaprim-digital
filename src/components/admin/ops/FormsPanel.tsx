"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  ClipboardList,
  Download,
  FileInput,
  FormInput,
  RefreshCw,
  Search,
} from "lucide-react";

import { AdminListHeader } from "@/components/admin/AdminListHeader";
import { EmptyState, Pagination } from "@/components/admin/ops/ui";
import { adminFetchJson } from "@/lib/admin/client-fetch";
import { cn } from "@/lib/utils";

type FormSummary = {
  formName: string;
  count: number;
  lastSubmission: string | null;
};

type Submission = {
  id: string;
  formName: string;
  data: Record<string, unknown>;
  createdAt: string;
};

type FormsIndex = {
  forms: FormSummary[];
  stats?: { total: number; forms: number; week: number };
};

type FormDetail = {
  items: Submission[];
  total: number;
  page: number;
  totalPages: number;
};

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

function pickString(data: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = data[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

function summaryLine(data: Record<string, unknown>) {
  const name = pickString(data, ["name", "fullName", "full_name"]);
  const email = pickString(data, ["email", "Email"]);
  if (name && email) return { primary: name, secondary: email };
  if (email) return { primary: email, secondary: null };
  if (name) return { primary: name, secondary: null };
  const first = Object.entries(data).find(
    ([, v]) => typeof v === "string" && String(v).trim().length > 0,
  );
  if (first) return { primary: String(first[1]), secondary: first[0] };
  return { primary: "Payload", secondary: null };
}

function FormListSkeleton() {
  return (
    <div className="space-y-2 p-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-11 animate-pulse rounded-xl bg-slate-100" />
      ))}
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex gap-4 border-b border-slate-100 px-5 py-4 last:border-0"
        >
          <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
          <div className="h-16 flex-1 animate-pulse rounded-lg bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

export function FormsPanel({ initialForm }: { initialForm?: string }) {
  const [forms, setForms] = useState<FormSummary[]>([]);
  const [stats, setStats] = useState({ total: 0, forms: 0, week: 0 });
  const [selected, setSelected] = useState(initialForm ?? "");
  const [filter, setFilter] = useState("");
  const [items, setItems] = useState<Submission[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalForForm, setTotalForForm] = useState(0);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadIndex = useCallback(async (opts?: { silent?: boolean }) => {
    if (!opts?.silent) setLoading(true);
    try {
      const payload = await adminFetchJson<FormsIndex>("/api/admin/forms");
      const list = payload.forms ?? [];
      setForms(list);
      setStats(payload.stats ?? { total: 0, forms: list.length, week: 0 });
      setSelected((prev) => {
        if (prev && list.some((f) => f.formName === prev)) return prev;
        return list[0]?.formName ?? "";
      });
      setError(null);
    } catch (err) {
      if (err instanceof Error && err.message === "UNAUTHORIZED") return;
      if (!opts?.silent) {
        setError("Unable to load forms.");
        setForms([]);
      }
    } finally {
      if (!opts?.silent) setLoading(false);
    }
  }, []);

  const loadDetail = useCallback(
    async (opts?: { silent?: boolean }) => {
      if (!selected) {
        setItems([]);
        setTotalPages(1);
        setTotalForForm(0);
        return;
      }
      if (!opts?.silent) setDetailLoading(true);
      try {
        const payload = await adminFetchJson<FormDetail>(
          `/api/admin/forms?form=${encodeURIComponent(selected)}&page=${page}`,
        );
        setItems(payload.items ?? []);
        setTotalPages(payload.totalPages ?? 1);
        setTotalForForm(payload.total ?? 0);
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.message === "UNAUTHORIZED") return;
        if (!opts?.silent) {
          setItems([]);
          setError("Unable to load form submissions.");
        }
      } finally {
        if (!opts?.silent) setDetailLoading(false);
      }
    },
    [selected, page],
  );

  useEffect(() => {
    void loadIndex();
  }, [loadIndex]);

  useEffect(() => {
    void loadDetail();
  }, [loadDetail]);

  useEffect(() => {
    const id = window.setInterval(() => {
      void loadIndex({ silent: true });
      void loadDetail({ silent: true });
    }, 20000);
    return () => window.clearInterval(id);
  }, [loadIndex, loadDetail]);

  const filteredForms = forms.filter((f) =>
    f.formName.toLowerCase().includes(filter.trim().toLowerCase()),
  );

  return (
    <div className="space-y-5 overflow-x-hidden">
      <AdminListHeader
        eyebrow="Intake"
        title="Form submissions"
        description="Entries from every site form — auto-refreshes every few seconds."
        icon={FormInput}
        live
        actions={
          <>
            {selected ? (
              <a
                href={`/api/admin/forms?form=${encodeURIComponent(selected)}&export=csv`}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Export CSV
              </a>
            ) : null}
            <button
              type="button"
              onClick={() => {
                void loadIndex({ silent: true });
                void loadDetail({ silent: true });
              }}
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
              <ClipboardList className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                All entries
              </p>
              <p className="text-xl font-semibold tabular-nums text-slate-900">
                {loading && !forms.length ? "—" : stats.total}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_-14px_rgba(15,23,42,0.1)]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
              <FileInput className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Active forms
              </p>
              <p className="text-xl font-semibold tabular-nums text-slate-900">
                {loading && !forms.length ? "—" : stats.forms}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_-14px_rgba(15,23,42,0.1)]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <FormInput className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Last 7 days
              </p>
              <p className="text-xl font-semibold tabular-nums text-slate-900">
                {loading && !forms.length ? "—" : stats.week}
              </p>
            </div>
          </div>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-2.5 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {loading && !forms.length ? (
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white p-4">
            <FormListSkeleton />
          </div>
          <div className="overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white lg:col-span-2">
            <DetailSkeleton />
          </div>
        </div>
      ) : forms.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[1.25rem] border border-slate-200/80 bg-white px-6 py-20 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-16px_rgba(15,23,42,0.12)]">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 ring-1 ring-slate-200/80">
            <FormInput className="h-6 w-6" aria-hidden="true" />
          </div>
          <p className="text-base font-semibold text-slate-900">No real form entries yet</p>
          <p className="mt-1.5 max-w-sm text-sm text-slate-500">
            Submit the public{" "}
            <Link href="/contact" className="font-semibold text-orange-600 hover:underline">
              Contact
            </Link>{" "}
            or{" "}
            <Link href="/book" className="font-semibold text-orange-600 hover:underline">
              Book a call
            </Link>{" "}
            forms to see live intake here.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-3">
          <aside className="overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-16px_rgba(15,23,42,0.12)]">
            <div className="border-b border-slate-100 px-4 py-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  Forms
                </h2>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Live
                </span>
              </div>
              <div className="relative mt-3">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Filter forms…"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2 pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                />
              </div>
            </div>
            <ul className="max-h-[28rem] space-y-1 overflow-y-auto p-2">
              {filteredForms.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-slate-400">No matches</li>
              ) : (
                filteredForms.map((f) => {
                  const active = selected === f.formName;
                  return (
                    <li key={f.formName}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelected(f.formName);
                          setPage(1);
                          setExpandedId(null);
                          setError(null);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition",
                          active
                            ? "bg-orange-50 font-semibold text-orange-900 ring-1 ring-orange-100"
                            : "text-slate-700 hover:bg-slate-50",
                        )}
                      >
                        <span className="min-w-0 truncate">{f.formName}</span>
                        <span
                          className={cn(
                            "ml-2 shrink-0 rounded-md px-1.5 py-0.5 text-[11px] tabular-nums",
                            active
                              ? "bg-orange-100 text-orange-700"
                              : "bg-slate-100 text-slate-500",
                          )}
                        >
                          {f.count}
                        </span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </aside>

          <section className="overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-16px_rgba(15,23,42,0.12)] lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-4 py-4 sm:px-5">
              <div>
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  Submissions
                </h2>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selected || "Select a form"}
                </p>
              </div>
              <p className="text-xs font-semibold text-slate-500">
                {detailLoading && !items.length
                  ? "…"
                  : `${totalForForm.toLocaleString()} entr${totalForForm === 1 ? "y" : "ies"}`}
              </p>
            </div>

            {detailLoading && !items.length ? (
              <DetailSkeleton />
            ) : !items.length ? (
              <div className="p-6">
                <EmptyState message="No entries for this form." />
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead>
                      <tr className="bg-slate-50/80 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                        <th className="px-5 py-3.5">Submitted</th>
                        <th className="px-5 py-3.5">Entry</th>
                        <th className="px-5 py-3.5">Payload</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {items.map((row) => {
                        const summary = summaryLine(row.data);
                        const expanded = expandedId === row.id;
                        return (
                          <tr key={row.id} className="align-top transition hover:bg-slate-50/90">
                            <td className="whitespace-nowrap px-5 py-4">
                              <div className="font-medium text-slate-800">
                                {formatDate(row.createdAt)}
                              </div>
                              <div className="text-xs text-slate-400">
                                {formatTime(row.createdAt)}
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <div className="font-semibold text-slate-900">{summary.primary}</div>
                              {summary.secondary ? (
                                <div className="mt-0.5 text-xs text-slate-500">{summary.secondary}</div>
                              ) : null}
                            </td>
                            <td className="px-5 py-4">
                              <button
                                type="button"
                                onClick={() => setExpandedId(expanded ? null : row.id)}
                                className="w-full text-left"
                              >
                                {expanded ? (
                                  <pre className="max-w-xl overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-50 p-3 text-xs text-slate-700 ring-1 ring-slate-100">
                                    {JSON.stringify(row.data, null, 2)}
                                  </pre>
                                ) : (
                                  <span className="line-clamp-2 font-mono text-xs text-slate-500">
                                    {JSON.stringify(row.data)}
                                  </span>
                                )}
                                <span className="mt-1.5 inline-block text-[11px] font-semibold text-orange-600">
                                  {expanded ? "Collapse" : "View JSON"}
                                </span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Pagination page={page} totalPages={totalPages} onPage={setPage} />
              </>
            )}
          </section>
        </div>
      )}

      <p className="text-xs text-slate-400">
        Tip: contact and call booking also appear under{" "}
        <Link href="/admin/contacts" className="font-medium text-orange-600 hover:underline">
          Contacts
        </Link>{" "}
        and{" "}
        <Link href="/admin/bookings" className="font-medium text-orange-600 hover:underline">
          Bookings
        </Link>
        .
      </p>
    </div>
  );
}
