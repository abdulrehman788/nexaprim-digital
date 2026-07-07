"use client";

import Link from "next/link";
import {
  Bell,
  BookOpen,
  ChevronDown,
  FileText,
  Menu,
  Moon,
  Plus,
  Search,
  Sun,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { CommandPalette } from "@/components/admin/CommandPalette";
import { cn } from "@/lib/utils";

interface AdminTopBarProps {
  onMenuOpen?: () => void;
  showMenuButton?: boolean;
}

export function AdminTopBar({ onMenuOpen, showMenuButton }: AdminTopBarProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setCreateOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
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
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-gray-200/70 bg-[#f9f9f9]/90 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      {showMenuButton ? (
        <button
          type="button"
          onClick={onMenuOpen}
          className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      ) : null}

      <button
        type="button"
        onClick={() => setPaletteOpen(true)}
        className="group relative hidden w-full max-w-md flex-1 items-center rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-16 text-left text-sm text-gray-400 outline-none transition-colors hover:border-violet-300 hover:text-gray-500 focus:border-violet-300 focus:ring-2 focus:ring-violet-100 sm:flex"
      >
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-hover:text-violet-400"
          aria-hidden="true"
        />
        Search anything...
        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-sans text-[11px] font-medium text-gray-400">
          ⌘K
        </kbd>
      </button>

      <button
        type="button"
        onClick={() => setPaletteOpen(true)}
        className="rounded-xl p-2.5 text-gray-500 transition-colors hover:bg-gray-100 sm:hidden"
        aria-label="Search"
      >
        <Search className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </button>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          className="relative rounded-xl p-2.5 text-gray-500 transition-colors hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-violet-500 ring-2 ring-[#f9f9f9]" />
        </button>

        <button
          type="button"
          onClick={() => setIsDark((v) => !v)}
          className="rounded-xl p-2.5 text-gray-500 transition-colors hover:bg-gray-100"
          aria-label="Toggle theme"
          aria-pressed={isDark}
        >
          {isDark ? (
            <Sun className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Moon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          )}
        </button>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setCreateOpen((open) => !open)}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-violet-200 transition-colors hover:bg-violet-700 sm:px-4"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Create New</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", createOpen && "rotate-180")} />
          </button>

          {createOpen ? (
            <div className="absolute right-0 top-full z-30 mt-2 w-52 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg shadow-gray-200/60">
              <Link
                href="/admin/blog/new"
                onClick={() => setCreateOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700"
              >
                <FileText className="h-4 w-4 text-violet-500" />
                New blog post
              </Link>
              <Link
                href="/admin/stories/new"
                onClick={() => setCreateOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-700"
              >
                <BookOpen className="h-4 w-4 text-rose-500" />
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
