"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

export interface CalendarEvent {
  date: string;
  type: "blog" | "story";
}

interface CalendarProps {
  events: CalendarEvent[];
}

const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function Calendar({ events }: CalendarProps) {
  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const parsedEvents = useMemo(
    () => events.map((event) => ({ ...event, dateObj: new Date(event.date) })),
    [events],
  );

  const firstDay = new Date(viewYear, viewMonth, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < startOffset; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const monthEvents = parsedEvents.filter(
    (event) => event.dateObj.getFullYear() === viewYear && event.dateObj.getMonth() === viewMonth,
  );
  const blogCount = monthEvents.filter((event) => event.type === "blog").length;
  const storyCount = monthEvents.filter((event) => event.type === "story").length;

  function dayEvents(day: number) {
    const target = new Date(viewYear, viewMonth, day);
    return {
      hasBlog: monthEvents.some((event) => event.type === "blog" && sameDay(event.dateObj, target)),
      hasStory: monthEvents.some((event) => event.type === "story" && sameDay(event.dateObj, target)),
    };
  }

  function goPrev() {
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }

  function goNext() {
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }

  function goToday() {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
  }

  const isCurrentView =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_14px_36px_-18px_rgba(15,23,42,0.16)]">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-orange-50/30 px-5 py-4 sm:px-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-orange-600">
            Schedule
          </p>
          <h2 className="mt-0.5 text-sm font-semibold text-slate-900">
            {monthNames[viewMonth]} {viewYear}
          </h2>
        </div>
        <div className="flex items-center gap-1">
          {!isCurrentView ? (
            <button
              type="button"
              onClick={goToday}
              className="mr-1 rounded-lg px-2.5 py-1 text-xs font-semibold text-orange-600 transition hover:bg-orange-50"
            >
              Today
            </button>
          ) : null}
          <button
            type="button"
            onClick={goPrev}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 sm:px-5">
        <div className="grid grid-cols-7 gap-1 text-center">
          {dayLabels.map((label, i) => (
            <div
              key={`${label}-${i}`}
              className="pb-2 text-[10px] font-bold tracking-wide text-slate-400"
            >
              {label}
            </div>
          ))}

          {cells.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }
            const cellDate = new Date(viewYear, viewMonth, day);
            const isToday = sameDay(cellDate, today);
            const isWeekend = index % 7 === 0 || index % 7 === 6;
            const { hasBlog, hasStory } = dayEvents(day);

            return (
              <div
                key={day}
                className={cn(
                  "relative flex aspect-square items-center justify-center rounded-xl text-xs font-medium transition",
                  isToday
                    ? "bg-gradient-to-br from-orange-500 to-amber-400 font-semibold text-white shadow-[0_10px_22px_-8px_rgba(249,115,22,0.65)]"
                    : cn(
                        "hover:bg-orange-50",
                        isWeekend ? "text-slate-400" : "text-slate-600",
                      ),
                )}
              >
                {day}
                {(hasBlog || hasStory) && !isToday ? (
                  <span className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5">
                    {hasBlog ? <span className="h-1 w-1 rounded-full bg-orange-500" /> : null}
                    {hasStory ? <span className="h-1 w-1 rounded-full bg-slate-700" /> : null}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-auto flex items-center gap-5 border-t border-slate-100 bg-slate-50/50 px-5 py-3.5 sm:px-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
          <span className="h-2 w-2 rounded-full bg-orange-500 shadow-sm shadow-orange-500/40" aria-hidden="true" />
          Blog ({blogCount})
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
          <span className="h-2 w-2 rounded-full bg-slate-700" aria-hidden="true" />
          Stories ({storyCount})
        </span>
      </div>
    </div>
  );
}
