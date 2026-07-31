"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";

import { getSafeAdminRedirect } from "@/lib/security/admin-redirect";
import { cn } from "@/lib/utils";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!response.ok) {
      if (response.status === 429) {
        setError("Too many login attempts. Please try again later.");
      } else {
        setError("Invalid password. Please try again.");
      }
      return;
    }

    const next = getSafeAdminRedirect(searchParams.get("next"));
    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-semibold !text-slate-800"
        >
          Password
        </label>
        <div className="relative">
          <Lock
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 !text-slate-400"
            aria-hidden="true"
          />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="Enter your admin password"
            required
            className={cn(
              "w-full rounded-xl border-2 !bg-slate-50 py-3.5 pl-11 pr-12 text-sm font-medium !text-slate-900 outline-none transition",
              "placeholder:!text-slate-400",
              "hover:border-slate-300 hover:!bg-white",
              "focus:border-orange-500 focus:!bg-white focus:ring-4 focus:ring-orange-500/15",
              error ? "border-red-400" : "border-slate-200",
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-2 !text-slate-400 transition hover:!bg-slate-100 hover:!text-slate-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {error ? (
        <div
          className="rounded-xl border border-red-200 !bg-red-50 px-3.5 py-2.5 text-sm font-medium !text-red-700"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading || !password}
        className={cn(
          "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold transition",
          "!bg-orange-500 !text-white shadow-lg shadow-orange-500/30",
          "hover:!bg-orange-600",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-500/30",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
        )}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Signing in…
          </>
        ) : (
          "Sign in to dashboard"
        )}
      </button>
    </form>
  );
}
