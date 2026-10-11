import { ArrowLeft, CircleUserRound, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { FilterModal } from "../components/FilterModal";
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";
import { ResourceCard } from "../components/ResourceCard";
import { SearchBar } from "../components/SearchBar";
import { useFilters } from "../context/FilterContext";
import { settingLabels, skillLabels, typeLabels } from "../data/labels";
import { searchResources } from "../data/resources";
import { topicLabel } from "../data/topics";

export function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const { filters, toggleType, toggleSkill, setSetting } = useFilters();

  const query = searchParams.get("q") ?? "";
  const topic = searchParams.get("topic");

  const results = useMemo(
    () => searchResources({ query, topic, filters }),
    [query, topic, filters]
  );

  const clearTopic = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("topic");
    setSearchParams(next);
  };

  return (
    <AppLayout showNav>
      <Header
        left={
          <button type="button" aria-label="Back" onClick={() => navigate(-1)} className="text-navy">
            <ArrowLeft size={24} />
          </button>
        }
        center={<Logo size={32} />}
        right={
          <button type="button" aria-label="Profile" className="text-navy">
            <CircleUserRound size={24} />
          </button>
        }
      />

      <div className="px-5 pt-2 pb-6">
        <SearchBar
          mode="filter"
          defaultValue={query}
          onSubmit={(value) => {
            const next = new URLSearchParams(searchParams);
            if (value) next.set("q", value);
            else next.delete("q");
            setSearchParams(next);
          }}
          onFilterClick={() => setFilterOpen(true)}
        />

        {(topic || filters.types.length || filters.setting || filters.skills.length) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {topic && (
              <FilterTag label={topicLabel(topic)} onRemove={clearTopic} />
            )}
            {filters.types.map((t) => (
              <FilterTag key={t} label={typeLabels[t]} onRemove={() => toggleType(t)} />
            ))}
            {filters.setting && (
              <FilterTag
                label={settingLabels[filters.setting]}
                onRemove={() => setSetting(filters.setting!)}
              />
            )}
            {filters.skills.map((s) => (
              <FilterTag key={s} label={skillLabels[s]} onRemove={() => toggleSkill(s)} />
            ))}
          </div>
        )}

        <p className="mt-4 text-sm font-medium text-muted">
          {results.length} {results.length === 1 ? "result" : "results"}
        </p>

        <div className="mt-3 flex flex-col gap-3">
          {results.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
          {results.length === 0 && (
            <p className="mt-6 text-center text-sm text-muted">
              No resources match yet. Try adjusting your search or filters.
            </p>
          )}
        </div>
      </div>

      <FilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onShowResults={() => setFilterOpen(false)}
      />
    </AppLayout>
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
