"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { primaryNavLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

function isNavLinkActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav aria-label="Primary navigation">
      <ul className="flex items-center gap-0.5 whitespace-nowrap">
        {primaryNavLinks.map((link) => {
          const isActive = isNavLinkActive(pathname, link.href);

          if (link.children) {
            const childActive = link.children.some((child) =>
              isNavLinkActive(pathname, child.href),
            );
            const active = isActive || childActive;

            return (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  className={cn(
                    "relative flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors hover:text-accent",
                    active ? "text-accent" : "text-white",
                  )}
                  aria-expanded={openDropdown === link.label}
                  aria-haspopup="true"
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                  {active ? (
                    <span
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                  ) : null}
                </button>
                {openDropdown === link.label ? (
                  <ul
                    role="menu"
                    className="absolute left-0 top-full z-50 mt-1 min-w-48 rounded-lg border border-border bg-navy-900 py-2 shadow-card"
                  >
                    {link.children.map((child) => (
                      <li key={child.href} role="none">
                        <Link
                          href={child.href}
                          role="menuitem"
                          className={cn(
                            "block px-4 py-2 text-sm transition-colors hover:bg-accent-muted hover:text-accent",
                            isNavLinkActive(pathname, child.href)
                              ? "text-accent"
                              : "text-content-secondary",
                          )}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          }

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "relative block px-3 py-2 text-sm font-medium transition-colors hover:text-accent",
                  isActive ? "text-accent" : "text-white",
                )}
              >
                {link.label}
                {isActive ? (
                  <span
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
