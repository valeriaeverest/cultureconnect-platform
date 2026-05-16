import { BrandMark } from "@/components/brand-mark";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import crepeImg from "@/assets/crepe.png";
import hayleyImg from "@/assets/hayley.png";
import breweryImg from "@/assets/brewery.png";

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
  { src: breweryImg, caption: "Brewery buyouts that turn quarterly all-hands into a community celebration." },
  { src: hayleyImg, caption: "Intimate acoustic sets where teams actually talk to each other afterward." },
  { src: crepeImg, caption: "Pop-up culinary moments from neighborhood artisans, made to order." },
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
          <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
            <p className="text-white text-sm sm:text-base max-w-2xl leading-snug">
              {GALLERY_PHOTOS[i].caption}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          {GALLERY_PHOTOS.map((_, idx) => {
            const active = idx === i;
            return (
              <button
                key={idx}
                type="button"
                aria-label={`Show photo ${idx + 1}`}
                onClick={() => setI(idx)}
                className="rounded-full transition-all"
                style={{
                  width: active ? 28 : 10,
                  height: 10,
                  backgroundColor: active ? "var(--color-primary)" : "var(--color-border)",
                }}
              />
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

function Nav() {
  return (
    <header className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <BrandMark />
        <nav className="flex items-center gap-7">
          <a href="#how" className="text-sm text-secondary hover:text-foreground transition-colors">
            How it works
          </a>
          <Link
            to="/case-studies"
            className="text-sm text-secondary hover:text-foreground transition-colors"
          >
            Case studies
          </Link>
          <Link
            to="/vendor-apply"
            className="text-sm text-secondary hover:text-foreground transition-colors"
          >
            For artists
          </Link>
          <Link
            to="/signin"
            search={{ tab: "customer" }}
            className="text-sm text-secondary hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
          <Link
            to="/signin"
            search={{ tab: "customer" }}
            className="text-sm font-medium px-3.5 py-1.5 rounded-md border border-border text-foreground hover:bg-muted transition-colors"
          >
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
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
      title: "Culture-first matching",
      body: "We start with your team's values, not a vendor list.",
    },
    {
      title: "Curated, not crowdsourced",
      body: "Every artist on Lattice is personally vetted.",
    },
    {
      title: "Personalized dashboard",
      body: "Measurable impact via employee surveys to reflect retention goals.",
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

const CUSTOMER_TESTIMONIALS = [
  {
    quote:
      "Our annual employee experience survey scores for 'Connection to Company Culture' jumped by 34% after our first quarter with Lattice. Instead of the usual generic catering, our teams were talking about the local screen-printer who made our event shirts and the jazz trio playing in the lobby. People feel genuinely better about working here knowing our event budgets are directly funding small businesses in our own neighborhood.",
    name: "Marcus Vance",
    role: "VP of People & Culture, Apex Analytics (500+ employees)",
    tag: "The Culture Champion",
  },
  {
    quote:
      "In tech, retention is everything. We started using Lattice to curate our monthly team syncs with local culinary pop-ups and emerging artists. Our team doesn't just show up for the food; they show up for the community. Our voluntary turnover dropped to an all-time low this year, and in exit interviews, our vibrant, hyper-local workplace culture is consistently cited as a top reason people stay.",
    name: "Elena Rostova",
    role: "Co-Founder & COO, Voxel Creative (80 employees)",
    tag: "The Retention Win",
  },
  {
    quote:
      "Lattice completely transformed how we think about corporate social responsibility. Why donate to abstract funds when we can directly employ local Latinx-owned breweries and independent food trucks for our heritage celebrations? Our employees feel an immense sense of pride working for an organization that visibly breathes life back into the local economy.",
    name: "David Chen",
    role: "Head of Employee Experience, Meridian FinTech (1,200 employees)",
    tag: "The Local Impact Driver",
  },
  {
    quote:
      "There is a direct line between employee happiness and output. Before Lattice, our hybrid teams felt disconnected, and 'Zoom fatigue' was tanking morale. The curated, sensory-rich experiences Lattice brings right into our office courtyard have revitalized our team's energy. Post-event weeks always show a measurable spike in project velocity and cross-department collaboration.",
    name: "Sarah Jenkins",
    role: "Director of Operations, Shift Logistics (250 employees)",
    tag: "The Productivity Booster",
  },
  {
    quote:
      "As a rapidly growing company, onboarding remote hires into a physical office can be awkward. Lattice removes that barrier entirely. Their geolocation-based database allowed us to curate an intimate acoustic set with a local singer-songwriter for our latest cohort onboarding week. 98% of our new hires reported feeling 'instantly connected' to the company mission on day one.",
    name: "Amara Okafor",
    role: "Talent Acquisition Lead, Nebula Health (150 employees)",
    tag: "The Fast-Growing Scale-Up",
  },
];

const ARTIST_TESTIMONIALS = [
  {
    quote:
      "Before Lattice, I was spending 60% of my week cold-emailing venues and chasing down late invoice payments. Now, I just open the platform and accept bookings. Lattice has streamlined my schedule to the point where I'm performing 3 to 4 times a week at high-end corporate spaces. It's consistent, reliable income that actually allows me to focus on my music.",
    name: "Maya Lin",
    role: "Indie-Folk Singer-Songwriter",
  },
  {
    quote:
      "Lattice completely handles the marketing and logistics for us. As a small food truck business, we don't have the budget for big ad campaigns, but Lattice's geolocation database puts us right in front of corporate clients looking for local flavor. They match us with companies that perfectly fit our vibe and let us do what we do best: cook incredible food.",
    name: "Carlos & Elena Ruiz",
    role: "Co-Owners, Taquería El Sol",
  },
  {
    quote:
      "The community awareness I've gained through Lattice has been a game-changer. I did a live-painting experience for a corporate anniversary event last month, and three of the executives liked my style so much they commissioned private pieces for their homes. Lattice bridges the gap between independent creatives and local businesses that genuinely want to invest in us.",
    name: "Jordan Brooks",
    role: "Muralist & Fine Artist",
  },
  {
    quote:
      "We absolutely love working with Lattice customers. The corporate teams we meet are so engaged, respectful, and excited to support local, diverse businesses. During our interactive espresso and pastry pop-ups, the employees always want to hear our story. It's an incredibly uplifting environment, and the financial ROI for our business has been phenomenal.",
    name: "Sofia Amadou",
    role: "Founder, Café de Cacao",
  },
];

function TestimonialCard({ quote, name, role, tag }: { quote: string; name: string; role: string; tag?: string }) {
  return (
    <figure
      className="bg-card rounded-lg border border-border p-7 flex flex-col"
      style={{ boxShadow: "0 1px 2px rgba(15,23,42,0.03)" }}
    >
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
        <section className="relative px-6 pt-20 pb-16 text-center">
          <div className="relative">
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-[-0.015em] text-foreground max-w-4xl mx-auto mb-8">
              Transforming corporate event spend into <em className="not-italic text-primary">measurable employee impact</em>.
            </h1>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-secondary leading-relaxed mb-6">
              Stop wasting budget on uninspiring corporate events. Lattice pairs smart data with local creators to build high-yield experiences that measurably increase team productivity, foster genuine workplace connection, and drive top-talent retention.
            </p>
            <HeroGallery />
            <h1 className="text-5xl sm:text-6xl font-semibold tracking-[-0.02em] text-foreground max-w-3xl mx-auto">
              Match. Book. Measure.
            </h1>
            <p className="mt-5 text-lg text-secondary max-w-[600px] mx-auto leading-relaxed">
              The marketplace for company culture events. Match with vetted local
              artists, book instantly, done.
            </p>

            <div className="max-w-6xl mx-auto">
              <TrustStrip />
            </div>
          </div>
        </section>

        <PhotoGallery />

        <Features />
        <Testimonials />

        <section className="px-6 py-24 bg-background">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] mb-4">
              Ready to curate your next experience?
            </h2>
            <p className="text-base text-secondary mb-10 max-w-2xl mx-auto">
              Tell us about your team and we'll match you with vetted local creators.
            </p>
            <IntakeCard />
            <p className="mt-5 text-sm text-secondary">
              Curated from 400+ vetted local creatives. Free to explore — no account needed.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
