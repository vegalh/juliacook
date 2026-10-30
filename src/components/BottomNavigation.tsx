import { GraduationCap, House, Library, PuzzleIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLocale } from "../i18n";

const items = [
  { to: "/", key: "home", icon: House, end: true },
  { to: "/learn", key: "learn", icon: GraduationCap, end: false },
  { to: "/practice", key: "practice", icon: PuzzleIcon, end: false },
  { to: "/library", key: "library", icon: Library, end: false },
] as const;

/** Primary 4-section navigation: Home / Learn / Practice / Library. */
export function BottomNavigation() {
  const { t } = useLocale();

  return (
    <nav className="sticky bottom-0 z-20 flex border-t border-black/5 bg-white px-2 pb-[calc(env(safe-area-inset-bottom)+6px)] pt-2">
      {items.map(({ to, key, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex min-h-11 flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1 text-xs font-medium transition-colors ${
              isActive ? "text-blue" : "text-muted"
            }`
          }
        >
          <Icon size={22} strokeWidth={2} />
          {t(`nav.${key}`)}
        </NavLink>
      ))}
    </nav>
  );
}
