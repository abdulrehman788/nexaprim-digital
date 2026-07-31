"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { AdminPageHeader, EmptyState, StatusPill } from "@/components/admin/ops/ui";
import { adminFetchJson } from "@/lib/admin/client-fetch";

type OrderDetail = {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string | null;
  amount: number;
  currency: string;
  status: string;
  gatewayName: string;
  gatewayTxnId: string | null;
  gatewayMeta: unknown;
  items: { name: string; quantity: number; unitPrice?: number }[];
  createdAt: string;
  updatedAt: string;
};

export function OrderDetailView({ id }: { id: string }) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      const data = await adminFetchJson<OrderDetail>(`/api/admin/orders/${id}`);
      setOrder(data);
      setError(null);
    } catch (err) {
      if (err instanceof Error && err.message === "UNAUTHORIZED") return;
      setError(err instanceof Error ? err.message : "Order not found");
      setOrder(null);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function updateStatus(status: string) {
    setBusy(true);
    setActionError(null);
    try {
      await adminFetchJson(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      await load();
    } catch (err) {
      if (err instanceof Error && err.message === "UNAUTHORIZED") return;
      setActionError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setBusy(false);
    }
  }

  async function verify() {
    setBusy(true);
    setActionError(null);
    try {
      await adminFetchJson(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verify: true }),
      });
      await load();
    } catch (err) {
      if (err instanceof Error && err.message === "UNAUTHORIZED") return;
      setActionError(err instanceof Error ? err.message : "Verify failed");
    } finally {
      setBusy(false);
    }
  }

  if (error) return <EmptyState message={error} />;
  if (!order) return <p className="text-sm text-slate-500">Loading…</p>;

  return (
    <div className="space-y-5">
      <AdminPageHeader
        eyebrow="Commerce"
        title={order.orderNumber}
        description={`${order.customerName} · ${order.email}`}
        actions={
          <Link
            href="/admin/orders"
            className="text-sm font-semibold text-orange-600 hover:text-orange-700 hover:underline"
          >
            ← Back to orders
          </Link>
        }
      />

      {actionError ? <p className="text-sm text-red-600">{actionError}</p> : null}

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] lg:col-span-2">
          <div className="flex flex-wrap items-center gap-3">
            <StatusPill status={order.status} />
            <span className="text-sm capitalize text-slate-500">via {order.gatewayName}</span>
          </div>
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                Amount
              </dt>
              <dd className="mt-1 text-lg font-semibold tabular-nums text-slate-900">
                {order.currency} {order.amount.toFixed(2)}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                Phone
              </dt>
              <dd className="mt-1 text-slate-800">{order.phone || "—"}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                Gateway txn
              </dt>
              <dd className="mt-1 break-all font-mono text-xs text-slate-700">
                {order.gatewayTxnId || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                Created
              </dt>
              <dd className="mt-1 text-slate-800">{new Date(order.createdAt).toLocaleString()}</dd>
            </div>
          </dl>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
              Items
            </h2>
            <ul className="mt-2 space-y-1 text-sm">
              {order.items.length === 0 ? (
                <li className="text-slate-500">No line items</li>
              ) : (
                order.items.map((item, i) => (
                  <li
                    key={`${item.name}-${i}`}
                    className="flex justify-between border-b border-slate-50 py-2.5 text-slate-800 last:border-0"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span className="tabular-nums text-slate-600">
                      {item.unitPrice != null ? `${order.currency} ${item.unitPrice.toFixed(2)}` : ""}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>

          {order.gatewayMeta ? (
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                Gateway response
              </h2>
              <pre className="mt-2 overflow-x-auto rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs text-slate-700">
                {JSON.stringify(order.gatewayMeta, null, 2)}
              </pre>
            </div>
          ) : null}
        </div>

        <div className="space-y-2.5 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]">
          <h2 className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
            Actions
          </h2>
          {(["PENDING", "PAID", "FAILED", "REFUNDED"] as const).map((s) => (
            <button
              key={s}
              type="button"
              disabled={busy || order.status === s}
              onClick={() => void updateStatus(s)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-40"
            >
              Mark {s}
            </button>
          ))}
          <button
            type="button"
            disabled={busy}
            onClick={() => void verify()}
            className="w-full rounded-xl bg-orange-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm shadow-orange-600/20 transition hover:bg-orange-700 disabled:opacity-40"
          >
            Verify via gateway
          </button>
          {order.status === "PENDING" && order.gatewayTxnId?.startsWith("mock_") ? (
            <Link
              href={`/checkout/mock?order=${encodeURIComponent(order.orderNumber)}&txn=${encodeURIComponent(order.gatewayTxnId)}`}
              className="block w-full rounded-xl border border-orange-200 bg-orange-50 px-3 py-2.5 text-center text-sm font-semibold text-orange-800 transition hover:bg-orange-100"
            >
              Open mock checkout
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
