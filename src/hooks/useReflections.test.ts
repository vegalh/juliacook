import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useReflections } from "./useReflections";

describe("useReflections", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts empty", () => {
    const { result } = renderHook(() => useReflections());
    expect(result.current.reflections).toEqual([]);
  });

  it("saves a reflection scoped to a topic and persists it", () => {
    const { result } = renderHook(() => useReflections());

    act(() => result.current.saveReflection("getting-angry", "We practiced taking three deep breaths."));

    expect(result.current.reflectionsForTopic("getting-angry")).toHaveLength(1);
    expect(result.current.reflectionsForTopic("getting-angry")[0].note).toBe(
      "We practiced taking three deep breaths."
    );
    expect(result.current.reflectionsForTopic("sharing")).toHaveLength(0);
  });

  it("ignores blank/whitespace-only notes", () => {
    const { result } = renderHook(() => useReflections());
    act(() => result.current.saveReflection("getting-angry", "   "));
    expect(result.current.reflections).toHaveLength(0);
  });

  it("never stores a child name field (no PII collection)", () => {
    const { result } = renderHook(() => useReflections());
    act(() => result.current.saveReflection("getting-angry", "note"));
    const keys = Object.keys(result.current.reflections[0]);
    expect(keys).not.toContain("childName");
    expect(keys.sort()).toEqual(["note", "savedAt", "topicSlug"]);
  });
});
