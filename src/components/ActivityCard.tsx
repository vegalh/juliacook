import { Clock, Puzzle } from "lucide-react";
import type { Activity } from "../types";
import { activityNeedsNoMaterials } from "../data/activities";
import { useLocale } from "../i18n";
import { ContentCard } from "./ContentCard";

export function ActivityCard({ activity }: { activity: Activity }) {
  const { locale, t } = useLocale();
  const title = locale === "zh" ? activity.titleZh : activity.title;
  const goal = locale === "zh" ? activity.learningGoalZh : activity.learningGoal;
  const time = locale === "zh" ? activity.timeRequiredZh : activity.timeRequired;

  return (
    <ContentCard
      to={`/activities/${activity.id}`}
      tile={
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-light-turquoise text-turquoise">
          <Puzzle size={24} />
        </div>
      }
      title={title}
      subtitle={goal}
      meta={
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="flex items-center gap-1 text-[11px] font-medium text-muted">
            <Clock size={13} />
            {time}
          </p>
          {activityNeedsNoMaterials(activity) && (
            <span className="rounded-full bg-light-blue px-2 py-0.5 text-[11px] font-semibold text-blue">
              {t("practice.noMaterials")}
            </span>
          )}
        </div>
      }
    />
  );
}
