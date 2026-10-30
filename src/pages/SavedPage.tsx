import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { Header } from "../components/Header";
import { ResourceCard } from "../components/ResourceCard";
import { SaveButton } from "../components/SaveButton";
import { getContentProvider } from "../content/ContentProvider";
import { getSituation } from "../data/situations";
import { useSavedResources } from "../hooks/useSavedResources";
import { useLocale } from "../i18n";

export function SavedPage() {
  const navigate = useNavigate();
  const { locale, t } = useLocale();
  const { savedIds, isSaved, toggleSaved } = useSavedResources();

  const savedTopicSlugs = savedIds
    .filter((id) => id.startsWith("situation:"))
    .map((id) => id.replace("situation:", ""));

  const savedResources = savedIds
    .map((id) => getContentProvider().getResourceById(id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const hasSaved = savedTopicSlugs.length > 0 || savedResources.length > 0;

  return (
    <AppLayout showNav>
      <Header
        left={
          <button type="button" aria-label={t("common.back")} onClick={() => navigate(-1)} className="text-navy">
            <ArrowLeft size={24} />
          </button>
        }
        center={<h1 className="font-serif text-xl font-bold text-navy">{t("saved.title")}</h1>}
      />

      <div className="px-5 pt-2 pb-6">
        {!hasSaved && <p className="mt-6 text-center text-sm text-muted">{t("saved.empty")}</p>}

        {savedTopicSlugs.length > 0 && (
          <section className="mb-6">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
              {t("saved.savedSituations")}
            </h2>
            <div className="flex flex-col gap-3">
              {savedTopicSlugs.map((slug) => {
                const situation = getSituation(slug);
                const situationId = `situation:${slug}`;
                return (
                  <div
                    key={slug}
                    className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(23,43,77,0.06)]"
                  >
                    <button
                      type="button"
                      onClick={() => navigate(`/situation/${slug}`)}
                      className="min-w-0 flex-1 text-left"
                    >
                      <p className="whitespace-pre-line font-serif text-base font-bold text-navy">
                        {locale === "zh" ? situation.default.headingZh : situation.default.heading}
                      </p>
                    </button>
                    <SaveButton saved={isSaved(situationId)} onClick={() => toggleSaved(situationId)} />
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {savedResources.length > 0 && (
          <section>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
              {t("saved.savedResources")}
            </h2>
            <div className="flex flex-col gap-3">
              {savedResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </section>
        )}
      </div>
    </AppLayout>
  );
}
