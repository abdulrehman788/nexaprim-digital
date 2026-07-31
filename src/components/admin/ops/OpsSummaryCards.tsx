"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  CalendarClock,
  ClipboardList,
  Eye,
  FilePlus2,
  FileText,
  LineChart,
  Mail,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

import { adminFetchJson } from "@/lib/admin/client-fetch";
import { cn } from "@/lib/utils";

type Stats = {
  liveVisitors: number;
  sessionsToday: number;
  pageViewsToday: number;
  unreadContacts: number;
  pendingBookings: number;
  ordersToday: number;
  revenueMonth: number;
  notifications?: { contacts: number; bookings: number; orders: number };
};

const cards: {
  label: string;
  href: string;
  icon: LucideIcon;
  accent: string;
  value: (s: Stats) => string | number;
  hint: (s: Stats) => string;
  live?: boolean;
}[] = [
  {
    label: "Live",
    href: "/admin/analytics",
    icon: Eye,
    accent: "text-emerald-700 bg-emerald-50 ring-emerald-100",
    value: (s) => s.liveVisitors,
    hint: () => "On site now",
    live: true,
  },
  {
    label: "Sessions",
    href: "/admin/analytics",
    icon: Activity,
    accent: "text-sky-700 bg-sky-50 ring-sky-100",
    value: (s) => s.sessionsToday,
    hint: (s) => `${s.pageViewsToday} views today`,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
    accent: "text-orange-700 bg-orange-50 ring-orange-100",
    value: (s) => s.ordersToday,
    hint: (s) => `$${s.revenueMonth.toLocaleString()} · 30d`,
  },
  {
    label: "Inbox",
    href: "/admin/contacts",
    icon: Mail,
    accent: "text-amber-800 bg-amber-50 ring-amber-100",
    value: (s) => s.unreadContacts,
    hint: () => "Unread messages",
  },
  {
    label: "Calls",
    href: "/admin/bookings",
    icon: CalendarClock,
    accent: "text-rose-700 bg-rose-50 ring-rose-100",
    value: (s) => s.pendingBookings,
    hint: () => "Pending bookings",
  },
];

function greetingForHour(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function OpsSummaryCards({ userName = "Admin" }: { userName?: string }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let cancelled = false;

    async function load(silent = false) {
      try {
        const payload = await adminFetchJson<Stats>("/api/admin/stats");
        if (cancelled) return;
        setStats(payload);
        setError(null);
      } catch (err: unknown) {
        if (cancelled) return;
        if (err instanceof Error && err.message === "UNAUTHORIZED") return;
        if (!silent) setError("Unable to load operations data.");
      }
    }

    void load();
    const poll = window.setInterval(() => void load(true), 15_000);
    const clock = window.setInterval(() => setNow(new Date()), 60_000);
    return () => {
      cancelled = true;
      window.clearInterval(poll);
      window.clearInterval(clock);
    };
  }, []);

  const notifications = stats?.notifications ?? { contacts: 0, bookings: 0, orders: 0 };
  const dateLabel = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timeLabel = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <section className="overflow-hidden rounded-[1.25rem] border border-slate-200/90 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_22px_50px_-28px_rgba(15,23,42,0.3)]">
      {/* Dark strip is NOT inside .bg-white — avoids admin CSS forcing #111827 text */}
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
              "radial-gradient(ellipse at 14% 0%, rgba(249,115,22,0.32), transparent 40%), radial-gradient(ellipse at 90% 30%, rgba(56,189,248,0.14), transparent 34%)",
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
                className="inline-flex items-center rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] ring-1 ring-inset ring-white/15"
              >
                Overview
              </span>
              <span
                data-soft
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Live
              </span>
              <span data-muted className="text-[11px] font-medium">
                {dateLabel} · {timeLabel}
              </span>
            </div>

            <h1 className="mt-2.5 text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]">
              {greetingForHour(now.getHours())}, {userName}
            </h1>
            <p data-muted className="mt-1.5 max-w-lg text-sm leading-relaxed">
              Business pulse — traffic, sales, and inbox in one view.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/admin/blog/new"
              data-cta-primary
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-[0_10px_24px_-10px_rgba(249,115,22,0.85)] transition hover:brightness-110"
            >
              <FilePlus2 className="h-4 w-4" aria-hidden="true" />
              New post
            </Link>
            <Link
              href="/admin/analytics"
              data-cta-secondary
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/15"
            >
              <LineChart className="h-4 w-4" aria-hidden="true" />
              Analytics
            </Link>
            <Link
              href="/admin/analytics"
              data-kicker
              className="hidden items-center gap-1 rounded-lg px-2.5 py-2 text-xs font-semibold transition hover:bg-white/5 sm:inline-flex"
            >
              Full report
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {error ? (
        <p className="border-b border-rose-100 bg-rose-50 px-5 py-2.5 text-sm text-rose-700">
          {error}
        </p>
      ) : null}

      <div className="bg-white">
        <div className="grid grid-cols-2 gap-px bg-slate-100 sm:grid-cols-3 xl:grid-cols-5">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                href={card.href}
                className="group bg-white p-4 transition hover:bg-slate-50 sm:p-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    {card.label}
                  </p>
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg ring-1 ring-inset transition group-hover:scale-105",
                      card.accent,
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <p className="text-3xl font-semibold tabular-nums tracking-tight text-slate-900">
                    {stats ? card.value(stats) : "—"}
                  </p>
                  {card.live ? (
                    <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-600">
                      live
                    </span>
                  ) : null}
                </div>
                <p className="mt-1.5 text-xs leading-snug text-slate-500">
                  {stats ? card.hint(stats) : "Loading…"}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-1.5 border-t border-slate-100 bg-slate-50 px-3 py-3 sm:px-4">
          <QuickLink href="/admin/analytics" icon={Activity} label="Analytics" />
          <QuickLink href="/admin/orders" icon={ShoppingBag} label="Orders" badge={notifications.orders} />
          <QuickLink href="/admin/contacts" icon={Mail} label="Inbox" badge={notifications.contacts} />
          <QuickLink href="/admin/bookings" icon={CalendarClock} label="Calls" badge={notifications.bookings} />
          <QuickLink href="/admin/forms" icon={ClipboardList} label="Forms" />
          <QuickLink href="/admin/blog" icon={FileText} label="Blog" />
        </div>
      </div>
    </section>
  );
}

function QuickLink({
  href,
  icon: Icon,
  label,
  badge,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200/80 transition hover:text-orange-700 hover:ring-orange-200"
    >
      <Icon className="h-3.5 w-3.5 text-slate-400" strokeWidth={1.75} aria-hidden="true" />
      {label}
      {badge && badge > 0 ? (
        <span className="min-w-[1.1rem] rounded-md bg-orange-500 px-1.5 py-0.5 text-center text-[10px] font-bold tabular-nums text-white">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}
