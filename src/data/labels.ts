import type { ResourceType, Setting, Skill } from "../types";

export const typeLabels: Record<ResourceType, string> = {
  video: "Videos",
  activity: "Activities",
  book: "Books",
  printable: "Printables",
};

export const settingLabels: Record<Setting, string> = {
  home: "Home",
  classroom: "Classroom",
  both: "Both",
};

export const skillLabels: Record<Skill, string> = {
  emotions: "Emotions",
  communication: "Communication",
  friendship: "Friendship",
  "self-control": "Self-Control",
  empathy: "Empathy",
  "problem-solving": "Problem Solving",
};
