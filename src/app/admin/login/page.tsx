import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { FileText, BookOpen, Shield } from "lucide-react";

import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="admin-gradient-hero relative hidden w-[45%] overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 font-bold text-white backdrop-blur-sm">
            N
          </div>
        </div>
        <div className="relative">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white">
            Content Studio
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/80">
            Manage blog posts and client case studies. Schedule publishing and control what goes
            live on nexaprime.digital.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              { icon: FileText, text: "Write & schedule blog articles" },
              { icon: BookOpen, text: "Publish solution case studies" },
              { icon: Shield, text: "Secure admin-only access" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-white/90">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/20">
                  <Icon className="h-4 w-4 text-white" aria-hidden="true" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-white/60">© NexaPrime Digital</p>
      </div>

      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-[380px]">
          <div className="mb-8 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 font-bold text-white">
              N
            </div>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Welcome back</h2>
          <p className="mt-2 text-sm text-zinc-500">Sign in to your admin account.</p>
          <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <Suspense fallback={<p className="text-sm text-zinc-400">Loading…</p>}>
              <AdminLoginForm />
            </Suspense>
          </div>
          <p className="mt-6 text-center text-xs text-zinc-400">
            <Link href="/" className="hover:text-zinc-600">
              ← Return to website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
