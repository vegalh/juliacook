import { FileText } from "lucide-react";
import { useLocale } from "../../i18n";
import { ViewerUnavailable } from "./ViewerUnavailable";

/**
 * Reusable document-preview scaffold for worksheets/printables. Browsers'
 * built-in PDF rendering already provides pagination/zoom, so this just
 * embeds the document rather than reimplementing a custom PDF engine — see
 * docs/frontend-content-components.md for the scope decision.
 */
export function PdfViewer({ title, src }: { title: string; src?: string }) {
  const { t } = useLocale();

  if (!src) {
    return <ViewerUnavailable icon={FileText} title={title} />;
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-off-white">
      <iframe src={src} title={title} className="h-80 w-full border-0" />
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-3 text-center text-xs font-semibold text-blue"
      >
        {t("viewer.openInNewTab")}
      </a>
    </div>
  );
}
