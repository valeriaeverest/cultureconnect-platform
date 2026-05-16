import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { saveSelectedMatch } from "@/lib/intake-store";

export const Route = createFileRoute("/matches")({
  head: () => ({
    meta: [
      { title: "Your curated matches — Lattice" },
      { name: "description", content: "Three curated culture experiences for your team." },
    ],
  }),
  component: MatchesPage,
  ssr: false,
});

type Match = {
  id: number;
  category: string;
  title: string;
  vendor: string;
  home: string;
  why: string;
  meta: string;
  coords: [number, number];
};

const MATCHES: Match[] = [
  {
    id: 1,
    category: "WORKSHOP",
    title: "Private Maker Workshop",
    vendor: "Crafty Wonderland Makers Workshop",
    home: "Downtown & Alberta Arts District, Portland",
    why: "A local maker leads your team through a hands-on workshop — ceramics, jewelry, or screen printing. Everyone goes home with what they made.",
    meta: "$95/person • 2.5 hrs • 10-40 people • 2.1 mi away",
    coords: [45.5535, -122.6750],
  },
  {
    id: 2,
    category: "MUSIC",
    title: "Intimate Acoustic Set",
    vendor: "Haley Heynderickx",
    home: "Southeast Portland, OR",
    why: "Perfect for teams wanting a soulful moment, not a party. Quiet folk that creates the kind of atmosphere where people actually talk to each other afterward.",
    meta: "$95/person • 75 min • 20-80 people • 4.8 mi away",
    coords: [45.5050, -122.6500],
  },
  {
    id: 3,
    category: "FOOD",
    title: "Crepe Bar Pop-up",
    vendor: "Cafe de Crepe",
    home: "Northwest Portland, OR",
    why: "Sweet and savory crepes made to order. A delightful, slightly unexpected option for morning team gatherings, brunches, or wellness-themed events.",
    meta: "$22/person • 2 hrs • 20-100 people • 1.3 mi away",
    coords: [45.5200, -122.6900],
  },
];

const OFFICE: [number, number] = [45.5152, -122.6784];

function numberedPin(n: number) {
  return L.divIcon({
    className: "",
    html: `<div style="width:32px;height:32px;border-radius:9999px;background:#3B82F6;color:#fff;display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif;font-weight:600;font-size:14px;box-shadow:0 2px 6px rgba(15,23,42,0.25);border:2px solid #fff;">${n}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

function officePin() {
  return L.divIcon({
    className: "",
    html: `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;"><div style="width:18px;height:18px;border-radius:9999px;background:#14B8A6;border:3px solid #fff;box-shadow:0 2px 6px rgba(15,23,42,0.25);"></div><div style="background:#fff;color:#0f172a;font-family:Inter,sans-serif;font-size:11px;font-weight:600;padding:2px 8px;border-radius:4px;box-shadow:0 1px 3px rgba(15,23,42,0.15);white-space:nowrap;">Your office</div></div>`,
    iconSize: [80, 44],
    iconAnchor: [40, 9],
  });
}

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

function MatchCard({ match }: { match: Match }) {
  const navigate = useNavigate();
  const handleBook = () => {
    saveSelectedMatch(match.id);
    navigate({ to: "/matches" }); // /book doesn't exist yet
  };
  return (
    <div className="relative rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="absolute -left-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-md ring-4 ring-background">
        {match.id}
      </div>
      <div className="flex gap-6">
        <div
          className="aspect-[4/3] w-2/5 shrink-0 rounded-lg bg-gradient-to-br from-muted to-accent"
          style={{
            backgroundImage:
              "linear-gradient(135deg, color-mix(in oklab, var(--primary) 12%, white), color-mix(in oklab, var(--success) 18%, white))",
          }}
          aria-hidden
        />
        <div className="flex w-3/5 flex-col">
          <div className="text-xs font-semibold uppercase tracking-wider text-success">
            {match.category}
          </div>
          <h3 className="mt-1 text-[18px] font-semibold leading-tight text-foreground">
            {match.title}
          </h3>
          <div className="mt-1 text-sm text-secondary">{match.vendor}</div>
          <div className="text-xs text-muted-foreground">{match.home}</div>
          <p className="mt-3 text-sm leading-relaxed text-secondary">{match.why}</p>
          <div className="mt-3 text-xs text-muted-foreground">{match.meta}</div>
          <div className="mt-4 flex items-center gap-3">
            <Button variant="outline" size="sm">
              View details
            </Button>
            <Button
              size="sm"
              onClick={handleBook}
              className="bg-primary text-primary-foreground hover:bg-primary-hover"
            >
              Book this →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapPanel() {
  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <div className="h-[520px] w-full">
        <MapContainer
          center={OFFICE}
          zoom={12}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          />
          <Marker position={OFFICE} icon={officePin()} />
          {MATCHES.map((m) => (
            <Marker key={m.id} position={m.coords} icon={numberedPin(m.id)} />
          ))}
        </MapContainer>
      </div>
      <div className="border-t px-4 py-3 text-xs text-muted-foreground">
        All vendors within 15 miles of your office hub
      </div>
    </div>
  );
}

function MatchesPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-success">
            Your Curated Experiences
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            3 perfect matches for Northwind Labs
          </h1>
          <p className="mt-3 max-w-3xl text-secondary">
            Estimated total: $2,400 – $3,200 for your group of 30. Curated from artists within 15
            miles of your Austin office hub.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-3">
            {MATCHES.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
          <aside className="lg:col-span-2">
            <div className="lg:sticky lg:top-6">{mounted ? <MapPanel /> : <div className="h-[560px] rounded-lg border bg-muted" />}</div>
          </aside>
        </div>

        <div className="mt-12 text-center">
          <Link to="/intake" className="text-sm text-secondary underline-offset-4 hover:text-primary hover:underline">
            Not quite right? Refine your preferences
          </Link>
        </div>
      </main>
    </div>
  );
}
