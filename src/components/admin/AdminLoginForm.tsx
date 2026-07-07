"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { AdminButton, AdminFieldHint, AdminInput, AdminLabel } from "@/components/admin/ui/AdminFields";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      setError("Invalid password. Please try again.");
      return;
    }

    const next = searchParams.get("next") || "/admin";
    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <AdminLabel htmlFor="password">Password</AdminLabel>
        <AdminInput
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5"
          autoComplete="current-password"
          placeholder="Enter admin password"
          required
        />
        <AdminFieldHint>Demo: change-me-in-production</AdminFieldHint>
      </div>
      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}
      <AdminButton
        type="submit"
        variant="primary"
        disabled={loading}
        className="w-full"
      >
        {loading ? "Signing in…" : "Sign in"}
      </AdminButton>
    </form>
  );
}
