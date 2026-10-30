import { Headphones } from "lucide-react";
import { useLocale } from "../../i18n";
import { ViewerUnavailable } from "./ViewerUnavailable";

/**
 * Reusable audiobook/audio-clip player scaffold, ready to wire up to a
 * future licensed content API: pass a real `src` once one exists and this
 * renders a native `<audio>` control; until then every caller gets the
 * honest "unavailable" state. See docs/frontend-content-components.md.
 */
export function AudioPlayerViewer({ title, src }: { title: string; src?: string }) {
  const { t } = useLocale();

  if (!src) {
    return <ViewerUnavailable icon={Headphones} title={title} />;
  }

  return (
    <div className="rounded-2xl bg-off-white p-4">
      <p className="mb-2 font-serif text-sm font-bold text-navy">{title}</p>
      <audio controls preload="none" className="w-full" aria-label={t("viewer.audioLabel", { title })}>
        <source src={src} />
      </audio>
    </div>
  );
}
