import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { AgeGroupProvider, useAgeGroup } from "./AgeGroupContext";

function wrapper({ children }: { children: ReactNode }) {
  return <AgeGroupProvider>{children}</AgeGroupProvider>;
}

describe("AgeGroupContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("defaults to the 6-10 age group / younger bucket", () => {
    const { result } = renderHook(() => useAgeGroup(), { wrapper });
    expect(result.current.ageGroup).toBe("6-10");
    expect(result.current.ageBucket).toBe("younger");
  });

  it("resolves the older bucket for 10-12 and 13+ groups", () => {
    const { result } = renderHook(() => useAgeGroup(), { wrapper });
    act(() => result.current.setAgeGroup("10-12"));
    expect(result.current.ageBucket).toBe("older");

    act(() => result.current.setAgeGroup("13+"));
    expect(result.current.ageBucket).toBe("older");
  });

  it("resolves the younger bucket for 3-6", () => {
    const { result } = renderHook(() => useAgeGroup(), { wrapper });
    act(() => result.current.setAgeGroup("3-6"));
    expect(result.current.ageBucket).toBe("younger");
  });

  it("persists the selection to localStorage", () => {
    const { result } = renderHook(() => useAgeGroup(), { wrapper });
    act(() => result.current.setAgeGroup("13+"));
    expect(localStorage.getItem("cookie-bytes:age-group")).toBe("13+");
  });
});
