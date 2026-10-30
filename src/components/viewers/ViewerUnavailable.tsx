import type { LucideIcon } from "lucide-react";
import { useLocale } from "../../i18n";

/**
 * The shared "not available yet" state for every media viewer scaffold
 * (audio/video/PDF/poster). Deliberately plain and honest: no fake play
 * button, no spinner implying content is loading, no placeholder media —
 * just the icon, a label, and (optionally) why. Used whenever a viewer is
 * rendered without a real `src`, which is always true today since this app
 * has no licensed audio/video/document content yet.
 */
export function ViewerUnavailable({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  const { t } = useLocale();
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-off-white p-6 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-light-blue text-blue">
        <Icon size={22} />
      </span>
      <p className="font-serif text-sm font-bold text-navy">{title}</p>
      <p className="text-xs leading-relaxed text-muted">{t("viewer.unavailableNote")}</p>
    </div>
  );
}
