import { WalletMinimal } from "lucide-react";
import { ToggleThemeButton } from "./ui/toggle-theme-button";

export function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4">
      <div className="flex items-center gap-2">
        <WalletMinimal size={28} strokeWidth={2.5} />
        <span className="tracking-tighter text-3xl font-extrabold text-primary flex gap-2 items-center">
          Wal-lets
        </span>
      </div>
      <ToggleThemeButton />
    </nav>
  )
}
