import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { Header } from "../components/Header";
import { ParentLanguageExplorer } from "../components/ParentLanguageExplorer";
import { TopicChip } from "../components/TopicChip";
import { standaloneLanguageScenarios, type ScenarioAgeContext } from "../data/languageScenarios";
import { useLocale } from "../i18n";

const filters: { key: ScenarioAgeContext | "all"; labelKey: "filterAll" | "filterYounger" | "filterTeen" | "filterGeneral" }[] = [
  { key: "all", labelKey: "filterAll" },
  { key: "younger", labelKey: "filterYounger" },
  { key: "teen", labelKey: "filterTeen" },
  { key: "general", labelKey: "filterGeneral" },
];

export function LanguageLab() {
  const navigate = useNavigate();
  const { t } = useLocale();
  const [filter, setFilter] = useState<ScenarioAgeContext | "all">("all");
  const [index, setIndex] = useState(0);

  const scenarios = useMemo(
    () =>
      filter === "all"
        ? standaloneLanguageScenarios
        : standaloneLanguageScenarios.filter((s) => s.ageContext === filter),
    [filter]
  );

  const safeIndex = index % Math.max(scenarios.length, 1);
  const scenario = scenarios[safeIndex];

  return (
    <AppLayout>
      <Header
        left={
          <button type="button" aria-label={t("common.back")} onClick={() => navigate(-1)} className="text-navy">
            <ArrowLeft size={24} />
          </button>
        }
        center={<h1 className="font-serif text-lg font-bold text-navy">{t("languageLab.title")}</h1>}
      />

      <div className="px-5 pt-2 pb-8">
        <p className="text-sm leading-relaxed text-navy/70">{t("languageLab.subtitle")}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {filters.map(({ key, labelKey }) => (
            <TopicChip
              key={key}
              label={t(`languageLab.${labelKey}`)}
              selected={filter === key}
              onClick={() => {
                setFilter(key);
                setIndex(0);
              }}
            />
          ))}
        </div>

        <div className="mt-5">
          {scenario ? (
            <ParentLanguageExplorer
              key={scenario.id}
              scenario={scenario}
              onNextScenario={() => setIndex((i) => i + 1)}
            />
          ) : (
            <p className="text-sm text-muted">{t("common.noResults")}</p>
          )}
        </div>

        {scenario && (
          <button
            type="button"
            onClick={() => setIndex((i) => i + 1)}
            className="mt-4 min-h-11 w-full rounded-full bg-light-turquoise py-3 text-sm font-semibold text-navy"
          >
            {t("languageLab.shuffle")}
          </button>
        )}

        <p className="mt-6 text-center text-[11px] leading-relaxed text-muted">{t("common.demoNotice")}</p>
      </div>
    </AppLayout>
  );
}
