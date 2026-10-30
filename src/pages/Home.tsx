import { CircleUserRound, Smile } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";
import { SearchBar } from "../components/SearchBar";
import { TopicChip } from "../components/TopicChip";
import { homeExamples, matchTopic } from "../data/topics";
import { useLocale } from "../i18n";

export function Home() {
  const navigate = useNavigate();
  const { locale, t } = useLocale();

  const goToSituation = (query: string) => {
    navigate(`/situation/${matchTopic(query)}`);
  };

  return (
    <AppLayout showNav>
      <Header
        left={<Logo size={44} />}
        right={
          <button
            type="button"
            aria-label={t("common.profile")}
            onClick={() => navigate("/profile")}
            className="text-navy"
          >
            <CircleUserRound size={28} />
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

        <div className="mt-8 flex h-44 items-center justify-center rounded-3xl bg-light-turquoise text-turquoise">
          <Smile size={64} strokeWidth={1.2} />
        </div>
      </div>
    </AppLayout>
  );
}
