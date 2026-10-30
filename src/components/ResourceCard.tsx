import { BookOpen, Play, Printer, Puzzle } from "lucide-react";
import { useLocale } from "../i18n";
import { typeLabel } from "../data/labels";
import type { Resource } from "../types";
import { ContentCard } from "./ContentCard";

const typeIcon: Record<Resource["type"], typeof Play> = {
  video: Play,
  activity: Puzzle,
  book: BookOpen,
  printable: Printer,
};

const typeBg: Record<Resource["type"], string> = {
  video: "bg-light-blue text-blue",
  activity: "bg-light-turquoise text-turquoise",
  book: "bg-light-blue text-blue",
  printable: "bg-light-turquoise text-turquoise",
};

export function ResourceCard({ resource }: { resource: Resource }) {
  const { locale } = useLocale();
  const Icon = typeIcon[resource.type];
  const title = locale === "zh" && resource.titleZh ? resource.titleZh : resource.title;
  const description =
    locale === "zh" && resource.descriptionZh ? resource.descriptionZh : resource.description;

  return (
    <ContentCard
      to={`/resources/${resource.id}`}
      tile={
        <div className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-xl ${typeBg[resource.type]}`}>
          <Icon size={24} />
          {resource.duration && (
            <span className="absolute bottom-1 right-1 rounded bg-navy/80 px-1 text-[10px] font-medium text-white">
              {resource.duration}
            </span>
          )}
        </div>
      }
      eyebrow={typeLabel(resource.type, locale)}
      title={title}
      subtitle={description}
    />
  );
}
