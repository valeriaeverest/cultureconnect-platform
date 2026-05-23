import { BrandMark } from "@/components/brand-mark";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Lattice" },
      {
        name: "description",
        content:
          "Simple, transparent pricing for corporate culture programs. Free for local artists and vendors.",
      },
      { property: "og:title", content: "Pricing — Lattice" },
      {
        property: "og:description",
        content:
          "Single-Use Pass or Annual Culture Subscription. No hidden fees. Creators keep 100%.",
      },
    ],
  }),
  component: PricingPage,
});

import { DemoNav } from "@/components/demo-nav";
function Nav() {
  return <DemoNav />;
}

const SINGLE_USE = [
  "Full access to the local vendor matchmaking engine",
  "Complete corporate insurance, compliance, and permitting handled entirely by Lattice",
  "One single consolidated invoice (we manage all individual artist and vendor payouts)",
  "Automated logistics coordination delivered straight to your office hub doors",
];

const ANNUAL = [
  {
    title: "Automated Cultural Heritage Calendars",
    body: "Seamless, authentic programming for Black History Month, International Women's Day, Hispanic Heritage Month, and AAPI Spotlights featuring vetted independent creators.",
  },
  {
    title: "Seasonal Corporate Traditions",
    body: "Hands-off execution for your annual Summer BBQs, End-of-Year Holiday Galas, and Quarterly Employee Appreciation Days without the planning fatigue.",
  },
  {
    title: "Strategic Team Building & Retreats",
    body: "Tailored curation for high-impact department offsites, executive retreats, and cross-functional team alignment workshops.",
  },
  {
    title: "The Pulse ROI Engine",
    body: "Built-in post-event employee feedback loops to track and measure your exact gains in team productivity, connectivity, and talent retention.",
  },
];

function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <section className="px-6 pt-20 pb-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.18em] uppercase text-secondary mb-5">Pricing</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-foreground leading-[1.1] tracking-tight">
            Simple, transparent pricing built for corporate impact.
          </h1>
          <p className="mt-5 text-lg text-secondary leading-relaxed max-w-2xl mx-auto">
            No hidden fees, no complex quoting, no administrative bloat. Choose the path that fits
            your team's culture strategy.
          </p>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-[color-mix(in_oklab,var(--color-primary)_8%,white)] p-6 sm:p-7 flex items-start gap-4">
          <span className="text-2xl leading-none">🎨</span>
          <p className="text-sm sm:text-base text-foreground leading-relaxed">
            <span className="font-medium">Lattice is 100% free for local artists and vendors.</span>{" "}
            Creators always keep 100% of their listed performance, material, and catering rates.
            Platform costs are entirely covered by corporate licensing, keeping wealth circulating
            inside your local creative economy.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <article
            className="rounded-2xl border border-border bg-white p-8 flex flex-col"
            style={{ boxShadow: "0 2px 6px rgba(15,23,42,0.04), 0 12px 32px rgba(15,23,42,0.06)" }}
          >
            <p className="text-xs tracking-[0.18em] uppercase text-secondary mb-3">Option 1</p>
            <h2 className="text-2xl font-semibold text-foreground">Single-Use Pass</h2>
            <p className="mt-3 text-secondary leading-relaxed">
              A flat, all-inclusive rate based on your headcount. Perfect for testing the platform
              or hosting a single milestone celebration.
            </p>
            <ul className="mt-7 space-y-3.5 flex-1">
              {SINGLE_USE.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-foreground leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-none" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/intake"
              className="mt-8 inline-flex justify-center items-center px-4 py-2.5 rounded-md border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors"
            >
              Get a quote
            </Link>
          </article>

          <article
            className="rounded-2xl border-2 border-primary bg-white p-8 flex flex-col relative"
            style={{ boxShadow: "0 2px 6px rgba(15,23,42,0.06), 0 20px 48px rgba(15,23,42,0.12)" }}
          >
            <span className="absolute -top-3 left-8 text-xs font-medium px-2.5 py-1 rounded-full bg-primary text-primary-foreground">
              Most popular
            </span>
            <p className="text-xs tracking-[0.18em] uppercase text-secondary mb-3">Option 2</p>
            <h2 className="text-2xl font-semibold text-foreground">Annual Culture Subscription</h2>
            <p className="mt-3 text-secondary leading-relaxed">
              A predictable year-round culture roadmap powered by local creators. Best for People
              Leaders committed to building a constant, automated retention strategy.
            </p>
            <ul className="mt-7 space-y-5 flex-1">
              {ANNUAL.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-none" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-secondary leading-relaxed mt-0.5">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              to="/intake"
              className="mt-8 inline-flex justify-center items-center px-4 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Talk to our team
            </Link>
          </article>
        </div>
      </section>
    </div>
  );
}
