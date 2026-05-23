import { createFileRoute, Link } from "@tanstack/react-router";
import { useSyncExternalStore } from "react";
import { Navbar } from "../components/navbar";
import { authStore } from "../lib/auth-store";
import { mockPulseSurveys, mockEvents } from "../lib/data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/dashboard/analytics")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const user = useSyncExternalStore(authStore.subscribe, authStore.getUser);

  if (!user) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main className="pt-24 pb-20 px-4 text-center">
          <h1 className="text-3xl font-serif text-ink mb-4">Access Required</h1>
          <p className="text-warm-gray font-sans mb-6">
            Please sign in to view analytics.
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

  // Pulse survey over time (monthly averages)
  const months = ["Jan", "Feb", "Mar", "Apr", "May"];
  const monthMap: Record<string, string> = {
    "2026-01": "Jan",
    "2026-02": "Feb",
    "2026-03": "Mar",
    "2026-04": "Apr",
    "2026-05": "May",
  };

  const pulseOverTime = months.map((month) => {
    const surveys = mockPulseSurveys.filter(
      (s) => monthMap[s.created_at.slice(0, 7)] === month
    );
    const avg = surveys.length > 0
      ? Math.round(surveys.reduce((sum, s) => sum + s.score, 0) / surveys.length)
      : 0;
    return { month, score: avg };
  });

  // Department heatmap data
  const departments = ["Engineering", "Marketing", "Sales", "Design", "HR"];
  const departmentLatest = departments.map((dept) => {
    const deptSurveys = mockPulseSurveys
      .filter((s) => s.department === dept)
      .sort((a, b) => b.created_at.localeCompare(a.created_at));
    return {
      department: dept,
      score: deptSurveys[0]?.score || 0,
    };
  });

  // Manager scores (mock)
  const managerScores = [
    { name: "Sarah K.", department: "Engineering", score: 82 },
    { name: "Marcus J.", department: "Sales", score: 79 },
    { name: "Elena R.", department: "Design", score: 76 },
    { name: "David P.", department: "Marketing", score: 71 },
    { name: "Lina T.", department: "HR", score: 68 },
  ];

  // Event impact - NPS before vs after
  const completedEvents = mockEvents.filter((e) => e.status === "completed" && e.nps_score !== null);
  const eventImpact = completedEvents.map((event) => ({
    name: event.vendor_name.split(" ").slice(0, 2).join(" "),
    before: Math.max(30, (event.nps_score || 60) - Math.floor(Math.random() * 20 + 10)),
    after: event.nps_score || 60,
  }));

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-warm-gray font-sans hover:text-ink transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <h1 className="text-4xl font-serif text-ink mb-2">Culture Analytics</h1>
        <p className="text-warm-gray font-sans mb-10">
          Deep insights into employee sentiment, team morale, and event impact.
        </p>

        {/* Pulse Survey Over Time */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <h3 className="font-sans font-semibold text-ink mb-4">Pulse Survey Results Over Time</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={pulseOverTime}>
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
                name="Avg. Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Department Sentiment Heatmap */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-sans font-semibold text-ink mb-4">
              Department Sentiment
            </h3>
            <div className="space-y-3">
              {departmentLatest
                .sort((a, b) => b.score - a.score)
                .map((dept) => (
                  <div key={dept.department} className="flex items-center gap-3">
                    <span className="text-sm font-sans text-ink w-28 shrink-0">
                      {dept.department}
                    </span>
                    <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden relative">
                      <div
                        className="h-full rounded-lg transition-all"
                        style={{
                          width: `${dept.score}%`,
                          backgroundColor: getHeatColor(dept.score),
                        }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-sans font-medium text-ink">
                        {dept.score}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex items-center gap-3 mt-5 text-xs font-sans text-warm-gray">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded" style={{ backgroundColor: "#ef4444" }} />
                Low (&lt;60)
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded" style={{ backgroundColor: "#eab308" }} />
                Medium (60-74)
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded" style={{ backgroundColor: "#22c55e" }} />
                High (75+)
              </div>
            </div>
          </div>

          {/* Manager Scores */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-sans font-semibold text-ink mb-4">Manager Scores</h3>
            <div className="space-y-3">
              {managerScores.map((manager, i) => (
                <div
                  key={manager.name}
                  className="flex items-center justify-between bg-muted/50 rounded-lg px-4 py-3"
                >
                  <div>
                    <span className="text-sm font-sans font-medium text-ink">
                      {i + 1}. {manager.name}
                    </span>
                    <span className="text-xs text-warm-gray font-sans ml-2">
                      {manager.department}
                    </span>
                  </div>
                  <span
                    className="text-sm font-sans font-semibold"
                    style={{ color: getHeatColor(manager.score) }}
                  >
                    {manager.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Event Impact */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-sans font-semibold text-ink mb-2">
            Event Impact: NPS Before vs After
          </h3>
          <p className="text-sm text-warm-gray font-sans mb-4">
            Comparing team NPS scores before and after each culture event.
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={eventImpact} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D6CFC4" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#8B8178" }} />
              <YAxis tick={{ fontSize: 12, fill: "#8B8178" }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D6CFC4",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="before" name="Before Event" fill="#D6CFC4" radius={[4, 4, 0, 0]} />
              <Bar dataKey="after" name="After Event" fill="#C8502A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-3 text-xs font-sans text-warm-gray">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-[#D6CFC4]" /> Before Event
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-terracotta" /> After Event
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

function getHeatColor(score: number): string {
  if (score >= 75) return "#22c55e";
  if (score >= 60) return "#eab308";
  return "#ef4444";
}
