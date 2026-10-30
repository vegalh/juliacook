import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { Header } from "../components/Header";
import { getActivityById } from "../data/activities";
import { useLocale } from "../i18n";

export function ActivityDetail() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { locale, t } = useLocale();
  const activity = getActivityById(id);

  if (!activity) {
    return (
      <AppLayout>
        <Header
          left={
            <button type="button" aria-label={t("common.back")} onClick={() => navigate(-1)} className="text-navy">
              <ArrowLeft size={24} />
            </button>
          }
        />
        <p className="px-5 text-sm text-muted">{t("common.noResults")}</p>
      </AppLayout>
    );
  }

  const title = locale === "zh" ? activity.titleZh : activity.title;
  const goal = locale === "zh" ? activity.learningGoalZh : activity.learningGoal;
  const time = locale === "zh" ? activity.timeRequiredZh : activity.timeRequired;
  const materials = locale === "zh" ? activity.materialsZh : activity.materials;
  const instructions = locale === "zh" ? activity.instructionsZh : activity.instructions;
  const parentLanguage = locale === "zh" ? activity.parentLanguageZh : activity.parentLanguage;
  const reflectionQuestions =
    locale === "zh" ? activity.reflectionQuestionsZh : activity.reflectionQuestions;

  return (
    <AppLayout>
      <Header
        left={
          <button type="button" aria-label={t("common.back")} onClick={() => navigate(-1)} className="text-navy">
            <ArrowLeft size={24} />
          </button>
        }
      />

      <div className="px-5 pt-2 pb-8">
        <h1 className="font-serif text-2xl font-bold text-navy">{title}</h1>

        <section className="mt-4 rounded-3xl bg-light-blue p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">{t("practice.goal")}</p>
          <p className="mt-1 text-sm leading-relaxed text-navy/80">{goal}</p>
        </section>

        <p className="mt-4 text-sm font-medium text-muted">
          {t("practice.timeRequired")}: {time}
        </p>

        <section className="mt-5">
          <h2 className="font-serif text-lg font-bold text-navy">{t("practice.materials")}</h2>
          <ul className="mt-2 list-disc pl-5 text-sm leading-relaxed text-navy/80">
            {materials.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </section>

        <section className="mt-5">
          <h2 className="font-serif text-lg font-bold text-navy">{t("practice.instructions")}</h2>
          <ol className="mt-2 list-decimal pl-5 text-sm leading-relaxed text-navy/80">
            {instructions.map((step, i) => (
              <li key={i} className="mb-1">
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-5 rounded-2xl bg-light-turquoise p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {t("practice.parentLanguage")}
          </p>
          <p className="mt-1 font-serif text-base leading-snug text-navy">{parentLanguage}</p>
        </section>

        <section className="mt-5">
          <h2 className="font-serif text-lg font-bold text-navy">{t("practice.reflectionQuestions")}</h2>
          <ul className="mt-2 flex flex-col gap-2">
            {reflectionQuestions.map((q, i) => (
              <li
                key={i}
                className="rounded-2xl bg-white p-4 text-sm leading-relaxed text-navy/80 shadow-[0_2px_10px_rgba(23,43,77,0.06)]"
              >
                {q}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppLayout>
  );
}
