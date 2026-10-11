import type { MomentContent } from "../types";

export const moments: Record<string, MomentContent> = {
  "getting-angry": {
    topicSlug: "getting-angry",
    heading: "My child\nis getting angry",
    whatToDo: "Stay calm and connect before you correct.",
    trySaying: "I can see you're really upset. I'm here with you.",
  },
  interrupting: {
    topicSlug: "interrupting",
    heading: "My child\nkeeps interrupting",
    whatToDo: "Give them a signal instead of a scolding.",
    trySaying: "I want to hear you. Can you wait for a pause?",
  },
  "worry-anxiety": {
    topicSlug: "worry-anxiety",
    heading: "My child\nis worried or anxious",
    whatToDo: "Name the feeling before you try to fix it.",
    trySaying: "It's okay to feel worried. Let's breathe together.",
  },
  "not-listening": {
    topicSlug: "not-listening",
    heading: "My child\nisn't listening",
    whatToDo: "Get on their level before you ask again.",
    trySaying: "I need your eyes for a second. Can you look at me?",
  },
  bullying: {
    topicSlug: "bullying",
    heading: "My child\nis dealing with bullying",
    whatToDo: "Listen first and reassure them it's not their fault.",
    trySaying: "Thank you for telling me. We'll figure this out together.",
  },
  friendship: {
    topicSlug: "friendship",
    heading: "My child\nis struggling with friendships",
    whatToDo: "Help them name what a good friend looks like.",
    trySaying: "What do you think a good friend would do here?",
  },
  "self-control": {
    topicSlug: "self-control",
    heading: "My child\nneeds help with self-control",
    whatToDo: "Offer a calming strategy before the moment escalates.",
    trySaying: "Let's take three big breaths together, right now.",
  },
  kindness: {
    topicSlug: "kindness",
    heading: "My child\nis working on kindness",
    whatToDo: "Point out small, kind choices as they happen.",
    trySaying: "That was a kind thing to do. How did it feel?",
  },
  transitions: {
    topicSlug: "transitions",
    heading: "My child\nstruggles with transitions",
    whatToDo: "Give a heads-up before the change happens.",
    trySaying: "In five minutes, we're going to clean up. I'll remind you.",
  },
};

export function getMoment(slug: string): MomentContent {
  return moments[slug] ?? moments["getting-angry"];
}
