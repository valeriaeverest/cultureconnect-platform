import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <Link
        to="/"
        className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity"
        aria-label="Lattice — home"
      >
        <img src={logo} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
        <span>Lattice</span>
      </Link>
      <Link
        to="/"
        className="text-sm font-medium px-3 py-1.5 rounded-md border border-border text-foreground hover:bg-muted transition-colors"
      >
        Home
      </Link>
    </div>
  );
}
