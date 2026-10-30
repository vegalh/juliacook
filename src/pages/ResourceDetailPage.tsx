import { ArrowLeft, BookOpen, Play, Printer, Puzzle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { Header } from "../components/Header";
import { SaveButton } from "../components/SaveButton";
import { PdfViewer } from "../components/viewers/PdfViewer";
import { VideoPlayerViewer } from "../components/viewers/VideoPlayerViewer";
import { getContentProvider } from "../content/ContentProvider";
import { isHiddenFromDiscovery } from "../content/types";
import { typeLabel } from "../data/labels";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { useSavedResources } from "../hooks/useSavedResources";
import { useLocale, type TranslationKey } from "../i18n";
import type { Resource } from "../types";

const typeIcon: Record<Resource["type"], typeof Play> = {
  video: Play,
  activity: Puzzle,
  book: BookOpen,
  printable: Printer,
};

const licensingStatusKey: Record<Resource["licensing"]["licenseStatus"], TranslationKey> = {
  original: "licensing.statusOriginal",
  public_metadata: "licensing.statusPublicMetadata",
  licensed_pending_verification: "licensing.statusLicensedPending",
  licensed_approved: "licensing.statusLicensedApproved",
  restricted: "licensing.statusRestricted",
  unknown: "licensing.statusUnknown",
};

export function ResourceDetailPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { locale, t } = useLocale();
  const { isSaved, toggleSaved } = useSavedResources();
  const { recordView } = useRecentlyViewed();
  // A direct link to a restricted resource must still never reveal its content.
  const resource = getContentProvider().getResourceById(id);

  useEffect(() => {
    if (resource) recordView("resource", resource.id);
  }, [resource, recordView]);

  if (!resource) {
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

  const hidden = isHiddenFromDiscovery(resource.licensing);
  const Icon = typeIcon[resource.type];
  const title = locale === "zh" && resource.titleZh ? resource.titleZh : resource.title;
  const description =
    locale === "zh" && resource.descriptionZh ? resource.descriptionZh : resource.description;
  const content = locale === "zh" && resource.contentZh ? resource.contentZh : resource.content;
  const isVerified = resource.licensing.contentOrigin === "verified_bibliographic";

  return (
    <AppLayout>
      <Header
        left={
          <button type="button" aria-label={t("common.back")} onClick={() => navigate(-1)} className="text-navy">
            <ArrowLeft size={24} />
          </button>
        }
        right={<SaveButton saved={isSaved(resource.id)} onClick={() => toggleSaved(resource.id)} />}
      />

      <div className="px-5 pt-2 pb-8">
        {resource.type === "video" ? (
          <VideoPlayerViewer title={title} src={resource.thumbnail} />
        ) : resource.type === "printable" ? (
          <PdfViewer title={title} src={resource.thumbnail} />
        ) : (
          <div className="flex h-40 items-center justify-center rounded-3xl bg-light-blue text-blue">
            <Icon size={48} strokeWidth={1.3} />
          </div>
        )}

        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">
          {typeLabel(resource.type, locale)}
        </p>
        <h1 className="mt-1 font-serif text-2xl font-bold text-navy">{title}</h1>
        <p className="mt-2 text-sm text-navy/70">{description}</p>

        {hidden ? (
          <p className="mt-5 rounded-2xl bg-light-turquoise p-4 text-sm leading-relaxed text-navy/80">
            {t("licensing.restrictedMessage")}
          </p>
        ) : (
          <>
            <p className="mt-5 text-sm leading-relaxed text-navy/80">{content}</p>

            <p className="mt-4 text-xs font-medium text-muted">
              {t(licensingStatusKey[resource.licensing.licenseStatus])}
              {isVerified && ` \u00b7 ${t("common.verifiedMetadataNotice")}`}
              {!isVerified && resource.licensing.contentOrigin === "original_demo" && ` \u00b7 ${t("common.demoNotice")}`}
            </p>

            {resource.sourceUrl && (
              <a
                href={resource.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-medium text-blue underline"
              >
                {t("common.sourceLink")}
              </a>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
}
