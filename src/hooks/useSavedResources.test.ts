import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useSavedResources } from "./useSavedResources";

describe("useSavedResources", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts with nothing saved", () => {
    const { result } = renderHook(() => useSavedResources());
    expect(result.current.savedIds).toEqual([]);
    expect(result.current.isSaved("calm-down-toolbox")).toBe(false);
  });

  it("saves and un-saves an id, persisting across hook instances", () => {
    const { result } = renderHook(() => useSavedResources());

    act(() => result.current.toggleSaved("calm-down-toolbox"));
    expect(result.current.isSaved("calm-down-toolbox")).toBe(true);

    const second = renderHook(() => useSavedResources());
    expect(second.result.current.isSaved("calm-down-toolbox")).toBe(true);

    act(() => result.current.toggleSaved("calm-down-toolbox"));
    expect(result.current.isSaved("calm-down-toolbox")).toBe(false);
  });

  it("tracks multiple saved ids independently", () => {
    const { result } = renderHook(() => useSavedResources());
    act(() => {
      result.current.toggleSaved("situation:getting-angry");
      result.current.toggleSaved("calm-down-toolbox");
    });
    expect(result.current.savedIds).toHaveLength(2);
    expect(result.current.isSaved("situation:getting-angry")).toBe(true);
    expect(result.current.isSaved("calm-down-toolbox")).toBe(true);
  });
});
