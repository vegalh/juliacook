import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { AgeGroupProvider } from "../context/AgeGroupContext";
import { LocaleProvider } from "../i18n";
import { MySpace } from "./MySpace";
import { SituationPage } from "./SituationPage";

const SAVED_KEY = "cookie-bytes:saved-resources";
const RECENT_KEY = "cookie-bytes:recently-viewed";
const REFLECTIONS_KEY = "cookie-bytes:reflections";

function renderMySpaceAt(initialPath = "/my") {
  return render(
    <LocaleProvider>
      <AgeGroupProvider>
        <MemoryRouter initialEntries={[initialPath]}>
          <Routes>
            <Route path="/my" element={<MySpace />} />
            <Route path="/situation/:topic" element={<SituationPage />} />
          </Routes>
        </MemoryRouter>
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

describe("My Space saved tab", () => {
  it("shows the empty state when nothing is saved", () => {
    renderMySpaceAt();
    expect(screen.getByText("收藏的情况、故事和活动会显示在这里。")).toBeInTheDocument();
  });

  it("reconstructs all four kinds of saved items from their prefixed ids", () => {
    localStorage.setItem(
      SAVED_KEY,
      JSON.stringify([
        "situation:getting-angry",
        "book:my-mouth-is-a-volcano",
        "activity:calm-down-toolbox-activity",
        "feeling-thermometer",
      ])
    );
    renderMySpaceAt();

    expect(screen.getByText("收藏的情况")).toBeInTheDocument();
    expect(screen.getByText(/孩子一生气就/)).toBeInTheDocument();

    expect(screen.getByText("收藏的故事")).toBeInTheDocument();
    expect(screen.getByText("我的嘴巴是座火山！")).toBeInTheDocument();

    expect(screen.getByText("收藏的活动")).toBeInTheDocument();
    expect(screen.getByText("冷静工具箱")).toBeInTheDocument();

    expect(screen.getByText("收藏的资源")).toBeInTheDocument();
    expect(screen.getByText("情绪温度计")).toBeInTheDocument();
  });

  it("navigates to a saved situation's page when clicked", () => {
    localStorage.setItem(SAVED_KEY, JSON.stringify(["situation:getting-angry"]));
    renderMySpaceAt();
    fireEvent.click(screen.getByText(/孩子一生气就/));
    expect(screen.getByText("当前情况")).toBeInTheDocument();
  });
});

describe("My Space recent tab", () => {
  it("shows the empty state when nothing has been viewed", () => {
    renderMySpaceAt("/my?tab=recent");
    expect(screen.getByText("你浏览过的内容会显示在这里。")).toBeInTheDocument();
  });

  it("lists recently viewed items of every kind, most recent first", () => {
    localStorage.setItem(
      RECENT_KEY,
      JSON.stringify([
        { key: "book:my-mouth-is-a-volcano", kind: "book", id: "my-mouth-is-a-volcano", viewedAt: "2024-01-02T00:00:00.000Z" },
        { key: "situation:getting-angry", kind: "situation", id: "getting-angry", viewedAt: "2024-01-01T00:00:00.000Z" },
      ])
    );
    renderMySpaceAt("/my?tab=recent");
    expect(screen.getByText("我的嘴巴是座火山！")).toBeInTheDocument();
    expect(screen.getByText(/孩子一生气就/)).toBeInTheDocument();
  });

  it("clears the recently-viewed list when the clear button is clicked", () => {
    localStorage.setItem(
      RECENT_KEY,
      JSON.stringify([{ key: "book:my-mouth-is-a-volcano", kind: "book", id: "my-mouth-is-a-volcano", viewedAt: "2024-01-02T00:00:00.000Z" }])
    );
    renderMySpaceAt("/my?tab=recent");
    fireEvent.click(screen.getByText("清除浏览记录"));
    expect(screen.getByText("你浏览过的内容会显示在这里。")).toBeInTheDocument();
  });
});

describe("My Space reflections tab", () => {
  it("shows the empty state when there are no reflections", () => {
    renderMySpaceAt("/my?tab=reflections");
    expect(screen.getByText("保存的记录会显示在这里。")).toBeInTheDocument();
  });

  it("lists a saved reflection note with its situation heading", () => {
    localStorage.setItem(
      REFLECTIONS_KEY,
      JSON.stringify([{ topicSlug: "getting-angry", note: "今天试了新的说法", savedAt: "2024-01-01T00:00:00.000Z" }])
    );
    renderMySpaceAt("/my?tab=reflections");
    expect(screen.getByText("今天试了新的说法")).toBeInTheDocument();
  });
});

describe("My Space tab navigation", () => {
  it("switches tabs and updates the url when a tab button is clicked", () => {
    renderMySpaceAt();
    fireEvent.click(screen.getByText("最近浏览"));
    expect(screen.getByText("你浏览过的内容会显示在这里。")).toBeInTheDocument();
  });
});

describe("My Space settings tab", () => {
  it("switches locale when an alternate language button is clicked", () => {
    renderMySpaceAt("/my?tab=settings");
    fireEvent.click(screen.getByText("English"));
    expect(screen.getByRole("heading", { name: "My Space" })).toBeInTheDocument();
  });
});
