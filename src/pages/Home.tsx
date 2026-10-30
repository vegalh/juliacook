import { Compass, MessageCircle, PuzzleIcon, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActivityCard } from "../components/ActivityCard";
import { AppLayout } from "../components/AppLayout";
import { BookCard } from "../components/BookCard";
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";
import { ParentLanguageExplorer } from "../components/ParentLanguageExplorer";
import { SearchBar } from "../components/SearchBar";
import { TopicChip } from "../components/TopicChip";
import { useAgeGroup } from "../context/AgeGroupContext";
import { activities, activitiesForAgeGroup } from "../data/activities";
import { detailedBooks } from "../data/books";
import { standaloneLanguageScenarios } from "../data/languageScenarios";
import { homeExamples, matchTopicFromQuery } from "../data/topics";
import { useLocale } from "../i18n";

const quickAccessItems = [
  { key: "discover", icon: Compass, path: "/discover", labelKey: "nav.discover" as const },
  { key: "activities", icon: PuzzleIcon, path: "/activities", labelKey: "nav.activities" as const },
  { key: "languageLab", icon: MessageCircle, path: "/language-lab", labelKey: "home.languageLabTitle" as const },
  { key: "my", icon: UserRound, path: "/my", labelKey: "nav.my" as const },
];

export function Home() {
  const navigate = useNavigate();
  const { locale, t } = useLocale();
  const { ageGroup } = useAgeGroup();
  const [scenarioIndex, setScenarioIndex] = useState(() =>
    Math.floor(Math.random() * standaloneLanguageScenarios.length)
  );
  const [featuredBookIndex] = useState(() => Math.floor(Math.random() * detailedBooks.length));

  const featuredScenario = useMemo(
    () => standaloneLanguageScenarios[scenarioIndex % standaloneLanguageScenarios.length],
    [scenarioIndex]
  );
  const featuredBook = detailedBooks[featuredBookIndex % detailedBooks.length];
  const featuredActivity = useMemo(() => {
    const matching = activitiesForAgeGroup(ageGroup);
    return matching[0] ?? activities[0];
  }, [ageGroup]);

  const goToSituation = (query: string) => {
    const slug = matchTopicFromQuery(query);
    if (slug) {
      navigate(`/situation/${slug}`);
    } else {
      navigate(`/discover?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <AppLayout showNav>
      <Header
        left={<Logo size={44} />}
        right={
          <button
            type="button"
            aria-label={t("common.profile")}
            onClick={() => navigate("/my")}
            className="text-navy"
          >
            <UserRound size={28} />
          </button>
        }
      />

      <div className="px-5 pt-2">
        <h1 className="whitespace-pre-line font-serif text-4xl font-bold leading-tight text-navy">
          {t("home.title")}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-navy/70">{t("home.subtitle")}</p>

        <div className="mt-6">
          <SearchBar mode="mic" placeholder={t("common.searchPlaceholder")} onSubmit={goToSituation} />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted">
          {t("home.tryExample")}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {homeExamples.map((topic) => (
            <TopicChip
              key={topic.slug}
              label={locale === "zh" ? topic.labelZh : topic.label}
              onClick={() => navigate(`/situation/${topic.slug}`)}
            />
          ))}
        </div>

        {featuredBook && (
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-turquoise">
              {t("home.featuredStoryEyebrow")}
            </p>
            <h2 className="mt-0.5 font-serif text-xl font-bold text-navy">{t("home.featuredStoryTitle")}</h2>
            <div className="mt-3">
              <BookCard book={featuredBook} />
            </div>
          </div>
        )}

        {featuredActivity && (
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-turquoise">
              {t("home.featuredActivityEyebrow")}
            </p>
            <h2 className="mt-0.5 font-serif text-xl font-bold text-navy">{t("home.featuredActivityTitle")}</h2>
            <div className="mt-3">
              <ActivityCard activity={featuredActivity} />
            </div>
          </div>
        )}

        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-turquoise">
            {t("home.languageLabEyebrow")}
          </p>
          <h2 className="mt-0.5 font-serif text-xl font-bold text-navy">{t("home.languageLabTitle")}</h2>
          <div className="mt-3">
            <ParentLanguageExplorer
              key={featuredScenario.id}
              scenario={featuredScenario}
              onNextScenario={() => setScenarioIndex((i) => i + 1)}
            />
          </div>
          <button
            type="button"
            onClick={() => navigate("/language-lab")}
            className="mt-3 min-h-11 text-sm font-semibold text-blue"
          >
            {t("home.languageLabCta")}
          </button>
        </div>

        <div className="mt-8 pb-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {t("home.quickAccessTitle")}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {quickAccessItems.map(({ key, icon: Icon, path, labelKey }) => (
              <button
                key={key}
                type="button"
                onClick={() => navigate(path)}
                className="flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-2xl bg-light-blue py-4 text-navy active:bg-light-turquoise"
              >
                <Icon size={22} className="text-blue" />
                <span className="text-xs font-semibold">{t(labelKey)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
