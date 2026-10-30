import { ArrowLeft, UserRound, X } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ActivityCard } from "../components/ActivityCard";
import { AppLayout } from "../components/AppLayout";
import { BookCard } from "../components/BookCard";
import { BookResourceLink } from "../components/BookResourceLink";
import { FilterModal } from "../components/FilterModal";
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";
import { ResourceCard } from "../components/ResourceCard";
import { SearchBar } from "../components/SearchBar";
import { SelCompetencyExplorer } from "../components/SelCompetencyExplorer";
import { TopicChip } from "../components/TopicChip";
import { useAgeGroup } from "../context/AgeGroupContext";
import { useFilters } from "../context/FilterContext";
import { getContentProvider } from "../content/ContentProvider";
import { ageGroups } from "../data/ageGroups";
import { books, searchBooks, type JuliaCookBook } from "../data/books";
import { settingLabel, skillLabel, typeLabel } from "../data/labels";
import { RESOURCE_FORMAT_ORDER, resourceFormatItems, type ResourceFormatKey } from "../data/resourceFormats";
import { topicLabel, topics } from "../data/topics";
import { useLocale, type TranslationKey } from "../i18n";

type DiscoverMode = "topics" | "stories" | "resources";
const modes: DiscoverMode[] = ["topics", "stories", "resources"];
const modeLabelKey: Record<DiscoverMode, TranslationKey> = {
  topics: "discover.modeTopics",
  stories: "discover.modeStories",
  resources: "discover.modeResources",
};

const formatTitleKey: Record<ResourceFormatKey, TranslationKey> = {
  audiobook: "book.listenTitle",
  video: "book.watchTitle",
  worksheet: "book.printTitle",
  poster: "book.posterTitle",
  quiz: "book.quizTitle",
  activity: "book.practiceSectionTitle",
  parentGuidance: "book.parentGuidanceTitle",
};

function groupBySeries(allBooks: JuliaCookBook[]) {
  const seriesMap = new Map<string, JuliaCookBook[]>();
  const noSeries: JuliaCookBook[] = [];
  for (const b of allBooks) {
    if (!b.series) {
      noSeries.push(b);
      continue;
    }
    const list = seriesMap.get(b.series) ?? [];
    list.push(b);
    seriesMap.set(b.series, list);
  }
  return { seriesEntries: Array.from(seriesMap.entries()), noSeries };
}

export function Discover() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { locale, t } = useLocale();
  const [filterOpen, setFilterOpen] = useState(false);
  const { filters, toggleType, toggleSkill, setSetting, reset } = useFilters();
  const { ageGroup, setAgeGroup } = useAgeGroup();

  const query = searchParams.get("q") ?? "";
  const topic = searchParams.get("topic");
  const modeParam = searchParams.get("mode");
  const mode: DiscoverMode = modes.includes(modeParam as DiscoverMode) ? (modeParam as DiscoverMode) : "topics";
  const hasActiveSearch = Boolean(
    query || topic || filters.types.length || filters.setting || filters.skills.length
  );

  const results = useMemo(
    () => getContentProvider().searchResources({ query, topic, filters }),
    [query, topic, filters]
  );

  // Books have no `setting`/`skills` fields, so only surface them when those
  // filters aren't in play, and only when the type filter isn't narrowed to
  // something other than "book".
  const bookResults = useMemo(() => {
    if (filters.setting || filters.skills.length) return [];
    if (filters.types.length && !filters.types.includes("book")) return [];
    return searchBooks({ query, topic });
  }, [query, topic, filters]);

  const { seriesEntries, noSeries } = useMemo(() => groupBySeries(books), []);

  const clearTopic = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("topic");
    setSearchParams(next);
  };

  const goToTopic = (slug: string) => {
    reset();
    setSearchParams({ topic: slug });
  };

  const changeMode = (next: DiscoverMode) => {
    reset();
    setSearchParams(next === "topics" ? {} : { mode: next });
  };

  return (
    <AppLayout showNav>
      <Header
        left={
          hasActiveSearch ? (
            <button
              type="button"
              aria-label={t("common.back")}
              onClick={() => {
                reset();
                setSearchParams(mode === "topics" ? {} : { mode });
              }}
              className="text-navy"
            >
              <ArrowLeft size={24} />
            </button>
          ) : (
            <Logo size={40} />
          )
        }
        center={hasActiveSearch ? <Logo size={32} /> : undefined}
        right={
          <button
            type="button"
            aria-label={t("common.profile")}
            onClick={() => navigate("/my")}
            className="text-navy"
          >
            <UserRound size={24} />
          </button>
        }
      />

      <div className="px-5 pt-2 pb-6">
        {!hasActiveSearch && (
          <>
            <h1 className="font-serif text-3xl font-bold text-navy">{t("discover.title")}</h1>
            <p className="mt-2 text-sm leading-relaxed text-navy/70">{t("discover.subtitle")}</p>
          </>
        )}

        <div className="mt-4">
          <SearchBar
            mode="filter"
            placeholder={t("common.searchPlaceholder")}
            defaultValue={query}
            onSubmit={(value) => {
              const next = new URLSearchParams(searchParams);
              if (value) next.set("q", value);
              else next.delete("q");
              setSearchParams(next);
            }}
            onFilterClick={() => setFilterOpen(true)}
          />
        </div>

        {hasActiveSearch && (
          <>
            {(topic || filters.types.length || filters.setting || filters.skills.length) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {topic && <FilterTag label={topicLabel(topic, locale)} onRemove={clearTopic} />}
                {filters.types.map((type) => (
                  <FilterTag key={type} label={typeLabel(type, locale)} onRemove={() => toggleType(type)} />
                ))}
                {filters.setting && (
                  <FilterTag
                    label={settingLabel(filters.setting, locale)}
                    onRemove={() => setSetting(filters.setting!)}
                  />
                )}
                {filters.skills.map((skill) => (
                  <FilterTag key={skill} label={skillLabel(skill, locale)} onRemove={() => toggleSkill(skill)} />
                ))}
              </div>
            )}

            <p className="mt-4 text-sm font-medium text-muted">
              {results.length === 1 ? t("common.resultCount") : t("common.resultsCount", { count: results.length })}
            </p>

            <div className="mt-3 flex flex-col gap-3">
              {results.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
              {results.length === 0 && bookResults.length === 0 && (
                <p className="mt-6 text-center text-sm text-muted">{t("common.noResults")}</p>
              )}
            </div>

            {bookResults.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {t("discover.booksHeading")}
                </p>
                <div className="mt-3 flex flex-col gap-3">
                  {bookResults.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {!hasActiveSearch && (
          <>
            <div className="mt-5 flex gap-2">
              {modes.map((m) => (
                <TopicChip key={m} label={t(modeLabelKey[m])} selected={mode === m} onClick={() => changeMode(m)} />
              ))}
            </div>

            {mode === "topics" && (
              <>
                <BrowseSection title={t("discover.byChallenge")}>
                  {topics.map((topicItem) => (
                    <TopicChip
                      key={topicItem.slug}
                      label={locale === "zh" ? topicItem.labelZh : topicItem.label}
                      onClick={() => goToTopic(topicItem.slug)}
                    />
                  ))}
                </BrowseSection>

                <BrowseSection title={t("discover.byAge")}>
                  {ageGroups.map((group) => (
                    <TopicChip
                      key={group}
                      label={t(`ageGroups.${group}`)}
                      selected={ageGroup === group}
                      onClick={() => setAgeGroup(group)}
                    />
                  ))}
                </BrowseSection>

                <div className="mt-6">
                  <SelCompetencyExplorer />
                </div>
              </>
            )}

            {mode === "stories" && (
              <>
                <p className="mt-5 text-sm leading-relaxed text-navy/70">{t("discover.storiesSubtitle")}</p>

                <BrowseSection title={t("discover.byChallenge")}>
                  {topics.map((topicItem) => (
                    <TopicChip
                      key={topicItem.slug}
                      label={locale === "zh" ? topicItem.labelZh : topicItem.label}
                      onClick={() => goToTopic(topicItem.slug)}
                    />
                  ))}
                </BrowseSection>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {t("discover.storiesBySeriesTitle")}
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    {seriesEntries.map(([series, seriesBooks]) => (
                      <details key={series} className="rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(23,43,77,0.06)]">
                        <summary className="flex min-h-11 cursor-pointer items-center justify-between font-serif text-base font-bold text-navy">
                          <span>{series}</span>
                          <span className="text-xs font-medium text-muted">
                            {t("discover.seriesBookCount", { count: seriesBooks.length })}
                          </span>
                        </summary>
                        <div className="mt-3 flex flex-col gap-3">
                          {seriesBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                          ))}
                        </div>
                      </details>
                    ))}
                    {noSeries.length > 0 && (
                      <details className="rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(23,43,77,0.06)]">
                        <summary className="flex min-h-11 cursor-pointer items-center justify-between font-serif text-base font-bold text-navy">
                          <span>{t("discover.noSeriesLabel")}</span>
                          <span className="text-xs font-medium text-muted">
                            {t("discover.seriesBookCount", { count: noSeries.length })}
                          </span>
                        </summary>
                        <div className="mt-3 flex flex-col gap-3">
                          {noSeries.map((book) => (
                            <BookCard key={book.id} book={book} />
                          ))}
                        </div>
                      </details>
                    )}
                  </div>
                </div>
              </>
            )}

            {mode === "resources" && (
              <>
                <p className="mt-5 text-sm leading-relaxed text-navy/70">{t("discover.resourcesSubtitle")}</p>

                <div className="mt-5 flex flex-col gap-6">
                  {RESOURCE_FORMAT_ORDER.map((key) => {
                    const items = resourceFormatItems(key);
                    return (
                      <div key={key}>
                        <p className="text-xs font-semibold uppercase tracking-wide text-turquoise">
                          {t(formatTitleKey[key])}
                        </p>
                        {items.length === 0 ? (
                          <p className="mt-2 text-sm text-muted">{t("discover.formatComingSoon")}</p>
                        ) : (
                          <div className="mt-2 flex flex-col gap-3">
                            {items.map((item) => {
                              if (item.kind === "resource") {
                                return <ResourceCard key={item.id} resource={item.resource} />;
                              }
                              if (item.kind === "activity") {
                                return <ActivityCard key={item.id} activity={item.activity} />;
                              }
                              return <BookResourceLink key={item.id} resource={item.bookResource} />;
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            <p className="mt-6 text-center text-xs text-muted">{t("discover.metadataOnlyNotice")}</p>
          </>
        )}
      </div>

      <FilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onShowResults={() => setFilterOpen(false)}
      />
    </AppLayout>
  );
}

function BrowseSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="flex min-h-11 items-center gap-1.5 rounded-full bg-light-turquoise px-3 py-2 text-sm font-medium text-navy"
    >
      {label}
      <X size={14} />
    </button>
  );
}
