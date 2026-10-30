import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

/**
 * Shared card shell used across Discover, the Book Hub, Activities, and My
 * Space: a 64px visual "tile" (an icon, a typographic book placeholder, etc.)
 * on the left, an eyebrow/title/subtitle/meta stack in the middle, and a
 * trailing chevron (or custom control, e.g. a SaveButton) on the right. Keep
 * content-type-specific visuals (icons, colors) in the caller and only reuse
 * this for the shell/spacing/typography, so every content type reads as one
 * consistent design language.
 */
interface ContentCardProps {
  to: string;
  tile: ReactNode;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  meta?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}

export function ContentCard({ to, tile, eyebrow, title, subtitle, meta, trailing, className = "" }: ContentCardProps) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_2px_10px_rgba(23,43,77,0.06)] ${className}`}
    >
      {tile}
      <div className="min-w-0 flex-1">
        {eyebrow && <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{eyebrow}</p>}
        <h3 className="truncate font-serif text-base font-bold text-navy">{title}</h3>
        {subtitle && <p className="mt-0.5 line-clamp-2 text-xs text-navy/70">{subtitle}</p>}
        {meta}
      </div>
      {trailing ?? <ChevronRight size={18} className="shrink-0 text-muted" />}
    </Link>
  );
}
