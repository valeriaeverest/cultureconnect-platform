import { DemoNav } from "@/components/demo-nav";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Pencil, Check } from "lucide-react";
import { loadIntake, saveIntake, type IntakeState, type TimeSlot } from "@/lib/intake-store";

export const Route = createFileRoute("/intake")({
  head: () => ({
    meta: [
      { title: "Tell us about your team — Lattice" },
      { name: "description", content: "Help us curate your custom culture event." },
    ],
  }),
  component: IntakePage,
});

type Objective = "connection" | "wellness" | "milestone";

const OBJECTIVES: { id: Objective; title: string; body: string }[] = [
  { id: "connection", title: "Deep Team Connection", body: "Facilitated conversations, high team intimacy, low pressure" },
  { id: "wellness", title: "Creative De-stressing & Wellness", body: "Hands-on art, tactile engagement, sensory relaxation" },
  { id: "milestone", title: "Milestone Celebration", body: "High energy, live music, local street food, celebratory vibe" },
];

const VIBES = [
  "Local Arts & Crafts",
  "Indie Music Festival",
  "Culinary Workshop",
  "Cultural Heritage Spotlight",
  "Zero-Waste / Sustainable",
];

const DIETARY = [
  "Vegan / Plant-Based",
  "Gluten-Free",
  "Nut Allergies / Allergen-Safe",
  "Halal / Kosher Friendly",
  "Non-Alcoholic Beverage Focus",
];

const ACCESSIBILITY = [
  "Wheelchair accessible vendor setups required",
  "Low-sensory / Quiet zones required (for neurodiverse team members)",
];

const TIME_SLOT_LABELS: Record<TimeSlot, string> = {
  luncheon: "Luncheon",
  afternoon: "Afternoon Blend",
  "happy-hour": "Classic Happy Hour",
  evening: "Evening Gala",
};

const PLACEHOLDERS: IntakeState = {
  location: "Austin, TX (HQ)",
  teamSize: "150",
  budget: "5000",
  eventDate: "2026-03-15",
  timeSlot: "happy-hour",
};

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function chipDisplay(key: keyof IntakeState, v: string): string {
  if (!v) return "—";
  switch (key) {
    case "teamSize": return `${v} people`;
    case "budget": return `$${Number(v).toLocaleString()}`;
    case "eventDate": return formatDate(v);
    case "timeSlot": return TIME_SLOT_LABELS[v as TimeSlot] ?? v;
    default: return v;
  }
}

function Nav() {
  return (
    <header className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <BrandMark />
        <Link to="/signin" search={{ tab: "customer" }} className="text-sm text-secondary hover:text-foreground transition-colors">
          Sign in
        </Link>
      </div>
    </header>
  );
}

function EditableChip({
  fieldKey,
  value,
  onChange,
}: {
  fieldKey: keyof IntakeState;
  value: string;
  onChange: (v: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  useEffect(() => setDraft(value), [value]);

  const commit = () => {
    onChange(draft);
    setEditing(false);
  };

  const inputType =
    fieldKey === "teamSize" || fieldKey === "budget"
      ? "number"
      : fieldKey === "eventDate"
      ? "date"
      : "text";

  if (editing) {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2 py-1 text-sm"
        style={{ backgroundColor: "var(--color-chip)", borderRadius: 6 }}
      >
        <input
          autoFocus
          type={inputType}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") setEditing(false);
          }}
          className="bg-transparent border-none outline-none text-sm text-foreground w-32"
        />
        <button onClick={commit} className="text-muted-foreground hover:text-foreground">
          <Check size={14} />
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-foreground hover:bg-border transition-colors"
      style={{ backgroundColor: "var(--color-chip)", borderRadius: 6 }}
    >
      <span>{chipDisplay(fieldKey, value)}</span>
      <Pencil size={12} className="text-muted-foreground" />
    </button>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-xs font-medium uppercase mt-12 mb-5 pb-2 border-b border-border"
      style={{ color: "var(--color-secondary)", letterSpacing: "0.05em" }}
    >
      {children}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-medium text-foreground mb-3">{children}</div>;
}

function ObjectiveCard({
  selected,
  onClick,
  title,
  body,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  body: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left p-5 transition-all flex items-start gap-4"
      style={{
        borderRadius: 8,
        border: `1px solid ${selected ? "var(--color-primary)" : "var(--color-border)"}`,
        backgroundColor: selected ? "rgba(59,130,246,0.06)" : "var(--color-card)",
        boxShadow: selected ? "0 0 0 1px var(--color-primary)" : "none",
      }}
    >
      <span
        className="mt-1 flex-shrink-0 inline-flex items-center justify-center"
        style={{
          width: 18,
          height: 18,
          borderRadius: 999,
          border: `2px solid ${selected ? "var(--color-primary)" : "var(--color-border)"}`,
        }}
      >
        {selected && (
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              backgroundColor: "var(--color-primary)",
            }}
          />
        )}
      </span>
      <span>
        <span className="block text-base font-semibold text-foreground mb-1">{title}</span>
        <span className="block text-sm text-secondary leading-relaxed">{body}</span>
      </span>
    </button>
  );
}

function PillTag({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 h-9 text-sm transition-colors"
      style={{
        borderRadius: 999,
        backgroundColor: selected ? "var(--color-primary)" : "var(--color-chip)",
        color: selected ? "#fff" : "var(--color-foreground)",
      }}
    >
      {children}
    </button>
  );
}

function CheckboxRow({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-center gap-3 py-2 cursor-pointer text-sm text-foreground">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 accent-[var(--color-primary)]"
        style={{ borderRadius: 4 }}
      />
      <span>{children}</span>
    </label>
  );
}

function IntakePage() {
  const navigate = useNavigate();
  const [intake, setIntake] = useState<IntakeState>(PLACEHOLDERS);
  const [objective, setObjective] = useState<Objective | "">("");
  const [vibes, setVibes] = useState<string[]>([]);
  const [dietary, setDietary] = useState<string[]>([]);
  const [accessibility, setAccessibility] = useState<string[]>([]);
  const [details, setDetails] = useState("");

  useEffect(() => {
    const stored = loadIntake();
    const hasAny = Object.values(stored).some((v) => v);
    setIntake(hasAny ? { ...PLACEHOLDERS, ...stripEmpty(stored) } : PLACEHOLDERS);
  }, []);

  function stripEmpty(s: IntakeState): Partial<IntakeState> {
    const out: Partial<IntakeState> = {};
    (Object.keys(s) as (keyof IntakeState)[]).forEach((k) => {
      if (s[k]) (out as Record<string, unknown>)[k] = s[k];
    });
    return out;
  }

  const updateChip = (k: keyof IntakeState, v: string) => {
    const next = { ...intake, [k]: v } as IntakeState;
    setIntake(next);
    saveIntake(next);
  };

  const toggle = (list: string[], setList: (v: string[]) => void, v: string) => {
    setList(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  };

  const submit = () => {
    saveIntake(intake);
    navigate({ to: "/matches" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col page-fade">
      <Nav />
      <main className="flex-1 px-6 py-12">
        <div className="mx-auto w-full" style={{ maxWidth: 760 }}>
          <p className="text-sm" style={{ color: "var(--color-secondary)" }}>
            Step 2 of 3 — Help us understand your team
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.02em] text-foreground">
            Tell us about your team
          </h1>
          <p className="mt-3 text-base text-secondary leading-relaxed">
            Three more questions and we'll curate your custom experience.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {(["location", "teamSize", "budget", "eventDate", "timeSlot"] as const).map((k) => (
              <EditableChip key={k} fieldKey={k} value={intake[k]} onChange={(v) => updateChip(k, v as never)} />
            ))}
          </div>

          <SectionHeader>Section A: Culture Goals</SectionHeader>

          <FieldLabel>Primary Culture Objective</FieldLabel>
          <div className="space-y-3">
            {OBJECTIVES.map((o) => (
              <ObjectiveCard
                key={o.id}
                selected={objective === o.id}
                onClick={() => setObjective(o.id)}
                title={o.title}
                body={o.body}
              />
            ))}
          </div>

          <div className="mt-8">
            <FieldLabel>Desired Event Vibe / Theme</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {VIBES.map((v) => (
                <PillTag key={v} selected={vibes.includes(v)} onClick={() => toggle(vibes, setVibes, v)}>
                  {v}
                </PillTag>
              ))}
            </div>
          </div>

          <SectionHeader>Section B: Dietary & Inclusion</SectionHeader>

          <FieldLabel>Dietary Restrictions & Allergies</FieldLabel>
          <div>
            {DIETARY.map((d) => (
              <CheckboxRow key={d} checked={dietary.includes(d)} onChange={() => toggle(dietary, setDietary, d)}>
                {d}
              </CheckboxRow>
            ))}
          </div>

          <div className="mt-6">
            <FieldLabel>Accessibility & Workplace Preferences</FieldLabel>
            <div>
              {ACCESSIBILITY.map((a) => (
                <CheckboxRow
                  key={a}
                  checked={accessibility.includes(a)}
                  onChange={() => toggle(accessibility, setAccessibility, a)}
                >
                  {a}
                </CheckboxRow>
              ))}
            </div>
          </div>

          <SectionHeader>Section C: Make It Yours</SectionHeader>

          <FieldLabel>Additional Intentional Details</FieldLabel>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Tell us about your team's unique quirks, any specific local artists you love, or custom requests (e.g., 'We want a live mural painting that we can keep for our main office wall...')."
            className="w-full px-4 py-3 border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary leading-relaxed"
            style={{ borderRadius: 4, minHeight: 120, resize: "vertical" }}
          />

          <button
            type="button"
            onClick={submit}
            className="mt-10 w-full h-12 font-medium text-white transition-colors"
            style={{ backgroundColor: "var(--color-primary)", borderRadius: 6 }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-primary-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-primary)")}
          >
            Curate My Custom Experience →
          </button>
          <p className="mt-3 text-center text-sm text-secondary">
            You'll get a quote range and 3 curated matches. No account needed to see them.
          </p>
        </div>
      </main>
    </div>
  );
}
