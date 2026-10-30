import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { Header } from "../components/Header";
import { selCompetencies } from "../data/selCompetencies";
import { situations } from "../data/situations";
import { topicLabel } from "../data/topics";
import { useLocale } from "../i18n";

export function Learn() {
  const navigate = useNavigate();
  const { locale, t } = useLocale();

  return (
    <AppLayout showNav>
      <Header
        center={<h1 className="font-serif text-xl font-bold text-navy">{t("learn.title")}</h1>}
        right={
          <button
            type="button"
            aria-label={t("common.profile")}
            onClick={() => navigate("/profile")}
            className="text-navy"
          >
            <CircleUserRound size={24} />
          </button>
        }
      />

      <div className="px-5 pt-2 pb-6">
        <p className="text-sm leading-relaxed text-navy/70">{t("learn.subtitle")}</p>

        <div className="mt-5 flex flex-col gap-4">
          {selCompetencies.map((competency) => {
            const relatedSituations = situations.filter((s) =>
              s.selCompetencies.includes(competency.id)
            );
            return (
              <section
                key={competency.id}
                id={competency.id}
                className="rounded-3xl bg-white p-5 shadow-[0_2px_10px_rgba(23,43,77,0.06)]"
              >
                <h2 className="font-serif text-lg font-bold text-navy">
                  {locale === "zh" ? competency.labelZh : competency.labelEn}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-navy/70">
                  {locale === "zh" ? competency.descriptionZh : competency.descriptionEn}
                </p>

                {relatedSituations.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
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
              </section>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
