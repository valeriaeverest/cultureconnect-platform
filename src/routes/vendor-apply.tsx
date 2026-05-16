import { BrandMark } from "@/components/brand-mark";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/vendor-apply")({
  head: () => ({
    meta: [
      { title: "Apply to perform — Lattice" },
      {
        name: "description",
        content:
          "Join Lattice's vetted network of musicians, visual artists, makers, and food & beverage vendors. Get matched with high-paying corporate culture events.",
      },
      { property: "og:title", content: "Apply to perform — Lattice" },
      {
        property: "og:description",
        content:
          "Join Lattice's vetted network. Steady, well-paid bookings with corporate culture teams.",
      },
    ],
  }),
  component: VendorApplyPage,
});

const CATEGORIES = [
  "Musician",
  "Visual Artist",
  "Tactile Craft",
  "Food & Beverage",
] as const;

type Category = (typeof CATEGORIES)[number] | "";

function VendorApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    stageName: "",
    category: "" as Category,
    email: "",
    mobile: "",
    rate: "",
    pitch: "",
  });

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((s) => ({ ...s, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col page-fade">
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <BrandMark />
          <span className="text-sm text-secondary">Artist & vendor portal</span>
        </div>
      </header>

      <main className="flex-1 px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <div
            className="text-xs font-medium uppercase mb-3"
            style={{ color: "var(--color-success)", letterSpacing: "0.05em" }}
          >
            Apply to perform
          </div>
          <h1 className="font-display text-5xl sm:text-6xl leading-[1.05] tracking-[-0.015em] text-foreground mb-5">
            Steady gigs. Zero cold emails.
          </h1>
          <p className="text-base text-secondary leading-relaxed mb-10 max-w-xl">
            Lattice curates a vetted network of local creators for corporate
            culture events. Tell us about your work — we'll review every
            application personally within 5 business days.
          </p>

          {submitted ? (
            <div
              className="bg-card rounded-lg border border-border p-8"
              style={{ boxShadow: "0 1px 3px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "var(--color-success)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-2">Application received.</h2>
              <p className="text-secondary leading-relaxed">
                Thanks, {form.stageName || "friend"}. We'll be in touch at{" "}
                <span className="text-foreground font-medium">{form.email}</span>{" "}
                within 5 business days.
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="bg-card rounded-lg border border-border space-y-5"
              style={{ padding: 32, boxShadow: "0 1px 3px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)" }}
            >
              <Field label="Stage name">
                <input
                  required
                  type="text"
                  value={form.stageName}
                  onChange={(e) => update("stageName", e.target.value)}
                  placeholder="e.g., Haley Heynderickx"
                  className="w-full h-10 px-3 rounded-sm border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  style={{ borderRadius: 4 }}
                />
              </Field>

              <Field label="Category">
                <select
                  required
                  value={form.category}
                  onChange={(e) => update("category", e.target.value as Category)}
                  className="w-full h-10 px-3 rounded-sm border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  style={{ borderRadius: 4 }}
                >
                  <option value="">Select a category…</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Contact email">
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@studio.com"
                    className="w-full h-10 px-3 rounded-sm border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    style={{ borderRadius: 4 }}
                  />
                </Field>

                <Field label="Mobile number">
                  <input
                    required
                    type="tel"
                    value={form.mobile}
                    onChange={(e) => update("mobile", e.target.value)}
                    placeholder="(555) 123-4567"
                    className="w-full h-10 px-3 rounded-sm border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    style={{ borderRadius: 4 }}
                  />
                </Field>
              </div>

              <Field label="Base hourly rate" helper="Your starting rate. You can adjust per booking.">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                  <input
                    required
                    type="number"
                    inputMode="numeric"
                    min="0"
                    value={form.rate}
                    onChange={(e) => update("rate", e.target.value)}
                    placeholder="250"
                    className="w-full h-10 pl-7 pr-12 rounded-sm border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    style={{ borderRadius: 4 }}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">/hr</span>
                </div>
              </Field>

              <Field
                label="The live experience pitch"
                helper="What does it feel like to be in the room with you? 2–4 sentences works."
              >
                <textarea
                  required
                  rows={6}
                  value={form.pitch}
                  onChange={(e) => update("pitch", e.target.value)}
                  placeholder="I bring an intimate, candle-lit acoustic set drawing on indie-folk and old-time fingerstyle. Most audiences end up sitting on the floor by the third song…"
                  className="w-full px-3 py-2.5 rounded-sm border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y leading-relaxed"
                  style={{ borderRadius: 4 }}
                />
              </Field>

              <button
                type="submit"
                className="mt-2 w-full h-12 rounded-md font-medium text-white transition-colors"
                style={{ backgroundColor: "var(--color-primary)", borderRadius: 6 }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-primary-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-primary)")}
              >
                Submit application
              </button>

              <p className="text-xs text-muted-foreground text-center leading-relaxed pt-1">
                We review every application personally. You'll hear back within 5 business days.
              </p>
            </form>
          )}
        </div>
      </main>
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
