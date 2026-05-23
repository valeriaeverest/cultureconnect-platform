import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { Navbar } from "../components/navbar";
import { vendors, cities, teamSizes, timeSlots, vibeTags } from "../lib/data";
import type { Vendor } from "../lib/data";
import { Star, Check, MapPin, DollarSign, Clock } from "lucide-react";

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
        Culture events that actually move the needle.
      </h1>
      <p className="mt-6 text-lg text-warm-gray max-w-2xl mx-auto font-sans">
        Book vetted local vendors — musicians, food trucks, artists, wellness providers — and
        track the impact on employee morale over time.
      </p>
      <a
        href="#intake-form"
        className="inline-flex items-center justify-center mt-8 rounded-full bg-terracotta px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-[#A8401F]"
      >
        Get matched in under 2 minutes
      </a>
    </section>
  );
}

function TrustBar() {
  const stats = [
    { value: "400+", label: "Vetted vendors" },
    { value: "<2 min", label: "Time to match" },
    { value: "68", label: "Average NPS" },
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
  const [formData, setFormData] = useState({
    city: "",
    teamSize: "",
    eventDate: "",
    budget: 5000,
    timeSlot: "",
    vibes: [] as string[],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [results, setResults] = useState<Vendor[] | null>(null);

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
    setIsLoading(true);
    setResults(null);
    setLoadingStep(0);

    // Simulate 3-step loading
    setTimeout(() => setLoadingStep(1), 600);
    setTimeout(() => setLoadingStep(2), 1400);
    setTimeout(() => {
      setLoadingStep(3);
      setTimeout(() => {
        setIsLoading(false);
        // Filter and score vendors
        const scored = vendors
          .filter((v) => {
            if (formData.city && v.city !== formData.city) return false;
            if (v.price_min > formData.budget) return false;
            return true;
          })
          .map((v) => {
            let score = 50;
            if (formData.vibes.includes(v.category)) score += 30;
            if (v.available) score += 10;
            score += v.rating * 2;
            if (v.city === formData.city) score += 5;
            return { ...v, match_score: Math.min(99, score) };
          })
          .sort((a, b) => (b.match_score || 0) - (a.match_score || 0))
          .slice(0, 6);
        setResults(scored);
      }, 400);
    }, 2200);
  };

  return (
    <section id="intake-form" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-serif text-ink text-center mb-3">
          Tell us about your event
        </h2>
        <p className="text-center text-warm-gray font-sans mb-10">
          We'll match you with the perfect vendors in seconds.
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
            disabled={isLoading}
            className="w-full rounded-full bg-terracotta py-3.5 text-base font-medium text-white transition-colors hover:bg-[#A8401F] disabled:opacity-60"
          >
            {isLoading ? "Finding your matches..." : "Find my vendors"}
          </button>
        </form>

        {/* Loading Animation */}
        {isLoading && (
          <div className="mt-10 space-y-4">
            <LoadingStep step={1} current={loadingStep} label="Scanning 400+ vetted vendors..." />
            <LoadingStep step={2} current={loadingStep} label="Matching to your vibe and budget..." />
            <LoadingStep step={3} current={loadingStep} label="Ranking by availability and reviews..." />
          </div>
        )}

        {/* Results */}
        {results && results.length > 0 && (
          <div className="mt-12 animate-fade-up">
            <h3 className="text-3xl font-serif text-ink text-center mb-2">
              Your curated matches
            </h3>
            <p className="text-center text-warm-gray font-sans mb-8">
              Sorted by match score for your event
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {results.map((vendor) => (
                <VendorResultCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
            <div className="text-center mt-10">
              <a
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-3.5 text-base font-medium text-cream transition-colors hover:bg-ink/90"
              >
                Create account & book
              </a>
            </div>
          </div>
        )}

        {results && results.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-warm-gray font-sans">
              No vendors matched your criteria. Try adjusting your city or budget.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function LoadingStep({ step, current, label }: { step: number; current: number; label: string }) {
  const isComplete = current >= step;
  const isActive = current === step - 1;

  return (
    <div className={`flex items-center gap-3 transition-opacity ${isActive ? "opacity-60" : ""}`}>
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
          isComplete
            ? "bg-terracotta text-white animate-check"
            : "bg-muted text-warm-gray"
        }`}
      >
        {isComplete ? <Check className="w-3.5 h-3.5" /> : <span className="text-xs">{step}</span>}
      </div>
      <span className={`text-sm font-sans ${isComplete ? "text-ink" : "text-warm-gray"}`}>
        {label}
      </span>
    </div>
  );
}

function VendorResultCard({ vendor }: { vendor: Vendor }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 transition-all hover:border-terracotta/30">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-sans font-semibold text-ink text-base">{vendor.name}</h4>
          <span className="inline-block mt-1 text-xs font-medium bg-muted text-warm-gray px-2 py-0.5 rounded-full">
            {vendor.category}
          </span>
        </div>
        {vendor.match_score && (
          <div className="text-right">
            <div className="text-lg font-semibold text-terracotta font-sans">
              {vendor.match_score}%
            </div>
            <div className="text-[10px] text-warm-gray font-sans">match</div>
          </div>
        )}
      </div>
      <p className="text-sm text-warm-gray font-sans line-clamp-2 mb-3">{vendor.description}</p>
      <div className="flex items-center gap-4 text-xs text-warm-gray font-sans">
        <span className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-terracotta fill-terracotta" />
          {vendor.rating}
        </span>
        <span className="flex items-center gap-1">
          <DollarSign className="w-3.5 h-3.5" />
          {vendor.price_min.toLocaleString()}–{vendor.price_max.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          {vendor.city}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {vendor.available ? (
            <span className="text-green-700">Available</span>
          ) : (
            <span className="text-red-600">Booked</span>
          )}
        </span>
      </div>
    </div>
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
