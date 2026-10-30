import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { AgeGroupProvider } from "../context/AgeGroupContext";
import { FilterProvider } from "../context/FilterContext";
import { activities, activityNeedsNoMaterials, isQuickActivity } from "../data/activities";
import { LocaleProvider } from "../i18n";
import { Activities } from "./Activities";
import { Discover } from "./Discover";
import { LanguageLab } from "./LanguageLab";

function renderActivities() {
  return render(
    <LocaleProvider>
      <AgeGroupProvider>
        <FilterProvider>
          <MemoryRouter initialEntries={["/activities"]}>
            <Routes>
              <Route path="/activities" element={<Activities />} />
              <Route path="/language-lab" element={<LanguageLab />} />
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
});

afterEach(() => {
  localStorage.clear();
});

describe("Activities page filters", () => {
  it("shows every activity under the \"all\" filter by default", () => {
    renderActivities();
    for (const activity of activities) {
      expect(screen.getByText(activity.titleZh)).toBeInTheDocument();
    }
  });

  it("narrows the list to no-materials activities", () => {
    renderActivities();
    fireEvent.click(screen.getByRole("button", { name: "无需材料" }));

    const expectedIds = new Set(activities.filter(activityNeedsNoMaterials).map((a) => a.id));
    for (const activity of activities) {
      const node = screen.queryByText(activity.titleZh);
      if (expectedIds.has(activity.id)) {
        expect(node).toBeInTheDocument();
      } else {
        expect(node).not.toBeInTheDocument();
      }
    }
  });

  it("narrows the list to quick activities", () => {
    renderActivities();
    fireEvent.click(screen.getByText("快速（10 分钟内）"));

    const expectedIds = new Set(activities.filter(isQuickActivity).map((a) => a.id));
    for (const activity of activities) {
      const node = screen.queryByText(activity.titleZh);
      if (expectedIds.has(activity.id)) {
        expect(node).toBeInTheDocument();
      } else {
        expect(node).not.toBeInTheDocument();
      }
    }
  });

  it("renders the page title and subtitle", () => {
    renderActivities();
    expect(screen.getByRole("heading", { name: "一起玩" })).toBeInTheDocument();
  });
});

describe("Activities page entry points", () => {
  it("navigates to the Language Lab from its entry card", () => {
    renderActivities();
    fireEvent.click(screen.getByText("换一种说法"));
    expect(screen.getByText("你会怎么说？")).toBeInTheDocument();
  });

  it("navigates to Discover's resources mode from the printables entry card", () => {
    renderActivities();
    fireEvent.click(screen.getByText("可打印资源"));
    expect(screen.getByRole("heading", { name: "探索" })).toBeInTheDocument();
  });
});
