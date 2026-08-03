"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/Button";
import { ctaLinks, primaryNavLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const panel =
    mounted &&
    createPortal(
      <div
        id="mobile-menu-panel"
        className={cn(
          "fixed inset-x-0 bottom-0 top-[72px] z-[60] lg:hidden",
          "bg-[#050510] transition-[opacity,visibility] duration-200",
          isOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0",
        )}
        aria-hidden={!isOpen}
      >
        <nav
          aria-label="Mobile navigation"
          className="flex h-full min-h-0 flex-col p-5 sm:p-6"
        >
          <ul className="flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain pb-4">
            {primaryNavLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block min-h-11 rounded-md px-3 py-3 font-display text-base font-semibold text-white transition-colors hover:bg-violet-500/15 hover:text-violet-300"
                >
                  {link.label}
                </Link>
                {link.children ? (
                  <ul className="ml-4 border-l border-white/10 pl-4">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="block min-h-10 px-3 py-2.5 text-sm text-slate-300 transition-colors hover:text-violet-300"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="shrink-0 border-t border-white/10 pt-4">
            <Button
              href={ctaLinks.consultation}
              className="w-full rounded-full"
              onClick={() => setIsOpen(false)}
            >
              Book a Consultation
            </Button>
          </div>
        </nav>
      </div>,
      document.body,
    );

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative z-[70] flex h-11 w-11 items-center justify-center rounded-md border border-white/20 text-white transition-colors hover:border-accent hover:text-accent"
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {isOpen ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
      {panel}
    </div>
  );
}
