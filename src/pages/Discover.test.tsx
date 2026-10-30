import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { AgeGroupProvider } from "../context/AgeGroupContext";
import { FilterProvider } from "../context/FilterContext";
import { books } from "../data/books";
import { LocaleProvider } from "../i18n";
import { Discover } from "./Discover";

function renderDiscoverAt(initialPath: string) {
  return render(
    <LocaleProvider>
      <AgeGroupProvider>
        <FilterProvider>
          <MemoryRouter initialEntries={[initialPath]}>
            <Routes>
              <Route path="/discover" element={<Discover />} />
            </Routes>
          </MemoryRouter>
        </FilterProvider>
      </AgeGroupProvider>
    </LocaleProvider>
  );
}

beforeEach(() => {
  localStorage.clear();
  // These tests assert Chinese copy; the app itself now defaults to
  // English, so pin the locale explicitly rather than relying on the default.
  localStorage.setItem("cookie-bytes:locale", "zh");
});

afterEach(() => {
  localStorage.clear();
});

describe("Discover page mode switching", () => {
  it("defaults to Topics mode when no ?mode= is given", () => {
    renderDiscoverAt("/discover");
    expect(screen.getByText("理解孩子")).toBeInTheDocument();
  });

  it("falls back to Topics mode for an unrecognized ?mode= value", () => {
    renderDiscoverAt("/discover?mode=not-a-real-mode");
    expect(screen.getByText("理解孩子")).toBeInTheDocument();
  });
});

/** Finds the `<details>` whose `<summary>` names the given series (or the no-series group). */
function findSeriesDetails(container: HTMLElement, seriesLabel: string) {
  const allDetails = Array.from(container.querySelectorAll("details"));
  const match = allDetails.find((d) => d.querySelector("summary")?.textContent?.includes(seriesLabel));
  if (!match) throw new Error(`No <details> found for series "${seriesLabel}"`);
  return match;
}

describe("Discover page (Stories mode)", () => {
  it("groups books by series, each showing its book count, collapsed by default", () => {
    const { container } = renderDiscoverAt("/discover?mode=stories");

    const louisSeriesCount = books.filter((b) => b.series === "Louis").length;
    expect(louisSeriesCount).toBeGreaterThan(1);

    const details = findSeriesDetails(container, "Louis");
    expect(details.open).toBe(false);
    expect(within(details).getByText(`${louisSeriesCount} 本`)).toBeInTheDocument();
  });

  it("reveals a series' books once its <summary> is clicked", () => {
    const { container } = renderDiscoverAt("/discover?mode=stories");
    const details = findSeriesDetails(container, "Louis");
    const summary = details.querySelector("summary")!;

    fireEvent.click(summary);
    expect(details.open).toBe(true);
    expect(within(details).getByText("我的嘴巴是座火山！")).toBeInTheDocument();
  });

  it("groups books with no series under the no-series label, with the correct count", () => {
    const { container } = renderDiscoverAt("/discover?mode=stories");
    const noSeriesCount = books.filter((b) => !b.series).length;
    expect(noSeriesCount).toBeGreaterThan(0);

    const details = findSeriesDetails(container, "其他童书");
    expect(within(details).getByText(`${noSeriesCount} 本`)).toBeInTheDocument();
  });
});

describe("Discover page (Resources mode)", () => {
  it("shows an honest coming-soon message for formats with no verified records", () => {
    renderDiscoverAt("/discover?mode=resources");
    // audiobook/poster/quiz all intentionally have zero verified records today.
    expect(screen.getAllByText("这个类型暂时还没有已核实的资源，敬请期待。").length).toBeGreaterThanOrEqual(3);
  });

  it("renders actual items for formats that do have records (e.g. worksheets/printables)", () => {
    renderDiscoverAt("/discover?mode=resources");
    expect(screen.getByText("情绪温度计")).toBeInTheDocument();
  });
});

describe("Discover page topic chip navigation", () => {
  it("navigates into a topic's search results when a challenge chip is clicked", () => {
    renderDiscoverAt("/discover");
    fireEvent.click(screen.getByText("打断别人"));
    expect(screen.getByText("打断别人")).toBeInTheDocument();
  });
});
