"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import type { FaqItem } from "@/types";
import { cn } from "@/lib/utils";

type AccordionTheme = "dark" | "light";

interface AccordionProps {
  items: FaqItem[];
  className?: string;
  theme?: AccordionTheme;
}

export function Accordion({ items, className, theme = "dark" }: AccordionProps) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const triggerId = `${baseId}-${item.id}-trigger`;

        return (
          <div
            key={item.id}
            className={cn(
              "overflow-hidden rounded-xl border transition-colors duration-200",
              theme === "dark" &&
                (isOpen
                  ? "border-accent/40 bg-surface-elevated shadow-glow"
                  : "border-border-subtle bg-surface-secondary/60 hover:border-border"),
              theme === "light" &&
                (isOpen
                  ? "border-accent/50 bg-gold-50/60 shadow-soft"
                  : "border-slate-200 bg-white hover:border-slate-300"),
            )}
          >
            <h3 className="m-0">
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
              >
                <span
                  className={cn(
                    "font-display text-base font-bold sm:text-lg",
                    theme === "dark" ? "text-content-primary" : "text-slate-900",
                  )}
                >
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-accent transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p
                    className={cn(
                      "border-t px-5 py-4 text-sm leading-relaxed sm:px-6 sm:py-5 sm:text-base",
                      theme === "dark"
                        ? "border-border-subtle text-content-secondary"
                        : "border-slate-100 text-slate-600",
                    )}
                  >
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
