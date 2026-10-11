import { BookOpen, ChevronRight, Play, Printer, Puzzle } from "lucide-react";
import { Link } from "react-router-dom";
import type { Resource } from "../types";

const typeIcon: Record<Resource["type"], typeof Play> = {
  video: Play,
  activity: Puzzle,
  book: BookOpen,
  printable: Printer,
};

const typeBg: Record<Resource["type"], string> = {
  video: "bg-light-peach text-orange",
  activity: "bg-light-turquoise text-turquoise",
  book: "bg-light-peach text-orange",
  printable: "bg-light-turquoise text-turquoise",
};

export function ResourceCard({ resource }: { resource: Resource }) {
  const Icon = typeIcon[resource.type];

  return (
    <Link
      to={`/resources/${resource.id}`}
      className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_2px_10px_rgba(23,43,77,0.06)]"
    >
      <div
        className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-xl ${typeBg[resource.type]}`}
      >
        <Icon size={24} />
        {resource.duration && (
          <span className="absolute bottom-1 right-1 rounded bg-navy/80 px-1 text-[10px] font-medium text-white">
            {resource.duration}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
          {resource.type}
        </p>
        <h3 className="truncate font-serif text-base font-bold text-navy">{resource.title}</h3>
        <p className="mt-0.5 line-clamp-2 text-xs text-navy/70">{resource.description}</p>
      </div>
      <ChevronRight size={18} className="shrink-0 text-muted" />
    </Link>
  );
}
