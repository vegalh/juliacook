import type { BookResource, ResourceAccessType } from "../data/books";
import { useLocale, type TranslationKey } from "../i18n";

const accessLabelKey: Record<ResourceAccessType, TranslationKey> = {
  purchase_required: "book.accessPurchaseRequired",
  free_link: "book.accessFreeLink",
  subscription: "book.accessSubscription",
};

/**
 * An outbound link card for a `BookResource` (an activity book, the official
 * video channel, a newsletter, etc.) — this app never hosts, embeds, or
 * sells the underlying item, so every one of these is a plain external link,
 * never an in-app preview/player. Reused by the Book Hub and Discover's
 * resource-format browsing so both surfaces render this consistently.
 */
export function BookResourceLink({ resource }: { resource: BookResource }) {
  const { locale, t } = useLocale();
  const title = locale === "zh" && resource.titleZh ? resource.titleZh : resource.title;
  const note = locale === "zh" && resource.noteZh ? resource.noteZh : resource.note;

  return (
    <a
      href={resource.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(23,43,77,0.06)]"
    >
      <p className="font-serif text-base font-bold text-navy">{title}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-turquoise">
        {t(accessLabelKey[resource.accessType])}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-navy/70">{note}</p>
    </a>
  );
}
