# Book Hub Design

This document describes the UI/UX built for the Julia Cook book catalog:
the `/books/:bookId` "Book Hub" page, the reusable book card, and the two
integration points that surface books from elsewhere in the app. It
follows the same visual language as the rest of the app (same `AppLayout`,
`Header`, card shadow/radius conventions, `lucide-react` icons) rather than
introducing a new design system.

## `BookCard.tsx` — the reusable list item

A `ContentCard` (see
[frontend-content-components.md](./frontend-content-components.md)), tiled
with `BookCoverPlaceholder`, title (locale-aware: `titleZh` in `zh`, `title`
in `en`), an optional series line, and a chevron affordance, wrapped in a
`<Link to="/books/:id">`. Used in three places: `SituationPage.tsx`'s
"Related books" section, `Discover.tsx`'s (formerly `Library.tsx`) "Books"
results section, and could be reused by any future surface without
modification.

## `/books/:bookId` — `BookDetail.tsx`

Routed in `src/App.tsx`. Structure, top to bottom:

1. **Header** — back button + `SaveButton` (books can be saved the same way
   resources can, keyed as `book:{id}` in the existing saved-items store, so
   it shares `useSavedResources()` rather than inventing a parallel
   save mechanism).
2. **Icon hero + eyebrow + title** — a generic `BookOpen` icon tile (no book
   cover image is ever rendered — see "What this page deliberately never
   shows" below), an eyebrow label, and the book's title (locale-aware).
3. **Series line**, if the book belongs to one.
4. **Educator-audience note** — shown only when `audience === "educator"`
   (currently just *Teach Kids Not Content*), so a parent isn't confused
   about why a professional-development title is showing up.
5. **Verification-tier branch** — this is the core honesty mechanism of the
   page:
   - **`verified_detailed`** books show a bibliographic `<dl>` (author,
     publisher, ISBN, ages — whichever fields are populated), the original
     summary paragraph, and (if present) a "what children may learn"
     callout.
   - **`verified_catalog_only`** books show **no fabricated detail** at
     all — instead, a single honest callout
     (`book.catalogOnlyNotice`) explaining that only the title and source
     link have been confirmed so far. This was a deliberate choice over
     either (a) inventing plausible-looking metadata, or (b) hiding these
     73 books from the UI entirely — the catalog is real and useful as a
     browsable index even without per-book summaries, as long as the gap is
     stated plainly rather than papered over.
6. **Verification badge + source link** — every book, regardless of tier,
   shows its verification label (`book.verifiedDetailed` /
   `book.verifiedCatalogOnly`) next to the shared app-wide
   `common.verifiedMetadataNotice` string, followed by an outbound link to
   `book.sourceUrl` (opens the publisher's real page in a new tab,
   `rel="noopener noreferrer"`).
7. **Related parenting situations** — chips built from `book.topicSlugs`,
   each navigating to `/situation/:slug` via the existing `topicLabel()`
   helper (so labels stay in sync with however situations already render
   their own topic names). If `topicSlugs` is empty, an honest
   "not yet linked to a parenting situation" message
   (`book.relatedSituationsEmpty`) is shown instead of nothing. If
   `mappingConfidence === "hypothesis"`, an additional disclosure line
   (`book.hypothesisNote`) appears directly under the chips — this is the
   mechanism that makes the three hypothesis-confidence mappings (see
   [content-research-gaps.md](./content-research-gaps.md)) visible to end
   users instead of silently presented as equal-confidence to confirmed
   matches.
8. **Companion resources** — each `BookResource` renders as an outbound-link
   card: resource title, an access-type badge (`book.accessPurchaseRequired`
   / `book.accessFreeLink` / `book.accessSubscription`), and the
   resource's own honesty note (e.g. explaining the activity book is sold
   by the publisher, not this app). If there are none, an honest empty
   state (`book.resourcesEmpty`) is shown.

### What this page deliberately never shows

- **No book cover image, no interior page images, no audio/video
  embeds.** The hero is always a generic icon, never book art — this is
  enforced structurally (there's no image field on `JuliaCookBook` to
  render in the first place) and checked by
  `src/test/copyright-safeguards.test.ts`.
- **No "Buy now" / "Read now" button inside this app.** Every external
  resource is a plain outbound link with `target="_blank"`; nothing is
  embedded, previewed, or playable in-app.
- **No fabricated bibliographic data for catalog-only books.** See step 5
  above — this is the single most important honesty decision in this UI.

## Integration points

- **`SituationPage.tsx`** — added a "Related books" section (reusing the
  existing section heading pattern already used for other content blocks
  on that page) that calls `booksForTopic(situation.topicSlug)` and renders
  results with `BookCard`. Renders nothing when there are no matches (e.g.
  for `teen-communication`), rather than showing an empty section header.
- **`Discover.tsx`** (formerly `Library.tsx`) — added a `bookResults` memo
  computed via `searchBooks({ query, topic })`, rendered in a new "Books"
  section (`discover.booksHeading`) alongside the pre-existing resource
  results.
  Existing type/setting/skill filters continue to apply only to the
  `Resource` results (books have no matching facets), so the books section
  only responds to the free-text query and the active topic/situation
  context — this was a conscious scope decision rather than inventing new
  facets for a one-off content type.

## i18n

All new user-facing strings live under a new `book` namespace in
`src/i18n/translations.ts` (both `zh` and `en`, since `zh` is this app's
default locale — see
[content-model.md](./content-model.md)), plus one new
`library.booksHeading` key. No hardcoded English or Chinese strings were
left inline in `BookDetail.tsx` or `BookCard.tsx`.

## Testing

- `src/pages/BookDetail.test.tsx` covers: detailed-book rendering,
  catalog-only honest-notice rendering, not-found handling, situation-chip
  navigation, hypothesis-mapping disclosure, companion-resource rendering,
  the `SituationPage` related-books section, and `Library` surfacing book
  results for both English and Chinese free-text queries (the suite
  explicitly accounts for `zh` being the default locale rather than
  assuming English text renders without switching locale first).
- `src/data/books/books.test.ts` and `src/test/copyright-safeguards.test.ts`
  cover the underlying data integrity and copyright-safety invariants this
  UI depends on (e.g. that no book record could accidentally be rendered
  with a locally-hosted image or file).
