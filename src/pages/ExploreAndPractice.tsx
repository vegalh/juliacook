import { ArrowLeft, BookOpen, Play, Puzzle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ActionCard } from "../components/ActionCard";
import { AppLayout } from "../components/AppLayout";
import { Header } from "../components/Header";
import { SaveButton } from "../components/SaveButton";
import { useFilters } from "../context/FilterContext";
import { topicLabel } from "../data/topics";
import { useSavedResources } from "../hooks/useSavedResources";
import type { ResourceType } from "../types";

export function ExploreAndPractice() {
  const { topic = "getting-angry" } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isSaved, toggleSaved } = useSavedResources();
  const { filters, toggleType, reset } = useFilters();
  const momentId = `moment:${topic}`;
  const label = topicLabel(topic);

  // A deep link like ?tab=video pre-selects that content type filter.
  useEffect(() => {
    const tab = searchParams.get("tab") as ResourceType | null;
    if (tab && !filters.types.includes(tab)) {
      reset();
      toggleType(tab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const openFiltered = (type: ResourceType) => {
    reset();
    toggleType(type);
    navigate(`/explore/results?topic=${topic}`);
  };

  return (
    <AppLayout>
      <Header
        left={
          <button type="button" aria-label="Back" onClick={() => navigate(-1)} className="text-navy">
            <ArrowLeft size={24} />
          </button>
        }
        right={<SaveButton saved={isSaved(momentId)} onClick={() => toggleSaved(momentId)} />}
      />

      <div className="px-5 pt-2 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Explore &amp; Practice
        </p>
        <h1 className="mt-1 font-serif text-3xl font-bold text-navy">{label}</h1>
        <p className="mt-2 text-sm leading-relaxed text-navy/70">
          Short videos, hands-on activities, and stories to build calmer, stronger skills.
        </p>

        <div className="mt-5 flex flex-col gap-3">
          <ActionCard
            variant="large"
            icon={<Play size={18} className="text-white" />}
            iconBgClassName="bg-orange"
            title="Watch"
            description="Short, practical videos with Julia and real examples."
            thumbnail={<div className="h-full w-full bg-light-peach" />}
            onClick={() => openFiltered("video")}
          />
          <ActionCard
            variant="large"
            icon={<Puzzle size={18} className="text-white" />}
            iconBgClassName="bg-turquoise"
            title="Play"
            description="Simple, hands-on activities you can do at home or in the classroom."
            thumbnail={<div className="h-full w-full bg-light-turquoise" />}
            onClick={() => openFiltered("activity")}
          />
          <ActionCard
            variant="large"
            icon={<BookOpen size={18} className="text-white" />}
            iconBgClassName="bg-orange"
            title="Read"
            description="Julia's books that support this skill."
            thumbnail={<div className="h-full w-full bg-light-peach" />}
            onClick={() => openFiltered("book")}
          />
        </div>

        <button
          type="button"
          onClick={() => {
            reset();
            navigate(`/explore/results?topic=${topic}`);
          }}
          className="mt-6 min-h-11 w-full rounded-full bg-turquoise py-4 text-base font-semibold text-white"
        >
          See all resources for {label} →
        </button>
      </div>
    </AppLayout>
  );
}
