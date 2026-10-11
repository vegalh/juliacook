import { CircleUserRound, Smile } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";
import { SearchBar } from "../components/SearchBar";
import { TopicChip } from "../components/TopicChip";
import { homeExamples, matchTopic } from "../data/topics";

export function Home() {
  const navigate = useNavigate();

  const goToMoment = (query: string) => {
    navigate(`/moment/${matchTopic(query)}`);
  };

  return (
    <AppLayout showNav>
      <Header
        left={<Logo size={44} />}
        right={
          <button type="button" aria-label="Profile" className="text-navy">
            <CircleUserRound size={28} />
          </button>
        }
      />

      <div className="px-5 pt-2">
        <h1 className="font-serif text-4xl font-bold leading-tight text-navy">
          Real help
          <br />
          for real moments.
        </h1>
        <p className="mt-3 text-base leading-relaxed text-navy/70">
          Practical ideas to help kids build great people skills at home, at school, and in
          everyday life.
        </p>

        <div className="mt-6">
          <SearchBar mode="mic" onSubmit={goToMoment} />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted">
          Try an example
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {homeExamples.map((topic) => (
            <TopicChip
              key={topic.slug}
              label={topic.label}
              onClick={() => navigate(`/moment/${topic.slug}`)}
            />
          ))}
        </div>

        <div className="mt-8 flex h-44 items-center justify-center rounded-3xl bg-light-turquoise text-turquoise">
          <Smile size={64} strokeWidth={1.2} />
        </div>
      </div>
    </AppLayout>
  );
}
