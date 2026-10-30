/// <reference types="node" />
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { books } from "../data/books/books";
import { bookResources } from "../data/books/bookResources";

const repoRoot = join(__dirname, "..", "..");

/** Media file extensions that could embed copyrighted book content (illustrations, audio, video, scans, PDFs). */
const DISALLOWED_MEDIA_EXTENSIONS = [".pdf", ".mp3", ".mp4", ".wav", ".mov", ".m4a", ".webm", ".ogg"];
/** Image extensions are allowed only for this app's own brand/UI assets, listed here explicitly. */
const ALLOWED_IMAGE_PATHS = new Set(["public/assets/julia-cook-logo.jpg", "public/favicon.svg", "public/icons.svg"]);
const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif", ".webp"];

function listFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".git" || entry === "dist") continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) listFiles(full, out);
    else out.push(full);
  }
  return out;
}

describe("copyright safeguards: no book media is stored in this repo's app code", () => {
  // `pictures/` is a pre-existing, separate directory not referenced by any
  // app code; it is intentionally excluded here and flagged instead in
  // docs/content-research-gaps.md as a known outstanding risk to clean up.
  const scanDirs = ["src", "public"];

  it("contains no PDF/audio/video files under src/ or public/", () => {
    const offenders: string[] = [];
    for (const dir of scanDirs) {
      for (const file of listFiles(join(repoRoot, dir))) {
        const lower = file.toLowerCase();
        if (DISALLOWED_MEDIA_EXTENSIONS.some((ext) => lower.endsWith(ext))) offenders.push(file);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("contains no image files under src/ or public/ other than this app's own explicitly-approved brand assets", () => {
    const offenders: string[] = [];
    for (const dir of scanDirs) {
      for (const file of listFiles(join(repoRoot, dir))) {
        const lower = file.toLowerCase();
        if (!IMAGE_EXTENSIONS.some((ext) => lower.endsWith(ext))) continue;
        const relative = file.slice(repoRoot.length + 1);
        if (!ALLOWED_IMAGE_PATHS.has(relative)) offenders.push(relative);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("book summaries are original, short framings rather than long copied passages", () => {
    // A crude but useful guard: a verbatim back-cover blurb or page of book
    // text would typically run much longer than a short original synopsis.
    for (const book of books) {
      expect(book.summary.length, `${book.id} summary looks unusually long`).toBeLessThan(900);
      if (book.whatChildrenMayLearn) {
        expect(
          book.whatChildrenMayLearn.length,
          `${book.id} whatChildrenMayLearn looks unusually long`
        ).toBeLessThan(400);
      }
    }
  });

  it("no BookResource record claims to host, embed, or sell the underlying copyrighted item itself", () => {
    for (const resource of bookResources) {
      expect(resource.availableInChinaApp).toBe(false);
      // Every resource must only ever link out to the publisher's own domain or an official social/newsletter platform, never a locally-hosted file.
      expect(resource.sourceUrl).toMatch(/^https:\/\//);
    }
  });
});
