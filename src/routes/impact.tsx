import { BrandMark } from "@/components/brand-mark";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, TrendingUp } from "lucide-react";
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

        {/* Metrics */}
        <section className="mt-12">
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
