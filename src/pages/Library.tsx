import { ArrowLeft, CircleUserRound, X } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { FilterModal } from "../components/FilterModal";
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";
import { ResourceCard } from "../components/ResourceCard";
import { SearchBar } from "../components/SearchBar";
import { TopicChip } from "../components/TopicChip";
import { useAgeGroup } from "../context/AgeGroupContext";
import { useFilters } from "../context/FilterContext";
import { getContentProvider } from "../content/ContentProvider";
import { ageGroups } from "../data/ageGroups";
import { settingLabel, skillLabel, typeLabel } from "../data/labels";
import { selCompetencies } from "../data/selCompetencies";
import { topicLabel, topics } from "../data/topics";
import { useLocale } from "../i18n";

export function Library() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { locale, t } = useLocale();
  const [filterOpen, setFilterOpen] = useState(false);
  const { filters, toggleType, toggleSkill, setSetting, reset } = useFilters();
  const { ageGroup, setAgeGroup } = useAgeGroup();

  const query = searchParams.get("q") ?? "";
  const topic = searchParams.get("topic");
  const hasActiveSearch = Boolean(
    query || topic || filters.types.length || filters.setting || filters.skills.length
  );

  const results = useMemo(
    () => getContentProvider().searchResources({ query, topic, filters }),
    [query, topic, filters]
  );

  const clearTopic = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("topic");
    setSearchParams(next);
  };

  const goToTopic = (slug: string) => {
    reset();
    setSearchParams({ topic: slug });
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
                setSearchParams({});
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
            onClick={() => navigate("/profile")}
            className="text-navy"
          >
            <CircleUserRound size={24} />
          </button>
        }
      />

      <div className="px-5 pt-2 pb-6">
        {!hasActiveSearch && (
          <>
            <h1 className="font-serif text-3xl font-bold text-navy">{t("library.title")}</h1>
            <p className="mt-2 text-sm leading-relaxed text-navy/70">{t("library.subtitle")}</p>
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
              {results.length === 0 && <p className="mt-6 text-center text-sm text-muted">{t("common.noResults")}</p>}
            </div>
          </>
        )}

        {!hasActiveSearch && (
          <>
            <BrowseSection title={t("library.byChallenge")}>
              {topics.map((topicItem) => (
                <TopicChip
                  key={topicItem.slug}
                  label={locale === "zh" ? topicItem.labelZh : topicItem.label}
                  onClick={() => goToTopic(topicItem.slug)}
                />
              ))}
            </BrowseSection>

            <BrowseSection title={t("library.byCompetency")}>
              {selCompetencies.map((c) => (
                <TopicChip
                  key={c.id}
                  label={locale === "zh" ? c.labelZh : c.labelEn}
                  onClick={() => navigate(`/learn#${c.id}`)}
                />
              ))}
            </BrowseSection>

            <BrowseSection title={t("library.byAge")}>
              {ageGroups.map((group) => (
                <TopicChip
                  key={group}
                  label={t(`ageGroups.${group}`)}
                  selected={ageGroup === group}
                  onClick={() => setAgeGroup(group)}
                />
              ))}
            </BrowseSection>

            <BrowseSection title={t("library.byType")}>
              {(["video", "activity", "book", "printable"] as const).map((type) => (
                <TopicChip
                  key={type}
                  label={typeLabel(type, locale)}
                  onClick={() => {
                    reset();
                    toggleType(type);
                    setSearchParams({});
                  }}
                />
              ))}
            </BrowseSection>

            <p className="mt-6 text-center text-xs text-muted">{t("library.metadataOnlyNotice")}</p>
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
