import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { books } from "./books";
import { bookResources } from "./bookResources";

/**
 * docs/julia-cook-book-inventory.json is a generated, machine-readable
 * export of this module's data (see the generation note at the top of that
 * file). This test only guards against it silently drifting out of sync
 * with the TypeScript source of truth — it does not regenerate the file.
 * If this test fails after a deliberate data change, regenerate the JSON
 * file from `books` / `bookResources` and re-run.
 */
describe("julia-cook-book-inventory.json stays in sync with source data", () => {
  const inventoryPath = join(__dirname, "..", "..", "..", "docs", "julia-cook-book-inventory.json");
  const inventory = JSON.parse(readFileSync(inventoryPath, "utf-8"));

  it("has matching book and resource counts", () => {
    expect(inventory.counts.totalBooks).toBe(books.length);
    expect(inventory.counts.companionResources).toBe(bookResources.length);
    expect(inventory.books.length).toBe(books.length);
    expect(inventory.companionResources.length).toBe(bookResources.length);
  });

  it("has matching ids in the same order", () => {
    expect(inventory.books.map((b: { id: string }) => b.id)).toEqual(books.map((b) => b.id));
    expect(inventory.companionResources.map((r: { id: string }) => r.id)).toEqual(
      bookResources.map((r) => r.id)
    );
  });
});
