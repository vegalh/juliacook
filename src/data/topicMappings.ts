// Educational topic names are verified against the live tag cloud at
// https://juliacookonline.com/search-by-topic/ (fetched 2026-10-11).
// Parent-friendly topics are the simplified labels shown in the app's UI.
export interface TopicMapping {
  slug: string;
  label: string;
  /** Verified Julia Cook educational topic tags this parent-friendly topic maps to. */
  educationalTopics: string[];
  /** Everyday parent language used to match free-text search queries to this topic. */
  keywords: string[];
}

export const topicMappings: TopicMapping[] = [
  {
    slug: "getting-angry",
    label: "Getting Angry",
    educationalTopics: [
      "anger",
      "anger control",
      "anger management",
      "temper",
      "tantrum",
      "temper tantrum",
      "emotional regulation",
    ],
    keywords: [
      "angry",
      "anger",
      "mad",
      "yelling",
      "yells",
      "yell",
      "shouting",
      "tantrum",
      "temper",
      "furious",
      "rage",
      "meltdown",
    ],
  },
  {
    slug: "interrupting",
    label: "Interrupting",
    educationalTopics: [
      "listening",
      "following instructions",
      "communication",
      "impulse control",
      "impulsivity",
    ],
    keywords: [
      "interrupt",
      "interrupting",
      "interrupts",
      "talks over",
      "talking over",
      "cant wait",
      "can't wait",
      "blurts",
      "blurting",
    ],
  },
  {
    slug: "bullying",
    label: "Bullying",
    educationalTopics: ["bullying", "bully prevention", "mean girls"],
    keywords: ["bully", "bullying", "bullied", "picked on", "teasing", "teased", "mean kids"],
  },
  {
    slug: "not-listening",
    label: "Not Listening",
    educationalTopics: [
      "listening",
      "following instructions",
      "communication",
      "paying attention",
      "focusing",
    ],
    keywords: [
      "listen",
      "listening",
      "doesnt listen",
      "doesn't listen",
      "wont listen",
      "won't listen",
      "ignores me",
      "ignoring",
      "not paying attention",
      "tunes out",
    ],
  },
  {
    slug: "worry-anxiety",
    label: "Worry & Anxiety",
    educationalTopics: ["anxiety", "worry", "stress", "fret", "mindfulness"],
    keywords: [
      "worry",
      "worried",
      "anxious",
      "anxiety",
      "scared",
      "nervous",
      "stressed",
      "stress",
      "afraid",
      "fret",
    ],
  },
  {
    slug: "friendship",
    label: "Friendship",
    educationalTopics: ["friendship", "building relationships", "getting along", "sharing"],
    keywords: [
      "friend",
      "friends",
      "friendship",
      "doesnt share",
      "doesn't share",
      "sharing",
      "no friends",
      "getting along",
    ],
  },
  {
    slug: "self-control",
    label: "Self-Control",
    educationalTopics: ["self-control", "self-regulation", "impulse control", "control"],
    keywords: [
      "self control",
      "self-control",
      "impulsive",
      "impulse",
      "cant control",
      "can't control",
      "loses control",
      "out of control",
    ],
  },
  {
    slug: "kindness",
    label: "Kindness",
    educationalTopics: ["kindness", "empathy", "good sportsmanship"],
    keywords: ["kind", "kindness", "unkind", "mean", "not nice", "empathy"],
  },
  {
    slug: "transitions",
    label: "Transitions",
    educationalTopics: ["flexibility", "looking ahead"],
    keywords: [
      "transition",
      "transitions",
      "change",
      "changes",
      "switching",
      "schedule",
      "new routine",
    ],
  },
];

function normalize(text: string): string {
  return text.trim().toLowerCase().replace(/['']/g, "");
}

/** Resolves free-text parent input to the best-matching parent-friendly topic slug, or null. */
export function matchTopicFromQuery(query: string): string | null {
  const q = normalize(query);
  if (!q) return null;

  let bestSlug: string | null = null;
  let bestScore = 0;

  for (const mapping of topicMappings) {
    let score = 0;
    if (q === normalize(mapping.label)) score += 10;
    for (const keyword of mapping.keywords) {
      if (q.includes(normalize(keyword))) score += 2;
    }
    if (q.includes(mapping.slug.replace(/-/g, " "))) score += 3;
    if (score > bestScore) {
      bestScore = score;
      bestSlug = mapping.slug;
    }
  }

  return bestSlug;
}

export function getMapping(slug: string): TopicMapping | undefined {
  return topicMappings.find((m) => m.slug === slug);
}
