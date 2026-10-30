import { getContentProvider } from "../content/ContentProvider";
import type { Activity, Resource } from "../types";
import { activities } from "./activities";
import { bookResources, type BookResource } from "./books";

/**
 * The resource-format taxonomy used by Discover's "按资源 / Resources" tab.
 * This is a *display* grouping over the existing `Resource`, `Activity`, and
 * `BookResource` records — it introduces no new data fields, so adding a
 * format here never means fabricating a record. "audiobook", "poster", and
 * "quiz" currently have zero matching records; the UI must show that
 * honestly (a "coming soon" state), never hide the category or invent an
 * item to fill it.
 */
export type ResourceFormatKey =
  | "audiobook"
  | "video"
  | "worksheet"
  | "poster"
  | "quiz"
  | "activity"
  | "parentGuidance";

export const RESOURCE_FORMAT_ORDER: ResourceFormatKey[] = [
  "audiobook",
  "video",
  "worksheet",
  "poster",
  "quiz",
  "activity",
  "parentGuidance",
];

export type ResourceFormatItem =
  | { kind: "resource"; id: string; resource: Resource }
  | { kind: "activity"; id: string; activity: Activity }
  | { kind: "bookResource"; id: string; bookResource: BookResource };

/** Returns the real, verified items that belong to a given resource format. */
export function resourceFormatItems(key: ResourceFormatKey): ResourceFormatItem[] {
  const resources = getContentProvider().listResources();

  switch (key) {
    case "video":
      return [
        ...resources
          .filter((r) => r.type === "video")
          .map((resource): ResourceFormatItem => ({ kind: "resource", id: resource.id, resource })),
        ...bookResources
          .filter((r) => r.kind === "official_video_channel")
          .map((bookResource): ResourceFormatItem => ({ kind: "bookResource", id: bookResource.id, bookResource })),
      ];
    case "activity":
      return [
        ...resources
          .filter((r) => r.type === "activity")
          .map((resource): ResourceFormatItem => ({ kind: "resource", id: resource.id, resource })),
        ...activities.map((activity): ResourceFormatItem => ({ kind: "activity", id: activity.id, activity })),
        ...bookResources
          .filter((r) => r.kind === "activity_book")
          .map((bookResource): ResourceFormatItem => ({ kind: "bookResource", id: bookResource.id, bookResource })),
      ];
    case "worksheet":
      return [
        ...resources
          .filter((r) => r.type === "printable")
          .map((resource): ResourceFormatItem => ({ kind: "resource", id: resource.id, resource })),
        ...bookResources
          .filter((r) => r.kind === "titles_topics_pdf" || r.kind === "classroom_order_form")
          .map((bookResource): ResourceFormatItem => ({ kind: "bookResource", id: bookResource.id, bookResource })),
      ];
    case "parentGuidance":
      return bookResources
        .filter((r) => r.kind === "newsletter")
        .map((bookResource): ResourceFormatItem => ({ kind: "bookResource", id: bookResource.id, bookResource }));
    case "audiobook":
    case "poster":
    case "quiz":
      // No verified records of this format exist yet. Returning an empty
      // list (rather than fabricating one) is intentional — see module doc.
      return [];
  }
}
