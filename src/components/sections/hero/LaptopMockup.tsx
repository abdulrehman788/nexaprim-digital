import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { heroContent } from "@/data/hero";

export function LaptopMockup() {
  return (
    <div
      className="relative w-full"
      style={{ transform: "perspective(1100px) rotateY(-8deg) rotateX(3deg)" }}
    >
      <div className="overflow-hidden rounded-t-2xl border border-[#2d323c] bg-[#181b22] p-2 shadow-[0_28px_64px_rgba(0,0,0,0.55)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#0a0c10]">
          <Image
            src={heroContent.laptopScreenImage}
            alt={heroContent.laptopScreenAlt}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 70vw, 360px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

          <div className="absolute left-4 top-3 z-10 flex items-center gap-1.5">
            <span className="h-0 w-0 border-b-[5px] border-l-[4px] border-r-[4px] border-b-[#D4AF37] border-l-transparent border-r-transparent" />
            <span className="font-serif text-[10px] font-semibold tracking-wide text-white/90">
              NexaPrime
            </span>
          </div>

          <div className="absolute bottom-12 left-4 z-10">
            {heroContent.laptopScreenLines.map((line) => (
              <p
                key={line}
                className="font-serif text-lg font-bold leading-[1.15] text-white drop-shadow-lg sm:text-xl lg:text-2xl"
              >
                {line}
              </p>
            ))}
          </div>

          <ChevronDown
            className="absolute bottom-2.5 left-1/2 z-10 h-4 w-4 -translate-x-1/2 text-[#D4AF37]"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="relative mx-auto h-3.5 w-[93%] rounded-b-md bg-[#262a33]">
        <div className="absolute inset-x-6 top-0 h-px bg-[#D4AF37]/45" />
      </div>
      <div
        className="mx-auto h-5 w-[106%] -translate-x-[3%] rounded-b-2xl bg-[#30343f] shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
        style={{ clipPath: "polygon(3% 0, 97% 0, 100% 100%, 0 100%)" }}
      />
    </div>
  );
}
