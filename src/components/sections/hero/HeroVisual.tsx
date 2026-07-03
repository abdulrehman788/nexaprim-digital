"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { HeroImageLabels } from "@/components/sections/hero/HeroImageLabels";
import { heroContent } from "@/data/hero";

const HERO_IMAGE_WIDTH = 1024;
const HERO_IMAGE_HEIGHT = 682;

export function HeroVisual() {
  return (
    <figure className="relative m-0 w-full min-w-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative w-full origin-left lg:w-[112%] xl:w-[120%] 2xl:w-[128%]"
      >
        <div className="relative aspect-[1024/682] w-full">
          <Image
            src={heroContent.heroImage}
            alt={heroContent.heroImageAlt}
            fill
            priority
            unoptimized
            sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 62vw, 65vw"
            className="object-cover object-left"
          />
          <HeroImageLabels />
        </div>
      </motion.div>
    </figure>
  );
}
