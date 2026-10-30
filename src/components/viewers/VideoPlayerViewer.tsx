import { Video } from "lucide-react";
import { ViewerUnavailable } from "./ViewerUnavailable";

/**
 * Reusable video player scaffold. Same honest-unavailable pattern as
 * `AudioPlayerViewer` — see docs/frontend-content-components.md.
 */
export function VideoPlayerViewer({ title, src, poster }: { title: string; src?: string; poster?: string }) {
  if (!src) {
    return <ViewerUnavailable icon={Video} title={title} />;
  }

  return (
    <div className="rounded-2xl bg-off-white p-4">
      <p className="mb-2 font-serif text-sm font-bold text-navy">{title}</p>
      <video controls preload="none" poster={poster} className="w-full rounded-xl">
        <source src={src} />
        <track kind="captions" />
      </video>
    </div>
  );
}
