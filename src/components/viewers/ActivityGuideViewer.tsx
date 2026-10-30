import type { Activity } from "../../types";
import { activityNeedsNoMaterials } from "../../data/activities";
import { useLocale } from "../../i18n";

/**
 * Reusable activity-guide viewer: goal, time/materials, numbered
 * instructions, sample parent language, reflection questions, and what to
 * notice. Unlike the audio/video/PDF/poster scaffolds, this one is wired to
 * real, original content today (the Practice/Activities catalog in
 * `src/data/activities.ts`) rather than an unavailable-pending-license
 * placeholder — reused by `ActivityDetail` and ready for any future surface
 * (e.g. a book-linked activity) that wants the same rendering.
 */
export function ActivityGuideViewer({ activity }: { activity: Activity }) {
  const { locale, t } = useLocale();

  const goal = locale === "zh" ? activity.learningGoalZh : activity.learningGoal;
  const time = locale === "zh" ? activity.timeRequiredZh : activity.timeRequired;
  const materials = locale === "zh" ? activity.materialsZh : activity.materials;
  const instructions = locale === "zh" ? activity.instructionsZh : activity.instructions;
  const parentLanguage = locale === "zh" ? activity.parentLanguageZh : activity.parentLanguage;
  const reflectionQuestions =
    locale === "zh" ? activity.reflectionQuestionsZh : activity.reflectionQuestions;
  const childMayLearn = locale === "zh" ? activity.childMayLearnZh : activity.childMayLearn;
  const parentShouldNotice = locale === "zh" ? activity.parentShouldNoticeZh : activity.parentShouldNotice;
  const noMaterials = activityNeedsNoMaterials(activity);

  return (
    <div>
      <section className="rounded-3xl bg-light-blue p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">{t("practice.goal")}</p>
        <p className="mt-1 text-sm leading-relaxed text-navy/80">{goal}</p>
        {childMayLearn && <p className="mt-3 text-sm leading-relaxed text-navy/80">{childMayLearn}</p>}
      </section>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
        <p className="text-sm font-medium text-muted">
          {t("practice.timeRequired")}: {time}
        </p>
        {noMaterials && (
          <span className="rounded-full bg-light-turquoise px-2.5 py-0.5 text-xs font-semibold text-turquoise">
            {t("practice.noMaterials")}
          </span>
        )}
      </div>

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
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">{t("practice.parentLanguage")}</p>
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

      {parentShouldNotice && (
        <section className="mt-5 rounded-2xl border border-black/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">{t("practice.noticeTitle")}</p>
          <p className="mt-1 text-sm leading-relaxed text-navy/80">{parentShouldNotice}</p>
        </section>
      )}
    </div>
  );
}
