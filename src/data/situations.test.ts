import { describe, expect, it } from "vitest";
import { ageGroups } from "./ageGroups";
import { flagshipTopicSlugs, getSituation, resolveSituationContent, situations } from "./situations";

describe("situations data", () => {
  it("has exactly five flagship journeys", () => {
    expect(flagshipTopicSlugs).toHaveLength(5);
    expect(flagshipTopicSlugs).toEqual(
      expect.arrayContaining([
        "getting-angry",
        "interrupting",
        "sharing",
        "fear-of-failure",
        "friend-conflict",
      ])
    );
  });

  it("gives every flagship journey both younger and older age variants", () => {
    for (const slug of flagshipTopicSlugs) {
      const situation = getSituation(slug);
      expect(situation.ageVariants?.younger).toBeDefined();
      expect(situation.ageVariants?.older).toBeDefined();
    }
  });

  it("resolves different content for younger vs older buckets on a flagship journey", () => {
    const situation = getSituation("getting-angry");
    const younger = resolveSituationContent(situation, "younger");
    const older = resolveSituationContent(situation, "older");
    expect(younger.heading).not.toBe(older.heading);
  });

  it("falls back to default content for non-flagship topics", () => {
    const situation = getSituation("kindness");
    expect(situation.isFlagshipJourney).toBe(false);
    expect(resolveSituationContent(situation, "younger")).toBe(situation.default);
    expect(resolveSituationContent(situation, "older")).toBe(situation.default);
  });

  it("gives every flagship journey genuinely distinct guidance across all four age groups", () => {
    for (const slug of flagshipTopicSlugs) {
      const situation = getSituation(slug);
      expect(situation.understandByAge).toBeDefined();
      const texts = ageGroups.map((group) => situation.understandByAge?.[group]?.text);
      const textsZh = ageGroups.map((group) => situation.understandByAge?.[group]?.textZh);
      expect(texts.every(Boolean)).toBe(true);
      expect(textsZh.every(Boolean)).toBe(true);
      // Every age tier's wording should differ from every other tier's.
      expect(new Set(texts).size).toBe(ageGroups.length);
      expect(new Set(textsZh).size).toBe(ageGroups.length);
    }
  });

  it("never attributes original guidance to Julia Cook", () => {
    for (const situation of situations) {
      const haystack = JSON.stringify(situation);
      expect(haystack).not.toMatch(/Julia Cook/i);
    }
  });

  it("falls back to the first situation for an unknown slug", () => {
    expect(getSituation("not-a-real-topic")).toBe(situations[0]);
  });
});
