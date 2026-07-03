"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Code2, Palette, Rocket, TrendingUp } from "lucide-react";

import {
  heroGrowthCard,
  heroLeadsCard,
  heroServiceCards,
} from "@/data/hero";

const serviceIcons = {
  branding: Palette,
  performance: Rocket,
  web: Code2,
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const cardClass =
  "rounded-2xl border border-white/10 bg-[#0f1419]/80 p-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md";

function Sparkline() {
  return (
    <svg className="mt-3 h-10 w-full" viewBox="0 0 140 36" aria-hidden="true">
      <defs>
        <linearGradient id="sparkGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#D4AF37" stopOpacity="1" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <polyline
        points="0,30 18,24 36,26 54,16 72,18 90,10 108,12 126,6 140,8"
        fill="none"
        stroke="url(#sparkGlow)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface HeroStatCardsProps {
  showAll?: boolean;
}

export function HeroStatCards({ showAll = true }: HeroStatCardsProps) {
  return (
    <div className="flex flex-col gap-2">
      <motion.div variants={itemVariants}>
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className={cardClass}
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs font-medium text-content-muted">{heroGrowthCard.title}</p>
            <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-content-secondary">
              {heroGrowthCard.period}
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <p className="font-display text-3xl font-bold leading-none text-white">
              {heroGrowthCard.value}
            </p>
            <TrendingUp className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
          </div>
          <Sparkline />
        </motion.div>
      </motion.div>

      {showAll ? (
        <>
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            {heroServiceCards.map((card, index) => {
              const Icon = serviceIcons[card.id as keyof typeof serviceIcons];
              return (
                <motion.div
                  key={card.id}
                  animate={{ y: [0, -2, 0] }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                >
                  <Link
                    href={card.href}
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#0f1419]/75 px-2.5 py-2 backdrop-blur-md transition-colors hover:border-[#D4AF37]/25"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10">
                      <Icon className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold leading-tight text-white">{card.title}</p>
                      <p className="text-[11px] leading-tight text-content-muted">{card.subtitle}</p>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]/80" aria-hidden="true" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className={cardClass}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-content-muted">{heroLeadsCard.label}</p>
                  <p className="mt-0.5 font-display text-xl font-bold text-white">
                    {heroLeadsCard.value}
                  </p>
                  <p className="text-[11px] text-content-muted">{heroLeadsCard.period}</p>
                </div>
                <div className="flex -space-x-2 pt-1">
                  {["#D4AF37", "#5ec4a8", "#e8c99b"].map((color, i) => (
                    <span
                      key={i}
                      className="inline-block h-6 w-6 rounded-full border-2 border-[#0f1419]"
                      style={{ backgroundColor: color }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      ) : null}
    </div>
  );
}
