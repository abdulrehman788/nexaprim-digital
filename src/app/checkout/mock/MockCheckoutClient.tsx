"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

export function MockCheckoutClient() {
  const params = useSearchParams();
  const order = params.get("order") ?? "";
  const txn = params.get("txn") ?? "";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function complete(result: "PAID" | "FAILED") {
    if (!order || !txn) {
      setStatus("error");
      setMessage("Missing order or transaction id.");
      return;
    }
    setStatus("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/payments/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order, txn, status: result }),
      });
      const payload = (await res.json().catch(() => null)) as {
        handled?: boolean;
        error?: string;
        reason?: string;
      } | null;
      if (!res.ok || !payload?.handled) {
        throw new Error(payload?.error || payload?.reason || "Payment could not be completed.");
      }
      setStatus("success");
      setMessage(result === "PAID" ? "Payment marked as paid." : "Payment marked as failed.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-violet-600">Mock checkout</p>
      <h1 className="mt-2 text-3xl font-bold text-gray-900">Complete test payment</h1>
      <p className="mt-3 text-sm text-gray-600">
        Local preview only. Replace this flow with Stripe / JazzCash / EasyPaisa when you plug in a real
        gateway.
      </p>

      <dl className="mt-8 space-y-3 rounded-2xl border border-gray-200 bg-white p-5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-gray-500">Order</dt>
          <dd className="font-mono font-semibold text-gray-900">{order || "—"}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-gray-500">Txn</dt>
          <dd className="break-all font-mono text-xs text-gray-700">{txn || "—"}</dd>
        </div>
      </dl>

      {status === "success" ? (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-10 text-center">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          <p className="mt-3 font-semibold text-emerald-900">{message}</p>
          <Link href="/admin/orders" className="mt-6 text-sm font-medium text-violet-700 hover:underline">
            View orders in admin →
          </Link>
        </div>
      ) : status === "error" ? (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-rose-200 bg-rose-50 px-6 py-10 text-center">
          <XCircle className="h-10 w-10 text-rose-600" />
          <p className="mt-3 font-semibold text-rose-900">{message}</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-6 text-sm font-medium text-violet-700 hover:underline"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            disabled={status === "loading" || !order || !txn}
            onClick={() => void complete("PAID")}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Pay successfully
          </button>
          <button
            type="button"
            disabled={status === "loading" || !order || !txn}
            onClick={() => void complete("FAILED")}
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Simulate failure
          </button>
        </div>
      )}
    </main>
  );
}
