import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useState, useEffect } from "react";

const searchSchema = z.object({
  tab: fallback(z.enum(["customer", "artist"]), "customer").default("customer"),
});

export const Route = createFileRoute("/signin")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Sign in — Lattice" },
      { name: "description", content: "Sign in to Lattice or apply to join the artist network." },
    ],
  }),
  component: SignInPage,
});

const MEDIUMS = ["Music", "Visual Art", "Food/Beverage", "Workshop", "Performance", "Other"];

function Nav() {
  return (
    <header className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold tracking-tight text-foreground">
          Lattice
        </Link>
        <nav className="flex items-center gap-7">
          <Link to="/" className="text-sm text-secondary hover:text-foreground transition-colors">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}

function inputCls() {
  return "w-full h-10 px-3 border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-foreground mb-1.5">{children}</label>;
}

function PrimaryButton({ children, type = "button" }: { children: React.ReactNode; type?: "button" | "submit" }) {
  return (
    <button
      type={type}
      className="w-full h-11 font-medium text-white transition-colors"
      style={{ backgroundColor: "var(--color-primary)", borderRadius: 6 }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-primary-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-primary)")}
    >
      {children}
    </button>
  );
}

function CustomerForm() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-foreground mb-4">
        Welcome to Lattice
      </h1>

      <Link
        to="/intake"
        className="block text-base font-medium mb-6 transition-colors"
        style={{ color: "var(--color-primary)" }}
      >
        See your match and budget — no account needed →
      </Link>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs uppercase tracking-[0.05em] text-muted-foreground font-medium">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <Label>Email</Label>
          <input type="email" placeholder="you@company.com" className={inputCls()} style={{ borderRadius: 4 }} />
        </div>
        <div>
          <Label>Password</Label>
          <input type="password" placeholder="••••••••" className={inputCls()} style={{ borderRadius: 4 }} />
        </div>
        <PrimaryButton type="submit">Sign in</PrimaryButton>
      </form>

      <p className="text-sm text-secondary text-center mt-5">
        New here?{" "}
        <a href="#" className="font-medium" style={{ color: "var(--color-primary)" }}>
          Create account
        </a>
      </p>
    </div>
  );
}

function ArtistForm() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-foreground mb-2">
        Join the Lattice network
      </h1>
      <p className="text-sm text-secondary leading-relaxed mb-6">
        Apply once, then accept or decline event matches that fit your schedule. Set your own rates and availability.
      </p>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <Label>Name</Label>
          <input type="text" className={inputCls()} style={{ borderRadius: 4 }} />
        </div>
        <div>
          <Label>Email</Label>
          <input type="email" className={inputCls()} style={{ borderRadius: 4 }} />
        </div>
        <div>
          <Label>City</Label>
          <input type="text" className={inputCls()} style={{ borderRadius: 4 }} />
        </div>
        <div>
          <Label>Medium</Label>
          <select className={inputCls()} style={{ borderRadius: 4 }} defaultValue="">
            <option value="" disabled>Select a medium…</option>
            {MEDIUMS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <Label>Tell us about your work</Label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary leading-relaxed"
            style={{ borderRadius: 4 }}
          />
        </div>
        <div>
          <Label>Portfolio or Instagram link</Label>
          <input type="text" placeholder="https://…" className={inputCls()} style={{ borderRadius: 4 }} />
        </div>
        <PrimaryButton type="submit">Submit application</PrimaryButton>
      </form>

      <p className="text-xs text-muted-foreground mt-5 leading-relaxed text-center">
        Approval typically takes under 48 hours. Auto-matched events appear in your dashboard.
      </p>
    </div>
  );
}

function Tab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 pb-3 text-sm font-medium transition-colors"
      style={{
        color: active ? "var(--color-foreground)" : "var(--color-muted-foreground)",
        borderBottom: `2px solid ${active ? "var(--color-primary)" : "transparent"}`,
        marginBottom: -1,
      }}
    >
      {children}
    </button>
  );
}

function SignInPage() {
  const { tab } = Route.useSearch();
  const [active, setActive] = useState<"customer" | "artist">(tab);

  useEffect(() => {
    setActive(tab);
  }, [tab]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Nav />
      <main className="flex-1 flex items-start justify-center px-6 py-16">
        <div
          className="bg-card border border-border w-full"
          style={{
            maxWidth: 480,
            padding: 32,
            borderRadius: 8,
            boxShadow: "0 1px 3px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)",
          }}
        >
          <div className="flex border-b border-border mb-7">
            <Tab active={active === "customer"} onClick={() => setActive("customer")}>
              I'm planning an event
            </Tab>
            <Tab active={active === "artist"} onClick={() => setActive("artist")}>
              I'm an artist or vendor
            </Tab>
          </div>

          {active === "customer" ? <CustomerForm /> : <ArtistForm />}
        </div>
      </main>
    </div>
  );
}
