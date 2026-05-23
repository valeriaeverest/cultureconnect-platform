import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "../components/navbar";
import { authStore } from "../lib/auth-store";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const success = authStore.login(email, password);
    if (success) {
      navigate({ to: "/dashboard" });
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-24 pb-20 px-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-serif text-ink text-center mb-2">Welcome back</h1>
          <p className="text-center text-warm-gray font-sans mb-8">
            Sign in to manage your events and analytics.
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-xl p-8 space-y-5"
          >
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-sm text-red-700 font-sans">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-ink mb-1.5 font-sans">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-lg border border-border bg-cream px-4 py-2.5 text-sm text-ink font-sans focus:outline-none focus:ring-2 focus:ring-terracotta/30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1.5 font-sans">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-border bg-cream px-4 py-2.5 text-sm text-ink font-sans focus:outline-none focus:ring-2 focus:ring-terracotta/30"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-terracotta py-3 text-sm font-medium text-white transition-colors hover:bg-[#A8401F]"
            >
              Sign in
            </button>

            <p className="text-center text-sm text-warm-gray font-sans">
              Don't have an account?{" "}
              <Link to="/signup" className="text-terracotta hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
