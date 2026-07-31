import Link from "next/link";
import {
  Activity,
  BookOpen,
  CalendarClock,
  ClipboardList,
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  Mail,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  match: (pathname: string) => boolean;
  group?: string;
}

const navItems: NavItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    match: (p) => p === "/admin",
    group: "Overview",
  },
  {
    href: "/admin/analytics",
    label: "Analytics",
    icon: Activity,
    match: (p) => p.startsWith("/admin/analytics"),
    group: "Operations",
  },
  {
    href: "/admin/orders",
    label: "Orders",
    icon: ShoppingBag,
    match: (p) => p.startsWith("/admin/orders"),
    group: "Operations",
  },
  {
    href: "/admin/contacts",
    label: "Contacts",
    icon: Mail,
    match: (p) => p.startsWith("/admin/contacts"),
    group: "Operations",
  },
  {
    href: "/admin/bookings",
    label: "Call bookings",
    icon: CalendarClock,
    match: (p) => p.startsWith("/admin/bookings"),
    group: "Operations",
  },
  {
    href: "/admin/forms",
    label: "Forms",
    icon: ClipboardList,
    match: (p) => p.startsWith("/admin/forms"),
    group: "Operations",
  },
  {
    href: "/admin/blog",
    label: "Blog",
    icon: FileText,
    match: (p) => p.startsWith("/admin/blog"),
    group: "Content",
  },
  {
    href: "/admin/stories",
    label: "Stories",
    icon: BookOpen,
    match: (p) => p.startsWith("/admin/stories"),
    group: "Content",
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
  userEmail = "info@expandova.com",
}: SidebarProps) {
  const initials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-full flex-col border-r border-slate-800 bg-[#0b1220]">
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-white/5 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-sm font-bold text-slate-950 shadow-lg shadow-orange-500/25">
          E
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">Expandova</p>
          <p className="truncate text-[11px] text-slate-400">Admin console</p>
        </div>
      </div>

      <nav
        className="admin-hide-native-scroll flex-1 overflow-y-auto overscroll-contain px-3 py-4"
        aria-label="Admin navigation"
      >
        {(["Overview", "Operations", "Content"] as const).map((group) => {
          const items = navItems.filter((item) => item.group === group);
          if (!items.length) return null;
          return (
            <div key={group} className="mb-5">
              <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                {group}
              </p>
              <div className="space-y-1">
                {items.map(({ href, label, icon: Icon, match }) => {
                  const active = match(pathname);
                  return (
                    <Link
                      key={label}
                      href={href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                        active
                          ? "bg-white/10 text-white shadow-sm ring-1 ring-inset ring-white/10"
                          : "text-slate-400 hover:bg-white/[0.04] hover:text-white",
                      )}
                    >
                      {active ? (
                        <span
                          className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-orange-400"
                          aria-hidden="true"
                        />
                      ) : null}
                      <Icon
                        className={cn(
                          "h-[18px] w-[18px] shrink-0",
                          active ? "text-orange-400" : "text-slate-500 group-hover:text-slate-300",
                        )}
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="shrink-0 space-y-3 border-t border-white/5 px-4 py-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-2.5 ring-1 ring-inset ring-white/5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white ring-1 ring-white/10">
            {initials || "A"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{userName}</p>
            <p className="truncate text-[11px] text-slate-400">{userEmail}</p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/5 hover:text-white"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          View website
        </Link>
      </div>
    </div>
  );
}
