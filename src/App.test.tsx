import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import App from "./App";
import { AgeGroupProvider } from "./context/AgeGroupContext";
import { LocaleProvider } from "./i18n";

/**
 * Exercises the backward-compatible redirects declared in `App.tsx` by
 * pushing a legacy URL onto `window.history` before mounting the real
 * `<App />` (with its own `BrowserRouter`), then asserting where the browser
 * ends up. This is the only page/route combination that needs a real
 * `BrowserRouter` instead of a `MemoryRouter`, since `App` instantiates its
 * own router rather than accepting one as a prop.
 */
function renderAppAt(path: string) {
  window.history.pushState({}, "", `${path}`);
  return render(
    <LocaleProvider>
      <AgeGroupProvider>
        <App />
      </AgeGroupProvider>
    </LocaleProvider>
  );
}

beforeEach(() => {
  localStorage.clear();
  // These tests assert Chinese heading text; the app itself now defaults to
  // English, so pin the locale explicitly rather than relying on the default.
  localStorage.setItem("cookie-bytes:locale", "zh");
});

afterEach(() => {
  localStorage.clear();
});

describe("backward-compatible route redirects", () => {
  it("redirects /learn to /discover?mode=topics", () => {
    renderAppAt("/learn");
    expect(window.location.pathname).toBe("/discover");
    expect(window.location.search).toBe("?mode=topics");
    expect(screen.getByRole("heading", { name: "探索" })).toBeInTheDocument();
  });

  it("redirects /practice to /activities", () => {
    renderAppAt("/practice");
    expect(window.location.pathname).toBe("/activities");
    expect(screen.getByRole("heading", { name: "一起玩" })).toBeInTheDocument();
  });

  it("redirects /practice/:id to /activities/:id, preserving the id", () => {
    renderAppAt("/practice/calm-down-toolbox-activity");
    expect(window.location.pathname).toBe("/activities/calm-down-toolbox-activity");
    expect(screen.getByRole("heading", { name: "冷静工具箱" })).toBeInTheDocument();
  });

  it("redirects /library to /discover while preserving the query string", () => {
    renderAppAt("/library?q=volcano");
    expect(window.location.pathname).toBe("/discover");
    expect(window.location.search).toBe("?q=volcano");
  });

  it("redirects /explore to /discover", () => {
    renderAppAt("/explore");
    expect(window.location.pathname).toBe("/discover");
  });

  it("redirects /explore/results to /discover", () => {
    renderAppAt("/explore/results");
    expect(window.location.pathname).toBe("/discover");
  });

  it("redirects /profile to /my", () => {
    renderAppAt("/profile");
    expect(window.location.pathname).toBe("/my");
  });

  it("redirects /more to /my", () => {
    renderAppAt("/more");
    expect(window.location.pathname).toBe("/my");
  });

  it("redirects /saved to /my?tab=saved", () => {
    renderAppAt("/saved");
    expect(window.location.pathname).toBe("/my");
    expect(window.location.search).toBe("?tab=saved");
  });

  it("redirects /moment/:topic to /situation/:topic", () => {
    renderAppAt("/moment/getting-angry");
    expect(window.location.pathname).toBe("/situation/getting-angry");
  });

  it("redirects an unknown path to the home page", () => {
    renderAppAt("/this-route-does-not-exist");
    expect(window.location.pathname).toBe("/");
    expect(screen.getByText("你会怎么说？")).toBeInTheDocument();
  });
});
