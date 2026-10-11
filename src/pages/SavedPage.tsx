import { CircleUserRound } from "lucide-react";
import { AppLayout } from "../components/AppLayout";
import { Header } from "../components/Header";
import { ResourceCard } from "../components/ResourceCard";
import { SaveButton } from "../components/SaveButton";
import { getMoment } from "../data/moments";
import { getResourceById } from "../data/resources";
import { useSavedResources } from "../hooks/useSavedResources";

export function SavedPage() {
  const { savedIds, isSaved, toggleSaved } = useSavedResources();

  const savedMomentSlugs = savedIds
    .filter((id) => id.startsWith("moment:"))
    .map((id) => id.replace("moment:", ""));

  const savedResources = savedIds
    .map((id) => getResourceById(id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const hasSaved = savedMomentSlugs.length > 0 || savedResources.length > 0;

  return (
    <AppLayout showNav>
      <Header
        center={<h1 className="font-serif text-xl font-bold text-navy">Saved</h1>}
        right={
          <button type="button" aria-label="Profile" className="text-navy">
            <CircleUserRound size={24} />
          </button>
        }
      />

      <div className="px-5 pt-2 pb-6">
        {!hasSaved && (
          <p className="mt-6 text-center text-sm text-muted">
            Save moments and resources to find them here later.
          </p>
        )}

        {savedMomentSlugs.length > 0 && (
          <section className="mb-6">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
              Saved moments
            </h2>
            <div className="flex flex-col gap-3">
              {savedMomentSlugs.map((slug) => {
                const moment = getMoment(slug);
                const momentId = `moment:${slug}`;
                return (
                  <div
                    key={slug}
                    className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(23,43,77,0.06)]"
                  >
                    <p className="whitespace-pre-line font-serif text-base font-bold text-navy">
                      {moment.heading}
                    </p>
                    <SaveButton saved={isSaved(momentId)} onClick={() => toggleSaved(momentId)} />
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {savedResources.length > 0 && (
          <section>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
              Saved resources
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
