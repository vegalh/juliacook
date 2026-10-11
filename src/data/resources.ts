import type { Filters, Resource } from "../types";

// Prototype sample content. Titles noted as "official" come from the project brief;
// everything else is placeholder content for demonstration purposes only.
export const resources: Resource[] = [
  {
    id: "big-feelings-are-normal",
    title: "Big Feelings are Normal",
    description: "Julia explains why kids get angry and how to respond.",
    type: "video",
    topics: ["getting-angry"],
    skills: ["emotions"],
    settings: ["home", "classroom"],
    duration: "4:12",
    content:
      "In this short video, Julia walks through why anger shows up in kids and simple ways to respond in the moment.",
  },
  {
    id: "calm-down-toolbox",
    title: "Calm Down Toolbox",
    description: "A simple, hands-on activity you can do at home.",
    type: "activity",
    topics: ["getting-angry", "self-control"],
    skills: ["self-control", "emotions"],
    settings: ["home"],
    content:
      "Build a small box of calming tools together — a stress ball, a breathing card, and a favorite photo.",
  },
  {
    id: "my-mouth-is-a-volcano",
    title: "My Mouth Is a Volcano!",
    description: "A story about learning to manage the urge to interrupt.",
    type: "book",
    topics: ["interrupting"],
    skills: ["self-control", "communication"],
    settings: ["home", "classroom"],
    content:
      "Julia Cook's classic story helps kids understand why words need to wait their turn.",
  },
  {
    id: "feeling-thermometer",
    title: "Feeling Thermometer",
    description: "A visual tool to help kids identify and express feelings.",
    type: "printable",
    topics: ["getting-angry", "worry-anxiety"],
    skills: ["emotions"],
    settings: ["home", "classroom"],
    content:
      "Print and color this thermometer with your child to talk about how big a feeling is getting.",
  },
  {
    id: "breathing-buddies",
    title: "Breathing Buddies",
    description: "A calming breathing exercise for anxious moments.",
    type: "video",
    topics: ["worry-anxiety", "self-control"],
    skills: ["emotions", "self-control"],
    settings: ["home"],
    duration: "3:05",
    content: "A short guided breathing video kids can follow along with.",
  },
  {
    id: "waiting-my-turn",
    title: "Waiting My Turn Cards",
    description: "Simple cue cards to practice patience before speaking.",
    type: "printable",
    topics: ["interrupting"],
    skills: ["communication", "self-control"],
    settings: ["classroom"],
    content: "Print these cards to help kids practice waiting for a pause in conversation.",
  },
  {
    id: "listening-ears-game",
    title: "Listening Ears Game",
    description: "A quick game that rewards focused listening.",
    type: "activity",
    topics: ["not-listening"],
    skills: ["communication"],
    settings: ["home", "classroom"],
    content: "A playful way to practice listening the first time it's asked.",
  },
  {
    id: "the-worry-workbook",
    title: "The Worry Workbook",
    description: "Pages to help kids name and shrink their worries.",
    type: "book",
    topics: ["worry-anxiety"],
    skills: ["emotions"],
    settings: ["home"],
    content: "A gentle workbook that walks through common childhood worries.",
  },
  {
    id: "friendship-repair-kit",
    title: "Friendship Repair Kit",
    description: "Steps to help kids make up after a disagreement.",
    type: "activity",
    topics: ["friendship"],
    skills: ["friendship", "empathy"],
    settings: ["both"],
    content: "A simple framework kids can use to repair a friendship after a conflict.",
  },
  {
    id: "stand-up-stories",
    title: "Stand Up Stories",
    description: "Stories about recognizing and responding to bullying.",
    type: "book",
    topics: ["bullying"],
    skills: ["empathy", "communication"],
    settings: ["both"],
    content: "Stories that model what to do and say when bullying happens.",
  },
  {
    id: "kindness-jar",
    title: "Kindness Jar",
    description: "A visual way to track small acts of kindness.",
    type: "activity",
    topics: ["kindness"],
    skills: ["empathy"],
    settings: ["home", "classroom"],
    content: "Fill a jar with notes each time your child does something kind.",
  },
  {
    id: "ready-set-go-schedule",
    title: "Ready, Set, Go! Schedule Cards",
    description: "Visual cards to make transitions easier to predict.",
    type: "printable",
    topics: ["transitions"],
    skills: ["self-control", "communication"],
    settings: ["home", "classroom"],
    content: "Print and arrange these cards to preview the next transition.",
  },
];

export function getResourceById(id: string): Resource | undefined {
  return resources.find((r) => r.id === id);
}

export function resourcesForTopic(topicSlug: string, type?: Resource["type"]): Resource[] {
  return resources.filter(
    (r) => r.topics.includes(topicSlug) && (!type || r.type === type)
  );
}

export function searchResources(options: {
  query?: string;
  topic?: string | null;
  filters?: Filters;
}): Resource[] {
  const query = options.query?.trim().toLowerCase() ?? "";
  const topic = options.topic ?? null;
  const filters = options.filters;
  const queryWords = query.split(/\s+/).filter((w) => w.length > 2);

  return resources.filter((r) => {
    if (topic && !r.topics.includes(topic)) return false;

    if (query) {
      const topicWords = r.topics.map((t) => t.replace(/-/g, " ")).join(" ");
      const haystack = `${r.title} ${r.description} ${topicWords}`.toLowerCase();
      const matchesQuery = haystack.includes(query) || queryWords.some((w) => haystack.includes(w));
      if (!matchesQuery) return false;
    }

    if (filters?.types.length && !filters.types.includes(r.type)) return false;

    if (filters?.setting && !r.settings.includes(filters.setting) && !r.settings.includes("both")) {
      return false;
    }

    if (filters?.skills.length && !filters.skills.some((skill) => r.skills.includes(skill))) {
      return false;
    }

    return true;
  });
}
