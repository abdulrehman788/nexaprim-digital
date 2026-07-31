"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Hides the native scrollbar and renders a floating orange rail.
 * Works reliably on Windows where default OS scrollbars ignore webkit styles.
 */
export function SmartScrollArea({
  children,
  className,
  contentClassName,
}: {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const dragOffset = useRef(0);

  const [thumb, setThumb] = useState({ top: 0, height: 0, visible: false });
  const [active, setActive] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const refresh = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const canScroll = scrollHeight > clientHeight + 2;
    if (!canScroll) {
      setThumb({ top: 0, height: 0, visible: false });
      return;
    }
    const trackH = trackRef.current?.clientHeight ?? clientHeight;
    const ratio = clientHeight / scrollHeight;
    const height = Math.max(36, Math.round(trackH * ratio));
    const maxTop = trackH - height;
    const top = maxTop <= 0 ? 0 : Math.round((scrollTop / (scrollHeight - clientHeight)) * maxTop);
    setThumb({ top, height, visible: true });
  }, []);

  const flash = useCallback(() => {
    setActive(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setActive(false), 900);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    refresh();
    const onScroll = () => {
      refresh();
      flash();
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(() => refresh());
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    window.addEventListener("resize", refresh);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      window.removeEventListener("resize", refresh);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [refresh, flash]);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!dragging.current || !viewportRef.current || !trackRef.current) return;
      const el = viewportRef.current;
      const trackH = trackRef.current.clientHeight;
      const maxTop = trackH - thumb.height;
      if (maxTop <= 0) return;
      const rect = trackRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top - dragOffset.current;
      const clamped = Math.max(0, Math.min(maxTop, y));
      const progress = clamped / maxTop;
      el.scrollTop = progress * (el.scrollHeight - el.clientHeight);
    }
    function onUp() {
      dragging.current = false;
      document.body.style.userSelect = "";
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [thumb.height]);

  return (
    <div
      className={cn("group/scroll relative flex min-h-0 min-w-0 flex-1 flex-col", className)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => {
        if (!dragging.current) setActive(false);
      }}
    >
      <div
        ref={viewportRef}
        className={cn(
          "admin-hide-native-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain",
          contentClassName,
        )}
      >
        {children}
      </div>

      {thumb.visible ? (
        <div
          ref={trackRef}
          className={cn(
            "pointer-events-none absolute inset-y-3 right-1.5 z-30 w-2.5 transition-opacity duration-300",
            active ? "opacity-100" : "opacity-0 group-hover/scroll:opacity-100",
          )}
          aria-hidden="true"
        >
          {/* Soft track */}
          <div className="absolute inset-0 rounded-full bg-slate-900/[0.04]" />
          {/* Thumb */}
          <button
            type="button"
            tabIndex={-1}
            aria-label="Scroll"
            className="pointer-events-auto absolute left-1/2 w-1.5 -translate-x-1/2 cursor-grab rounded-full active:cursor-grabbing"
            style={{
              top: thumb.top,
              height: thumb.height,
              background: "linear-gradient(180deg, #fb923c 0%, #f97316 55%, #ea580c 100%)",
              boxShadow: "0 0 0 1px rgba(249,115,22,0.25), 0 6px 16px -4px rgba(249,115,22,0.55)",
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              dragging.current = true;
              document.body.style.userSelect = "none";
              const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
              dragOffset.current = e.clientY - rect.top;
              setActive(true);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
