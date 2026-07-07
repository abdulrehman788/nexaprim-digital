"use client";

import { useRouter } from "next/navigation";
import {
  BookOpen,
  ExternalLink,
  FileText,
  LayoutDashboard,
  Plus,
  Search,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface Command {
  id: string;
  label: string;
  group: string;
  icon: LucideIcon;
  iconClassName?: string;
  href: string;
  external?: boolean;
  keywords?: string;
}

const commands: Command[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    group: "Navigation",
    icon: LayoutDashboard,
    href: "/admin",
    keywords: "home overview",
  },
  {
    id: "blog",
    label: "Blog posts",
    group: "Navigation",
    icon: FileText,
    href: "/admin/blog",
    keywords: "articles",
  },
  {
    id: "stories",
    label: "Case studies",
    group: "Navigation",
    icon: BookOpen,
    href: "/admin/stories",
    keywords: "stories",
  },
  {
    id: "new-blog",
    label: "New blog post",
    group: "Actions",
    icon: Plus,
    iconClassName: "text-violet-500",
    href: "/admin/blog/new",
    keywords: "create write article",
  },
  {
    id: "new-story",
    label: "New case study",
    group: "Actions",
    icon: Plus,
    iconClassName: "text-rose-500",
    href: "/admin/stories/new",
    keywords: "create story",
  },
  {
    id: "website",
    label: "View website",
    group: "Actions",
    icon: ExternalLink,
    href: "/",
    external: true,
    keywords: "site public home",
  },
];

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (command) =>
        command.label.toLowerCase().includes(q) ||
        (command.keywords ?? "").toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    if (!open) return undefined;
    setQuery("");
    setActiveIndex(0);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  if (!open) return null;

  function runCommand(command: Command) {
    onClose();
    if (command.external) {
      window.open(command.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(command.href);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const command = filtered[activeIndex];
      if (command) runCommand(command);
    } else if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  }

  let flatIndex = -1;
  const groups = Array.from(new Set(filtered.map((command) => command.group)));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh]">
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-900/20">
        <div className="flex items-center gap-3 border-b border-gray-100 px-4">
          <Search className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search pages and actions..."
            className="w-full bg-transparent py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400"
          />
          <kbd className="hidden shrink-0 rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-sans text-[11px] font-medium text-gray-400 sm:block">
            Esc
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-gray-500">No results found.</p>
          ) : (
            groups.map((group) => (
              <div key={group} className="mb-1">
                <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  {group}
                </p>
                {filtered
                  .filter((command) => command.group === group)
                  .map((command) => {
                    flatIndex += 1;
                    const index = flatIndex;
                    const active = index === activeIndex;
                    const Icon = command.icon;
                    return (
                      <button
                        key={command.id}
                        type="button"
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => runCommand(command)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                          active ? "bg-violet-50 text-violet-700" : "text-gray-700",
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0",
                            active ? "text-violet-600" : command.iconClassName ?? "text-gray-400",
                          )}
                          aria-hidden="true"
                        />
                        <span className="flex-1 font-medium">{command.label}</span>
                        {active ? (
                          <kbd className="rounded-md border border-violet-200 bg-white px-1.5 py-0.5 font-sans text-[10px] font-medium text-violet-500">
                            ↵
                          </kbd>
                        ) : null}
                      </button>
                    );
                  })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
