import { ArrowLeft, Frown, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { BookCard } from "../components/BookCard";
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";
import { ParentLanguageExplorer } from "../components/ParentLanguageExplorer";
import { ResourceCard } from "../components/ResourceCard";
import { SaveButton } from "../components/SaveButton";
import { useAgeGroup } from "../context/AgeGroupContext";
import { getContentProvider } from "../content/ContentProvider";
import { ageGroups, type AgeGroup } from "../data/ageGroups";
import { booksForTopic } from "../data/books";
import { flagshipScenarioFor } from "../data/languageScenarios";
import { getCompetency } from "../data/selCompetencies";
import { getSituation, resolveSituationContent } from "../data/situations";
import { topicLabel } from "../data/topics";
import { useReflections } from "../hooks/useReflections";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { useSavedResources } from "../hooks/useSavedResources";
import { useLocale } from "../i18n";
import { speak } from "../utils/speak";

const ageGroupLabels: Record<AgeGroup, { en: string; zh: string }> = {
  "3-6": { en: "Ages 3-6", zh: "3-6 岁" },
  "6-10": { en: "Ages 6-10", zh: "6-10 岁" },
  "10-12": { en: "Ages 10-12", zh: "10-12 岁" },
  "13+": { en: "Ages 13+", zh: "13 岁以上" },
};

export function SituationPage() {
  const { topic = "getting-angry" } = useParams();
  const navigate = useNavigate();
  const { locale, t } = useLocale();
  const { ageGroup: globalAgeGroup, ageBucket } = useAgeGroup();
  const { isSaved, toggleSaved } = useSavedResources();
  const { reflectionsForTopic, saveReflection } = useReflections();
  const { recordView } = useRecentlyViewed();
  const [note, setNote] = useState("");
  const [justSaved, setJustSaved] = useState(false);
  const [understandAgeGroup, setUnderstandAgeGroup] = useState<AgeGroup>(globalAgeGroup);

  const situation = getSituation(topic);
  const content = resolveSituationContent(situation, ageBucket);
  const situationId = `situation:${topic}`;
  const relatedResources = getContentProvider().resourcesForTopic(topic);
  const relatedBooks = booksForTopic(topic);
  const savedReflections = reflectionsForTopic(topic);
  const speechLang = locale === "zh" ? "zh-CN" : "en-US";
  const flagshipScenario = flagshipScenarioFor(topic, ageBucket);

  const heading = locale === "zh" ? content.headingZh : content.heading;
  const ageSpecificUnderstand = situation.understandByAge?.[understandAgeGroup];
  const understand = ageSpecificUnderstand
    ? locale === "zh"
      ? ageSpecificUnderstand.textZh
      : ageSpecificUnderstand.text
    : locale === "zh"
      ? content.understandZh
      : content.understand;
  const respond = locale === "zh" ? content.respondZh : content.respond;
  const trySayingLess = locale === "zh" ? content.trySaying.lessHelpfulZh : content.trySaying.lessHelpful;
  const trySayingMore = locale === "zh" ? content.trySaying.moreHelpfulZh : content.trySaying.moreHelpful;
  const reflectPrompt = locale === "zh" ? situation.reflectPromptZh : situation.reflectPrompt;

  useEffect(() => {
    recordView("situation", topic);
  }, [topic, recordView]);

  const handleSaveReflection = () => {
    saveReflection(topic, note);
    setNote("");
    setJustSaved(true);
    window.setTimeout(() => setJustSaved(false), 2000);
  };

  return (
    <AppLayout>
      <Header
        left={
          <button type="button" aria-label={t("common.back")} onClick={() => navigate("/")} className="text-navy">
            <ArrowLeft size={24} />
          </button>
        }
        center={<Logo size={32} />}
        right={<SaveButton saved={isSaved(situationId)} onClick={() => toggleSaved(situationId)} />}
      />

      <div className="px-5 pt-2 pb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          {t("situation.yourSituation")}
        </p>

        <div className="mt-2 flex items-start justify-between gap-3">
          <h1 className="whitespace-pre-line font-serif text-3xl font-bold leading-tight text-navy">
            {heading}
          </h1>
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-light-blue text-blue">
            <Frown size={30} />
          </div>
        </div>

        {/* Understand */}
        <section className="mt-5 rounded-3xl bg-light-blue p-5">
          <h2 className="font-serif text-lg font-bold text-navy">{t("situation.understandTitle")}</h2>
          {situation.understandByAge && (
            <div className="mt-3 flex gap-1.5 overflow-x-auto no-scrollbar">
              {ageGroups.map((group) => {
                const selected = understandAgeGroup === group;
                return (
                  <button
                    key={group}
                    type="button"
                    onClick={() => setUnderstandAgeGroup(group)}
                    aria-pressed={selected}
                    className={`min-h-9 shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                      selected ? "bg-blue text-white" : "bg-white/70 text-navy/70"
                    }`}
                  >
                    {locale === "zh" ? ageGroupLabels[group].zh : ageGroupLabels[group].en}
                  </button>
                );
              })}
            </div>
          )}
          <p className="mt-3 text-sm leading-relaxed text-navy/80">{understand}</p>
        </section>

        {/* Respond */}
        <section className="mt-5">
          <h2 className="font-serif text-lg font-bold text-navy">{t("situation.respondTitle")}</h2>
          <ul className="mt-2 flex flex-col gap-2">
            {respond.map((item, i) => (
              <li
                key={i}
                className="rounded-2xl bg-white p-4 text-sm leading-relaxed text-navy/80 shadow-[0_2px_10px_rgba(23,43,77,0.06)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Try saying */}
        <section className="mt-5">
          <h2 className="font-serif text-lg font-bold text-navy">{t("situation.trySayingTitle")}</h2>
          {flagshipScenario ? (
            <div className="mt-2">
              <ParentLanguageExplorer key={flagshipScenario.id} scenario={flagshipScenario} />
            </div>
          ) : (
            <div className="mt-2 flex flex-col gap-3">
              <div className="rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(23,43,77,0.06)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {t("situation.trySayingLessHelpful")}
                </p>
                <p className="mt-1 text-sm text-navy/60 line-through decoration-navy/30">{trySayingLess}</p>
              </div>
              <div className="flex items-start justify-between gap-3 rounded-2xl bg-light-turquoise p-4">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {t("situation.trySayingMoreHelpful")}
                  </p>
                  <p className="mt-1 font-serif text-base leading-snug text-navy">{trySayingMore}</p>
                </div>
                <button
                  type="button"
                  aria-label={t("common.readAloud")}
                  onClick={() => speak(trySayingMore, speechLang)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-turquoise"
                >
                  <Volume2 size={18} />
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Learn */}
        <section className="mt-5">
          <h2 className="font-serif text-lg font-bold text-navy">{t("situation.learnTitle")}</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {situation.selCompetencies.map((id) => {
              const competency = getCompetency(id);
              if (!competency) return null;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => navigate("/discover?mode=topics")}
                  className="min-h-11 rounded-full bg-light-turquoise px-4 py-2.5 text-sm font-medium text-navy"
                >
                  {locale === "zh" ? competency.labelZh : competency.labelEn}
                </button>
              );
            })}
          </div>
        </section>

        {/* Practice */}
        {situation.practiceActivityId && (
          <section className="mt-5">
            <h2 className="font-serif text-lg font-bold text-navy">{t("situation.practiceTitle")}</h2>
            <button
              type="button"
              onClick={() => navigate(`/activities/${situation.practiceActivityId}`)}
              className="mt-2 min-h-11 w-full rounded-full bg-turquoise py-4 text-base font-semibold text-white"
            >
              {t("situation.playDesc")}
            </button>
          </section>
        )}

        {/* Related resources */}
        <section className="mt-5">
          <h2 className="font-serif text-lg font-bold text-navy">{t("situation.relatedTitle")}</h2>
          {relatedResources.length === 0 ? (
            <p className="mt-2 text-sm text-muted">{t("situation.relatedEmpty")}</p>
          ) : (
            <div className="mt-2 flex flex-col gap-3">
              {relatedResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </section>

        {/* Related books */}
        <section className="mt-5">
          <h2 className="font-serif text-lg font-bold text-navy">{t("book.relatedBooksTitle")}</h2>
          {relatedBooks.length === 0 ? (
            <p className="mt-2 text-sm text-muted">{t("book.relatedBooksEmpty")}</p>
          ) : (
            <div className="mt-2 flex flex-col gap-3">
              {relatedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </section>

        {/* Reflect */}
        <section className="mt-5">
          <h2 className="font-serif text-lg font-bold text-navy">{t("situation.reflectTitle")}</h2>
          <p className="mt-1 text-sm text-navy/70">{reflectPrompt}</p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t("situation.reflectPlaceholder")}
            rows={3}
            className="mt-2 w-full resize-none rounded-2xl bg-white p-4 text-sm text-navy shadow-[0_2px_10px_rgba(23,43,77,0.06)] placeholder:text-muted focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSaveReflection}
            disabled={!note.trim()}
            className="mt-2 min-h-11 w-full rounded-full bg-blue py-3 text-sm font-semibold text-white disabled:opacity-40"
          >
            {justSaved ? t("situation.reflectSaved") : t("situation.reflectSave")}
          </button>
          <p className="mt-2 text-xs text-muted">{t("situation.reflectPrivacyNote")}</p>
          {savedReflections.length > 0 && (
            <ul className="mt-3 flex flex-col gap-2">
              {savedReflections.map((r, i) => (
                <li key={i} className="rounded-2xl bg-white/60 p-3 text-xs text-navy/70">
                  {r.note}
                </li>
              ))}
            </ul>
          )}
        </section>

        <p className="mt-6 text-center text-xs text-muted">{topicLabel(topic, locale)}</p>
        <p className="mt-2 text-center text-[11px] leading-relaxed text-muted">{t("situation.disclaimer")}</p>
      </div>
    </AppLayout>
  );
}
