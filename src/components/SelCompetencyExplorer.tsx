import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { activities } from "../data/activities";
import { selCompetencies, type SelCompetencyId } from "../data/selCompetencies";
import { situations } from "../data/situations";
import { topicLabel } from "../data/topics";
import { useLocale } from "../i18n";

function recommendedActivity(competencyId: SelCompetencyId) {
  return activities.find((a) => a.selCompetencies.includes(competencyId));
}

/**
 * The five SEL competencies, each expandable to its everyday example,
 * younger/older examples, related situations, and a recommended activity.
 * This is the former standalone `/learn` page's content, preserved verbatim
 * and relocated into Discover's "按主题 / Topics" tab (see
 * docs/frontend-information-architecture.md) rather than removed.
 */
export function SelCompetencyExplorer() {
  const navigate = useNavigate();
  const { locale, t } = useLocale();
  const [expanded, setExpanded] = useState<SelCompetencyId | null>(selCompetencies[0]?.id ?? null);

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{t("learn.title")}</p>
      <p className="mt-1 text-sm leading-relaxed text-navy/70">{t("learn.subtitle")}</p>

      <div className="mt-3 flex flex-col gap-3">
        {selCompetencies.map((competency) => {
          const isOpen = expanded === competency.id;
          const relatedSituations = situations.filter((s) => s.selCompetencies.includes(competency.id));
          const activity = recommendedActivity(competency.id);

          return (
            <section
              key={competency.id}
              id={competency.id}
              className="rounded-3xl bg-white shadow-[0_2px_10px_rgba(23,43,77,0.06)]"
            >
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : competency.id)}
                aria-expanded={isOpen}
                className="flex min-h-11 w-full items-start justify-between gap-3 p-5 text-left"
              >
                <div>
                  <h3 className="font-serif text-lg font-bold text-navy">
                    {locale === "zh" ? competency.labelZh : competency.labelEn}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-navy/70">
                    {locale === "zh" ? competency.descriptionZh : competency.descriptionEn}
                  </p>
                </div>
                <ChevronDown
                  size={20}
                  className={`mt-1 shrink-0 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div className="explorer-fade-in flex flex-col gap-4 px-5 pb-5">
                  <div className="rounded-2xl bg-light-blue p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {t("learn.everydayTitle")}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-navy/80">
                      {locale === "zh" ? competency.everydayExampleZh : competency.everydayExample}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {t("learn.ageExamplesTitle")}
                    </p>
                    <div className="mt-2 flex flex-col gap-2">
                      <p className="rounded-2xl bg-off-white p-3 text-sm leading-relaxed text-navy/80">
                        {locale === "zh" ? competency.youngerExampleZh : competency.youngerExample}
                      </p>
                      <p className="rounded-2xl bg-off-white p-3 text-sm leading-relaxed text-navy/80">
                        {locale === "zh" ? competency.olderExampleZh : competency.olderExample}
                      </p>
                    </div>
                  </div>

                  {relatedSituations.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {relatedSituations.map((s) => (
                        <button
                          key={s.topicSlug}
                          type="button"
                          onClick={() => navigate(`/situation/${s.topicSlug}`)}
                          className="min-h-11 rounded-full bg-light-turquoise px-3.5 py-2.5 text-sm font-medium text-navy"
                        >
                          {topicLabel(s.topicSlug, locale)}
                        </button>
                      ))}
                    </div>
                  )}

                  {activity && (
                    <div className="rounded-2xl border border-black/5 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                        {t("learn.activityTitle")}
                      </p>
                      <p className="mt-1 font-serif text-base font-bold text-navy">
                        {locale === "zh" ? activity.titleZh : activity.title}
                      </p>
                      <button
                        type="button"
                        onClick={() => navigate(`/activities/${activity.id}`)}
                        className="mt-2 text-sm font-semibold text-blue"
                      >
                        {t("learn.tryActivity")}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
