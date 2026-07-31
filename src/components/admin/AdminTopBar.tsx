"use client";

import Link from "next/link";
import {
  Bell,
  BookOpen,
  ChevronDown,
  FileText,
  Menu,
  Plus,
  Search,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { CommandPalette } from "@/components/admin/CommandPalette";
import { adminFetchJson } from "@/lib/admin/client-fetch";
import { cn } from "@/lib/utils";

interface AdminTopBarProps {
  onMenuOpen?: () => void;
  showMenuButton?: boolean;
}

export function AdminTopBar({ onMenuOpen, showMenuButton }: AdminTopBarProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [badge, setBadge] = useState(0);
  const [notif, setNotif] = useState({ contacts: 0, bookings: 0, orders: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setCreateOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    void adminFetchJson<{ notifications?: { contacts: number; bookings: number; orders: number } }>(
      "/api/admin/stats",
    )
      .then((payload) => {
        const n = payload.notifications ?? { contacts: 0, bookings: 0, orders: 0 };
        setNotif(n);
        setBadge(n.contacts + n.bookings + n.orders);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <header className="sticky top-0 z-20 flex h-16 min-w-0 items-center gap-3 overflow-x-hidden border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      {showMenuButton ? (
        <button
          type="button"
          onClick={onMenuOpen}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      ) : null}

      <button
        type="button"
        onClick={() => setPaletteOpen(true)}
        className="group relative hidden w-full max-w-md flex-1 items-center rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-16 text-left text-sm text-slate-400 outline-none transition hover:border-slate-300 hover:bg-white focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10 sm:flex"
      >
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-hover:text-slate-500"
          aria-hidden="true"
        />
        Search admin…
        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 font-sans text-[11px] font-medium text-slate-400">
          ⌘K
        </kbd>
      </button>

      <button
        type="button"
        onClick={() => setPaletteOpen(true)}
        className="rounded-lg p-2.5 text-slate-500 transition hover:bg-slate-100 sm:hidden"
        aria-label="Search"
      >
        <Search className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </button>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setNotifOpen((v) => !v)}
            className="relative rounded-lg p-2.5 text-slate-500 transition hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            {badge > 0 ? (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {badge > 9 ? "9+" : badge}
              </span>
            ) : null}
          </button>
          {notifOpen ? (
            <div className="absolute right-0 top-full z-30 mt-2 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl shadow-slate-200/80">
              <p className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Needs attention
              </p>
              <Link
                href="/admin/contacts"
                onClick={() => setNotifOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
              >
                <span>Unread contacts</span>
                <span className="font-semibold tabular-nums text-slate-900">{notif.contacts}</span>
              </Link>
              <Link
                href="/admin/bookings"
                onClick={() => setNotifOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
              >
                <span>Pending bookings</span>
                <span className="font-semibold tabular-nums text-slate-900">{notif.bookings}</span>
              </Link>
              <Link
                href="/admin/orders"
                onClick={() => setNotifOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
              >
                <span>Pending orders</span>
                <span className="font-semibold tabular-nums text-slate-900">{notif.orders}</span>
              </Link>
            </div>
          ) : null}
        </div>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setCreateOpen((open) => !open)}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:px-4"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Create</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", createOpen && "rotate-180")} />
          </button>

          {createOpen ? (
            <div className="absolute right-0 top-full z-30 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl shadow-slate-200/80">
              <Link
                href="/admin/blog/new"
                onClick={() => setCreateOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
              >
                <FileText className="h-4 w-4 text-orange-500" />
                New blog post
              </Link>
              <Link
                href="/admin/stories/new"
                onClick={() => setCreateOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
              >
                <BookOpen className="h-4 w-4 text-slate-500" />
                New story
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </header>
  );
}
