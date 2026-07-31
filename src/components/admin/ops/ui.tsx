"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Download, Search } from "lucide-react";

import { adminFetch } from "@/lib/admin/client-fetch";
import { cn } from "@/lib/utils";

export function AdminPageHeader({
  title,
  description,
  eyebrow,
  actions,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-600">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.75rem]">
          {title}
        </h1>
        {description ? <p className="mt-1.5 max-w-2xl text-sm text-slate-500">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p>
      <p className="mt-2.5 text-2xl font-semibold tabular-nums tracking-tight text-slate-900">{value}</p>
      {hint ? <p className="mt-1.5 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative min-w-[220px] flex-1">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
      />
    </div>
  );
}

export function ExportButton({ href, label = "Export CSV" }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
    >
      <Download className="h-4 w-4 text-slate-500" />
      {label}
    </a>
  );
}

export function FilterSelect({
  value,
  onChange,
  children,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 shadow-sm outline-none transition hover:border-slate-300 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10",
        className,
      )}
    >
      {children}
    </select>
  );
}

export function DataTableShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]">
      {children}
    </div>
  );
}

export function Pagination({
  page,
  totalPages,
  onPage,
}: {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 text-sm text-slate-600">
      <span className="tabular-nums">
        Page {page} of {totalPages}
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium transition hover:bg-slate-50 disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPage(page + 1)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium transition hover:bg-slate-50 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export function StatusPill({
  status,
  map,
}: {
  status: string;
  map?: Record<string, string>;
}) {
  const colors =
    map?.[status] ??
    ({
      PENDING: "bg-amber-50 text-amber-800 ring-amber-200/80",
      PAID: "bg-emerald-50 text-emerald-800 ring-emerald-200/80",
      FAILED: "bg-rose-50 text-rose-800 ring-rose-200/80",
      REFUNDED: "bg-slate-100 text-slate-700 ring-slate-200",
      CONFIRMED: "bg-orange-50 text-orange-800 ring-orange-200/80",
      COMPLETED: "bg-emerald-50 text-emerald-800 ring-emerald-200/80",
      CANCELLED: "bg-slate-100 text-slate-600 ring-slate-200",
      READ: "bg-slate-100 text-slate-700 ring-slate-200",
      UNREAD: "bg-orange-50 text-orange-800 ring-orange-200/80",
      RESPONDED: "bg-emerald-50 text-emerald-800 ring-emerald-200/80",
      OPEN: "bg-amber-50 text-amber-800 ring-amber-200/80",
    }[status] || "bg-slate-100 text-slate-700 ring-slate-200");

  return (
    <span
      className={cn(
        "inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset",
        colors,
      )}
    >
      {status}
    </span>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-6 py-14 text-center text-sm text-slate-500">
      {message}
    </div>
  );
}

export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function usePagedFetch<T>(
  urlBuilder: (q: string, page: number) => string,
  query: string,
  page: number,
  options?: { pollMs?: number },
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const debouncedQ = useDebouncedValue(query);
  const pollMs = options?.pollMs;

  const reload = useCallback(
    async (opts?: { silent?: boolean }) => {
      if (!opts?.silent) {
        setLoading(true);
        setError(null);
      }
      try {
        const res = await adminFetch(urlBuilder(debouncedQ, page));
        if (!res.ok) throw new Error("Failed to load");
        setData((await res.json()) as T);
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.message === "UNAUTHORIZED") return;
        if (!opts?.silent) {
          setError("Unable to load data.");
          setData(null);
        }
      } finally {
        if (!opts?.silent) setLoading(false);
      }
    },
    [urlBuilder, debouncedQ, page],
  );

  useEffect(() => {
    void reload();
  }, [reload]);

  useEffect(() => {
    if (!pollMs || pollMs < 2000) return;
    const id = window.setInterval(() => {
      void reload({ silent: true });
    }, pollMs);
    return () => window.clearInterval(id);
  }, [pollMs, reload]);

  return { data, loading, error, reload };
}

export function ContentLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-orange-600 hover:text-orange-700 hover:underline">
      {children}
    </Link>
  );
}
