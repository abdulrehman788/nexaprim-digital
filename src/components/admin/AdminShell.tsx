"use client";

import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useState } from "react";

import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { Sidebar } from "@/components/admin/Sidebar";
import { SmartScrollArea } from "@/components/admin/SmartScrollArea";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/admin";
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex h-dvh max-h-dvh max-w-[100vw] overflow-hidden bg-[#f4f5f7] text-slate-900">
      <aside className="hidden w-[260px] shrink-0 md:block">
        <div className="fixed inset-y-0 left-0 z-10 w-[260px]">
          <Sidebar pathname={pathname} onLogout={handleLogout} />
        </div>
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative h-full w-[min(280px,85vw)] shadow-2xl">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 z-10 rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            <Sidebar
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
              onLogout={handleLogout}
            />
          </div>
        </div>
      ) : null}

      <div className="flex min-h-0 min-w-0 max-w-full flex-1 flex-col overflow-hidden">
        <AdminTopBar showMenuButton onMenuOpen={() => setMobileOpen(true)} />
        <SmartScrollArea contentClassName="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full min-w-0 max-w-7xl">{children}</div>
        </SmartScrollArea>
      </div>
    </div>
  );
}
