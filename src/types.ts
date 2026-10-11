export type ResourceType = "video" | "activity" | "book" | "printable";

export type Setting = "home" | "classroom" | "both";

export type Skill =
  | "emotions"
  | "communication"
  | "friendship"
  | "self-control"
  | "empathy"
  | "problem-solving";

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  topics: string[];
  skills: Skill[];
  settings: Setting[];
  thumbnail?: string;
  duration?: string;
  content: string;
  relatedResources?: string[];
}

export interface Topic {
  slug: string;
  label: string;
}

export interface MomentContent {
  topicSlug: string;
  heading: string;
  whatToDo: string;
  trySaying: string;
}

export interface Filters {
  types: ResourceType[];
  setting: Setting | null;
  skills: Skill[];
}
