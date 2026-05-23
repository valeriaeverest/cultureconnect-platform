import { BrandMark } from "@/components/brand-mark";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import crepeImg from "@/assets/crepe.png";
import hayleyImg from "@/assets/hayley.png";
import breweryImg from "@/assets/brewery.png";
import ct1 from "@/assets/ct1.jpg";
import ct2 from "@/assets/ct2.jpg";
import ct3 from "@/assets/ct3.jpg";
import ct4 from "@/assets/ct4.jpg";
import ct5 from "@/assets/ct5.jpg";
import gallery1 from "@/assets/gallery-1.png";
import gallery2 from "@/assets/gallery-2.png";
import gallery3 from "@/assets/gallery-3.png";
import at1 from "@/assets/at1.jpg";
import at2 from "@/assets/at2.jpg";
import at3 from "@/assets/at3.jpg";
import at4 from "@/assets/at4.jpg";

const HERO_GALLERY = [breweryImg, crepeImg, hayleyImg];

function HeroGallery() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % HERO_GALLERY.length), 4000);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      className="relative my-12 mx-auto w-full max-w-4xl aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-muted"
      style={{ boxShadow: "0 2px 6px rgba(15,23,42,0.06), 0 20px 48px rgba(15,23,42,0.12)" }}
    >
      {HERO_GALLERY.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: idx === i ? 1 : 0,
            transition: "opacity 1200ms ease-in-out",
          }}
        />
      ))}
    </div>
  );
}

const GALLERY_PHOTOS: { src: string; caption: string }[] = [
  { src: gallery1, caption: "Curated local experiences mapped to your team's neighborhood." },
  { src: gallery3, caption: "Perfect matches surfaced for your team — vetted artists, venues, and vendors." },
  { src: gallery2, caption: "Event NPS climbing well above industry benchmarks, event after event." },
];

function PhotoGallery() {
  const [i, setI] = useState(0);
  return (
    <section className="px-6 py-16 bg-background">
      <div className="max-w-5xl mx-auto">
        <div
          className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-muted"
          style={{ boxShadow: "0 2px 6px rgba(15,23,42,0.06), 0 20px 48px rgba(15,23,42,0.1)" }}
        >
          {GALLERY_PHOTOS.map((p, idx) => (
            <img
              key={p.src}
              src={p.src}
              alt={p.caption}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: idx === i ? 1 : 0, transition: "opacity 600ms ease-in-out" }}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 pt-16 pb-6 px-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
            <p className="text-white text-sm sm:text-base max-w-2xl leading-snug drop-shadow-md">
              {GALLERY_PHOTOS[i].caption}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {GALLERY_PHOTOS.map((_, idx) => {
            const active = idx === i;
            return (
              <button
                key={idx}
                type="button"
                aria-label={`Show photo ${idx + 1}`}
                onClick={() => setI(idx)}
                className="group cursor-pointer p-2 bg-transparent border-0"
              >
                <span
                  className="block rounded-full transition-all"
                  style={{
                    width: active ? 28 : 10,
                    height: 10,
                    backgroundColor: active ? "var(--color-primary)" : "#cbd5e1",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
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
      { title: "Lattice — Match. Book. Measure." },
      {
        name: "description",
        content:
          "The marketplace for company culture events. Match with vetted local artists, book instantly, done.",
      },
      { property: "og:title", content: "Lattice — Match. Book. Measure." },
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
  "Portland, OR",
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

import { DemoNav } from "@/components/demo-nav";
function Nav() {
  return <DemoNav />;
}

function IntakeCard() {
  const navigate = useNavigate();
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
                  className="text-sm px-4 h-10 rounded-full transition-colors border cursor-pointer hover:opacity-90"
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
        onClick={() => {
          saveIntake(state);
          navigate({ to: "/intake" });
        }}
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
      title: "Match by culture, not category",
      body: "We map your team's values to local creators — not just vendor lists.",
    },
    {
      title: "Vetted, never crowdsourced",
      body: "Every artist is personally onboarded. Quality you can stake your brand on.",
    },
    {
      title: "ROI you can present",
      body: "Built-in feedback loops turn event spend into retention metrics your board understands.",
    },
  ];
  return (
    <section id="how" className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.05em] font-medium mb-3" style={{ color: "var(--color-success)" }}>
          How it works
        </p>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em]">
          Three steps to measurable culture.
        </h2>
      </div>
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

const CUSTOMER_TESTIMONIALS = [
  {
    quote:
      "Our 'Connection to Company Culture' scores jumped 34% after one quarter. Employees talked about the local artists for weeks.",
    name: "Marcus Vance",
    role: "VP of People & Culture, Apex Analytics",
    tag: "Retention Win",
    image: ct1,
  },
  {
    quote:
      "Voluntary turnover hit an all-time low. In exit interviews, our local culture experiences are cited as a top reason people stay.",
    name: "Elena Rostova",
    role: "Co-Founder & COO, Voxel Creative",
    tag: "Retention Win",
    image: ct2,
  },
  {
    quote:
      "We replaced abstract CSR donations with direct employment of local Latinx-owned breweries. Pride across the company soared.",
    name: "David Chen",
    role: "Head of Employee Experience, Meridian FinTech",
    tag: "Local Impact",
    image: ct3,
  },
  {
    quote:
      "Post-event weeks show measurable spikes in project velocity and cross-department collaboration. It's not fluff — it's data.",
    name: "Sarah Jenkins",
    role: "Director of Operations, Shift Logistics",
    tag: "Productivity Lift",
    image: ct4,
  },
  {
    quote:
      "98% of new hires reported feeling 'instantly connected' to our mission after a curated local onboarding experience.",
    name: "Amara Okafor",
    role: "Talent Acquisition Lead, Nebula Health",
    tag: "Onboarding Edge",
    image: ct5,
  },
];

const ARTIST_TESTIMONIALS = [
  {
    quote:
      "I went from cold-emailing venues to 3–4 paid corporate gigs a week. Lattice is consistent, reliable income.",
    name: "Maya Lin",
    role: "Indie-Folk Singer-Songwriter",
    image: at1,
  },
  {
    quote:
      "No ad budget needed. Lattice puts us in front of corporate clients who already want our vibe.",
    name: "Carlos & Elena Ruiz",
    role: "Co-Owners, Taquería El Sol",
    image: at2,
  },
  {
    quote:
      "A live-painting gig led to three executive commissions. Lattice bridges the gap between artists and real buyers.",
    name: "Jordan Brooks",
    role: "Muralist & Fine Artist",
    image: at3,
  },
  {
    quote:
      "Corporate teams are engaged, respectful, and genuinely want to hear our story. The financial ROI has been phenomenal.",
    name: "Sofia Amadou",
    role: "Founder, Café de Cacao",
    image: at4,
  },
];

function TestimonialCard({ quote, name, role, tag, image }: { quote: string; name: string; role: string; tag?: string; image?: string }) {
  return (
    <figure
      className="bg-card rounded-lg border border-border overflow-hidden flex flex-col"
      style={{ boxShadow: "0 1px 2px rgba(15,23,42,0.03)" }}
    >
      <div className="p-7 flex flex-col flex-1">
        {tag && (
          <div
            className="text-xs font-medium uppercase mb-3"
            style={{ color: "var(--color-success)", letterSpacing: "0.05em" }}
          >
            {tag}
          </div>
        )}
        <blockquote className="text-sm text-foreground leading-relaxed flex-1">
          "{quote}"
        </blockquote>
        <figcaption className="mt-5 text-sm">
          <div className="font-medium text-foreground">{name}</div>
          <div className="text-secondary">{role}</div>
        </figcaption>
      </div>
      {image && (
        <div className="aspect-[16/10] w-full bg-muted overflow-hidden border-t border-border">
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      )}
    </figure>
  );
}

function Testimonials() {
  return (
    <section className="bg-muted/40 border-y border-border">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.05em] font-medium mb-3" style={{ color: "var(--color-success)" }}>
            People teams love Lattice
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em]">
            Measurable wins, in their words.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CUSTOMER_TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>

        <div className="text-center mt-24 mb-12">
          <p className="text-xs uppercase tracking-[0.05em] font-medium mb-3" style={{ color: "var(--color-success)" }}>
            What our creative partners are saying
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em]">
            Built for the artists, too.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARTIST_TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
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
    <div className="min-h-screen bg-background flex flex-col page-fade">
      <Nav />
      <main className="flex-1">
        <section className="relative px-6 pt-20 pb-12 text-center">
          <div className="relative">
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-[-0.015em] text-foreground max-w-4xl mx-auto mb-6">
              Turn event spend into <em className="not-italic text-primary">retention strategy</em>.
            </h1>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-secondary leading-relaxed mb-8">
              Lattice is the culture-focused B2B platform that connects your people to local art, music, and food — then measures the ROI on connection, productivity, and retention.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <Link
                to="/impact"
                className="inline-flex items-center justify-center h-12 px-7 rounded-md font-medium text-white transition-colors"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                View Demo →
              </Link>
              <Link
                to="/intake"
                className="inline-flex items-center justify-center h-12 px-7 rounded-md font-medium text-foreground border border-border bg-white hover:bg-muted transition-colors"
              >
                Try the intake flow
              </Link>
            </div>
            <HeroGallery />

            <div className="max-w-6xl mx-auto">
              <TrustStrip />
            </div>
          </div>
        </section>

        <div id="how">
          <PhotoGallery />
        </div>

        <Features />
        <Testimonials />

        <section className="px-6 py-24 bg-background">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] mb-4">
              See the impact in minutes.
            </h2>
            <p className="text-base text-secondary mb-10 max-w-2xl mx-auto">
              Run the intake, get matched, and surface ROI your CFO will love.
            </p>
            <IntakeCard />
            <p className="mt-5 text-sm text-secondary">
              400+ vetted local creatives. Zero commitment.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
