import { BrandMark } from "@/components/brand-mark";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, TrendingUp, CheckCircle2, Circle, DollarSign, Users, Building2, HeartHandshake, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

// Animate a number from 0 to target over `duration` ms.
function useCountUp(target: number, duration = 400, decimals = 0) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);
  useEffect(() => {
    let raf = 0;
    const step = (t: number) => {
      if (startRef.current === null) startRef.current = t;
      const elapsed = t - startRef.current;
      const p = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
      else setValue(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return Number(value.toFixed(decimals));
}

// Parse a metric string into { prefix, number, suffix, decimals } for count-up.
function parseMetric(v: string): { prefix: string; num: number; suffix: string; decimals: number } {
  const m = v.match(/^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/);
  if (!m) return { prefix: "", num: 0, suffix: v, decimals: 0 };
  const numStr = m[2];
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { prefix: m[1], num: parseFloat(numStr), suffix: m[3], decimals };
}

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Post-event impact — Lattice" },
      { name: "description", content: "Measurable engagement signals from your culture event." },
    ],
  }),
  component: ImpactPage,
});

import { DemoNav } from "@/components/demo-nav";
function Nav() {
  return <DemoNav />;
}

const CHIPS = [
  "Event: Intimate Acoustic Set",
  "Date: Mar 15, 2026",
  "Attendees: 30",
  "Vendor: Haley Heynderickx",
];

const METRICS = [
  {
    title: "Connection Index",
    value: "+18 pts",
    subtext: "vs. team baseline",
    helper: "Leading indicator of intent-to-stay",
    trend: true,
  },
  {
    title: "Event NPS",
    value: "72",
    subtext: "Industry avg: 41",
    helper: "How likely attendees are to recommend",
  },
  {
    title: "Predicted Retention Lift",
    value: "+3.2%",
    subtext: "12-month forward signal",
    helper: "Modeled from connection & sentiment data",
  },
  {
    title: "Productivity Forecast",
    value: "+6.4%",
    subtext: "Next-quarter engagement signal",
    helper: "Correlated with self-reported focus",
  },
];

const SENTIMENT = [
  { label: "Connection with teammates", pct: 94 },
  { label: "Psychological safety", pct: 88 },
  { label: "Sense of belonging", pct: 86 },
  { label: "Energy / mood lift", pct: 81 },
  { label: "Pride in workplace", pct: 76 },
];

const QUOTES = [
  "Felt more like a community than a company event.",
  "First time I've actually talked to someone outside my pod.",
  "I want to bring my friend's startup on Lattice next.",
  "Calm but real. Not forced fun.",
];

const BENCHMARKS = [
  { metric: "Event NPS", you: "72", prev: "54", industry: "41" },
  { metric: "Connection Index lift", you: "+18", prev: "+9", industry: "+11" },
  { metric: "Response rate", you: "93%", prev: "67%", industry: "58%" },
];

const NPS_HISTORY = [
  { date: "Sep '24", you: 38, industry: 40 },
  { date: "Dec '24", you: 45, industry: 41 },
  { date: "Mar '25", you: 51, industry: 41 },
  { date: "Jun '25", you: 49, industry: 42 },
  { date: "Sep '25", you: 56, industry: 41 },
  { date: "Dec '25", you: 54, industry: 42 },
  { date: "Mar '26", you: 72, industry: 41 },
];

function NpsHistoryChart() {
  const W = 760;
  const H = 280;
  const PAD = { top: 24, right: 24, bottom: 36, left: 36 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const yMax = 100;
  const xFor = (i: number) => PAD.left + (i * innerW) / (NPS_HISTORY.length - 1);
  const yFor = (v: number) => PAD.top + innerH - (v / yMax) * innerH;
  const yTicks = [0, 25, 50, 75, 100];
  const youPath = NPS_HISTORY.map((d, i) => `${i === 0 ? "M" : "L"}${xFor(i)},${yFor(d.you)}`).join(" ");
  const industryPath = NPS_HISTORY.map((d, i) => `${i === 0 ? "M" : "L"}${xFor(i)},${yFor(d.industry)}`).join(" ");
  const last = NPS_HISTORY.length - 1;
  const lastX = xFor(last);
  const lastY = yFor(NPS_HISTORY[last].you);

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">Event NPS over time</h3>
          <p className="mt-1 text-sm text-secondary">
            Your team's NPS across the last 7 culture events vs. the industry benchmark.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs">
          <span className="flex items-center gap-2 text-secondary">
            <span className="inline-block h-2.5 w-4 rounded-sm" style={{ background: "var(--color-primary)" }} />
            Your events
          </span>
          <span className="flex items-center gap-2 text-secondary">
            <span className="inline-block h-0.5 w-4" style={{ background: "#94a3b8" }} />
            Industry benchmark
          </span>
          <span className="flex items-center gap-2 text-secondary">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: "var(--success)" }} />
            This event
          </span>
        </div>
      </div>

      <div className="mt-5 w-full overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 520 }}>
          {yTicks.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={W - PAD.right} y1={yFor(t)} y2={yFor(t)} stroke="#e2e8f0" strokeWidth={1} />
              <text x={PAD.left - 8} y={yFor(t) + 4} textAnchor="end" fill="#94a3b8" style={{ fontSize: 11 }}>
                {t}
              </text>
            </g>
          ))}
          {NPS_HISTORY.map((d, i) => (
            <text key={d.date} x={xFor(i)} y={H - PAD.bottom + 18} textAnchor="middle" fill="#94a3b8" style={{ fontSize: 11 }}>
              {d.date}
            </text>
          ))}
          <path d={industryPath} fill="none" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 4" />
          <path d={youPath} fill="none" stroke="var(--color-primary)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          {NPS_HISTORY.map((d, i) => (
            <circle
              key={i}
              cx={xFor(i)}
              cy={yFor(d.you)}
              r={i === last ? 6 : 3.5}
              fill={i === last ? "var(--success)" : "var(--color-primary)"}
              stroke="#fff"
              strokeWidth={i === last ? 2 : 1}
            />
          ))}
          <g transform={`translate(${lastX - 68}, ${lastY - 32})`}>
            <rect width={60} height={22} rx={4} fill="var(--success)" />
            <text x={30} y={15} textAnchor="middle" fill="#fff" style={{ fontSize: 11, fontWeight: 600 }}>
              NPS 72
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4 text-xs sm:grid-cols-4">
        <div>
          <div className="text-muted-foreground">This event</div>
          <div className="mt-0.5 font-semibold tabular-nums text-foreground">72</div>
        </div>
        <div>
          <div className="text-muted-foreground">Prev. 6-event avg</div>
          <div className="mt-0.5 font-semibold tabular-nums text-foreground">49</div>
        </div>
        <div>
          <div className="text-muted-foreground">Best previous</div>
          <div className="mt-0.5 font-semibold tabular-nums text-foreground">56</div>
        </div>
        <div>
          <div className="text-muted-foreground">vs. industry</div>
          <div className="mt-0.5 font-semibold tabular-nums" style={{ color: "var(--success)" }}>
            +31
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ m }: { m: (typeof METRICS)[number] }) {
  const { prefix, num, suffix, decimals } = parseMetric(m.value);
  const current = useCountUp(num, 400, decimals);
  const display = `${prefix}${current.toFixed(decimals)}${suffix}`;
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="text-sm font-medium text-secondary">{m.title}</div>
      <div className="mt-3 flex items-center gap-2">
        <div className="text-[36px] font-semibold leading-none tracking-tight text-foreground tabular-nums">
          {display}
        </div>
        {m.trend && (
          <span
            className="flex h-6 w-6 items-center justify-center rounded-full"
            style={{ background: "color-mix(in oklab, var(--success) 15%, white)" }}
          >
            <ArrowUpRight className="h-3.5 w-3.5" style={{ color: "var(--success)" }} />
          </span>
        )}
      </div>
      <div className="mt-2 text-sm text-secondary">{m.subtext}</div>
      <div className="mt-3 border-t pt-3 text-xs text-muted-foreground">{m.helper}</div>
    </div>
  );
}

function SentimentBar({ label, pct }: { label: string; pct: number }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setW(pct));
    return () => cancelAnimationFrame(id);
  }, [pct]);
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-foreground">{label}</span>
        <span className="font-semibold tabular-nums text-foreground">{pct}%</span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full"
          style={{
            width: `${w}%`,
            background: "var(--success)",
            transition: "width 200ms ease-out",
          }}
        />
      </div>
    </div>
  );
}

// ============== Demo: simulated "live" data layers ==============

const PIPELINE = [
  { label: "Intake received", done: true },
  { label: "Vendors curated", done: true },
  { label: "Match confirmed", done: true },
  { label: "Pre-event survey sent", done: true },
  { label: "Event delivered", done: true },
  { label: "Post-event survey", done: true },
  { label: "Impact report live", done: true, current: true },
];

const ROI_METRICS = [
  {
    title: "Estimated retention savings",
    value: "$842K",
    sub: "Annualized, based on 3.2% retention lift",
    icon: DollarSign,
    tint: "var(--success)",
  },
  {
    title: "Employees reached",
    value: "1,284",
    sub: "Across 12 culture events YTD",
    icon: Users,
    tint: "var(--color-primary)",
  },
  {
    title: "Invested in local economy",
    value: "$214K",
    sub: "Paid directly to vetted local creators",
    icon: Building2,
    tint: "#8b5cf6",
  },
  {
    title: "Vendors activated",
    value: "37",
    sub: "Across 4 office hubs this quarter",
    icon: HeartHandshake,
    tint: "#ec4899",
  },
];

const DEPARTMENTS = [
  { name: "Engineering", reached: 412, pct: 91, lift: "+12 pts" },
  { name: "Product & Design", reached: 188, pct: 96, lift: "+18 pts" },
  { name: "Sales", reached: 246, pct: 84, lift: "+9 pts" },
  { name: "Customer Success", reached: 174, pct: 89, lift: "+14 pts" },
  { name: "Operations & G&A", reached: 132, pct: 78, lift: "+7 pts" },
  { name: "Marketing", reached: 132, pct: 93, lift: "+15 pts" },
];

// 12-month forward retention curve: control cohort vs. Lattice-engaged cohort
const RETENTION_CURVE = [
  { m: "M0", control: 100, lattice: 100 },
  { m: "M1", control: 98.4, lattice: 99.1 },
  { m: "M2", control: 96.7, lattice: 98.5 },
  { m: "M3", control: 94.8, lattice: 97.6 },
  { m: "M4", control: 92.9, lattice: 96.9 },
  { m: "M5", control: 91.1, lattice: 96.2 },
  { m: "M6", control: 89.4, lattice: 95.4 },
  { m: "M7", control: 87.8, lattice: 94.8 },
  { m: "M8", control: 86.2, lattice: 94.1 },
  { m: "M9", control: 84.7, lattice: 93.5 },
  { m: "M10", control: 83.3, lattice: 92.9 },
  { m: "M11", control: 82.0, lattice: 92.3 },
  { m: "M12", control: 80.6, lattice: 91.7 },
];

function SuccessBanner() {
  return (
    <div
      className="rounded-lg border p-5 flex items-start gap-4"
      style={{
        background: "color-mix(in oklab, var(--success) 8%, white)",
        borderColor: "color-mix(in oklab, var(--success) 30%, white)",
      }}
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{ background: "var(--success)" }}
      >
        <CheckCircle2 className="h-5 w-5 text-white" />
      </span>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white"
            style={{ background: "var(--success)" }}
          >
            <Sparkles className="h-3 w-3" /> Live
          </span>
          <h2 className="text-base font-semibold text-foreground">
            Your intake is in motion — curated matches are already booked.
          </h2>
        </div>
        <p className="mt-1 text-sm text-secondary">
          We've routed your brief to 3 vetted vendors, confirmed the lead match, and queued the
          pre-event survey. The dashboard below is your live impact view.
        </p>
      </div>
      <Button
        variant="outline"
        className="hidden h-9 px-4 text-xs font-medium sm:inline-flex"
      >
        Share with team
      </Button>
    </div>
  );
}

function PipelineStrip() {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Event lifecycle</h3>
        <span className="text-xs font-medium text-secondary">
          7 of 7 stages complete · auto-updated 2m ago
        </span>
      </div>
      <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {PIPELINE.map((p, i) => (
          <li
            key={p.label}
            className="flex flex-col gap-1.5 rounded-md border p-3"
            style={{
              borderColor: p.current
                ? "var(--color-primary)"
                : "var(--color-border)",
              background: p.current
                ? "color-mix(in oklab, var(--color-primary) 6%, white)"
                : "white",
            }}
          >
            <div className="flex items-center gap-2">
              {p.done ? (
                <CheckCircle2 className="h-4 w-4" style={{ color: "var(--success)" }} />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Step {i + 1}
              </span>
            </div>
            <div className="text-xs font-medium text-foreground leading-tight">{p.label}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function RoiCard({ m }: { m: (typeof ROI_METRICS)[number] }) {
  const Icon = m.icon;
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-md"
          style={{ background: `color-mix(in oklab, ${m.tint} 14%, white)` }}
        >
          <Icon className="h-4.5 w-4.5" style={{ color: m.tint, width: 18, height: 18 }} />
        </span>
        <span
          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{
            background: "color-mix(in oklab, var(--success) 12%, white)",
            color: "var(--success)",
          }}
        >
          <TrendingUp className="h-3 w-3" /> QoQ
        </span>
      </div>
      <div className="mt-4 text-[32px] font-semibold leading-none tracking-tight text-foreground tabular-nums">
        {m.value}
      </div>
      <div className="mt-1.5 text-sm font-medium text-foreground">{m.title}</div>
      <div className="mt-1 text-xs text-secondary">{m.sub}</div>
    </div>
  );
}

function DepartmentBreakdown() {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">Engagement by department</h3>
          <p className="mt-1 text-sm text-secondary">
            % of department who attended and participated in the post-event survey.
          </p>
        </div>
        <span className="text-xs font-medium text-secondary">1,284 reached YTD</span>
      </div>
      <div className="mt-5 space-y-4">
        {DEPARTMENTS.map((d) => (
          <div key={d.name}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{d.name}</span>
              <span className="text-secondary">
                <span className="tabular-nums text-foreground font-semibold">{d.reached}</span> reached
                · <span className="font-semibold tabular-nums text-foreground">{d.pct}%</span>
                <span
                  className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                  style={{
                    background: "color-mix(in oklab, var(--success) 12%, white)",
                    color: "var(--success)",
                  }}
                >
                  {d.lift}
                </span>
              </span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${d.pct}%`,
                  background: "var(--color-primary)",
                  transition: "width 600ms ease-out",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RetentionCurveChart() {
  const W = 760;
  const H = 280;
  const PAD = { top: 24, right: 24, bottom: 36, left: 40 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const yMin = 75;
  const yMax = 100;
  const xFor = (i: number) => PAD.left + (i * innerW) / (RETENTION_CURVE.length - 1);
  const yFor = (v: number) => PAD.top + innerH - ((v - yMin) / (yMax - yMin)) * innerH;
  const yTicks = [75, 80, 85, 90, 95, 100];
  const latticePath = RETENTION_CURVE.map((d, i) => `${i === 0 ? "M" : "L"}${xFor(i)},${yFor(d.lattice)}`).join(" ");
  const controlPath = RETENTION_CURVE.map((d, i) => `${i === 0 ? "M" : "L"}${xFor(i)},${yFor(d.control)}`).join(" ");
  // Build a filled "lift area" between control and lattice
  const liftArea =
    RETENTION_CURVE.map((d, i) => `${i === 0 ? "M" : "L"}${xFor(i)},${yFor(d.lattice)}`).join(" ") +
    " " +
    RETENTION_CURVE.slice().reverse().map((d, idx) => {
      const i = RETENTION_CURVE.length - 1 - idx;
      return `L${xFor(i)},${yFor(d.control)}`;
    }).join(" ") +
    " Z";
  const last = RETENTION_CURVE.length - 1;
  const lift = (RETENTION_CURVE[last].lattice - RETENTION_CURVE[last].control).toFixed(1);

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">12-month retention curve</h3>
          <p className="mt-1 text-sm text-secondary">
            Lattice-engaged cohort vs. control cohort. Modeled from 6 quarters of historical data.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs">
          <span className="flex items-center gap-2 text-secondary">
            <span className="inline-block h-2.5 w-4 rounded-sm" style={{ background: "var(--color-primary)" }} />
            Lattice cohort
          </span>
          <span className="flex items-center gap-2 text-secondary">
            <span className="inline-block h-0.5 w-4" style={{ background: "#94a3b8" }} />
            Control cohort
          </span>
          <span
            className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
            style={{
              background: "color-mix(in oklab, var(--success) 12%, white)",
              color: "var(--success)",
            }}
          >
            +{lift} pts at month 12
          </span>
        </div>
      </div>

      <div className="mt-5 w-full overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 520 }}>
          {yTicks.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={W - PAD.right} y1={yFor(t)} y2={yFor(t)} stroke="#e2e8f0" strokeWidth={1} />
              <text x={PAD.left - 8} y={yFor(t) + 4} textAnchor="end" fill="#94a3b8" style={{ fontSize: 11 }}>
                {t}%
              </text>
            </g>
          ))}
          {RETENTION_CURVE.map((d, i) => (
            <text key={d.m} x={xFor(i)} y={H - PAD.bottom + 18} textAnchor="middle" fill="#94a3b8" style={{ fontSize: 11 }}>
              {d.m}
            </text>
          ))}
          <path d={liftArea} fill="color-mix(in oklab, var(--success) 14%, white)" stroke="none" />
          <path d={controlPath} fill="none" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 4" />
          <path d={latticePath} fill="none" stroke="var(--color-primary)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={xFor(last)} cy={yFor(RETENTION_CURVE[last].lattice)} r={6} fill="var(--success)" stroke="#fff" strokeWidth={2} />
        </svg>
      </div>
    </div>
  );
}

function ImpactPage() {
  return (
    <div className="min-h-screen bg-background page-fade">
      <Nav />
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <section>
          <div className="text-xs font-semibold uppercase tracking-wider text-success">
            Post-Event Impact
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            How your event moved the needle
          </h1>
          <p className="mt-3 max-w-3xl text-secondary">
            Based on 28 of 30 post-event responses (93% response rate). Survey delivered
            automatically 48 hours after the event via Slack and email.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {CHIPS.map((c) => (
              <span
                key={c}
                className="rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium text-secondary"
              >
                {c}
              </span>
            ))}
          </div>
        </section>

        {/* Success banner + live pipeline */}
        <section className="mt-8 space-y-4">
          <SuccessBanner />
          <PipelineStrip />
        </section>

        {/* Business ROI row */}
        <section className="mt-10">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-lg font-semibold text-foreground">Business impact, this quarter</h2>
            <span className="text-xs font-medium text-secondary">
              Updated live · synced with HRIS
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ROI_METRICS.map((m) => (
              <RoiCard key={m.title} m={m} />
            ))}
          </div>
        </section>

        {/* Engagement metrics */}
        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Engagement signals from this event</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {METRICS.map((m) => (
              <MetricCard key={m.title} m={m} />
            ))}
          </div>
          <p className="mt-5 max-w-4xl text-xs italic text-muted-foreground">
            Lattice metrics are leading indicators modeled from validated engagement frameworks.
            Retention and productivity forecasts correlate with — but don't directly measure —
            long-term outcomes.
          </p>
        </section>

        {/* Sentiment */}
        <section className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-foreground">What your team felt</h2>
            <div className="mt-5 space-y-4">
              {SENTIMENT.map((s) => (
                <SentimentBar key={s.label} label={s.label} pct={s.pct} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">What your team said</h2>
            <div className="mt-5 space-y-3">
              {QUOTES.map((q) => (
                <div key={q} className="rounded-lg border bg-card p-4 shadow-sm">
                  <p className="text-sm italic leading-relaxed text-foreground">"{q}"</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Anonymized employee responses, surfaced by Lattice's theme analysis.
            </p>
          </div>
        </section>

        {/* Benchmarks */}
        <section className="mt-16">
          <h2 className="text-lg font-semibold text-foreground">How this compares</h2>
          <div className="mt-5 overflow-hidden rounded-lg border bg-card shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40 text-left">
                  <th className="px-5 py-3 font-medium text-secondary"></th>
                  <th className="px-5 py-3 font-semibold text-primary">Your event</th>
                  <th className="px-5 py-3 font-medium text-secondary">
                    Your company's previous events
                  </th>
                  <th className="px-5 py-3 font-medium text-secondary">
                    Industry benchmark · tech, 100–500 employees
                  </th>
                </tr>
              </thead>
              <tbody>
                {BENCHMARKS.map((b, i) => (
                  <tr key={b.metric} className={i < BENCHMARKS.length - 1 ? "border-b" : ""}>
                    <td className="px-5 py-4 font-medium text-foreground">{b.metric}</td>
                    <td className="px-5 py-4 font-semibold tabular-nums text-primary">{b.you}</td>
                    <td className="px-5 py-4 tabular-nums text-secondary">{b.prev}</td>
                    <td className="px-5 py-4 tabular-nums text-secondary">{b.industry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Historical NPS chart */}
        <section className="mt-16">
          <NpsHistoryChart />
        </section>

        {/* Department engagement */}
        <section className="mt-12">
          <DepartmentBreakdown />
        </section>

        {/* 12-month retention curve */}
        <section className="mt-12">
          <RetentionCurveChart />
        </section>


        {/* CTAs */}
        <section className="mt-16">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-11 bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
            >
              <Link to="/">
                <TrendingUp className="h-4 w-4" />
                Book your next event →
              </Link>
            </Button>
            <Button variant="outline" className="h-11 px-6 text-sm font-medium">
              Export report (PDF)
            </Button>
          </div>
          <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
            Lattice integrates with BambooHR, Workday, and Lattice (the HR platform) to pipe these
            signals into your existing People analytics.
          </p>
        </section>
      </main>
    </div>
  );
}
