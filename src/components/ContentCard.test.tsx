import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { BookCoverPlaceholder } from "./BookCoverPlaceholder";
import { ContentCard } from "./ContentCard";

function withRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("ContentCard", () => {
  it("renders the title, eyebrow, subtitle and meta, and links to the given path", () => {
    withRouter(
      <ContentCard
        to="/books/some-book"
        tile={<span>tile</span>}
        eyebrow="Eyebrow"
        title="Card Title"
        subtitle="Card subtitle"
        meta={<span>meta content</span>}
      />
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/books/some-book");
    expect(screen.getByText("Eyebrow")).toBeInTheDocument();
    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card subtitle")).toBeInTheDocument();
    expect(screen.getByText("meta content")).toBeInTheDocument();
  });

  it("renders a trailing chevron by default when no trailing node is given", () => {
    const { container } = withRouter(<ContentCard to="/x" tile={<span>tile</span>} title="Title only" />);
    expect(container.querySelector("svg.lucide-chevron-right")).toBeInTheDocument();
  });

  it("renders a custom trailing node instead of the default chevron", () => {
    withRouter(
      <ContentCard to="/x" tile={<span>tile</span>} title="Title only" trailing={<button>Save</button>} />
    );
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("omits the eyebrow and subtitle when they are not provided", () => {
    withRouter(<ContentCard to="/x" tile={<span>tile</span>} title="Just a title" />);
    expect(screen.queryByText("Eyebrow")).not.toBeInTheDocument();
    expect(screen.getByText("Just a title")).toBeInTheDocument();
  });
});

describe("BookCoverPlaceholder", () => {
  it("shows the first two characters for a CJK title", () => {
    render(<BookCoverPlaceholder id="book-1" title="我的嘴巴是座火山！" />);
    expect(screen.getByText("我的")).toBeInTheDocument();
  });

  it("shows up to two uppercase initials for a Latin-script title", () => {
    render(<BookCoverPlaceholder id="book-2" title="my mouth is a volcano" />);
    expect(screen.getByText("MM")).toBeInTheDocument();
  });

  it("falls back to a question mark for an empty title", () => {
    render(<BookCoverPlaceholder id="book-3" title="   " />);
    expect(screen.getByText("?")).toBeInTheDocument();
  });

  it("deterministically picks the same color class for the same id", () => {
    const first = render(<BookCoverPlaceholder id="same-id" title="Alpha" />);
    const firstClass = first.container.querySelector("div")?.className;
    first.unmount();
    const second = render(<BookCoverPlaceholder id="same-id" title="Beta" />);
    const secondClass = second.container.querySelector("div")?.className;
    expect(firstClass?.split(" ").find((c) => c.startsWith("bg-"))).toEqual(
      secondClass?.split(" ").find((c) => c.startsWith("bg-"))
    );
  });
});
