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

const dayLabels = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
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
    <div className="flex h-full flex-col rounded-2xl border border-gray-200/70 bg-[#ffffff] p-5 shadow-[0_1px_3px_rgba(16,24,40,0.04),0_12px_28px_-14px_rgba(16,24,40,0.12)] sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold text-gray-900">Publishing Calendar</h2>
        <div className="flex items-center gap-1">
          <span className="mr-1 text-xs font-medium text-gray-500">
            {monthNames[viewMonth]} {viewYear}
          </span>
          {!isCurrentView ? (
            <button
              type="button"
              onClick={goToday}
              className="mr-1 rounded-lg px-2 py-1 text-xs font-semibold text-violet-600 transition-colors hover:bg-violet-50"
            >
              Today
            </button>
          ) : null}
          <button
            type="button"
            onClick={goPrev}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1 text-center">
        {dayLabels.map((label) => (
          <div key={label} className="pb-2 text-[10px] font-semibold text-gray-400">
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
                "relative flex aspect-square items-center justify-center rounded-lg text-xs font-medium transition-colors",
                isToday
                  ? "bg-violet-600 font-semibold text-white shadow-[0_6px_16px_-4px_rgba(124,58,237,0.55)]"
                  : cn(
                      "hover:bg-gray-100",
                      isWeekend ? "text-gray-400" : "text-gray-600",
                    ),
              )}
            >
              {day}
              {(hasBlog || hasStory) && !isToday ? (
                <span className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5">
                  {hasBlog ? <span className="h-1 w-1 rounded-full bg-violet-500" /> : null}
                  {hasStory ? <span className="h-1 w-1 rounded-full bg-rose-500" /> : null}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-auto flex items-center gap-5 border-t border-gray-100 pt-4">
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
          <span className="h-2 w-2 rounded-full bg-violet-500" aria-hidden="true" />
          Blog ({blogCount})
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
          <span className="h-2 w-2 rounded-full bg-rose-500" aria-hidden="true" />
          Stories ({storyCount})
        </span>
      </div>
    </div>
  );
}
