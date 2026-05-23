import { BrandMark } from "@/components/brand-mark";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case studies — Lattice" },
      {
        name: "description",
        content:
          "How leading companies use Lattice to transform corporate events into measurable culture wins.",
      },
      { property: "og:title", content: "Case studies — Lattice" },
      {
        property: "og:description",
        content:
          "Three real-world wins: NexaStream Tech, Vanguard Manufacturing, and Apex Creative Agency.",
      },
    ],
  }),
  component: CaseStudiesPage,
});

import { DemoNav } from "@/components/demo-nav";
function Nav() {
  return <DemoNav />;
}

type CaseStudy = {
  id: string;
  number: string;
  title: string;
  client: string;
  focus: string;
  sections: { heading: string; body: string }[];
  metrics: { label: string; value: string }[];
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "nexastream",
    number: "Case Study 01",
    title: "Transforming the Annual All-Hands from a Passive Presentation to an Interactive Festival",
    client: "NexaStream Tech — a rapidly growing software scale-up experiencing remote employee disconnect",
    focus: "Hyper-local vendor integration & elevating social connection metrics",
    sections: [
      {
        heading: "Introduction",
        body: "In the era of hybrid work, the traditional corporate \"All-Hands\" meeting often struggles to engage a split audience. NexaStream Tech approached Lattice with a distinct challenge: their quarterly pulse surveys on Culture Amp revealed a noticeable dip in \"Sense of Belonging\" and \"Cross-Team Collaboration.\" They didn't just need an event planner; they needed an engagement transformation.",
      },
      {
        heading: "The Lattice approach",
        body: "Taking inspiration from modern trends in interactive corporate events, we bypassed the sterile hotel ballroom and designed a \"Hyper-Local Block Party\" right outside NexaStream's downtown headquarters. Using Lattice's proprietary geolocation database, we sourced 100% of the food, beverage, and entertainment from independent creatives within a 5-mile radius of the office.\n\nInstead of a passive catering setup, we curated an interactive street-food market featuring three local food trucks, each representing a different culinary story from the community. Entertainment wasn't a playlist; we booked an emerging local indie-pop duo and a live canvas painter who collaborated with employees to create a mural that now hangs in the NexaStream lobby.",
      },
      {
        heading: "The results and learning",
        body: "By grounding the event in the local community, the atmosphere shifted from \"mandatory corporate function\" to a genuine neighborhood festival. 100% of the event's beverage and entertainment budget went directly into the hands of local neighborhood creators, allowing NexaStream to showcase its commitment to corporate social responsibility (CSR) dynamically.",
      },
    ],
    metrics: [
      { label: "Social Connection score (Culture Amp)", value: "+14%" },
      { label: "Overall Employee Sentiment", value: "+11%" },
      { label: "Budget reinvested locally", value: "100%" },
    ],
  },
  {
    id: "vanguard",
    number: "Case Study 02",
    title: "Bridging the Blue-Collar & White-Collar Divide Through Culturally Curated Experiences",
    client: "Vanguard Manufacturing & Logistics — a regional company looking to unify corporate office staff and warehouse operations teams",
    focus: "Accessible, inclusive experience design & team retention",
    sections: [
      {
        heading: "Introduction",
        body: "One of the toughest event planning hurdles is creating an experience that appeals to highly diverse workforces. Vanguard Manufacturing had historically hosted separate events for their office executives and their logistics floor staff — a practice that inadvertently deepened an \"us vs. them\" culture. Vanguard challenged Lattice to create a unified experience where every employee felt equally valued and comfortable.",
      },
      {
        heading: "The Lattice approach",
        body: "To improve the corporate event experience, you must break down rigid social hierarchies. We developed a low-stakes, high-engagement event called \"Beats & Bites: A Backyard Celebration.\"\n\nWe utilized our platform to map out an accessible, neutral outdoor venue space and onboarded a diverse lineup of local talent. Instead of standard corporate icebreakers, we designed a live \"Acoustic & Storytelling Lounge\" featuring local spoken-word poets and acoustic musicians. We paired this with a highly localized \"Craft Soda & Slider Tasting\" curated by neighborhood culinary artisans. The layout was open, casual, and focused entirely on shared sensory experiences rather than corporate hierarchy.",
      },
      {
        heading: "The results and learning",
        body: "When you strip away the formality of the traditional corporate dinner, real human connection happens. Warehouse operators and VP-level executives sat side-by-side, sharing stories over locally brewed beverages and listening to regional artists. Leadership noted a stabilizing trend in warehouse staff retention over the following quarter, attributing the shift to a renewed sense of mutual respect and unified company culture.",
      },
    ],
    metrics: [
      { label: "Inclusion & Equity perception (HR survey)", value: "+19%" },
      { label: "Warehouse staff retention trend", value: "Stabilized" },
      { label: "Cross-level interactions per event", value: "3.4×" },
    ],
  },
  {
    id: "apex",
    number: "Case Study 03",
    title: "The Data-Driven Micro-Event Strategy for Sustained Hybrid Engagement",
    client: "Apex Creative Agency — a fully remote agency looking to build intentional, recurring touchpoints for regional hubs",
    focus: "ROI-driven micro-events & data-backed HR alignments",
    sections: [
      {
        heading: "Introduction",
        body: "A major trend shaping modern corporate events is the shift away from one massive annual party toward smaller, recurring \"micro-events.\" Apex Creative Agency recognized that their fully remote team was suffering from \"Zoom fatigue\" and a lack of spontaneous collaboration. They turned to Lattice to build a sustainable, recurring regional event strategy that could prove a tangible Return on Investment (ROI) to leadership.",
      },
      {
        heading: "The Lattice approach",
        body: "Lattice designed the \"Hub Harmony Series\" — a localized, quarterly micro-event framework. For Apex's largest employee cluster, we used our geolocation system to book an exclusive evening at a local independent print-making studio.\n\nInstead of a standard happy hour, employees participated in a hands-on silk-screening workshop led by a prominent local graphic artist. This allowed a team of creative professionals to step away from their digital screens and collaborate with their hands, learning a new physical medium while catching up with colleagues in an organic, low-pressure environment.",
      },
      {
        heading: "The results and learning",
        body: "Micro-events remove the pressure of the \"mega-gala\" and focus purely on sustainable relationship building. By shifting their budget from a costly, single-night fly-in gala to localized Lattice micro-events, Apex reduced travel and lodging overhead by 35% while increasing the annual frequency of face-to-face employee interactions from once a year to four times a year.",
      },
    ],
    metrics: [
      { label: "Peer-to-peer collaboration (regional hub)", value: "+22%" },
      { label: "Travel & lodging overhead", value: "−35%" },
      { label: "Face-to-face touchpoints per year", value: "1 → 4" },
    ],
  },
];

function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  return (
    <article
      id={cs.id}
      className="bg-card rounded-lg border border-border p-8 sm:p-10"
      style={{ boxShadow: "0 1px 3px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.05)" }}
    >
      <div
        className="text-xs font-medium uppercase mb-3"
        style={{ color: "var(--color-success)", letterSpacing: "0.05em" }}
      >
        {cs.number}
      </div>
      <h2 className="font-display text-3xl sm:text-4xl leading-tight tracking-[-0.015em] text-foreground mb-5">
        {cs.title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-sm">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            Faux client
          </div>
          <div className="text-foreground">{cs.client}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            Lattice core focus
          </div>
          <div className="text-foreground">{cs.focus}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {cs.metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-md border border-border p-4 bg-muted/40"
          >
            <div className="text-2xl font-semibold tabular-nums text-foreground">
              {m.value}
            </div>
            <div className="mt-1 text-xs text-secondary leading-snug">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-7">
        {cs.sections.map((s) => (
          <div key={s.heading}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">
              {s.heading}
            </h3>
            {s.body.split("\n\n").map((p, i) => (
              <p
                key={i}
                className="text-[15px] leading-relaxed text-secondary mb-3 last:mb-0"
              >
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>
    </article>
  );
}

function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col page-fade">
      <Nav />
      <main className="flex-1">
        <section className="px-6 pt-20 pb-12 text-center">
          <div
            className="text-xs font-medium uppercase mb-4"
            style={{ color: "var(--color-success)", letterSpacing: "0.05em" }}
          >
            Case studies
          </div>
          <h1 className="font-display text-5xl sm:text-6xl leading-[1.05] tracking-[-0.015em] text-foreground max-w-4xl mx-auto mb-6">
            How leading teams turn event budgets into <em className="not-italic text-primary">measurable culture wins</em>.
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-secondary leading-relaxed">
            Three real-world transformations — from a software scale-up bridging hybrid disconnect, to a manufacturer unifying its workforce, to a remote agency cutting overhead 35% while quadrupling face-to-face touchpoints.
          </p>
        </section>

        <section className="px-6 pb-24">
          <div className="max-w-4xl mx-auto space-y-10">
            {CASE_STUDIES.map((cs) => (
              <CaseStudyCard key={cs.id} cs={cs} />
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-16 text-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center h-12 px-6 rounded-md font-medium text-white transition-colors"
              style={{ backgroundColor: "var(--color-primary)", borderRadius: 6 }}
            >
              Curate your own experience →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
