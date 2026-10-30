import { CircleUserRound, MessageCircle, Printer } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActivityCard } from "../components/ActivityCard";
import { AppLayout } from "../components/AppLayout";
import { Header } from "../components/Header";
import { TopicChip } from "../components/TopicChip";
import { useAgeGroup } from "../context/AgeGroupContext";
import { activities, activityNeedsNoMaterials, isQuickActivity } from "../data/activities";
import { useLocale } from "../i18n";

type ActivityFilterKey = "all" | "no-materials" | "quick" | "younger" | "teen";

const filterKeys: ActivityFilterKey[] = ["all", "no-materials", "quick", "younger", "teen"];

export function Activities() {
  const navigate = useNavigate();
  const { t } = useLocale();
  const { ageGroup } = useAgeGroup();
  const [filter, setFilter] = useState<ActivityFilterKey>("all");

  const filtered = useMemo(() => {
    switch (filter) {
      case "no-materials":
        return activities.filter(activityNeedsNoMaterials);
      case "quick":
        return activities.filter(isQuickActivity);
      case "younger":
        return activities.filter((a) => a.suggestedAge.includes("3-6"));
      case "teen":
        return activities.filter((a) => a.suggestedAge.includes("13+"));
      case "all":
      default:
        return activities;
    }
  }, [filter]);

  // Within whichever filter is active, still prioritize the parent's current age group.
  const ordered = useMemo(() => {
    const matching = filtered.filter((a) => a.suggestedAge.includes(ageGroup));
    const rest = filtered.filter((a) => !a.suggestedAge.includes(ageGroup));
    return [...matching, ...rest];
  }, [filtered, ageGroup]);

  return (
    <AppLayout showNav>
      <Header
        center={<h1 className="font-serif text-xl font-bold text-navy">{t("activities.title")}</h1>}
        right={
          <button
            type="button"
            aria-label={t("common.profile")}
            onClick={() => navigate("/my")}
            className="text-navy"
          >
            <CircleUserRound size={24} />
          </button>
        }
      />

      <div className="px-5 pt-2 pb-6">
        <p className="text-sm leading-relaxed text-navy/70">{t("activities.subtitle")}</p>

        <div className="mt-4 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => navigate("/language-lab")}
            className="flex w-full items-start gap-3 rounded-2xl bg-light-turquoise p-4 text-left"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-turquoise">
              <MessageCircle size={18} />
            </div>
            <div className="min-w-0">
              <h2 className="font-serif text-base font-bold text-navy">{t("practice.languageLabCardTitle")}</h2>
              <p className="mt-1 text-xs leading-relaxed text-navy/70">{t("practice.languageLabCardDesc")}</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigate("/discover?mode=resources")}
            className="flex w-full items-start gap-3 rounded-2xl bg-light-blue p-4 text-left"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-blue">
              <Printer size={18} />
            </div>
            <div className="min-w-0">
              <h2 className="font-serif text-base font-bold text-navy">{t("activities.printablesCardTitle")}</h2>
              <p className="mt-1 text-xs leading-relaxed text-navy/70">{t("activities.printablesCardDesc")}</p>
            </div>
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {filterKeys.map((key) => (
            <TopicChip
              key={key}
              label={t(`activities.filter.${key}`)}
              selected={filter === key}
              onClick={() => setFilter(key)}
            />
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {ordered.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
          {ordered.length === 0 && (
            <p className="mt-6 text-center text-sm text-muted">{t("common.noResults")}</p>
          )}
        </div>

        <p className="mt-6 text-center text-[11px] leading-relaxed text-muted">{t("practice.disclaimer")}</p>
      </div>
    </AppLayout>
  );
}
