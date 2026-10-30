import type { AgeBucket, AgeGroup } from "./data/ageGroups";
import type { SelCompetencyId } from "./data/selCompetencies";
import type { LicensingMetadata } from "./content/types";

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
  titleZh?: string;
  description: string;
  descriptionZh?: string;
  type: ResourceType;
  topics: string[];
  skills: Skill[];
  settings: Setting[];
  /** Age groups this resource is appropriate for. Omitted means "all ages". */
  ageGroups?: AgeGroup[];
  selCompetencies?: SelCompetencyId[];
  /** Languages the resource (or its verified metadata) is available in. */
  language?: ("zh" | "en")[];
  thumbnail?: string;
  duration?: string;
  content: string;
  contentZh?: string;
  relatedResources?: string[];
  /** Link to the original, verified Julia Cook resource, when one exists. */
  sourceUrl?: string;
  licensing: LicensingMetadata;
}

export interface Topic {
  slug: string;
  label: string;
  labelZh: string;
}

export interface TrySayingExample {
  lessHelpful: string;
  lessHelpfulZh: string;
  moreHelpful: string;
  moreHelpfulZh: string;
}

/** The age-independent (or single-age-bucket) content of a parenting situation. */
export interface SituationContent {
  heading: string;
  headingZh: string;
  understand: string;
  understandZh: string;
  /** Two or three realistic, concrete suggestions. */
  respond: string[];
  respondZh: string[];
  trySaying: TrySayingExample;
}

export interface ParentingSituation {
  topicSlug: string;
  selCompetencies: SelCompetencyId[];
  practiceActivityId?: string;
  reflectPrompt: string;
  reflectPromptZh: string;
  /** Used directly for non-flagship topics, and as a fallback for flagship ones. */
  default: SituationContent;
  /**
   * Age-aware content for the five flagship demonstration journeys. Populated
   * with two buckets ("younger": 3-6/6-10, "older": 10-12/13+) since parent
   * guidance mainly differs along that line, not across all four age groups.
   */
  ageVariants?: Partial<Record<AgeBucket, SituationContent>>;
  /** One of the five fully-authored demonstration journeys from the product brief. */
  isFlagshipJourney: boolean;
}

export interface Filters {
  types: ResourceType[];
  setting: Setting | null;
  skills: Skill[];
}

/** An original, practical parent/child activity shown in the Practice section. */
export interface Activity {
  id: string;
  title: string;
  titleZh: string;
  learningGoal: string;
  learningGoalZh: string;
  suggestedAge: AgeGroup[];
  timeRequired: string;
  timeRequiredZh: string;
  materials: string[];
  materialsZh: string[];
  instructions: string[];
  instructionsZh: string[];
  parentLanguage: string;
  parentLanguageZh: string;
  reflectionQuestions: string[];
  reflectionQuestionsZh: string[];
  selCompetencies: SelCompetencyId[];
  topics: string[];
  licensing: LicensingMetadata;
}
