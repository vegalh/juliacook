import type { Topic } from "../types";
import { matchTopicFromQuery, topicMappings } from "./topicMappings";

// Parent-friendly topics (the UI layer) are derived from the verified topic
// mapping data so there is a single source of truth for topic slugs/labels.
export const topics: Topic[] = topicMappings.map(({ slug, label }) => ({ slug, label }));

export const homeExamples: { slug: string; label: string }[] = [
  { slug: "getting-angry", label: "Getting angry" },
  { slug: "interrupting", label: "Interrupting" },
  { slug: "worry-anxiety", label: "Worried or anxious" },
  { slug: "not-listening", label: "Not listening" },
];

export function topicLabel(slug: string): string {
  return topics.find((t) => t.slug === slug)?.label ?? "This Moment";
}

/** Matches free-text input to the closest known topic slug. */
export function matchTopic(query: string): string {
  return matchTopicFromQuery(query) ?? "getting-angry";
}
