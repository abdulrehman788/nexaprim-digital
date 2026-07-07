import Link from "next/link";
import {
  BookOpen,
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  match: (pathname: string) => boolean;
}

const navItems: NavItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    match: (p) => p === "/admin",
  },
  {
    href: "/admin/blog",
    label: "Blog",
    icon: FileText,
    match: (p) => p.startsWith("/admin/blog"),
  },
  {
    href: "/admin/stories",
    label: "Stories",
    icon: BookOpen,
    match: (p) => p.startsWith("/admin/stories"),
  },
];

interface SidebarProps {
  pathname: string;
  onNavigate?: () => void;
  onLogout: () => void;
  userName?: string;
  userEmail?: string;
}

export function Sidebar({
  pathname,
  onNavigate,
  onLogout,
  userName = "Admin",
  userEmail = "content@nexaprime.digital",
}: SidebarProps) {
  const initials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-full flex-col bg-[#0f1117]">
      <div className="flex h-16 shrink-0 items-center gap-3 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-900/40">
          <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2L2 7l10 5 10-5-10-5zm0 8.5L4.5 7.5 12 4l7.5 3.5L12 10.5zm0 2.5l10-5v7c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-7l10 5z" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white">Content Studio</p>
          <p className="truncate text-[11px] text-slate-400">NexaPrime Digital</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Admin navigation">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Menu
        </p>
        <div className="space-y-1">
          {navItems.map(({ href, label, icon: Icon, match }) => {
            const active = match(pathname);
            return (
              <Link
                key={label}
                href={href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-900/30"
                    : "text-slate-400 hover:translate-x-0.5 hover:bg-white/5 hover:text-white",
                )}
              >
                {active ? (
                  <span
                    className="absolute -left-3 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-violet-300"
                    aria-hidden="true"
                  />
                ) : null}
                <Icon
                  className={cn(
                    "h-[18px] w-[18px] shrink-0 transition-colors",
                    active ? "text-white" : "text-slate-400 group-hover:text-white",
                  )}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="shrink-0 space-y-3 px-4 pb-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-2.5 ring-1 ring-inset ring-white/5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-xs font-bold text-white">
            {initials || "A"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{userName}</p>
            <p className="truncate text-[11px] text-slate-400">{userEmail}</p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          View website
        </Link>
      </div>
    </div>
  );
}
