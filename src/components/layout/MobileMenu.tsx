"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { ctaLinks, primaryNavLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-white/30 text-white transition-colors hover:border-accent hover:text-accent"
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

      <div
        id="mobile-menu-panel"
        className={cn(
          "fixed inset-0 top-[72px] z-40 bg-black transition-opacity duration-200",
          isOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none",
        )}
        aria-hidden={!isOpen}
      >
        <nav aria-label="Mobile navigation" className="flex h-full flex-col p-6">
          <ul className="flex flex-col gap-1">
            {primaryNavLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-3 py-3 text-base font-medium text-content-primary transition-colors hover:bg-accent-muted hover:text-accent"
                >
                  {link.label}
                </Link>
                {link.children ? (
                  <ul className="ml-4 border-l border-border-subtle pl-4">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-3 py-2 text-sm text-content-secondary transition-colors hover:text-accent"
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
          <div className="mt-auto pt-6">
            <Button
              href={ctaLinks.consultation}
              className="w-full rounded-full"
              onClick={() => setIsOpen(false)}
            >
              Book a Consultation
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}
