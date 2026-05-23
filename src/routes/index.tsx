import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { Navbar } from "../components/navbar";
import { cities, teamSizes, timeSlots, vibeTags } from "../lib/data";
import { authStore } from "../lib/auth-store";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <TrustBar />
        <IntakeFormSection />
      </main>
      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="px-4 pt-20 pb-16 text-center max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-7xl font-serif text-ink leading-[1.1] tracking-tight">
        Transform corporate event spend into employee retention.
      </h1>
      <p className="mt-6 text-lg text-warm-gray max-w-2xl mx-auto font-sans">
        CultureConnect helps enterprises convert culture budgets into measurable team
        connectivity, engagement, and retention outcomes.
      </p>
      <a
        href="#intake-form"
        className="inline-flex items-center justify-center mt-8 rounded-full bg-terracotta px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-[#A8401F]"
      >
        See your ROI in 60 seconds
      </a>
    </section>
  );
}

function TrustBar() {
  const stats = [
    { value: "2,400+", label: "Companies served" },
    { value: "87%", label: "Employee engagement lift" },
    { value: "3.2x", label: "Average ROI" },
  ];

  return (
    <section className="border-y border-border bg-card/50 py-8">
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-12 px-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-serif text-ink">{stat.value}</div>
            <div className="text-sm text-warm-gray font-sans mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function IntakeFormSection() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    city: "",
    teamSize: "",
    eventDate: "",
    budget: 5000,
    timeSlot: "",
    vibes: [] as string[],
  });

  const toggleVibe = useCallback((vibe: string) => {
    setFormData((prev) => ({
      ...prev,
      vibes: prev.vibes.includes(vibe)
        ? prev.vibes.filter((v) => v !== vibe)
        : [...prev.vibes, vibe],
    }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authStore.login("demo@acmecorp.com", "demo");
    navigate({ to: "/dashboard" });
  };

  return (
    <section id="intake-form" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-serif text-ink text-center mb-3">
          See your team impact in 60 seconds
        </h2>
        <p className="text-center text-warm-gray font-sans mb-10">
          Enter your event parameters and watch the ROI projection instantly.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-2xl p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* City */}
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5 font-sans">
                City / Location
              </label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full rounded-lg border border-border bg-cream px-4 py-2.5 text-sm text-ink font-sans focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                required
              >
                <option value="">Select a city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Team Size */}
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5 font-sans">
                Team Size
              </label>
              <select
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                className="w-full rounded-lg border border-border bg-cream px-4 py-2.5 text-sm text-ink font-sans focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                required
              >
                <option value="">Select team size</option>
                {teamSizes.map((size) => (
                  <option key={size} value={size}>
                    {size} people
                  </option>
                ))}
              </select>
            </div>

            {/* Event Date */}
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5 font-sans">
                Event Date
              </label>
              <input
                type="date"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full rounded-lg border border-border bg-cream px-4 py-2.5 text-sm text-ink font-sans focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                required
              />
            </div>

            {/* Time Slot */}
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5 font-sans">
                Time Slot
              </label>
              <select
                value={formData.timeSlot}
                onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                className="w-full rounded-lg border border-border bg-cream px-4 py-2.5 text-sm text-ink font-sans focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                required
              >
                <option value="">Select a time slot</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Budget Slider */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5 font-sans">
              Budget:{" "}
              <span className="text-terracotta font-semibold">
                ${formData.budget.toLocaleString()}
              </span>
            </label>
            <input
              type="range"
              min={500}
              max={20000}
              step={500}
              value={formData.budget}
              onChange={(e) =>
                setFormData({ ...formData, budget: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-terracotta"
            />
            <div className="flex justify-between text-xs text-warm-gray font-sans mt-1">
              <span>$500</span>
              <span>$20,000</span>
            </div>
          </div>

          {/* Vibe Tags */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2 font-sans">
              Vibe (select all that apply)
            </label>
            <div className="flex flex-wrap gap-2">
              {vibeTags.map((vibe) => (
                <button
                  key={vibe}
                  type="button"
                  onClick={() => toggleVibe(vibe)}
                  className={`rounded-full px-4 py-1.5 text-sm font-sans transition-all ${
                    formData.vibes.includes(vibe)
                      ? "bg-terracotta text-white"
                      : "bg-muted text-ink hover:bg-border"
                  }`}
                >
                  {vibe}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-terracotta py-3.5 text-base font-medium text-white transition-colors hover:bg-[#A8401F]"
          >
            Show My ROI Dashboard
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <span className="text-lg font-serif text-ink">CultureConnect</span>
        <p className="text-sm text-warm-gray font-sans mt-2">
          &copy; 2026 CultureConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
