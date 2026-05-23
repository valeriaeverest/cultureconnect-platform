import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "../components/navbar";
import { authStore } from "../lib/auth-store";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!companyName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const success = authStore.signup(email, password, companyName);
    if (success) {
      navigate({ to: "/dashboard" });
    } else {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-24 pb-20 px-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-serif text-ink text-center mb-2">Create your account</h1>
          <p className="text-center text-warm-gray font-sans mb-8">
            Start booking culture events for your team.
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
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Acme Corp"
                className="w-full rounded-lg border border-border bg-cream px-4 py-2.5 text-sm text-ink font-sans focus:outline-none focus:ring-2 focus:ring-terracotta/30"
              />
            </div>

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
              <p className="text-xs text-warm-gray font-sans mt-1">Minimum 6 characters</p>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-terracotta py-3 text-sm font-medium text-white transition-colors hover:bg-[#A8401F]"
            >
              Create account
            </button>

            <p className="text-center text-sm text-warm-gray font-sans">
              Already have an account?{" "}
              <Link to="/login" className="text-terracotta hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
