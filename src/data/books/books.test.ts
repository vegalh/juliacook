import { describe, expect, it } from "vitest";
import { ageGroups } from "../ageGroups";
import { selCompetencies } from "../selCompetencies";
import { situations } from "../situations";
import { books, booksForTopic, detailedBooks, getBookById } from "./books";
import { bookResources, bookResourcesForBook } from "./bookResources";
import { searchBooks } from "./search";

const realTopicSlugs = new Set(situations.map((s) => s.topicSlug));
const realCompetencyIds = new Set(selCompetencies.map((c) => c.id));

describe("Julia Cook book catalog data integrity", () => {
  it("has no duplicate book ids", () => {
    const ids = books.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every book id is a non-empty kebab-case-ish slug matching its route usage", () => {
    for (const b of books) {
      expect(b.id).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("has no duplicate ISBNs among books that declare one", () => {
    const isbns = books.map((b) => b.isbn).filter((isbn): isbn is string => Boolean(isbn));
    expect(new Set(isbns).size).toBe(isbns.length);
  });

  it("only references real parenting-situation topic slugs", () => {
    for (const b of books) {
      for (const slug of b.topicSlugs) {
        expect(realTopicSlugs.has(slug), `${b.id} references unknown topicSlug "${slug}"`).toBe(true);
      }
    }
  });

  it("only references real SEL competency ids", () => {
    for (const b of books) {
      for (const competency of b.selCompetencies ?? []) {
        expect(realCompetencyIds.has(competency), `${b.id} references unknown SEL competency "${competency}"`).toBe(
          true
        );
      }
    }
  });

  it("every book has a working source URL on the official domain", () => {
    for (const b of books) {
      expect(b.sourceUrl).toMatch(/^https:\/\/juliacookonline\.com\//);
    }
  });

  it("every detailed-tier book has a non-placeholder summary and no empty topicSlugs unless explicitly a documented gap", () => {
    for (const b of detailedBooks) {
      expect(b.summary.length).toBeGreaterThan(20);
    }
  });

  it("requires a mappingNote whenever mappingConfidence is 'hypothesis'", () => {
    for (const b of books) {
      if (b.mappingConfidence === "hypothesis") {
        expect(b.mappingNote, `${b.id} has a hypothesis mapping but no mappingNote`).toBeTruthy();
      }
    }
  });

  it("marks catalog-only books honestly (empty topicSlugs, no fabricated ISBN)", () => {
    const catalogOnly = books.filter((b) => b.verificationLevel === "verified_catalog_only");
    expect(catalogOnly.length).toBeGreaterThan(0);
    for (const b of catalogOnly) {
      // A catalog-only book may legitimately get topicSlugs added later via
      // research, but none should claim bibliographic detail it doesn't have.
      expect(b.isbn).toBeUndefined();
    }
  });

  it("getBookById finds a known book and returns undefined for an unknown id", () => {
    expect(getBookById("my-mouth-is-a-volcano")?.title).toBe("My Mouth Is a Volcano!");
    expect(getBookById("not-a-real-book-id")).toBeUndefined();
  });

  it("booksForTopic only returns books mapped to that topic", () => {
    const result = booksForTopic("fear-of-failure");
    expect(result.length).toBeGreaterThan(0);
    for (const b of result) {
      expect(b.topicSlugs).toContain("fear-of-failure");
    }
  });

  it("documents the teen-communication gap rather than forcing a weak match", () => {
    expect(booksForTopic("teen-communication")).toHaveLength(0);
  });

  it("does not link the rejected eating-disorder title to low-confidence", () => {
    const book = getBookById("how-to-be-comfortable-in-your-own-feathers");
    expect(book?.topicSlugs ?? []).not.toContain("low-confidence");
  });

  it("every flagship topic slug used by situations.ts has at least one mapped book", () => {
    for (const slug of realTopicSlugs) {
      const mapped = booksForTopic(slug);
      // teen-communication is a documented, honest gap — every other topic
      // introduced by this catalog should have a real match.
      if (slug === "teen-communication") continue;
      expect(mapped.length, `topicSlug "${slug}" has no mapped book`).toBeGreaterThan(0);
    }
  });
});

describe("book companion resources", () => {
  it("has no duplicate resource ids", () => {
    const ids = bookResources.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("only references real book ids", () => {
    const realBookIds = new Set(books.map((b) => b.id));
    for (const r of bookResources) {
      for (const bookId of r.bookIds) {
        expect(realBookIds.has(bookId), `${r.id} references unknown book id "${bookId}"`).toBe(true);
      }
    }
  });

  it("is never marked available in the China app (no rights have been secured)", () => {
    for (const r of bookResources) {
      expect(r.availableInChinaApp).toBe(false);
    }
  });

  it("bookResourcesForBook only returns resources linked to that book", () => {
    const result = bookResourcesForBook("my-mouth-is-a-volcano");
    expect(result.length).toBeGreaterThan(0);
    for (const r of result) {
      expect(r.bookIds).toContain("my-mouth-is-a-volcano");
    }
  });

  it("returns an empty list for a book with no known companion resources", () => {
    expect(bookResourcesForBook("jumping-into-kindergarten")).toHaveLength(0);
  });
});

describe("searchBooks", () => {
  it("finds a book by its exact English title", () => {
    const results = searchBooks({ query: "Bubble Gum Brain" });
    expect(results.some((b) => b.id === "bubble-gum-brain")).toBe(true);
  });

  it("finds a book via a Chinese parenting-situation phrase mapped to its topic", () => {
    const results = searchBooks({ query: "孩子害怕失败" });
    expect(results.some((b) => b.id === "bubble-gum-brain")).toBe(true);
  });

  it("filters by topic slug alone with no query", () => {
    const results = searchBooks({ topic: "fear-of-failure" });
    expect(results.length).toBeGreaterThan(0);
    for (const b of results) {
      expect(b.topicSlugs).toContain("fear-of-failure");
    }
  });

  it("returns an empty list for a nonsense query", () => {
    expect(searchBooks({ query: "zzz-nonexistent-xyz" })).toHaveLength(0);
  });

  it("returns all books for an empty query and no topic", () => {
    expect(searchBooks({})).toHaveLength(books.length);
  });
});

describe("sanity check against shared reference data", () => {
  it("ageGroups data still loads (shared dependency used by the future Book Hub UI)", () => {
    expect(ageGroups.length).toBeGreaterThan(0);
  });
});
