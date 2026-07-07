import { ImageIcon, Rocket, Sparkles } from "lucide-react";

interface WelcomeBannerProps {
  userName?: string;
}

export function WelcomeBanner({ userName = "Admin" }: WelcomeBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800 px-6 py-8 sm:px-10 sm:py-10">
      <div
        className="pointer-events-none absolute -right-10 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-white/10 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-between gap-6">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-white/80">
            Welcome back, {userName} <span aria-hidden="true">👋</span>
          </p>
          <h1 className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl">
            Let&apos;s create something great today!
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            Manage your blog posts and stories, schedule publish dates, and track performance all in one place.
          </p>
        </div>

        <div className="relative hidden shrink-0 sm:block" aria-hidden="true">
          <div className="relative h-36 w-52">
            {/* soft backing card */}
            <div className="absolute right-6 top-5 h-24 w-40 rotate-6 rounded-2xl bg-white/15 backdrop-blur-sm" />

            {/* main browser-style card */}
            <div className="absolute right-2 top-1 flex h-28 w-44 flex-col gap-2 rounded-2xl bg-white p-3 shadow-[0_18px_40px_-12px_rgba(49,20,120,0.5)]">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-400" />
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>
              <div className="flex gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white">
                  T
                </span>
                <span className="flex h-9 flex-1 items-center justify-center rounded-lg bg-violet-50 text-violet-400">
                  <ImageIcon className="h-4 w-4" />
                </span>
              </div>
              <span className="h-1.5 w-full rounded-full bg-gray-200" />
              <span className="h-1.5 w-4/5 rounded-full bg-gray-200" />
              <span className="h-1.5 w-2/3 rounded-full bg-violet-200" />
            </div>

            {/* rocket accent */}
            <span className="absolute -bottom-1 right-0 flex h-10 w-10 rotate-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg">
              <Rocket className="h-5 w-5 -rotate-45" />
            </span>

            <Sparkles className="absolute -top-1 left-2 h-5 w-5 text-amber-300" />
            <span className="absolute right-14 top-0 h-1.5 w-1.5 rounded-full bg-white/70" />
            <span className="absolute left-6 bottom-6 h-1 w-1 rounded-full bg-white/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
