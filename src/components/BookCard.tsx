import type { JuliaCookBook } from "../data/books";
import { useLocale } from "../i18n";
import { BookCoverPlaceholder } from "./BookCoverPlaceholder";
import { ContentCard } from "./ContentCard";

export function BookCard({ book }: { book: JuliaCookBook }) {
  const { locale, t } = useLocale();
  const title = locale === "zh" && book.titleZh ? book.titleZh : book.title;

  return (
    <ContentCard
      to={`/books/${book.id}`}
      tile={<BookCoverPlaceholder id={book.id} title={title} />}
      eyebrow={t("book.eyebrow")}
      title={title}
      subtitle={book.series}
    />
  );
}
