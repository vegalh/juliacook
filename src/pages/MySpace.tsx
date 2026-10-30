import { Bookmark, Clock, Info, Mail, NotebookPen, Settings, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ActivityCard } from "../components/ActivityCard";
import { AppLayout } from "../components/AppLayout";
import { BookCard } from "../components/BookCard";
import { Header } from "../components/Header";
import { ResourceCard } from "../components/ResourceCard";
import { SaveButton } from "../components/SaveButton";
import { useAgeGroup } from "../context/AgeGroupContext";
import { getContentProvider } from "../content/ContentProvider";
import { ageGroups } from "../data/ageGroups";
import { getActivityById } from "../data/activities";
import { getBookById } from "../data/books";
import { getSituation } from "../data/situations";
import { useReflections } from "../hooks/useReflections";
import { useRecentlyViewed, type RecentlyViewedKind } from "../hooks/useRecentlyViewed";
import { useSavedResources } from "../hooks/useSavedResources";
import { locales, localeLabels, useLocale } from "../i18n";

type MySpaceTab = "saved" | "recent" | "reflections" | "settings";

const tabs: { key: MySpaceTab; icon: typeof Bookmark }[] = [
  { key: "saved", icon: Bookmark },
  { key: "recent", icon: Clock },
  { key: "reflections", icon: NotebookPen },
  { key: "settings", icon: Settings },
];
const tabKeys: MySpaceTab[] = tabs.map((tabDef) => tabDef.key);

const settingsItems = [
  { icon: Info, key: "about" as const },
  { icon: Mail, key: "contact" as const },
  { icon: ShieldCheck, key: "privacy" as const },
];

export function MySpace() {
  const navigate = useNavigate();
  const { locale, setLocale, t } = useLocale();
  const { ageGroup, setAgeGroup } = useAgeGroup();
  const { savedIds, isSaved, toggleSaved } = useSavedResources();
  const { entries: recentEntries, clear: clearRecent } = useRecentlyViewed();
  const { reflections } = useReflections();
  const [searchParams, setSearchParams] = useSearchParams();

  const tabParam = searchParams.get("tab");
  const initialTab: MySpaceTab = tabKeys.includes(tabParam as MySpaceTab) ? (tabParam as MySpaceTab) : "saved";
  const [tab, setTab] = useState<MySpaceTab>(initialTab);

  const changeTab = (next: MySpaceTab) => {
    setTab(next);
    setSearchParams(next === "saved" ? {} : { tab: next }, { replace: true });
  };

  const savedSituationSlugs = savedIds.filter((id) => id.startsWith("situation:")).map((id) => id.replace("situation:", ""));
  const savedBooks = savedIds
    .filter((id) => id.startsWith("book:"))
    .map((id) => getBookById(id.replace("book:", "")))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));
  const savedActivities = savedIds
    .filter((id) => id.startsWith("activity:"))
    .map((id) => getActivityById(id.replace("activity:", "")))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const savedResources = savedIds
    .filter((id) => !id.includes(":"))
    .map((id) => getContentProvider().getResourceById(id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));
  const hasSaved =
    savedSituationSlugs.length > 0 || savedBooks.length > 0 || savedActivities.length > 0 || savedResources.length > 0;

  const sortedReflections = useMemo(
    () => [...reflections].sort((a, b) => b.savedAt.localeCompare(a.savedAt)),
    [reflections]
  );

  const recentItemLabel: Record<RecentlyViewedKind, string> = {
    situation: t("my.recentSituation"),
    book: t("my.recentBook"),
    resource: t("my.recentResource"),
    activity: t("my.recentActivity"),
  };

  return (
    <AppLayout showNav>
      <Header center={<h1 className="font-serif text-xl font-bold text-navy">{t("my.title")}</h1>} />

      <div className="px-5 pt-2 pb-6">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {tabs.map(({ key, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => changeTab(key)}
              className={`flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                tab === key ? "bg-turquoise text-white" : "bg-light-turquoise text-navy"
              }`}
            >
              <Icon size={14} />
              {t(`my.tab.${key}`)}
            </button>
          ))}
        </div>

        {tab === "saved" && (
          <div className="mt-4">
            {!hasSaved && <p className="mt-6 text-center text-sm text-muted">{t("my.savedEmpty")}</p>}

            {savedSituationSlugs.length > 0 && (
              <section className="mb-6">
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
                  {t("my.savedSituations")}
                </h2>
                <div className="flex flex-col gap-3">
                  {savedSituationSlugs.map((slug) => {
                    const situation = getSituation(slug);
                    const situationId = `situation:${slug}`;
                    return (
                      <div
                        key={slug}
                        className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(23,43,77,0.06)]"
                      >
                        <button
                          type="button"
                          onClick={() => navigate(`/situation/${slug}`)}
                          className="min-w-0 flex-1 text-left"
                        >
                          <p className="whitespace-pre-line font-serif text-base font-bold text-navy">
                            {locale === "zh" ? situation.default.headingZh : situation.default.heading}
                          </p>
                        </button>
                        <SaveButton saved={isSaved(situationId)} onClick={() => toggleSaved(situationId)} />
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {savedBooks.length > 0 && (
              <section className="mb-6">
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
                  {t("my.savedStories")}
                </h2>
                <div className="flex flex-col gap-3">
                  {savedBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </section>
            )}

            {savedActivities.length > 0 && (
              <section className="mb-6">
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
                  {t("my.savedActivities")}
                </h2>
                <div className="flex flex-col gap-3">
                  {savedActivities.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
                </div>
              </section>
            )}

            {savedResources.length > 0 && (
              <section>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
                  {t("my.savedResources")}
                </h2>
                <div className="flex flex-col gap-3">
                  {savedResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {tab === "recent" && (
          <div className="mt-4">
            {recentEntries.length === 0 ? (
              <p className="mt-6 text-center text-sm text-muted">{t("my.recentEmpty")}</p>
            ) : (
              <>
                <div className="flex flex-col gap-3">
                  {recentEntries.map((entry) => {
                    if (entry.kind === "book") {
                      const book = getBookById(entry.id);
                      return book ? <BookCard key={entry.key} book={book} /> : null;
                    }
                    if (entry.kind === "activity") {
                      const activity = getActivityById(entry.id);
                      return activity ? <ActivityCard key={entry.key} activity={activity} /> : null;
                    }
                    if (entry.kind === "resource") {
                      const resource = getContentProvider().getResourceById(entry.id);
                      return resource ? <ResourceCard key={entry.key} resource={resource} /> : null;
                    }
                    const situation = getSituation(entry.id);
                    return (
                      <button
                        key={entry.key}
                        type="button"
                        onClick={() => navigate(`/situation/${entry.id}`)}
                        className="rounded-2xl bg-white p-4 text-left shadow-[0_2px_10px_rgba(23,43,77,0.06)]"
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-turquoise">
                          {recentItemLabel.situation}
                        </p>
                        <p className="mt-1 whitespace-pre-line font-serif text-base font-bold text-navy">
                          {locale === "zh" ? situation.default.headingZh : situation.default.heading}
                        </p>
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={clearRecent}
                  className="mt-4 w-full text-center text-xs font-medium text-muted underline"
                >
                  {t("my.recentClear")}
                </button>
              </>
            )}
          </div>
        )}

        {tab === "reflections" && (
          <div className="mt-4">
            {sortedReflections.length === 0 ? (
              <p className="mt-6 text-center text-sm text-muted">{t("my.reflectionsEmpty")}</p>
            ) : (
              <div className="flex flex-col gap-3">
                {sortedReflections.map((reflection, index) => {
                  const situation = getSituation(reflection.topicSlug);
                  const heading = locale === "zh" ? situation.default.headingZh : situation.default.heading;
                  const date = new Date(reflection.savedAt);
                  return (
                    <button
                      key={`${reflection.topicSlug}-${reflection.savedAt}-${index}`}
                      type="button"
                      onClick={() => navigate(`/situation/${reflection.topicSlug}`)}
                      className="rounded-2xl bg-white p-4 text-left shadow-[0_2px_10px_rgba(23,43,77,0.06)]"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-turquoise">{heading}</p>
                      <p className="mt-1 text-sm leading-relaxed text-navy/80">{reflection.note}</p>
                      <p className="mt-1 text-[11px] text-muted">{date.toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US")}</p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab === "settings" && (
          <div className="mt-4">
            <section className="rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(23,43,77,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">{t("common.language")}</p>
              <div className="mt-2 flex gap-2">
                {locales.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLocale(l)}
                    className={`min-h-11 flex-1 rounded-full px-3 py-2.5 text-sm font-medium transition-colors ${
                      locale === l ? "bg-turquoise text-white" : "bg-light-turquoise text-navy"
                    }`}
                  >
                    {localeLabels[l]}
                  </button>
                ))}
              </div>
            </section>

            <section className="mt-3 rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(23,43,77,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">{t("common.ageGroup")}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {ageGroups.map((group) => (
                  <button
                    key={group}
                    type="button"
                    onClick={() => setAgeGroup(group)}
                    className={`min-h-11 rounded-full px-3.5 py-2.5 text-sm font-medium transition-colors ${
                      ageGroup === group ? "bg-turquoise text-white" : "bg-light-turquoise text-navy"
                    }`}
                  >
                    {t(`ageGroups.${group}`)}
                  </button>
                ))}
              </div>
            </section>

            <div className="mt-3 flex flex-col gap-3">
              {settingsItems.map(({ icon: Icon, key }) => (
                <div
                  key={key}
                  className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(23,43,77,0.06)]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-light-turquoise text-turquoise">
                    <Icon size={18} />
                  </span>
                  <p className="text-sm font-medium text-navy">{t(`my.settings.${key}`)}</p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-center text-xs leading-relaxed text-muted">{t("my.brandingNotice")}</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
