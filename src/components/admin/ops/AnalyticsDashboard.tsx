"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Eye,
  FileBarChart2,
  Globe2,
  MonitorSmartphone,
  Radio,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { EmptyState } from "@/components/admin/ops/ui";
import { adminFetchJson } from "@/lib/admin/client-fetch";
import { cn } from "@/lib/utils";

type AnalyticsPayload = {
  daily: { date: string; sessions: number; pageViews: number }[];
  uniqueSessions: number;
  pageViews: number;
  countries: { name: string; count: number }[];
  devices: { name: string; count: number }[];
  browsers: { name: string; count: number }[];
  live: { count: number; visitors: { sessionId: string; pageUrl: string; country: string | null }[] };
  funnel: { formName: string; event: string; _count: { _all: number } }[];
};

const RANGES = [
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
  { key: "90d", label: "90 days" },
] as const;

const PALETTE = ["#f97316", "#0f172a", "#38bdf8", "#94a3b8", "#fb923c"];

function displayName(name: string | null | undefined) {
  if (!name || name === "Unknown" || name === "unknown") return "Unresolved";
  return name;
}

function formatChartDate(value: string) {
  const d = new Date(`${value}T12:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function shortPath(url: string) {
  try {
    if (url.startsWith("http")) return new URL(url).pathname || "/";
  } catch {
    // ignore
  }
  return url || "/";
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name?: string; value?: number; color?: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.25)]">
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>
      <div className="space-y-1">
        {payload.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-8 text-sm">
            <span className="inline-flex items-center gap-1.5 text-slate-600">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
              {item.name}
            </span>
            <span className="font-semibold tabular-nums text-slate-900">{item.value ?? 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniSpark({
  values,
  color,
}: {
  values: number[];
  color: string;
}) {
  if (values.length < 2) return null;
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const span = Math.max(max - min, 1);
  const w = 72;
  const h = 28;
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / span) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="opacity-80" aria-hidden="true">
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
}

function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_14px_36px_-18px_rgba(15,23,42,0.14)]",
        className,
      )}
    >
      {children}
    </section>
  );
}

function PanelHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
      <div>
        {eyebrow ? (
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-orange-600">
            {eyebrow}
          </p>
        ) : null}
        <h2 className={cn("text-sm font-semibold text-slate-900", eyebrow && "mt-0.5")}>{title}</h2>
        {subtitle ? <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

function RankedList({
  items,
  empty,
}: {
  items: { name: string; count: number }[];
  empty: string;
}) {
  const max = Math.max(...items.map((i) => i.count), 1);
  const total = items.reduce((s, i) => s + i.count, 0) || 1;
  if (!items.length) {
    return <p className="py-10 text-center text-sm text-slate-400">{empty}</p>;
  }
  return (
    <ol className="space-y-3.5">
      {items.slice(0, 8).map((item, index) => {
        const pct = Math.round((item.count / max) * 100);
        const share = Math.round((item.count / total) * 100);
        return (
          <li key={`${item.name}-${index}`} className="group">
            <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
              <span className="flex min-w-0 items-center gap-2.5">
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-bold tabular-nums transition",
                    index === 0
                      ? "bg-orange-500 text-white shadow-sm shadow-orange-500/30"
                      : "bg-slate-100 text-slate-500 group-hover:bg-orange-50 group-hover:text-orange-700",
                  )}
                >
                  {index + 1}
                </span>
                <span className="truncate font-medium text-slate-800">
                  {displayName(item.name)}
                </span>
              </span>
              <span className="shrink-0 text-right">
                <span className="font-semibold tabular-nums text-slate-900">{item.count}</span>
                <span className="ml-1.5 text-[11px] font-medium text-slate-400">{share}%</span>
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function SegmentBar({ items, empty }: { items: { name: string; count: number }[]; empty: string }) {
  const total = items.reduce((s, i) => s + i.count, 0);
  if (!total) return <p className="py-6 text-center text-sm text-slate-400">{empty}</p>;
  return (
    <div>
      <div className="flex h-3 overflow-hidden rounded-full bg-slate-100 ring-1 ring-inset ring-slate-200/60">
        {items.map((item, i) => (
          <div
            key={item.name}
            title={`${displayName(item.name)}: ${item.count}`}
            className="transition-all first:rounded-l-full last:rounded-r-full"
            style={{
              width: `${(item.count / total) * 100}%`,
              backgroundColor: PALETTE[i % PALETTE.length],
            }}
          />
        ))}
      </div>
      <ul className="mt-4 space-y-2.5">
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center justify-between text-sm">
            <span className="inline-flex items-center gap-2 capitalize text-slate-700">
              <span
                className="h-2.5 w-2.5 rounded-full ring-2 ring-white"
                style={{ backgroundColor: PALETTE[i % PALETTE.length] }}
              />
              {displayName(item.name)}
            </span>
            <span className="tabular-nums font-semibold text-slate-900">
              {Math.round((item.count / total) * 100)}%
              <span className="ml-1.5 text-xs font-medium text-slate-400">{item.count}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AnalyticsDashboard() {
  const [range, setRange] = useState("7d");
  const [data, setData] = useState<AnalyticsPayload | null>(null);
  const [liveCount, setLiveCount] = useState(0);
  const [liveVisitors, setLiveVisitors] = useState<AnalyticsPayload["live"]["visitors"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    void adminFetchJson<AnalyticsPayload>(`/api/admin/analytics?range=${range}`)
      .then((payload) => {
        if (cancelled) return;
        setData(payload);
        setLiveCount(payload.live?.count ?? 0);
        setLiveVisitors(payload.live?.visitors ?? []);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        if (err instanceof Error && err.message === "UNAUTHORIZED") return;
        setError(err instanceof Error ? err.message : "Unable to load analytics.");
        setData(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [range]);

  useEffect(() => {
    const es = new EventSource("/api/admin/analytics/live");
    es.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data) as {
          count?: number;
          visitors?: AnalyticsPayload["live"]["visitors"];
        };
        setLiveCount(payload.count ?? 0);
        if (payload.visitors) setLiveVisitors(payload.visitors);
      } catch {
        // ignore
      }
    };
    return () => es.close();
  }, []);

  const chartData = useMemo(
    () =>
      (data?.daily ?? []).map((row) => ({
        ...row,
        label: formatChartDate(row.date),
      })),
    [data],
  );

  const funnelByForm = useMemo(() => {
    if (!data) return [];
    const map = new Map<string, { formName: string; viewed: number; started: number; submitted: number }>();
    for (const row of data.funnel) {
      const entry = map.get(row.formName) ?? {
        formName: row.formName,
        viewed: 0,
        started: 0,
        submitted: 0,
      };
      if (row.event === "viewed") entry.viewed = row._count._all;
      if (row.event === "started") entry.started = row._count._all;
      if (row.event === "submitted") entry.submitted = row._count._all;
      map.set(row.formName, entry);
    }
    return Array.from(map.values());
  }, [data]);

  const pagesPerSession =
    data && data.uniqueSessions > 0
      ? (data.pageViews / data.uniqueSessions).toFixed(1)
      : "—";

  const peakDay = useMemo(() => {
    if (!chartData.length) return null;
    return chartData.reduce((best, row) =>
      row.sessions + row.pageViews > best.sessions + best.pageViews ? row : best,
    );
  }, [chartData]);

  const sessionSpark = chartData.map((r) => r.sessions);
  const viewSpark = chartData.map((r) => r.pageViews);

  const kpis: {
    key: string;
    label: string;
    hint: string;
    value: string | number;
    icon: LucideIcon;
    bar: string;
    iconWrap: string;
    spark?: number[];
    sparkColor?: string;
  }[] = [
    {
      key: "live",
      label: "Live now",
      hint: "Active visitors",
      value: liveCount,
      icon: Radio,
      bar: "bg-emerald-500",
      iconWrap: "bg-emerald-50 text-emerald-700",
    },
    {
      key: "sessions",
      label: "Sessions",
      hint: "Unique in range",
      value: loading ? "—" : (data?.uniqueSessions ?? "—"),
      icon: Activity,
      bar: "bg-sky-500",
      iconWrap: "bg-sky-50 text-sky-700",
      spark: sessionSpark,
      sparkColor: "#0ea5e9",
    },
    {
      key: "views",
      label: "Page views",
      hint: "Total in range",
      value: loading ? "—" : (data?.pageViews ?? "—"),
      icon: Eye,
      bar: "bg-orange-500",
      iconWrap: "bg-orange-50 text-orange-700",
      spark: viewSpark,
      sparkColor: "#f97316",
    },
    {
      key: "engage",
      label: "Engagement",
      hint: "Pages / session",
      value: loading ? "—" : pagesPerSession,
      icon: TrendingUp,
      bar: "bg-slate-700",
      iconWrap: "bg-slate-100 text-slate-700",
    },
  ];

  const xInterval = chartData.length > 14 ? Math.ceil(chartData.length / 7) - 1 : 0;
  const rangeLabel = RANGES.find((r) => r.key === range)?.label ?? range;

  return (
    <div className="space-y-5 overflow-x-hidden pb-2">
      {/* Command + KPIs */}
      <section className="overflow-hidden rounded-[1.25rem] border border-slate-200/90 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_22px_50px_-28px_rgba(15,23,42,0.3)]">
        <div
          data-admin-welcome
          className="admin-hero relative px-5 py-5 sm:px-6 sm:py-6"
          style={{
            background:
              "linear-gradient(125deg, #0b1220 0%, #152033 52%, #1c2a44 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 14% 0%, rgba(249,115,22,0.32), transparent 40%), radial-gradient(ellipse at 90% 30%, rgba(56,189,248,0.14), transparent 34%)",
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent"
            aria-hidden="true"
          />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  data-kicker
                  className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] ring-1 ring-inset ring-white/15"
                >
                  <FileBarChart2 className="h-3 w-3" aria-hidden="true" />
                  Insights
                </span>
                <span data-soft className="inline-flex items-center gap-1.5 text-[11px] font-semibold">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Live · {liveCount} on site
                </span>
                <span data-muted className="text-[11px] font-medium">
                  Top market · {loading ? "—" : displayName(data?.countries[0]?.name)}
                </span>
              </div>

              <h1 className="mt-2.5 text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]">
                Analytics
              </h1>
              <p data-muted className="mt-1.5 max-w-xl text-sm leading-relaxed">
                Traffic, geography, devices, and form conversion for the last {rangeLabel.toLowerCase()}.
              </p>
            </div>

            <div
              className="inline-flex rounded-xl border border-white/15 bg-white/5 p-1 backdrop-blur"
              role="group"
              aria-label="Date range"
            >
              {RANGES.map((item) => {
                const active = range === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setRange(item.key)}
                    data-range-active={active ? "" : undefined}
                    data-range-idle={!active ? "" : undefined}
                    className={cn(
                      "rounded-lg px-3.5 py-2 text-sm font-semibold transition",
                      active
                        ? "shadow-[0_8px_18px_-8px_rgba(249,115,22,0.85)]"
                        : "hover:bg-white/10",
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {error ? (
          <div className="border-b border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="bg-white">
          <div className="grid grid-cols-2 gap-px bg-slate-100 lg:grid-cols-4">
            {kpis.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div key={kpi.key} className="relative bg-white p-4 sm:p-5">
                  <span className={cn("absolute inset-y-0 left-0 w-1", kpi.bar)} aria-hidden="true" />
                  <div className="flex items-start justify-between gap-2 pl-2">
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                        {kpi.label}
                      </p>
                      <p className="mt-2 text-3xl font-semibold tabular-nums tracking-tight text-slate-900">
                        {kpi.value}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{kpi.hint}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                          kpi.iconWrap,
                        )}
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      {kpi.spark && kpi.sparkColor ? (
                        <MiniSpark values={kpi.spark} color={kpi.sparkColor} />
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chart + countries / live */}
      <div className="grid min-w-0 gap-5 xl:grid-cols-5">
        <Panel className="min-w-0 xl:col-span-3">
          <PanelHeader
            eyebrow="Trends"
            title="Sessions over time"
            subtitle="Daily sessions vs page views"
            action={
              <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-orange-500 shadow-sm shadow-orange-500/40" />
                  Sessions
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                  Views
                </span>
              </div>
            }
          />
          <div className="h-[300px] px-2 pt-4 sm:h-[340px] sm:px-4">
            {loading || !data ? (
              <div className="flex h-full flex-col items-center justify-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-200 border-t-orange-500" />
                <p className="text-sm text-slate-400">Loading chart…</p>
              </div>
            ) : chartData.length === 0 ? (
              <div className="px-4">
                <EmptyState message="No session data yet. Browse the site to generate traffic." />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sessionsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.22} />
                      <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 8" stroke="#e2e8f0" vertical={false} />
                  <XAxis
                    dataKey="label"
                    interval={xInterval}
                    minTickGap={28}
                    tick={{ fontSize: 11, fill: "#64748b", fontWeight: 500 }}
                    tickMargin={10}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    width={36}
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="pageViews"
                    name="Page views"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    fill="url(#viewsFill)"
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 2, stroke: "#fff" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sessions"
                    name="Sessions"
                    stroke="#f97316"
                    strokeWidth={2.5}
                    fill="url(#sessionsFill)"
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 2, stroke: "#fff" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
          {peakDay ? (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 bg-slate-50/70 px-5 py-3 text-xs text-slate-600 sm:px-6">
              <span>
                Peak day{" "}
                <strong className="font-semibold text-slate-900">{peakDay.label}</strong>
              </span>
              <span>
                <strong className="font-semibold tabular-nums text-slate-900">{peakDay.sessions}</strong>{" "}
                sessions
              </span>
              <span>
                <strong className="font-semibold tabular-nums text-slate-900">{peakDay.pageViews}</strong>{" "}
                views
              </span>
            </div>
          ) : null}
        </Panel>

        <div className="grid min-w-0 gap-5 xl:col-span-2">
          <Panel>
            <PanelHeader
              eyebrow="Geography"
              title="Top countries"
              subtitle="Ranked by sessions"
              action={<Globe2 className="h-4 w-4 text-slate-400" aria-hidden="true" />}
            />
            <div className="p-5">
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-8 animate-pulse rounded-lg bg-slate-100" />
                  ))}
                </div>
              ) : (
                <RankedList items={data?.countries ?? []} empty="No geo data yet." />
              )}
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              eyebrow="Realtime"
              title="Live visitors"
              subtitle={liveCount ? `${liveCount} active right now` : "Waiting for traffic"}
              action={<Radio className="h-4 w-4 text-emerald-500" aria-hidden="true" />}
            />
            <div className="max-h-[200px] overflow-y-auto">
              {liveVisitors.length === 0 ? (
                <div className="flex flex-col items-center px-5 py-8 text-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Radio className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="mt-3 text-sm font-medium text-slate-700">Site is quiet</p>
                  <p className="mt-0.5 text-xs text-slate-400">No active visitors right now.</p>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {liveVisitors.slice(0, 8).map((visitor) => (
                    <li key={visitor.sessionId} className="flex items-start gap-3 px-5 py-3">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-800">
                          {shortPath(visitor.pageUrl)}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {displayName(visitor.country)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Panel>
        </div>
      </div>

      {/* Audience + funnel */}
      <div className="grid min-w-0 gap-5 xl:grid-cols-5">
        <Panel className="xl:col-span-2">
          <PanelHeader
            eyebrow="Audience"
            title="Devices & browsers"
            subtitle="Share of sessions"
            action={<MonitorSmartphone className="h-4 w-4 text-slate-400" aria-hidden="true" />}
          />
          <div className="grid gap-6 p-5 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                Devices
              </p>
              <SegmentBar items={data?.devices ?? []} empty="No device data" />
            </div>
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                Browsers
              </p>
              <SegmentBar items={data?.browsers ?? []} empty="No browser data" />
            </div>
          </div>
        </Panel>

        <Panel className="min-w-0 xl:col-span-3">
          <PanelHeader
            eyebrow="Conversion"
            title="Form funnel"
            subtitle="Viewed → started → submitted"
          />
          {loading ? (
            <div className="space-y-3 p-5">
              <div className="h-16 animate-pulse rounded-xl bg-slate-100" />
              <div className="h-16 animate-pulse rounded-xl bg-slate-100" />
            </div>
          ) : funnelByForm.length === 0 ? (
            <div className="p-5">
              <EmptyState message="No funnel events yet." />
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {funnelByForm.map((row) => {
                const maxStep = Math.max(row.viewed, row.started, row.submitted, 1);
                const rate =
                  row.viewed > 0
                    ? Math.round((row.submitted / row.viewed) * 100)
                    : row.submitted > 0
                      ? 100
                      : 0;
                const steps = [
                  { label: "Viewed", value: row.viewed, color: "bg-sky-500" },
                  { label: "Started", value: row.started, color: "bg-orange-400" },
                  { label: "Submitted", value: row.submitted, color: "bg-emerald-500" },
                ];
                return (
                  <div key={row.formName} className="px-5 py-5 transition hover:bg-orange-50/30 sm:px-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{row.formName}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {row.viewed} viewed · {row.started} started · {row.submitted} submitted
                        </p>
                      </div>
                      <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold tabular-nums text-emerald-700 ring-1 ring-inset ring-emerald-100">
                        {rate}% convert
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {steps.map((step) => (
                        <div key={step.label}>
                          <div className="mb-1.5 flex items-center justify-between text-[11px]">
                            <span className="font-medium text-slate-500">{step.label}</span>
                            <span className="font-semibold tabular-nums text-slate-800">
                              {step.value}
                            </span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={cn("h-full rounded-full", step.color)}
                              style={{ width: `${Math.round((step.value / maxStep) * 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}
