import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSyncExternalStore } from "react";
import { Navbar } from "../components/navbar";
import { authStore } from "../lib/auth-store";
import {
  mockEvents,
  cultureScoreData,
  npsData,
  budgetAllocationData,
  engagementMetrics,
} from "../lib/data";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar, TrendingUp, Users, Star } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  const user = useSyncExternalStore(authStore.subscribe, authStore.getUser);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main className="pt-24 pb-20 px-4 text-center">
          <h1 className="text-3xl font-serif text-ink mb-4">Access Required</h1>
          <p className="text-warm-gray font-sans mb-6">
            Please sign in to view your dashboard.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-full bg-terracotta px-6 py-2.5 text-sm font-medium text-white hover:bg-[#A8401F]"
          >
            Sign in
          </Link>
        </main>
      </div>
    );
  }

  const upcomingEvents = mockEvents.filter((e) => e.status === "upcoming");
  const pastEvents = mockEvents.filter((e) => e.status === "completed");

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-ink">Dashboard</h1>
          <p className="text-warm-gray font-sans mt-1">
            Welcome back, {user.company_name}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard
            icon={<Users className="w-5 h-5" />}
            label="Employee Event Engagement"
            value={engagementMetrics.eventEngagement}
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Team Connection Score"
            value={engagementMetrics.teamConnectionScore}
          />
          <StatCard
            icon={<Calendar className="w-5 h-5" />}
            label="Employee Retention Rate"
            value={engagementMetrics.employeeRetention}
          />
          <StatCard
            icon={<Star className="w-5 h-5" />}
            label="ROI Multiplier"
            value={engagementMetrics.roiMultiplier}
          />
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

        {/* Budget Allocation Chart */}
        <div className="bg-card border border-border rounded-xl p-6 mb-10">
          <h3 className="font-sans font-semibold text-ink mb-4">
            Cultural Vendor Budget Allocation
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={budgetAllocationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D6CFC4" />
              <XAxis dataKey="category" tick={{ fontSize: 12, fill: "#8B8178" }} />
              <YAxis
                tick={{ fontSize: 12, fill: "#8B8178" }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D6CFC4",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Budget"]}
              />
              <Bar dataKey="amount" fill="#C8502A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
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
