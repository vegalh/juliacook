import { CircleUserRound, Lightbulb } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { FilterModal } from "../components/FilterModal";
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";
import { SearchBar } from "../components/SearchBar";
import { TopicChip } from "../components/TopicChip";
import { topics } from "../data/topics";

export function Explore() {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const goToResults = (params: string) => navigate(`/explore/results?${params}`);

  return (
    <AppLayout showNav>
      <Header
        center={<Logo size={44} />}
        right={
          <button type="button" aria-label="Profile" className="text-navy">
            <CircleUserRound size={28} />
          </button>
        }
      />

      <div className="px-5 pt-2">
        <h1 className="font-serif text-4xl font-bold text-navy">Explore</h1>
        <p className="mt-3 text-base leading-relaxed text-navy/70">
          Find practical ideas, activities, and stories to help your child build great people
          skills.
        </p>

        <div className="mt-6">
          <SearchBar
            mode="filter"
            onSubmit={(value) => goToResults(`q=${encodeURIComponent(value)}`)}
            onFilterClick={() => setFilterOpen(true)}
          />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted">
          Popular topics
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {topics.map((topic) => (
            <TopicChip
              key={topic.slug}
              label={topic.label}
              selected={selectedTopic === topic.slug}
              onClick={() => {
                setSelectedTopic(topic.slug);
                goToResults(`topic=${topic.slug}`);
              }}
            />
          ))}
        </div>

        <div className="mt-8 flex h-40 items-center justify-center rounded-3xl bg-light-blue text-blue">
          <Lightbulb size={60} strokeWidth={1.2} />
        </div>
      </div>

      <FilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onShowResults={() => {
          setFilterOpen(false);
          goToResults("");
        }}
      />
    </AppLayout>
  );
}
