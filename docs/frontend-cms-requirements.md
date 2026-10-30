# Frontend CMS / Backend Requirements (Phase 4)

The Phase 4 frontend was deliberately built against today's static,
in-repo data (`src/data/*.ts`) and the browser's own `localStorage` — there
is no backend yet. This doc lists what a real content-management system
and/or backend service would need to provide to fully light up the UI that
already exists, without further frontend rework in most cases.

## 1. Media URLs for the viewer scaffolds

`src/components/viewers/` (`AudioPlayerViewer`, `VideoPlayerViewer`,
`PdfViewer`, `PosterViewer`) already render real `<audio>`/`<video>`/
`<iframe>`/`<img>` elements the moment they receive a `src` prop — see
[frontend-content-components.md](./frontend-content-components.md). Today
every call site passes `undefined` because `Resource.thumbnail` (the only
media-URL-shaped field on `Resource`, `src/types.ts`) is declared but never
populated in `src/data/resources.ts`. A real CMS needs to supply, per
licensed resource:

- A direct, CDN-hosted media URL (audio file, video file, PDF, or poster
  image) — not a page link. `Resource.thumbnail` can be reused for this
  (the field is already optional and already wired through
  `ResourceDetailPage.tsx`), or a more descriptively named field
  (`mediaUrl`) could replace it as part of this work, since "thumbnail" is
  a misleading name for what would become the primary playback source.
- For video, an optional poster-frame image URL (`VideoPlayerViewer`
  already accepts a separate `poster` prop).
- Confirmation that `licensing.permittedUses` includes `"stream"` and/or
  `"download"` before the URL is supplied — the frontend doesn't currently
  gate rendering on `permittedUses`, so that check needs to happen before
  content reaches the client (i.e. the CMS/ingestion pipeline should refuse
  to populate a media URL for a resource whose rights don't cover it).

## 2. Quiz question banks

`QuizPlayer` (`src/components/viewers/QuizPlayer.tsx`) is fully built and
tested but has zero live data — no book or resource currently ships a
`QuizQuestion[]` array. A CMS needs a way to author, per book or topic:

```ts
interface QuizQuestion {
  id: string;
  question: string;      // en
  questionZh: string;    // zh
  options: string[];      // en
  optionsZh: string[];    // zh, same order/length as options
  correctIndex: number;
  explanation?: string;   // shown after answering, en
  explanationZh?: string; // shown after answering, zh
}
```

This is original interactive content (comprehension questions about a
book/topic), not licensed media, so there's no rights-clearance gate here —
only an authoring workflow and a place to attach the resulting array to a
book or resource record (e.g. a new `quizQuestions?: QuizQuestion[]` field
on `JuliaCookBook` or `Resource`), and a Discover/Book-Hub section to
surface it through `resourceFormatItems("quiz")`
(`src/data/resourceFormats.ts`).

## 3. Licensing metadata authoring and review workflow

Every `Resource` and `Activity` already requires a full
`LicensingMetadata` record (`src/content/types.ts`) at data-entry time —
`contentOrigin`, `rightsHolder`, `licenseStatus`, `permittedTerritories`,
`permittedUses`, optional `attribution`, and `reviewStatus`. A CMS replacing
hand-edited `src/data/*.ts` files needs:

- A structured editing UI (not freeform text) for these enum fields, so a
  non-engineer content editor can't accidentally create an invalid
  `licenseStatus`/`permittedUses` combination.
- A `reviewStatus` gate: content should not become visible to the live app
  until it has moved from `"draft"`/`"pending_review"` to `"approved"` —
  there's no such enforcement in the frontend today (it has no concept of
  "unapproved" content at all, since every record in the repo is
  implicitly approved by having been committed).
- Enforcement of `HIDDEN_FROM_DISCOVERY` server-side, not just client-side:
  `isHiddenFromDiscovery()` (`src/content/types.ts`) is a client-only
  filter today and can be bypassed by anyone reading the bundled JS — see
  [licensing-architecture.md](./licensing-architecture.md). A real backend
  must also refuse to serve `restricted`/`unknown` content through any API,
  not rely on the frontend filtering it out.

## 4. Book catalog and companion-resource ingestion

`src/data/books/books.ts` (88 records) and `src/data/books/bookResources.ts`
(companion resources, grouped by `kind` into the Book Hub's
listen/watch/practice/print/parent-guidance sections — see
[book-content-architecture.md](./book-content-architecture.md)) are
hand-authored today. A CMS replacing them needs an ingestion path that:

- Preserves the existing `JuliaCookBook`/`BookResource` shapes (or a
  migration script that transforms CMS records into them), so
  `getBookById`/`booksForTopic`/`searchBooks`/`bookResourcesForBook`
  continue to work unchanged.
- Keeps `docs/julia-cook-book-inventory.json` in sync — today this is
  guarded by a drift-detection test
  (`src/data/books/inventory.test.ts`); a CMS-backed pipeline should
  regenerate (or re-validate) that file as part of its publish step, not
  leave it to manual edits.

## 5. User data: saved items, recently viewed, reflections

`useSavedResources`, `useRecentlyViewed`, and `useReflections`
(`src/hooks/`) are entirely `localStorage`-backed today — there is no user
account, no server sync, and no cross-device persistence; clearing browser
data or switching devices loses everything. A real backend would need:

- A persistent user identity (even a lightweight anonymous device/account
  id) to associate these three record types server-side.
- An API shaped closely enough to the existing hooks' return values
  (`savedIds`/`isSaved`/`toggleSaved`; `entries`/`recordView`/`clear`; and
  the reflections equivalent) that `MySpace.tsx` and every `SaveButton`
  call site could swap a `localStorage`-backed hook for a network-backed
  one with the same interface, rather than rewriting the UI.
- A privacy-preserving retention/deletion policy for reflections in
  particular, since the field is designed to be low-friction free text —
  the current local-only promise ("no child-identifying information is
  collected or requested") should be preserved by whatever replaces it.

## 6. Scope not covered by any of the above

This document is about what would be needed to serve **real content**
through the **existing** frontend contracts. It does not cover
infrastructure/compliance requirements for an actual China launch (hosting,
ICP filing, data residency, etc.) — those are tracked separately in
[china-launch-checklist.md](./china-launch-checklist.md).
