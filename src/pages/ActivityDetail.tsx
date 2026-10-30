import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { Header } from "../components/Header";
import { SaveButton } from "../components/SaveButton";
import { ActivityGuideViewer } from "../components/viewers/ActivityGuideViewer";
import { getActivityById } from "../data/activities";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { useSavedResources } from "../hooks/useSavedResources";
import { useLocale } from "../i18n";

export function ActivityDetail() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { locale, t } = useLocale();
  const { isSaved, toggleSaved } = useSavedResources();
  const { recordView } = useRecentlyViewed();
  const activity = getActivityById(id);

  useEffect(() => {
    if (activity) recordView("activity", activity.id);
  }, [activity, recordView]);

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
  const savedId = `activity:${activity.id}`;

  return (
    <AppLayout>
      <Header
        left={
          <button type="button" aria-label={t("common.back")} onClick={() => navigate(-1)} className="text-navy">
            <ArrowLeft size={24} />
          </button>
        }
        right={<SaveButton saved={isSaved(savedId)} onClick={() => toggleSaved(savedId)} />}
      />

      <div className="px-5 pt-2 pb-8">
        <h1 className="font-serif text-2xl font-bold text-navy">{title}</h1>
        <div className="mt-4">
          <ActivityGuideViewer activity={activity} />
        </div>
        <p className="mt-6 text-center text-[11px] leading-relaxed text-muted">{t("practice.disclaimer")}</p>
      </div>
    </AppLayout>
  );
}
