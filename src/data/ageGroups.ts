export type AgeGroup = "3-6" | "6-10" | "10-12" | "13+";

export const ageGroups: AgeGroup[] = ["3-6", "6-10", "10-12", "13+"];

/**
 * Content for the five flagship situations is authored in two buckets rather
 * than four, since the practical difference in parent guidance is mostly
 * "younger child" vs "older child/teen". The age-group selector itself still
 * exposes all four groups for filtering activities/resources.
 */
export type AgeBucket = "younger" | "older";

export function ageBucketFor(ageGroup: AgeGroup): AgeBucket {
  return ageGroup === "3-6" || ageGroup === "6-10" ? "younger" : "older";
}
