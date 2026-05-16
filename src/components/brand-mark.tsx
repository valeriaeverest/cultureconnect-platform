import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function BrandMark() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity"
      aria-label="Lattice — home"
    >
      <img src={logo} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
      <span>Lattice</span>
    </Link>
  );
}
