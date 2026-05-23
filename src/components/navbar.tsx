import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif text-ink">CultureConnect</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              className="text-sm font-medium text-warm-gray hover:text-ink transition-colors"
              activeProps={{ className: "text-sm font-medium text-ink" }}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-full bg-terracotta px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#A8401F]"
            >
              Live Demo
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
