import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";

import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="admin-login-page fixed inset-0 z-[60] flex min-h-screen flex-col overflow-y-auto !bg-[#0b1220] !text-slate-100">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.06),_transparent_55%)]" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl !bg-orange-500 text-sm font-bold !text-slate-950 shadow-lg shadow-orange-500/30">
            E
          </span>
          <div>
            <p className="text-sm font-semibold !text-white">{siteConfig.name}</p>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] !text-slate-400">
              Admin
            </p>
          </div>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium !text-slate-300 transition hover:!bg-white/5 hover:!text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Website
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-[440px]">
          <div className="mb-6 text-center sm:mb-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] !text-orange-400">
              Secure admin
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight !text-white sm:text-4xl">
              Sign in
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed !text-slate-400">
              Manage analytics, orders, leads, and content for {siteConfig.name}.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 !bg-white p-6 shadow-2xl shadow-black/40 sm:p-8">
            <Suspense
              fallback={<div className="h-40 animate-pulse rounded-xl bg-slate-100" aria-hidden="true" />}
            >
              <AdminLoginForm />
            </Suspense>

            <div className="mt-6 flex items-center justify-center gap-2 border-t border-slate-100 pt-5">
              <ShieldCheck className="h-4 w-4 shrink-0 !text-emerald-600" aria-hidden="true" />
              <p className="text-xs font-medium !text-slate-500">
                Encrypted session · Authorized staff only
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 px-5 pb-5 text-center text-[11px] !text-slate-500 sm:px-8">
        © {new Date().getFullYear()} {siteConfig.legalName}
      </footer>
    </div>
  );
}
