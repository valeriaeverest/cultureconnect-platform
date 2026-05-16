import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/create-account")({
  head: () => ({
    meta: [
      { title: "Create your account — Lattice" },
      { name: "description", content: "Lock in your booking with a Lattice account." },
    ],
  }),
  component: CreateAccountPage,
});

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
        </nav>
      </div>
    </header>
  );
}

function CreateAccountPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [editingEmail, setEditingEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("lattice:booking-email") || "";
    setEmail(stored);
  }, []);

  useEffect(() => {
    if (editingEmail) emailRef.current?.focus();
  }, [editingEmail]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    navigate({ to: "/confirmed" });
  };

  return (
    <div className="min-h-screen bg-background page-fade">
      <Nav />
      <main className="mx-auto flex max-w-7xl items-start justify-center px-6 py-16">
        <div className="w-full max-w-[480px] rounded-lg border bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            One last thing
          </h1>
          <p className="mt-2 text-sm text-secondary">
            Create your account to lock in your booking. Takes 10 seconds.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground">Work email</label>
              <div className="mt-2 flex items-center gap-2">
                <Input
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly={!editingEmail}
                  onBlur={() => setEditingEmail(false)}
                  className={editingEmail ? "" : "bg-muted/50"}
                  required
                />
                <button
                  type="button"
                  onClick={() => setEditingEmail((v) => !v)}
                  aria-label="Edit email"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border text-secondary hover:text-foreground"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password"
                className="mt-2"
                required
                minLength={8}
              />
            </div>

            <label className="flex items-start gap-3 text-sm text-secondary">
              <Checkbox
                checked={agreed}
                onCheckedChange={(v) => setAgreed(v === true)}
                className="mt-0.5"
              />
              <span>I agree to the terms</span>
            </label>

            <Button
              type="submit"
              disabled={!agreed}
              className="h-12 w-full bg-primary text-base font-medium text-primary-foreground hover:bg-primary-hover"
            >
              Lock in my booking →
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
