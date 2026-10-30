import { matchTopicFromQuery } from "../topicMappings";
import { books } from "./books";
import type { JuliaCookBook } from "./types";

/**
 * Finds books matching a free-text query and/or a topic slug. Mirrors the
 * matching approach in `src/data/resources.ts#searchResources` (verbatim
 * substring match, individual-word match, and a free-text-to-topic-slug
 * fallback via `matchTopicFromQuery`) so the same parent phrasing that
 * surfaces a resource also surfaces a related book — e.g. both "孩子害怕失败"
 * and "Bubble Gum Brain" should find the same book.
 */
export function searchBooks(options: { query?: string; topic?: string | null }): JuliaCookBook[] {
  const query = options.query?.trim().toLowerCase() ?? "";
  const topic = options.topic ?? null;
  const queryWords = query.split(/\s+/).filter((w) => w.length > 2);
  const matchedTopicSlug = query ? matchTopicFromQuery(query) : null;

  return books.filter((b) => {
    if (topic && !b.topicSlugs.includes(topic)) return false;

    if (query) {
      const topicWords = b.topicSlugs.map((t) => t.replace(/-/g, " ")).join(" ");
      const haystack = [b.title, b.titleZh, b.series, b.summary, b.summaryZh, topicWords, ...(b.officialTags ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesQuery =
        haystack.includes(query) ||
        queryWords.some((w) => haystack.includes(w)) ||
        (matchedTopicSlug !== null && b.topicSlugs.includes(matchedTopicSlug));
      if (!matchesQuery) return false;
    }

    return true;
  });
}
