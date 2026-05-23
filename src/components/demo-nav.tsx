import { BrandMark } from "@/components/brand-mark";
import { Link } from "@tanstack/react-router";

/**
 * Simplified navigation for the contest demo.
 * Only exposes the Happy Path: Landing → Intake → Dashboard.
 * Hides sign in, profile dropdowns, settings, and incomplete sections.
 */
export function DemoNav() {
  return (
    <header className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <BrandMark />
        <nav className="flex items-center gap-3">
          <Link
            to="/intake"
            className="text-sm text-secondary hover:text-foreground transition-colors px-3 py-1.5"
          >
            Start intake
          </Link>
          <Link
            to="/impact"
            className="text-sm font-medium px-3.5 py-1.5 rounded-md text-white transition-colors"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            View Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
