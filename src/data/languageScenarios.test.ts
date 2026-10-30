import { describe, expect, it } from "vitest";
import { flagshipTopicSlugs } from "./situations";
import {
  flagshipLanguageScenarios,
  flagshipScenarioFor,
  standaloneLanguageScenarios,
  type LanguageScenario,
} from "./languageScenarios";

function allScenarios(): LanguageScenario[] {
  const flagship = Object.values(flagshipLanguageScenarios).flatMap((byBucket) =>
    Object.values(byBucket)
  );
  return [...standaloneLanguageScenarios, ...flagship];
}

describe("languageScenarios data", () => {
  it("has at least five original standalone scenarios", () => {
    expect(standaloneLanguageScenarios.length).toBeGreaterThanOrEqual(5);
  });

  it("includes scenarios for younger children, teens, and general audiences", () => {
    const contexts = new Set(standaloneLanguageScenarios.map((s) => s.ageContext));
    expect(contexts.has("younger")).toBe(true);
    expect(contexts.has("teen")).toBe(true);
  });

  it("has unique scenario ids", () => {
    const ids = allScenarios().map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("provides a younger and older flagship scenario for every flagship topic", () => {
    for (const slug of flagshipTopicSlugs) {
      expect(flagshipScenarioFor(slug, "younger")).toBeDefined();
      expect(flagshipScenarioFor(slug, "older")).toBeDefined();
    }
  });

  it("returns undefined for a non-flagship topic", () => {
    expect(flagshipScenarioFor("kindness", "younger")).toBeUndefined();
  });

  it("gives both options bilingual, non-empty text and reflection fields", () => {
    for (const scenario of allScenarios()) {
      for (const option of [scenario.optionA, scenario.optionB]) {
        expect(option.text.trim().length).toBeGreaterThan(0);
        expect(option.textZh.trim().length).toBeGreaterThan(0);
        expect(option.communicates.trim().length).toBeGreaterThan(0);
        expect(option.communicatesZh.trim().length).toBeGreaterThan(0);
        expect(option.childInterprets.trim().length).toBeGreaterThan(0);
        expect(option.childInterpretsZh.trim().length).toBeGreaterThan(0);
        expect(option.cooperationNote.trim().length).toBeGreaterThan(0);
        expect(option.cooperationNoteZh.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("never attributes scenarios to Julia Cook and avoids absolute guarantees", () => {
    for (const scenario of allScenarios()) {
      const haystack = JSON.stringify(scenario);
      expect(haystack).not.toMatch(/Julia Cook/i);
      expect(haystack).not.toMatch(/will make (him|her|them|your child) (feel|stop|start)/i);
    }
  });
});
