import type { Topic } from "../types";

export const topics: Topic[] = [
  { slug: "getting-angry", label: "Getting Angry" },
  { slug: "interrupting", label: "Interrupting" },
  { slug: "bullying", label: "Bullying" },
  { slug: "not-listening", label: "Not Listening" },
  { slug: "worry-anxiety", label: "Worry & Anxiety" },
  { slug: "friendship", label: "Friendship" },
  { slug: "self-control", label: "Self-Control" },
  { slug: "kindness", label: "Kindness" },
  { slug: "transitions", label: "Transitions" },
];

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
  const q = query.trim().toLowerCase();
  if (!q) return "getting-angry";

  const keywordMap: Record<string, string> = {
    angry: "getting-angry",
    anger: "getting-angry",
    mad: "getting-angry",
    interrupt: "interrupting",
    bully: "bullying",
    bullying: "bullying",
    listen: "not-listening",
    worry: "worry-anxiety",
    anxious: "worry-anxiety",
    anxiety: "worry-anxiety",
    friend: "friendship",
    control: "self-control",
    kind: "kindness",
    transition: "transitions",
    change: "transitions",
  };

  for (const [keyword, slug] of Object.entries(keywordMap)) {
    if (q.includes(keyword)) return slug;
  }

  const found = topics.find(
    (t) => q.includes(t.slug.replace(/-/g, " ")) || q.includes(t.label.toLowerCase())
  );
  return found?.slug ?? "getting-angry";
}
