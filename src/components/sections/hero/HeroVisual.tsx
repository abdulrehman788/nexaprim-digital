"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { heroContent } from "@/data/hero";

export function HeroVisual() {
  return (
    <figure className="relative m-0 w-full max-w-[988px] lg:max-w-none lg:w-[130%] lg:origin-left">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative aspect-[1024/682] w-full"
      >
        <Image
          src={heroContent.heroImage}
          alt={heroContent.heroImageAlt}
          fill
          priority
          quality={90}
          sizes="(max-width: 1024px) 100vw, 62vw"
          className="object-contain object-center lg:object-left"
        />
      </motion.div>
    </figure>
  );
}
