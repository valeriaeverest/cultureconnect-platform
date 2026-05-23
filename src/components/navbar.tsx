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

          <div className="flex items-center gap-3">
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-warm-gray hover:text-ink transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => authStore.logout()}
                  className="text-sm font-medium text-warm-gray hover:text-ink transition-colors"
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
