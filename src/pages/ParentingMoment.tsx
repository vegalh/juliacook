import { ArrowLeft, BookOpen, Frown, Play, Puzzle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ActionCard } from "../components/ActionCard";
import { AppLayout } from "../components/AppLayout";
import { GuidanceCard } from "../components/GuidanceCard";
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";
import { SaveButton } from "../components/SaveButton";
import { getMoment } from "../data/moments";
import { topicLabel } from "../data/topics";
import { useSavedResources } from "../hooks/useSavedResources";

export function ParentingMoment() {
  const { topic = "getting-angry" } = useParams();
  const navigate = useNavigate();
  const moment = getMoment(topic);
  const { isSaved, toggleSaved } = useSavedResources();
  const momentId = `moment:${topic}`;

  return (
    <AppLayout>
      <Header
        left={
          <button type="button" aria-label="Back" onClick={() => navigate("/")} className="text-navy">
            <ArrowLeft size={24} />
          </button>
        }
        center={<Logo size={32} />}
        right={<SaveButton saved={isSaved(momentId)} onClick={() => toggleSaved(momentId)} />}
      />

      <div className="px-5 pt-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Your moment</p>

        <div className="mt-2 flex items-start justify-between gap-3">
          <h1 className="whitespace-pre-line font-serif text-3xl font-bold leading-tight text-navy">
            {moment.heading}
          </h1>
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-light-peach text-orange">
            <Frown size={30} />
          </div>
        </div>

        <div className="mt-5">
          <GuidanceCard
            title="What to do right now"
            description={moment.whatToDo}
            quote={moment.trySaying}
          />
        </div>

        <div className="mt-5 flex gap-3">
          <ActionCard
            variant="compact"
            icon={<Play size={18} className="text-white" />}
            iconBgClassName="bg-orange"
            title="Watch"
            description="See it in action"
            onClick={() => navigate(`/moment/${topic}/resources?tab=video`)}
          />
          <ActionCard
            variant="compact"
            icon={<Puzzle size={18} className="text-white" />}
            iconBgClassName="bg-turquoise"
            title="Play"
            description="Try a simple activity"
            onClick={() => navigate(`/moment/${topic}/resources?tab=activity`)}
          />
          <ActionCard
            variant="compact"
            icon={<BookOpen size={18} className="text-white" />}
            iconBgClassName="bg-orange"
            title="Read"
            description="Explore a story"
            onClick={() => navigate(`/moment/${topic}/resources?tab=book`)}
          />
        </div>

        <button
          type="button"
          onClick={() => navigate(`/moment/${topic}/resources`)}
          className="mt-6 min-h-11 w-full rounded-full bg-turquoise py-4 text-base font-semibold text-white"
        >
          Explore more for this moment →
        </button>

        <p className="mt-4 text-center text-xs text-muted">{topicLabel(topic)}</p>
      </div>
    </AppLayout>
  );
}
