import { Bookmark, Compass, House, MoreHorizontal } from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  { to: "/", label: "Home", icon: House, end: true },
  { to: "/explore", label: "Explore", icon: Compass, end: false },
  { to: "/saved", label: "Saved", icon: Bookmark, end: false },
  { to: "/more", label: "More", icon: MoreHorizontal, end: false },
];

export function BottomNavigation() {
  return (
    <nav className="sticky bottom-0 z-20 flex border-t border-black/5 bg-white px-2 pb-[calc(env(safe-area-inset-bottom)+6px)] pt-2">
      {items.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex min-h-11 flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1 text-xs font-medium transition-colors ${
              isActive ? "text-orange" : "text-muted"
            }`
          }
        >
          <Icon size={22} strokeWidth={2} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
