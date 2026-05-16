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

function Nav() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="text-lg font-semibold tracking-tight text-foreground">
          Lattice
        </Link>
        <nav className="flex items-center gap-8 text-sm text-secondary">
          <Link to="/signin" search={{ tab: "artist" }} className="hover:text-foreground">
            For artists
          </Link>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-foreground hover:bg-muted"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              S
            </span>
            Sarah
            <ChevronDown className="h-4 w-4 text-secondary" />
          </button>
        </nav>
      </div>
    </header>
  );
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
