import { BarChart3, Megaphone, Users } from "lucide-react";

const miniRows = [
  { icon: BarChart3, width: "w-10" },
  { icon: Megaphone, width: "w-14" },
  { icon: Users, width: "w-8" },
] as const;

export function PhoneMockup() {
  return (
    <div
      aria-hidden="true"
      className="h-[13.5rem] w-[4.75rem] sm:h-[14.5rem] sm:w-[5.25rem]"
      style={{ transform: "perspective(700px) rotateY(-14deg) rotateZ(-6deg)" }}
    >
      <div className="flex h-full w-full flex-col rounded-[2rem] border border-[#D4AF37]/70 bg-[#14171d] p-1 shadow-[0_20px_48px_rgba(0,0,0,0.55)]">
        <div className="mx-auto mt-1.5 h-1 w-9 rounded-full bg-[#2a2f3a]" />
        <div className="mt-1.5 flex flex-1 flex-col rounded-[1.55rem] bg-[#080a0f] p-2">
          <div className="space-y-1.5">
            {miniRows.map((row, i) => {
              const Icon = row.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-1 rounded-md bg-white/[0.04] px-1 py-1"
                >
                  <Icon className="h-2 w-2 shrink-0 text-[#D4AF37]" />
                  <span className={`h-0.5 rounded-full bg-white/20 ${row.width}`} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="mx-auto mb-1.5 h-1 w-9 rounded-full bg-[#2a2f3a]/80" />
      </div>
    </div>
  );
}
