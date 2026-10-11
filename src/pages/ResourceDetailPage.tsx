import { ArrowLeft, BookOpen, Play, Printer, Puzzle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { Header } from "../components/Header";
import { SaveButton } from "../components/SaveButton";
import { getResourceById } from "../data/resources";
import { useSavedResources } from "../hooks/useSavedResources";
import type { Resource } from "../types";

const typeIcon: Record<Resource["type"], typeof Play> = {
  video: Play,
  activity: Puzzle,
  book: BookOpen,
  printable: Printer,
};

export function ResourceDetailPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { isSaved, toggleSaved } = useSavedResources();
  const resource = getResourceById(id);

  if (!resource) {
    return (
      <AppLayout>
        <Header
          left={
            <button type="button" aria-label="Back" onClick={() => navigate(-1)} className="text-navy">
              <ArrowLeft size={24} />
            </button>
          }
        />
        <p className="px-5 text-sm text-muted">This resource could not be found.</p>
      </AppLayout>
    );
  }

  const Icon = typeIcon[resource.type];

  return (
    <AppLayout>
      <Header
        left={
          <button type="button" aria-label="Back" onClick={() => navigate(-1)} className="text-navy">
            <ArrowLeft size={24} />
          </button>
        }
        right={<SaveButton saved={isSaved(resource.id)} onClick={() => toggleSaved(resource.id)} />}
      />

      <div className="px-5 pt-2 pb-8">
        <div className="flex h-40 items-center justify-center rounded-3xl bg-light-blue text-blue">
          <Icon size={48} strokeWidth={1.3} />
        </div>

        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">
          {resource.type}
        </p>
        <h1 className="mt-1 font-serif text-2xl font-bold text-navy">{resource.title}</h1>
        <p className="mt-2 text-sm text-navy/70">{resource.description}</p>

        <p className="mt-5 text-sm leading-relaxed text-navy/80">{resource.content}</p>

        {resource.sourceUrl && (
          <a
            href={resource.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block text-sm font-medium text-blue underline"
          >
            View on juliacookonline.com
          </a>
        )}
      </div>
    </AppLayout>
  );
}
