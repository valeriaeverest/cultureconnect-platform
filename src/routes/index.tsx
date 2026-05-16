import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  defaultIntake,
  loadIntake,
  saveIntake,
  type IntakeState,
  type TimeSlot,
} from "@/lib/intake-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lattice — Build culture, not hangovers." },
      {
        name: "description",
        content:
          "The marketplace for company culture events. Match with vetted local artists, book instantly, done.",
      },
      { property: "og:title", content: "Lattice — Build culture, not hangovers." },
      {
        property: "og:description",
        content:
          "Match your team with vetted local artists, musicians, food vendors, and breweries — instantly.",
      },
    ],
  }),
  component: LandingPage,
});

const LOCATIONS = [
  "Austin, TX (HQ)",
  "San Francisco, CA",
  "Seattle, WA",
  "Remote/Virtual Hub",
];

const TIME_SLOTS: { id: TimeSlot; label: string }[] = [
  { id: "luncheon", label: "☀️ Luncheon · 11:30 AM – 1:30 PM" },
  { id: "afternoon", label: "☕ Afternoon Blend · 2:00 PM – 4:00 PM" },
  { id: "happy-hour", label: "🍹 Classic Happy Hour · 4:00 PM – 6:00 PM" },
  { id: "evening", label: "🌙 Evening Gala · 6:00 PM+" },
];

function Nav() {
  return (
    <header className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-lg font-semibold tracking-tight text-foreground">
          Lattice
        </span>
        <nav className="flex items-center gap-7">
          <a href="#how" className="text-sm text-secondary hover:text-foreground transition-colors">
            How it works
          </a>
          <a href="#artists" className="text-sm text-secondary hover:text-foreground transition-colors">
            For artists
          </a>
          <a href="#signin" className="text-sm text-secondary hover:text-foreground transition-colors">
            Sign in
          </a>
          <button className="text-sm font-medium px-3.5 py-1.5 rounded-md border border-border text-foreground hover:bg-muted transition-colors">
            Get started
          </button>
        </nav>
      </div>
    </header>
  );
}

function IntakeCard() {
  const [state, setState] = useState<IntakeState>(defaultIntake);

  useEffect(() => {
    setState(loadIntake());
  }, []);

  const update = <K extends keyof IntakeState>(k: K, v: IntakeState[K]) => {
    setState((s) => {
      const next = { ...s, [k]: v };
      saveIntake(next);
      return next;
    });
  };

  return (
    <div
      className="bg-card rounded-lg border border-border w-full max-w-[720px] mx-auto"
      style={{ padding: 32, boxShadow: "0 1px 3px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)" }}
    >
      <div
        className="text-xs font-medium uppercase mb-5"
        style={{ color: "var(--color-success)", letterSpacing: "0.05em" }}
      >
        Start your curation
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Office Hub Location" helper="We map talent within a 15-mile radius of your selected office campus.">
          <select
            value={state.location}
            onChange={(e) => update("location", e.target.value)}
            className="w-full h-10 px-3 rounded-sm border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            style={{ borderRadius: 4 }}
          >
            <option value="">Select office…</option>
            {LOCATIONS.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </Field>

        <Field label="Team Size">
          <input
            type="number"
            inputMode="numeric"
            placeholder="e.g., 150"
            value={state.teamSize}
            onChange={(e) => update("teamSize", e.target.value)}
            className="w-full h-10 px-3 rounded-sm border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            style={{ borderRadius: 4 }}
          />
        </Field>

        <Field label="Target Budget">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
            <input
              type="number"
              inputMode="numeric"
              placeholder="e.g., 5,000"
              value={state.budget}
              onChange={(e) => update("budget", e.target.value)}
              className="w-full h-10 pl-7 pr-3 rounded-sm border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              style={{ borderRadius: 4 }}
            />
          </div>
        </Field>

        <Field label="Event Date">
          <input
            type="date"
            value={state.eventDate}
            onChange={(e) => update("eventDate", e.target.value)}
            className="w-full h-10 px-3 rounded-sm border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            style={{ borderRadius: 4 }}
          />
        </Field>

        <div className="sm:col-span-2">
          <div className="text-sm font-medium text-foreground mb-2">Preferred Time Slot</div>
          <div className="flex flex-wrap gap-2">
            {TIME_SLOTS.map((slot) => {
              const active = state.timeSlot === slot.id;
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => update("timeSlot", slot.id)}
                  className="text-sm px-4 h-10 rounded-full transition-colors border"
                  style={{
                    backgroundColor: active ? "var(--color-primary)" : "var(--color-chip)",
                    color: active ? "#fff" : "var(--color-foreground)",
                    borderColor: active ? "var(--color-primary)" : "transparent",
                  }}
                >
                  {slot.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="mt-7 w-full h-12 rounded-md font-medium text-white transition-colors"
        style={{ backgroundColor: "var(--color-primary)", borderRadius: 6 }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-primary-hover)")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-primary)")}
      >
        Continue →
      </button>
    </div>
  );
}

function Field({
  label,
  helper,
  children,
}: {
  label: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
      {children}
      {helper && <p className="mt-1.5 text-xs text-muted-foreground leading-snug">{helper}</p>}
    </div>
  );
}

function TrustStrip() {
  const logos = ["Linear", "Notion", "Vercel", "Anthropic", "Figma"];
  return (
    <div className="mt-16 text-center">
      <p className="text-xs uppercase tracking-[0.05em] font-medium text-muted-foreground mb-5">
        Trusted by people teams at
      </p>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {logos.map((name) => (
          <div
            key={name}
            className="h-9 px-6 flex items-center justify-center rounded-sm text-sm font-medium text-muted-foreground"
            style={{ backgroundColor: "var(--color-chip)", minWidth: 120 }}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

function Features() {
  const items = [
    {
      title: "Culture-first matching",
      body: "We start with your team's values, not a vendor list.",
    },
    {
      title: "Curated, not crowdsourced",
      body: "Every artist on Lattice is personally vetted.",
    },
    {
      title: "Automated end-to-end booking",
      body: "Contracts, payments, and logistics — all on platform.",
    },
  ];
  return (
    <section id="how" className="max-w-6xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((it) => (
          <div
            key={it.title}
            className="bg-card rounded-lg border border-border p-7"
            style={{ boxShadow: "0 1px 2px rgba(15,23,42,0.03)" }}
          >
            <h3 className="text-lg font-semibold mb-2">{it.title}</h3>
            <p className="text-sm text-secondary leading-relaxed">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <div className="flex flex-col sm:flex-row sm:gap-4">
          <span>© 2026 Lattice</span>
          <span>Made for people teams who care</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Nav />
      <main className="flex-1">
        <section className="px-6 pt-20 pb-16 text-center">
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-[-0.02em] text-foreground max-w-3xl mx-auto">
            Build culture, not hangovers.
          </h1>
          <p className="mt-5 text-lg text-secondary max-w-[600px] mx-auto leading-relaxed">
            The marketplace for company culture events. Match with vetted local
            artists, book instantly, done.
          </p>

          <div className="mt-12">
            <IntakeCard />
            <p className="mt-5 text-sm text-secondary">
              Curated from 400+ vetted local creatives. Free to explore — no account needed.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <TrustStrip />
          </div>
        </section>

        <Features />
      </main>
      <Footer />
    </div>
  );
}
