import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { AgeGroupProvider } from "../context/AgeGroupContext";
import { FilterProvider } from "../context/FilterContext";
import { LocaleProvider } from "../i18n";
import { BookDetail } from "./BookDetail";
import { Discover } from "./Discover";
import { SituationPage } from "./SituationPage";

function renderWithProviders(initialPath: string) {
  return render(
    <LocaleProvider>
      <AgeGroupProvider>
        <FilterProvider>
          <MemoryRouter initialEntries={[initialPath]}>
            <Routes>
              <Route path="/books/:bookId" element={<BookDetail />} />
              <Route path="/situation/:topic" element={<SituationPage />} />
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

describe("BookDetail page", () => {
  it("shows full bibliographic detail, summary, and verification badge for a detailed-tier book", () => {
    renderWithProviders("/books/my-mouth-is-a-volcano");
    expect(screen.getByText("我的嘴巴是座火山！")).toBeInTheDocument();
    expect(screen.getByText(/978-1931636858/)).toBeInTheDocument();
    expect(screen.getByText(/书目信息已逐条核实/)).toBeInTheDocument();
  });

  it("links the book to its related parenting situation and navigates there on click", () => {
    renderWithProviders("/books/my-mouth-is-a-volcano");
    const situationChip = screen.getByText("打断别人");
    fireEvent.click(situationChip);
    expect(screen.getByText("当前情况")).toBeInTheDocument();
  });

  it("shows the confirmed activity book as a companion resource", () => {
    renderWithProviders("/books/my-mouth-is-a-volcano");
    expect(screen.getByText("《我的嘴巴是座火山！》配套活动手册")).toBeInTheDocument();
  });

  it("shows the catalog-only notice (not fabricated detail) for a catalog-only book", () => {
    renderWithProviders("/books/the-big-oops");
    expect(screen.getByText(/只确认了书名和官方链接/)).toBeInTheDocument();
  });

  it("renders a not-found message for an unknown book id", () => {
    renderWithProviders("/books/not-a-real-book");
    expect(screen.getByText("没有找到这本书的信息。")).toBeInTheDocument();
  });

  it("flags the hypothesis-confidence topic mapping instead of presenting it as confirmed", () => {
    renderWithProviders("/books/i-got-this-i-have-bounce-back-superpowers");
    expect(screen.getByText(/编辑团队自己的判断/)).toBeInTheDocument();
  });
});

describe("SituationPage related books", () => {
  it("shows a mapped book (as a book-card link) on its related parenting situation page", () => {
    renderWithProviders("/situation/interrupting");
    expect(document.querySelector('a[href="/books/my-mouth-is-a-volcano"]')).toBeTruthy();
  });

  it("shows the documented gap message for the situation with no mapped book", () => {
    renderWithProviders("/situation/teen-communication");
    expect(screen.getByText("暂无已核实的相关童书。")).toBeInTheDocument();
  });
});

describe("Discover search surfaces books", () => {
  it("finds a book by English title search", () => {
    renderWithProviders("/discover?q=Bubble%20Gum%20Brain");
    expect(screen.getByText("相关 Julia Cook 童书")).toBeInTheDocument();
    expect(document.querySelector('a[href="/books/bubble-gum-brain"]')).toBeTruthy();
  });

  it("finds a book via a Chinese parenting-situation query", () => {
    renderWithProviders("/discover?q=%E5%AD%A9%E5%AD%90%E5%AE%B3%E6%80%95%E5%A4%B1%E8%B4%A5");
    expect(document.querySelector('a[href="/books/bubble-gum-brain"]')).toBeTruthy();
  });
});
