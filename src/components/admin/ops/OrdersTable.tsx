"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Banknote,
  Clock3,
  CreditCard,
  Download,
  Package,
  RefreshCw,
  Search,
  type LucideIcon,
} from "lucide-react";

import { EmptyState, Pagination, StatusPill, usePagedFetch } from "@/components/admin/ops/ui";
import { cn } from "@/lib/utils";

type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string | null;
  amount: number;
  currency: string;
  status: string;
  gatewayName: string;
  createdAt: string;
};

type Payload = {
  items: Order[];
  total: number;
  page: number;
  totalPages: number;
  stats: { revenue: number; pending: number; failed: number };
};

const STATUS_FILTERS = [
  { key: "all", label: "All" },
  { key: "PENDING", label: "Pending" },
  { key: "PAID", label: "Paid" },
  { key: "FAILED", label: "Failed" },
  { key: "REFUNDED", label: "Refunded" },
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

function formatMoney(value: number) {
  return `$${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
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
          <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
          <div className="h-10 w-10 animate-pulse rounded-full bg-slate-100" />
          <div className="h-4 flex-1 animate-pulse rounded bg-slate-100" />
          <div className="h-5 w-16 animate-pulse rounded-full bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

export function OrdersTable() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const urlBuilder = useCallback(
    (query: string, p: number) =>
      `/api/admin/orders?q=${encodeURIComponent(query)}&status=${status}&page=${p}`,
    [status],
  );

  const { data, loading, error, reload } = usePagedFetch<Payload>(urlBuilder, q, page, {
    pollMs: 20000,
  });

  const revenue = data?.stats.revenue ?? 0;
  const pending = data?.stats.pending ?? 0;
  const failed = data?.stats.failed ?? 0;
  const total = data?.total ?? 0;
  const paidApprox = Math.max(0, total - pending - failed);

  const kpis: {
    key: string;
    label: string;
    hint: string;
    value: string;
    icon: LucideIcon;
    bar: string;
    iconWrap: string;
  }[] = [
    {
      key: "revenue",
      label: "Paid revenue",
      hint: "Successful checkouts",
      value: loading ? "—" : formatMoney(revenue),
      icon: Banknote,
      bar: "bg-emerald-500",
      iconWrap: "bg-emerald-50 text-emerald-700",
    },
    {
      key: "pending",
      label: "Awaiting pay",
      hint: "Pending gateway",
      value: loading ? "—" : String(pending),
      icon: Clock3,
      bar: "bg-amber-500",
      iconWrap: "bg-amber-50 text-amber-700",
    },
    {
      key: "failed",
      label: "Needs retry",
      hint: "Failed payments",
      value: loading ? "—" : String(failed),
      icon: AlertTriangle,
      bar: "bg-rose-500",
      iconWrap: "bg-rose-50 text-rose-700",
    },
    {
      key: "total",
      label: "In this view",
      hint: `~${paidApprox} paid`,
      value: loading ? "—" : String(total),
      icon: Package,
      bar: "bg-sky-500",
      iconWrap: "bg-sky-50 text-sky-700",
    },
  ];

  return (
    <div className="space-y-5 overflow-x-hidden pb-2">
      {/* Command + KPIs */}
      <section className="overflow-hidden rounded-[1.25rem] border border-slate-200/90 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_22px_50px_-28px_rgba(15,23,42,0.3)]">
        <div
          data-admin-welcome
          className="admin-hero relative px-5 py-5 sm:px-6 sm:py-6"
          style={{
            background:
              "linear-gradient(125deg, #0b1220 0%, #152033 52%, #1c2a44 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 14% 0%, rgba(249,115,22,0.32), transparent 40%), radial-gradient(ellipse at 90% 30%, rgba(56,189,248,0.12), transparent 34%)",
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent"
            aria-hidden="true"
          />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  data-kicker
                  className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] ring-1 ring-inset ring-white/15"
                >
                  <CreditCard className="h-3 w-3" aria-hidden="true" />
                  Commerce
                </span>
                <span data-soft className="inline-flex items-center gap-1.5 text-[11px] font-semibold">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Live · {loading ? "…" : `${total} order${total === 1 ? "" : "s"}`}
                </span>
              </div>

              <h1 className="mt-2.5 text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]">
                Orders & payments
              </h1>
              <p data-muted className="mt-1.5 max-w-xl text-sm leading-relaxed">
                Checkout feed from your payment gateway — auto-refreshes every few seconds.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`/api/admin/orders?export=csv&q=${encodeURIComponent(q)}&status=${status}`}
                data-cta-secondary
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/15"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Export CSV
              </a>
              <button
                type="button"
                onClick={() => void reload({ silent: true })}
                data-cta-primary
                className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold shadow-[0_10px_24px_-10px_rgba(249,115,22,0.85)] transition hover:brightness-110"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="grid grid-cols-2 gap-px bg-slate-100 lg:grid-cols-4">
            {kpis.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div key={kpi.key} className="relative bg-white p-4 sm:p-5">
                  <span className={cn("absolute inset-y-0 left-0 w-1", kpi.bar)} aria-hidden="true" />
                  <div className="flex items-start justify-between gap-2 pl-2">
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                        {kpi.label}
                      </p>
                      <p className="mt-2 truncate text-2xl font-semibold tabular-nums tracking-tight text-slate-900 sm:text-3xl">
                        {kpi.value}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{kpi.hint}</p>
                    </div>
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                        kpi.iconWrap,
                      )}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Orders table */}
      <section className="overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_14px_36px_-18px_rgba(15,23,42,0.14)]">
        <div className="space-y-4 border-b border-slate-100 px-4 py-4 sm:px-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-orange-600">
                Feed
              </p>
              <h2 className="mt-0.5 text-sm font-semibold text-slate-900">Order inbox</h2>
            </div>
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Auto-refresh on
            </p>
          </div>

          <div className="relative min-w-0">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => {
                setPage(1);
                setQ(e.target.value);
              }}
              placeholder="Search order #, customer, or email…"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
            />
          </div>

          <div
            className="flex flex-wrap gap-1.5 rounded-xl bg-slate-100/80 p-1"
            role="tablist"
            aria-label="Filter by status"
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
                    "rounded-lg px-3.5 py-1.5 text-xs font-semibold transition",
                    active
                      ? "bg-white text-slate-900 shadow-sm ring-1 ring-orange-200/80"
                      : "text-slate-500 hover:text-slate-800",
                  )}
                >
                  {item.label}
                  {item.key === "PENDING" && pending > 0 ? (
                    <span className="ml-1.5 rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">
                      {pending}
                    </span>
                  ) : null}
                  {item.key === "FAILED" && failed > 0 ? (
                    <span className="ml-1.5 rounded-md bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-700">
                      {failed}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {loading && !data ? (
          <TableSkeleton />
        ) : error ? (
          <div className="p-6">
            <EmptyState message={error} />
          </div>
        ) : !data?.items.length ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 ring-1 ring-inset ring-orange-100">
              <Package className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="mt-4 text-base font-semibold text-slate-900">No real orders yet</p>
            <p className="mt-1.5 max-w-sm text-sm text-slate-500">
              Create a checkout via{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">POST /api/orders</code> or
              open mock checkout to generate your first payment.
            </p>
            <Link
              href="/checkout/mock"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-orange-500/25 transition hover:bg-orange-600"
            >
              Open mock checkout
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50/80 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                    <th className="px-5 py-3.5">Order</th>
                    <th className="px-5 py-3.5">Customer</th>
                    <th className="px-5 py-3.5">Amount</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5">Gateway</th>
                    <th className="px-5 py-3.5">Placed</th>
                    <th className="px-5 py-3.5" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.items.map((row) => (
                    <tr key={row.id} className="group transition hover:bg-orange-50/30">
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/orders/${row.id}`}
                          className="font-mono text-[13px] font-semibold text-slate-900 transition hover:text-orange-600"
                        >
                          {row.orderNumber}
                        </Link>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                            style={{
                              background: "linear-gradient(145deg, #1e293b 0%, #0f172a 100%)",
                            }}
                          >
                            {initials(row.customerName) || "?"}
                          </span>
                          <div className="min-w-0">
                            <div className="truncate font-semibold text-slate-900">
                              {row.customerName}
                            </div>
                            <div className="truncate text-xs text-slate-500">{row.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-semibold tabular-nums text-slate-900">
                          {row.amount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                        <div className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                          {row.currency}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <StatusPill status={row.status} />
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold capitalize text-slate-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                          {row.gatewayName}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="font-medium text-slate-800">{formatDate(row.createdAt)}</div>
                        <div className="text-xs text-slate-400">{formatTime(row.createdAt)}</div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/admin/orders/${row.id}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-transparent px-2.5 py-1.5 text-xs font-semibold text-slate-400 transition hover:border-slate-200 hover:bg-white hover:text-orange-600 group-hover:border-slate-200 group-hover:bg-white group-hover:text-slate-700"
                        >
                          Open
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      </td>
                    </tr>
                  ))}
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
