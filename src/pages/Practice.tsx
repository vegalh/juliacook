import { CircleUserRound, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { Header } from "../components/Header";
import { useAgeGroup } from "../context/AgeGroupContext";
import { activities } from "../data/activities";
import { useLocale } from "../i18n";

export function Practice() {
  const navigate = useNavigate();
  const { locale, t } = useLocale();
  const { ageGroup } = useAgeGroup();

  const matchingActivities = activities.filter((a) => a.suggestedAge.includes(ageGroup));
  const otherActivities = activities.filter((a) => !a.suggestedAge.includes(ageGroup));

  return (
    <AppLayout showNav>
      <Header
        center={<h1 className="font-serif text-xl font-bold text-navy">{t("practice.title")}</h1>}
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
        <p className="text-sm leading-relaxed text-navy/70">{t("practice.subtitle")}</p>

        <div className="mt-5 flex flex-col gap-3">
          {[...matchingActivities, ...otherActivities].map((activity) => (
            <button
              key={activity.id}
              type="button"
              onClick={() => navigate(`/practice/${activity.id}`)}
              className="flex items-start justify-between gap-3 rounded-2xl bg-white p-4 text-left shadow-[0_2px_10px_rgba(23,43,77,0.06)]"
            >
              <div className="min-w-0">
                <h2 className="font-serif text-base font-bold text-navy">
                  {locale === "zh" ? activity.titleZh : activity.title}
                </h2>
                <p className="mt-1 line-clamp-2 text-xs text-navy/70">
                  {locale === "zh" ? activity.learningGoalZh : activity.learningGoal}
                </p>
                <p className="mt-2 flex items-center gap-1 text-[11px] font-medium text-muted">
                  <Clock size={13} />
                  {locale === "zh" ? activity.timeRequiredZh : activity.timeRequired}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
