import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "../components/navbar";
import { mockEvents, cultureScoreData, npsData, vendors } from "../lib/data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar, TrendingUp, Users, Star, Sparkles, HeartHandshake, DollarSign } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  const upcomingEvents = mockEvents.filter((e) => e.status === "upcoming");
  const pastEvents = mockEvents.filter((e) => e.status === "completed");
  const recommended = vendors.slice(0, 3);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-200 px-3 py-1 text-xs font-medium text-green-700">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live Demo · Acme Corp · Q4 2026
        </div>
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-serif text-ink">Culture Impact Dashboard</h1>
            <p className="text-warm-gray font-sans mt-1">
              Real-time view of how culture spend drives retention and engagement.
            </p>
          </div>
        </div>

        {/* Hero KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <HeroKpi icon={<HeartHandshake className="w-5 h-5" />} label="Employee Engagement" value="87%" delta="+12 pts QoQ" tone="terracotta" />
          <HeroKpi icon={<TrendingUp className="w-5 h-5" />} label="Retention Lift" value="+14%" delta="vs control cohort" tone="green" />
          <HeroKpi icon={<DollarSign className="w-5 h-5" />} label="Annual Savings" value="$842K" delta="reduced turnover" tone="ink" />
          <HeroKpi icon={<Sparkles className="w-5 h-5" />} label="Culture NPS" value="68" delta="+22 YoY" tone="terracotta" />
        </div>

        {/* Secondary stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard icon={<Calendar className="w-5 h-5" />} label="Upcoming Events" value={upcomingEvents.length.toString()} />
          <StatCard icon={<Users className="w-5 h-5" />} label="Employees Reached" value="1,284" />
          <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Local Economy Impact" value="$214K" />
          <StatCard icon={<Star className="w-5 h-5" />} label="Vendors Activated" value="37" />
        </div>


        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-sans font-semibold text-ink mb-4">Culture Score Over Time</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={cultureScoreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D6CFC4" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#8B8178" }} />
                <YAxis tick={{ fontSize: 12, fill: "#8B8178" }} domain={[40, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #D6CFC4",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#C8502A"
                  strokeWidth={2.5}
                  dot={{ fill: "#C8502A", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-sans font-semibold text-ink mb-4">Team NPS Trend</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={npsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D6CFC4" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#8B8178" }} />
                <YAxis tick={{ fontSize: 12, fill: "#8B8178" }} domain={[30, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #D6CFC4",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="nps"
                  stroke="#1A1712"
                  strokeWidth={2.5}
                  dot={{ fill: "#1A1712", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-10">
          <h2 className="text-2xl font-serif text-ink mb-4">Upcoming Events</h2>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <EventRow key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-warm-gray font-sans">No upcoming events scheduled.</p>
          )}
        </div>

        {/* Past Events */}
        <div className="mb-10">
          <h2 className="text-2xl font-serif text-ink mb-4">Past Events</h2>
          <div className="space-y-3">
            {pastEvents.map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* Recommended Vendors */}
        {recommended.length > 0 && (
          <div>
            <h2 className="text-2xl font-serif text-ink mb-4">Recommended for You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommended.map((vendor) => (
                <Link
                  key={vendor.id}
                  to="/vendors/$vendorId"
                  params={{ vendorId: vendor.id }}
                  className="bg-card border border-border rounded-xl p-4 hover:border-terracotta/30 transition-colors"
                >
                  <h4 className="font-sans font-semibold text-ink text-sm">{vendor.name}</h4>
                  <span className="inline-block text-xs text-warm-gray bg-muted px-2 py-0.5 rounded-full mt-1 mb-2">
                    {vendor.category}
                  </span>
                  <p className="text-xs text-warm-gray font-sans line-clamp-2">
                    {vendor.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-3">
        <div className="text-terracotta">{icon}</div>
        <div>
          <div className="text-2xl font-sans font-semibold text-ink">{value}</div>
          <div className="text-xs text-warm-gray font-sans">{label}</div>
        </div>
      </div>
    </div>
  );
}

function EventRow({ event }: { event: typeof mockEvents[0] }) {
  return (
    <div className="bg-card border border-border rounded-xl px-5 py-4 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h4 className="font-sans font-medium text-ink text-sm">{event.vendor_name}</h4>
        <p className="text-xs text-warm-gray font-sans mt-0.5">
          {event.event_date} · {event.time_slot}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-warm-gray font-sans">
          ${event.budget.toLocaleString()}
        </span>
        {event.nps_score !== null && (
          <span className="text-xs font-medium text-terracotta font-sans">
            NPS: {event.nps_score}
          </span>
        )}
        <span
          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
            event.status === "upcoming"
              ? "bg-blue-50 text-blue-700"
              : event.status === "completed"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {event.status}
        </span>
      </div>
    </div>
  );
}

function HeroKpi({
  icon,
  label,
  value,
  delta,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta: string;
  tone: "terracotta" | "green" | "ink";
}) {
  const toneClasses =
    tone === "terracotta"
      ? "from-terracotta to-[#A8401F] text-white"
      : tone === "green"
      ? "from-emerald-500 to-emerald-700 text-white"
      : "from-ink to-[#3a342c] text-white";

  return (
    <div className={`bg-gradient-to-br ${toneClasses} rounded-xl p-5 shadow-lg`}>
      <div className="flex items-center justify-between mb-3 opacity-90">
        {icon}
        <span className="text-[10px] uppercase tracking-wider opacity-80">{delta}</span>
      </div>
      <div className="text-4xl font-serif">{value}</div>
      <div className="text-xs font-sans mt-1 opacity-90">{label}</div>
    </div>
  );
}

