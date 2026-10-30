# Frontend Content Components (Phase 4)

Two component families were introduced/unified in Phase 4: a shared card
shell used everywhere a piece of content is listed, and a set of
reusable "content-viewer" scaffolds for media types this prototype doesn't
yet have licensed content for.

## The card system

### `ContentCard` (`src/components/ContentCard.tsx`)

The shared shell used by every content-list row across Discover, the Book
Hub, Activities, and My Space: a 64px visual "tile" on the left (an icon, a
`BookCoverPlaceholder`, etc. — left to the caller), an
eyebrow/title/subtitle/meta text stack in the middle, and a trailing
chevron by default (overridable via `trailing`, e.g. a `SaveButton`). It
owns only the shell/spacing/typography, not content-type-specific visuals,
so every content type reads as one consistent design language. Covered by
[`src/components/ContentCard.test.tsx`](/Users/vega/Documents/GitHub/juliacook/src/components/ContentCard.test.tsx).

Thin, content-type-specific wrappers compose it:

- **`BookCard`** (`src/components/BookCard.tsx`) — a book's `ContentCard`,
  tiled with `BookCoverPlaceholder`.
- **`ActivityCard`** (`src/components/ActivityCard.tsx`) — an activity's
  `ContentCard`, with a "no materials needed" badge when applicable.
- **`ResourceCard`** (`src/components/ResourceCard.tsx`) — a resource's
  `ContentCard`, respecting `isHiddenFromDiscovery()` licensing rules.
- **`BookResourceLink`** (`src/components/BookResourceLink.tsx`) — a book's
  companion resource (listen/watch/practice/print/parent-guidance) as a
  `ContentCard` row.

### `BookCoverPlaceholder` (`src/components/BookCoverPlaceholder.tsx`)

A deterministic, typographic stand-in for a book cover (this app has no
license to reproduce Julia Cook's actual cover art — see
[licensing-architecture.md](./licensing-architecture.md)): initials derived
from the title (first two characters for a CJK title, up to two uppercase
Latin initials otherwise, `"?"` for an empty title) on one of three
palette colors, chosen deterministically by hashing the book's `id` so the
same book always renders the same color and a shelf of books doesn't look
monotone or flicker between renders. Covered by
[`src/components/ContentCard.test.tsx`](/Users/vega/Documents/GitHub/juliacook/src/components/ContentCard.test.tsx).

## Content-viewer scaffolds (`src/components/viewers/`)

Five reusable "viewer" components for media types this prototype has no
licensed content for yet, plus one fully interactive original scaffold:

| Component | Media type | Status today |
| --- | --- | --- |
| `AudioPlayerViewer` | Audiobook / audio clip | Scaffold only |
| `VideoPlayerViewer` | Video | Scaffold only, **wired into `ResourceDetailPage`** |
| `PdfViewer` | Printable / worksheet document | Scaffold only, **wired into `ResourceDetailPage`** |
| `PosterViewer` | Printable poster image | Scaffold only |
| `ActivityGuideViewer` | Activity guide (goal/materials/instructions/parent language/reflection questions) | **Live** — wired into `ActivityDetail` |
| `QuizPlayer` | Comprehension quiz | Original UI, no data yet |

### The "honest unavailable" pattern

`AudioPlayerViewer`/`VideoPlayerViewer`/`PdfViewer`/`PosterViewer` each
accept an optional `src` (plus `AudioPlayerViewer`/`VideoPlayerViewer`'s
required `title`). When `src` is provided they render the real native
media element (`<audio>`, `<video>`, an `<iframe>` + "open in a new tab"
link, or `<img>`, respectively); when it is omitted they render the shared
`ViewerUnavailable` fallback (`src/components/viewers/ViewerUnavailable.tsx`)
— an icon, the content's title, and an explanatory note
(`t("viewer.unavailableNote")`). `ViewerUnavailable` is deliberately plain:
no fake play button, no loading spinner, no placeholder media — because
every caller today genuinely has no media to show (`Resource.thumbnail` is
declared in `src/types.ts` but never populated in `src/data/resources.ts`).
This makes `ResourceDetailPage.tsx`'s `src={resource.thumbnail}` wiring
correct both today (always renders the honest fallback) and forward-compatible
(starts rendering real media automatically the moment any resource record
gets a real media URL — no further frontend changes required). Covered by
[`src/components/viewers/viewers.test.tsx`](/Users/vega/Documents/GitHub/juliacook/src/components/viewers/viewers.test.tsx).

### `ActivityGuideViewer`

Unlike the four media scaffolds above, this renders original, already-owned
content (the Activities catalog), so it has no "unavailable" state — it's
simply the full goal/time/materials/numbered-instructions/parent-language/
reflection-questions/notice layout, reused by `ActivityDetail.tsx` today and
ready for any future surface (e.g. a book-linked activity) that wants the
same rendering.

### `QuizPlayer`

A fully interactive, original comprehension-quiz scaffold — not
rights-managed media, so it has no "unavailable" state and works as soon as
a caller supplies `questions: QuizQuestion[]`. Handles answer selection,
per-question explanation text, advancing, and a final score. No book
currently ships a verified quiz record, so nothing in the live app renders
it yet; it is exercised directly by tests in
[`src/components/viewers/viewers.test.tsx`](/Users/vega/Documents/GitHub/juliacook/src/components/viewers/viewers.test.tsx).

See [frontend-cms-requirements.md](./frontend-cms-requirements.md) for what
a real backend/CMS would need to supply to light up the four scaffold
viewers and `QuizPlayer` with real content.
