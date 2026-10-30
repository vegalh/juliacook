import type { Topic } from "../types";
import { matchTopicFromQuery, topicMappings } from "./topicMappings";

// Parent-friendly topics (the UI layer) are derived from the verified topic
// mapping data so there is a single source of truth for topic slugs/labels.
export const topics: Topic[] = topicMappings.map(({ slug, label, labelZh }) => ({
  slug,
  label,
  labelZh,
}));

export const homeExamples: { slug: string; label: string; labelZh: string }[] = [
  { slug: "getting-angry", label: "Getting angry", labelZh: "孩子总是发脾气" },
  { slug: "sharing", label: "Won't share", labelZh: "孩子不愿意分享" },
  { slug: "interrupting", label: "Interrupting", labelZh: "孩子总是打断别人" },
  { slug: "fear-of-failure", label: "Afraid to fail", labelZh: "孩子害怕失败" },
  { slug: "friend-conflict", label: "Fighting with friends", labelZh: "孩子和朋友吵架" },
  { slug: "excluded-by-peers", label: "Excluded by peers", labelZh: "孩子被同学排挤" },
  { slug: "school-reluctance", label: "Reluctant about school", labelZh: "孩子不愿意上学" },
  { slug: "procrastination", label: "Always procrastinating", labelZh: "孩子总是拖延" },
  { slug: "low-confidence", label: "Lacks confidence", labelZh: "孩子缺乏自信" },
  {
    slug: "teen-communication",
    label: "Teen won't communicate",
    labelZh: "青少年不愿意和父母沟通",
  },
];

export function topicLabel(slug: string, locale: "zh" | "en" = "en"): string {
  const topic = topics.find((t) => t.slug === slug);
  if (!topic) return locale === "zh" ? "这个情况" : "This Moment";
  return locale === "zh" ? topic.labelZh : topic.label;
}

/**
 * Matches free-text input (Chinese or English) to the closest known topic
 * slug, or `null` when nothing matches. Callers must not silently fall back
 * to an unrelated default topic on `null` — route the parent to an honest
 * search-results/no-results state instead (see `Home.tsx`'s `goToSituation`).
 */
export { matchTopicFromQuery };
