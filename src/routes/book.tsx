import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { loadSelectedMatch } from "@/lib/intake-store";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Confirm your event — Lattice" },
      { name: "description", content: "Confirm your event details and reserve." },
    ],
  }),
  component: BookPage,
});

type Match = {
  id: number;
  title: string;
  vendor: string;
  home: string;
  category: string;
};

const MATCHES: Record<number, Match> = {
  1: {
    id: 1,
    category: "WORKSHOP",
    title: "Private Maker Workshop",
    vendor: "Crafty Wonderland Makers Workshop",
    home: "Downtown & Alberta Arts District, Portland",
  },
  2: {
    id: 2,
    category: "MUSIC",
    title: "Intimate Acoustic Set",
    vendor: "Haley Heynderickx",
    home: "Southeast Portland, OR",
  },
  3: {
    id: 3,
    category: "FOOD",
    title: "Crepe Bar Pop-up",
    vendor: "Cafe de Crepe",
    home: "Northwest Portland, OR",
  },
};

function Nav() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="text-lg font-semibold tracking-tight text-foreground">
          Lattice
        </Link>
        <nav className="flex items-center gap-8 text-sm text-secondary">
          <Link to="/signin" search={{ tab: "customer" }} className="hover:text-foreground">
            Sign in
          </Link>
          <Link to="/signin" search={{ tab: "artist" }} className="hover:text-foreground">
            For artists
          </Link>
          <Link
            to="/signin"
            search={{ tab: "customer" }}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
          >
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
}

type VenueChoice = "office" | "suggest" | "other";

function VenueCard({
  value,
  current,
  onSelect,
  label,
}: {
  value: VenueChoice;
  current: VenueChoice;
  onSelect: (v: VenueChoice) => void;
  label: string;
}) {
  const selected = value === current;
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
        selected
          ? "border-primary bg-primary/5"
          : "border-border bg-card hover:border-secondary/40"
      }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
          selected ? "border-primary" : "border-border"
        }`}
      >
        {selected && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
      </span>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </button>
  );
}

function BookPage() {
  const navigate = useNavigate();
  const [matchId, setMatchId] = useState<number>(1);
  const [groupSize, setGroupSize] = useState(30);
  const [venue, setVenue] = useState<VenueChoice>("office");
  const [requests, setRequests] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const id = loadSelectedMatch();
    if (id && MATCHES[id]) setMatchId(id);
  }, []);

  const match = MATCHES[matchId];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lattice:booking-email", email);
    }
    navigate({ to: "/create-account" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Almost there
          </h1>
          <p className="mt-3 text-secondary">
            Confirm your event details. You'll create your account in the next step.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <aside className="lg:col-span-2">
            <div className="lg:sticky lg:top-6 rounded-lg border bg-card p-6 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-success">
                Your Event
              </div>
              <h2 className="mt-2 text-xl font-semibold text-foreground">{match.title}</h2>
              <div className="mt-1 text-sm text-secondary">{match.vendor}</div>
              <div className="text-xs text-muted-foreground">{match.home}</div>

              <div className="mt-5 border-t pt-5 text-sm text-secondary">
                <span className="font-medium text-foreground">Date:</span> March 15, 2026
              </div>

              <div className="mt-4 rounded-md bg-primary/5 px-4 py-3">
                <div className="text-xs font-medium uppercase tracking-wide text-secondary">
                  Estimated cost
                </div>
                <div className="mt-1 text-lg font-semibold text-foreground">
                  $2,400 – $3,200
                </div>
                <div className="text-xs text-muted-foreground">for {groupSize} people</div>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Vendor confirms availability in under 2 hours via the platform.
              </p>
            </div>
          </aside>

          <form onSubmit={onSubmit} className="space-y-6 lg:col-span-3">
            <div>
              <label className="block text-sm font-medium text-foreground">
                Confirm group size
              </label>
              <Input
                type="number"
                min={1}
                value={groupSize}
                onChange={(e) => setGroupSize(Number(e.target.value) || 0)}
                className="mt-2 max-w-[180px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">Event venue</label>
              <div className="mt-2 space-y-2">
                <VenueCard value="office" current={venue} onSelect={setVenue} label="At our office" />
                <VenueCard value="suggest" current={venue} onSelect={setVenue} label="Suggest a venue" />
                <VenueCard value="other" current={venue} onSelect={setVenue} label="Other" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">
                Any special requests?
              </label>
              <Textarea
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
                placeholder="Dietary restrictions, accessibility needs, theme..."
                className="mt-2 min-h-[100px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">Your work email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Button
                type="submit"
                className="h-12 w-full bg-primary text-base font-medium text-primary-foreground hover:bg-primary-hover"
              >
                Reserve & create account →
              </Button>
              <p className="mt-3 text-xs text-muted-foreground">
                Account created at reservation. Payment held in escrow until event day.
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
