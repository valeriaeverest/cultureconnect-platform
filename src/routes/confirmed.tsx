import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/confirmed")({
  head: () => ({
    meta: [
      { title: "You're booked — Lattice" },
      { name: "description", content: "Your culture event is confirmed." },
    ],
  }),
  component: ConfirmedPage,
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

const NEXT_STEPS = [
  {
    title: "Vendor confirms within 2 hours",
    body: "Real-time notification when Haley accepts",
  },
  {
    title: "Auto-generated contract",
    body: "Sign with one click in your dashboard",
  },
  {
    title: "Payment held in escrow",
    body: "Released to the vendor only after a successful event",
  },
];

function ConfirmedPage() {

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="flex flex-col items-center text-center">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "color-mix(in oklab, var(--success) 15%, white)" }}
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full text-white"
              style={{ background: "var(--success)" }}
            >
              <Check className="h-6 w-6" strokeWidth={3} />
            </div>
          </div>

          <h1 className="mt-8 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            You're booked.
          </h1>
          <p className="mt-4 max-w-xl text-secondary">
            Haley Heynderickx confirms within 2 hours. Track your booking in your dashboard.
          </p>
        </div>

        <figure className="mt-12">
          <div
            className="relative aspect-video w-full overflow-hidden rounded-lg border shadow-sm"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--primary) 14%, white), color-mix(in oklab, var(--success) 18%, white))",
            }}
          >
            <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow">
              <Sparkles className="h-3.5 w-3.5" />
              AI preview
            </span>
          </div>
          <figcaption className="mt-3 text-center text-sm italic text-secondary">
            This could be your event.
          </figcaption>
        </figure>

        <section className="mt-12 rounded-lg border bg-card p-6 shadow-sm">
          <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            {[
              ["Event", "Intimate Acoustic Set"],
              ["Artist", "Haley Heynderickx"],
              ["Based in", "Southeast Portland, OR"],
              ["Date", "March 15, 2026"],
              ["Estimated price", "$2,400 – $3,200"],
              ["Group size", "30 people"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-border/60 py-2 sm:border-0 sm:py-0">
                <dt className="text-secondary">{k}</dt>
                <dd className="font-medium text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold text-foreground">What happens next</h2>
          <ol className="mt-6 space-y-5">
            {NEXT_STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <div>
                  <div className="font-medium text-foreground">{step.title}</div>
                  <div className="text-sm text-secondary">{step.body}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-12 flex flex-col items-center">
          <Button
            asChild
            className="h-12 bg-primary px-8 text-base font-medium text-primary-foreground hover:bg-primary-hover"
          >
            <a href="/impact">View your impact dashboard →</a>
          </Button>
          <p className="mt-6 text-sm text-secondary">
            Manage your booking anytime in your dashboard.
          </p>
        </div>
      </main>
    </div>
  );
}
