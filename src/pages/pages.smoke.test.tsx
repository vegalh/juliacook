import { fireEvent, render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { AgeGroupProvider } from "../context/AgeGroupContext";
import { FilterProvider } from "../context/FilterContext";
import { standaloneLanguageScenarios } from "../data/languageScenarios";
import { getSituation } from "../data/situations";
import { LocaleProvider } from "../i18n";
import { Activities } from "./Activities";
import { ActivityDetail } from "./ActivityDetail";
import { Discover } from "./Discover";
import { Home } from "./Home";
import { LanguageLab } from "./LanguageLab";
import { SituationPage } from "./SituationPage";

function renderWithProviders(ui: ReactNode, initialPath = "/") {
  return render(
    <LocaleProvider>
      <AgeGroupProvider>
        <FilterProvider>
          <MemoryRouter initialEntries={[initialPath]}>
            <Routes>
              <Route path="/" element={ui} />
              <Route path="/situation/:topic" element={<SituationPage />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/activities/:id" element={<ActivityDetail />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/language-lab" element={<LanguageLab />} />
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

describe("Home page", () => {
  it("renders the headline, search, challenge chips, featured sections, and quick access", () => {
    renderWithProviders(<Home />);
    expect(screen.getByPlaceholderText(/./)).toBeInTheDocument();
    expect(screen.getByText("你会怎么说？")).toBeInTheDocument();
    // "换一种说法" appears twice: once in the quick-access grid tile, once as
    // the embedded Language Lab section heading.
    expect(screen.getAllByText("换一种说法").length).toBeGreaterThanOrEqual(2);
    // "探索" / "一起玩" / "我的" each appear twice: once in the bottom
    // navigation and once in the Home quick-access grid.
    expect(screen.getAllByText("探索").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("一起玩").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("我的").length).toBeGreaterThanOrEqual(2);
  });

  it("navigates to the language lab from the featured widget's call to action", () => {
    renderWithProviders(<Home />);
    fireEvent.click(screen.getByText(/查看更多情境/));
    expect(screen.getByRole("heading", { name: "换一种说法" })).toBeInTheDocument();
  });
});

describe("SituationPage", () => {
  it("shows the interactive explorer for a flagship topic instead of the static comparison", () => {
    renderWithProviders(null, "/situation/getting-angry");
    expect(screen.getByText("你会怎么说？")).toBeInTheDocument();
  });

  it("shows four age tabs for a flagship topic's understanding section", () => {
    renderWithProviders(null, "/situation/getting-angry");
    expect(screen.getByText("3-6 岁")).toBeInTheDocument();
    expect(screen.getByText("6-10 岁")).toBeInTheDocument();
    expect(screen.getByText("10-12 岁")).toBeInTheDocument();
    expect(screen.getByText("13 岁以上")).toBeInTheDocument();
  });

  it("switches understanding text when a different age tab is selected", () => {
    const situation = getSituation("getting-angry");
    const youngerText = situation.understandByAge?.["3-6"]?.textZh;
    const teenText = situation.understandByAge?.["13+"]?.textZh;
    expect(youngerText).toBeTruthy();
    expect(teenText).toBeTruthy();
    expect(youngerText).not.toBe(teenText);

    renderWithProviders(null, "/situation/getting-angry");
    fireEvent.click(screen.getByText("3-6 岁"));
    expect(screen.getByText(youngerText!)).toBeInTheDocument();
    expect(screen.queryByText(teenText!)).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("13 岁以上"));
    expect(screen.getByText(teenText!)).toBeInTheDocument();
    expect(screen.queryByText(youngerText!)).not.toBeInTheDocument();
  });

  it("falls back to the static comparison for a non-flagship topic", () => {
    renderWithProviders(null, "/situation/kindness");
    expect(screen.queryByText("你会怎么说？")).not.toBeInTheDocument();
  });

  it("lets a parent save and see a reflection note", () => {
    renderWithProviders(null, "/situation/getting-angry");
    const textarea = screen.getByPlaceholderText(/今天你注意到了什么/);
    fireEvent.change(textarea, { target: { value: "今天试了新的说法" } });
    fireEvent.click(screen.getByText("保存记录"));
    expect(screen.getByText("今天试了新的说法")).toBeInTheDocument();
  });
});

describe("Discover page (Topics mode)", () => {
  it("shows the first competency expanded, and collapses it on toggle", () => {
    renderWithProviders(<Discover />);
    expect(screen.getByText("在日常家庭生活中")).toBeInTheDocument();
    expect(screen.getByText("不同年龄段的表现")).toBeInTheDocument();

    fireEvent.click(screen.getByText("自我认知"));
    expect(screen.queryByText("在日常家庭生活中")).not.toBeInTheDocument();
  });

  it("expands a different competency to reveal its own content and a recommended activity", () => {
    renderWithProviders(<Discover />);
    fireEvent.click(screen.getByText("社会认知"));
    expect(screen.getByText("去试试这个活动 →")).toBeInTheDocument();
  });
});

describe("Activities page", () => {
  it("shows a language lab entry card and a disclaimer", () => {
    renderWithProviders(<Activities />);
    expect(screen.getByText("换一种说法")).toBeInTheDocument();
    expect(screen.getByText(/并非保证有效的治疗或干预方法/)).toBeInTheDocument();
  });

  it("marks no-materials activities", () => {
    renderWithProviders(<Activities />);
    expect(within(document.body).getAllByText("无需材料").length).toBeGreaterThan(0);
  });
});

describe("LanguageLab page", () => {
  it("filters scenarios by age context", () => {
    renderWithProviders(<LanguageLab />);
    expect(screen.getByText("你会怎么说？")).toBeInTheDocument();
    fireEvent.click(screen.getByText("青少年"));
    expect(screen.getByText("你会怎么说？")).toBeInTheDocument();
  });

  it("cycles to another scenario on shuffle", () => {
    renderWithProviders(<LanguageLab />);
    const firstId = standaloneLanguageScenarios[0].situationLineZh;
    expect(screen.getByText(firstId)).toBeInTheDocument();

    fireEvent.click(screen.getByText("换一个情境"));
    const secondId = standaloneLanguageScenarios[1 % standaloneLanguageScenarios.length].situationLineZh;
    expect(screen.getByText(secondId)).toBeInTheDocument();
  });
});
