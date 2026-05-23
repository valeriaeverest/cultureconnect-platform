import { Link } from "@tanstack/react-router";
import { useSyncExternalStore } from "react";
import { authStore } from "../lib/auth-store";

export function Navbar() {
  const user = useSyncExternalStore(authStore.subscribe, authStore.getUser);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif text-ink">CultureConnect</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/vendors"
              className="text-sm font-medium text-warm-gray hover:text-ink transition-colors"
            >
              Vendors
            </Link>
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-warm-gray hover:text-ink transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/dashboard/analytics"
                  className="text-sm font-medium text-warm-gray hover:text-ink transition-colors"
                >
                  Analytics
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-warm-gray hidden sm:inline">
                  {user.company_name}
                </span>
                <button
                  onClick={() => authStore.logout()}
                  className="text-sm font-medium text-warm-gray hover:text-ink transition-colors"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-warm-gray hover:text-ink transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-full bg-terracotta px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#A8401F]"
                >
                  Get matched
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
