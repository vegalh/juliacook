import { Image } from "lucide-react";
import { ViewerUnavailable } from "./ViewerUnavailable";

/** Reusable printable-poster image scaffold. See docs/frontend-content-components.md. */
export function PosterViewer({ title, src }: { title: string; src?: string }) {
  if (!src) {
    return <ViewerUnavailable icon={Image} title={title} />;
  }

  return (
    <div className="rounded-2xl bg-off-white p-3">
      <img src={src} alt={title} className="w-full rounded-xl" />
    </div>
  );
}
