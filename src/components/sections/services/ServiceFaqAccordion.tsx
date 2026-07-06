"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import type { FaqItem } from "@/types";
import { cn } from "@/lib/utils";

interface ServiceFaqAccordionProps {
  items: FaqItem[];
  className?: string;
}

export function ServiceFaqAccordion({ items, className }: ServiceFaqAccordionProps) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const triggerId = `${baseId}-${item.id}-trigger`;

        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#1c1c26] transition-colors hover:border-white/10"
          >
            <h3 className="m-0">
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6 sm:py-6"
              >
                <span
                  className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <span className="flex-1 font-sans text-base font-medium text-accent sm:text-lg">
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
                  <p className="border-t border-border-subtle px-5 py-4 pl-12 text-sm leading-relaxed text-content-secondary sm:px-6 sm:py-5 sm:pl-14 sm:text-base">
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
