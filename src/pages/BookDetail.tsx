import { ArrowLeft } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { BookCard } from "../components/BookCard";
import { BookCoverPlaceholder } from "../components/BookCoverPlaceholder";
import { BookResourceLink } from "../components/BookResourceLink";
import { Header } from "../components/Header";
import { SaveButton } from "../components/SaveButton";
import { books, getBookById, bookResourcesForBook } from "../data/books";
import type { BookResource } from "../data/books";
import { topicLabel } from "../data/topics";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { useSavedResources } from "../hooks/useSavedResources";
import { useLocale, type TranslationKey } from "../i18n";

/** Groups a book's companion resources into the Book Hub's Listen/Watch/Practice/Print/Parent-Guidance sections. */
const sectionForKind: Record<BookResource["kind"], "listen" | "watch" | "practice" | "print" | "parentGuidance"> = {
  activity_book: "practice",
  official_video_channel: "watch",
  classroom_order_form: "print",
  titles_topics_pdf: "print",
  spanish_edition: "print",
  newsletter: "parentGuidance",
};

const sectionOrder = ["listen", "watch", "practice", "print", "parentGuidance"] as const;
const sectionTitleKey: Record<(typeof sectionOrder)[number], TranslationKey> = {
  listen: "book.listenTitle",
  watch: "book.watchTitle",
  practice: "book.practiceSectionTitle",
  print: "book.printTitle",
  parentGuidance: "book.parentGuidanceTitle",
};

export function BookDetail() {
  const { bookId = "" } = useParams();
  const navigate = useNavigate();
  const { locale, t } = useLocale();
  const { isSaved, toggleSaved } = useSavedResources();
  const { recordView } = useRecentlyViewed();
  const book = getBookById(bookId);

  useEffect(() => {
    if (book) recordView("book", book.id);
  }, [book, recordView]);

  const relatedStories = useMemo(() => {
    if (!book) return [];
    return books
      .filter((b) => b.id !== book.id && b.topicSlugs.some((slug) => book.topicSlugs.includes(slug)))
      .slice(0, 4);
  }, [book]);

  if (!book) {
    return (
      <AppLayout>
        <Header
          left={
            <button type="button" aria-label={t("common.back")} onClick={() => navigate(-1)} className="text-navy">
              <ArrowLeft size={24} />
            </button>
          }
        />
        <p className="px-5 text-sm text-muted">{t("book.notFound")}</p>
      </AppLayout>
    );
  }

  const title = locale === "zh" && book.titleZh ? book.titleZh : book.title;
  const summary = locale === "zh" && book.summaryZh ? book.summaryZh : book.summary;
  const whatChildrenMayLearn =
    locale === "zh" && book.whatChildrenMayLearnZh ? book.whatChildrenMayLearnZh : book.whatChildrenMayLearn;
  const isDetailed = book.verificationLevel === "verified_detailed";
  const savedId = `book:${book.id}`;

  // "Listen" (audiobooks) has no verified records for any book yet; it stays
  // in the section order but simply renders nothing rather than fabricating
  // an entry (see docs/book-hub-design.md).
  const groupedResources = sectionOrder.map((section) => ({
    section,
    resources: bookResourcesForBook(book.id).filter((r) => sectionForKind[r.kind] === section),
  }));
  const hasAnyResources = groupedResources.some((g) => g.resources.length > 0);

  return (
    <AppLayout>
      <Header
        left={
          <button type="button" aria-label={t("common.back")} onClick={() => navigate(-1)} className="text-navy">
            <ArrowLeft size={24} />
          </button>
        }
        right={<SaveButton saved={isSaved(savedId)} onClick={() => toggleSaved(savedId)} />}
      />

      <div className="px-5 pt-2 pb-8">
        <BookCoverPlaceholder id={book.id} title={title} size="lg" />

        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">{t("book.eyebrow")}</p>
        <h1 className="mt-1 font-serif text-2xl font-bold text-navy">{title}</h1>

        {book.series && <p className="mt-1 text-sm text-navy/60">{t("book.seriesLabel")}: {book.series}</p>}

        {book.audience === "educator" && (
          <p className="mt-2 rounded-2xl bg-light-turquoise p-3 text-xs text-navy/80">
            {t("book.educatorAudienceNote")}
          </p>
        )}

        {isDetailed ? (
          <>
            <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-navy/70">
              {book.author && (
                <div>
                  <dt className="font-semibold">{t("book.authorLabel")}</dt>
                  <dd>{book.author}</dd>
                </div>
              )}
              {book.publisher && (
                <div>
                  <dt className="font-semibold">{t("book.publisherLabel")}</dt>
                  <dd>{book.publisher}</dd>
                </div>
              )}
              {book.isbn && (
                <div>
                  <dt className="font-semibold">{t("book.isbnLabel")}</dt>
                  <dd>{book.isbn}</dd>
                </div>
              )}
              {book.ages && (
                <div>
                  <dt className="font-semibold">{t("book.agesLabel")}</dt>
                  <dd>{book.ages}</dd>
                </div>
              )}
            </dl>

            <p className="mt-5 text-sm leading-relaxed text-navy/80">{summary}</p>

            {whatChildrenMayLearn && (
              <section className="mt-5">
                <h2 className="font-serif text-lg font-bold text-navy">{t("book.whatChildrenMayLearnTitle")}</h2>
                <p className="mt-2 text-sm leading-relaxed text-navy/80">{whatChildrenMayLearn}</p>
              </section>
            )}
          </>
        ) : (
          <p className="mt-5 rounded-2xl bg-light-turquoise p-4 text-sm leading-relaxed text-navy/80">
            {t("book.catalogOnlyNotice")}
          </p>
        )}

        <p className="mt-4 text-xs font-medium text-muted">
          {isDetailed ? t("book.verifiedDetailed") : t("book.verifiedCatalogOnly")}
          {` \u00b7 ${t("common.verifiedMetadataNotice")}`}
        </p>

        <a
          href={book.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm font-medium text-blue underline"
        >
          {t("common.sourceLink")}
        </a>

        {/* Related parenting situations */}
        <section className="mt-6">
          <h2 className="font-serif text-lg font-bold text-navy">{t("book.relatedSituationsTitle")}</h2>
          {book.topicSlugs.length === 0 ? (
            <p className="mt-2 text-sm text-muted">{t("book.relatedSituationsEmpty")}</p>
          ) : (
            <div className="mt-2 flex flex-wrap gap-2">
              {book.topicSlugs.map((slug) => (
                <button
                  key={slug}
                  type="button"
                  onClick={() => navigate(`/situation/${slug}`)}
                  className="min-h-11 rounded-full bg-light-turquoise px-4 py-2.5 text-sm font-medium text-navy"
                >
                  {topicLabel(slug, locale)}
                </button>
              ))}
            </div>
          )}
          {book.mappingConfidence === "hypothesis" && (
            <p className="mt-2 text-xs text-muted">{t("book.hypothesisNote")}</p>
          )}
        </section>

        {/* Available learning resources, grouped Listen/Watch/Practice/Print/Parent Guidance */}
        <section className="mt-6">
          <h2 className="font-serif text-lg font-bold text-navy">{t("book.resourcesTitle")}</h2>
          {!hasAnyResources ? (
            <p className="mt-2 text-sm text-muted">{t("book.resourcesEmpty")}</p>
          ) : (
            <div className="mt-2 flex flex-col gap-5">
              {groupedResources
                .filter((g) => g.resources.length > 0)
                .map(({ section, resources }) => (
                  <div key={section}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-turquoise">
                      {t(sectionTitleKey[section])}
                    </p>
                    <div className="mt-2 flex flex-col gap-3">
                      {resources.map((resource) => (
                        <BookResourceLink key={resource.id} resource={resource} />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>

        {/* Related stories: other books sharing at least one topic */}
        {relatedStories.length > 0 && (
          <section className="mt-6">
            <h2 className="font-serif text-lg font-bold text-navy">{t("book.relatedBooksTitle")}</h2>
            <div className="mt-2 flex flex-col gap-3">
              {relatedStories.map((related) => (
                <BookCard key={related.id} book={related} />
              ))}
            </div>
          </section>
        )}
      </div>
    </AppLayout>
  );
}
