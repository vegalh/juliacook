import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { LocaleProvider, useLocale } from "./LocaleContext";

function wrapper({ children }: { children: ReactNode }) {
  return <LocaleProvider>{children}</LocaleProvider>;
}

describe("LocaleContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("defaults to English", () => {
    const { result } = renderHook(() => useLocale(), { wrapper });
    expect(result.current.locale).toBe("en");
    expect(result.current.t("nav.home")).toBe("Home");
  });

  it("switches to Simplified Chinese and persists the choice", () => {
    const { result } = renderHook(() => useLocale(), { wrapper });
    act(() => result.current.setLocale("zh"));
    expect(result.current.locale).toBe("zh");
    expect(result.current.t("nav.home")).toBe("首页");
    expect(localStorage.getItem("cookie-bytes:locale")).toBe("zh");
  });

  it("switches to English and persists the choice", () => {
    const { result } = renderHook(() => useLocale(), { wrapper });
    act(() => result.current.setLocale("en"));
    expect(result.current.locale).toBe("en");
    expect(result.current.t("nav.home")).toBe("Home");
    expect(localStorage.getItem("cookie-bytes:locale")).toBe("en");
  });

  it("interpolates params into translated strings", () => {
    const { result } = renderHook(() => useLocale(), { wrapper });
    const withParam = result.current.t("common.resultsCount", { count: 3 });
    expect(withParam).toContain("3");
  });

  it("falls back to returning the key when a translation is missing", () => {
    const { result } = renderHook(() => useLocale(), { wrapper });
    // @ts-expect-error -- intentionally passing an invalid key to test the fallback path.
    expect(result.current.t("not.a.real.key")).toBe("not.a.real.key");
  });

  it("throws when used outside a LocaleProvider", () => {
    expect(() => renderHook(() => useLocale())).toThrow(/LocaleProvider/);
  });
});
