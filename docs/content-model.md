# Content Model

## Design principles

1. **UI chrome vs. content copy are stored differently.** Reusable interface
   strings ("Save", "Filter", "No results") live in a typed dictionary
   (`src/i18n/translations.ts`) so every string has both a `zh` and `en`
   value and TypeScript catches missing keys. Educational/content copy
   (a situation's explanation, an activity's instructions, a resource's
   description) is authored directly on each data record as parallel
   `fooZh` / `foo` fields, because that copy is written per-item rather than
   reused across the UI. See `src/i18n/` for the dictionary and
   `src/data/*.ts` for the content records.
2. **Every licensable piece of content carries licensing metadata.** Anything
   that could plausibly be mistaken for Julia Cook's protected material
   (resources) has a `licensing: LicensingMetadata` field. Original demo
   content (situations, activities, "try saying" copy) is intentionally kept
   out of that system's enforcement path — it's original writing, not
   something whose distribution needs to be restricted — but still typically
   carries the `ORIGINAL_DEMO` fixture for consistency and auditability.
   Full details in [licensing-architecture.md](./licensing-architecture.md).
3. **Age-awareness is two-tier, not four-tier.** The age-group selector
   exposes four groups (`3-6`, `6-10`, `10-12`, `13+`) because that's a
   natural, parent-recognizable granularity for filtering resources and
   activities. But authoring four full variants of every situation write-up
   would be mostly duplicate text, so situation content is authored in two
   buckets — `younger` (3–6, 6–10) and `older` (10–12, 13+) — via
   `ageBucketFor()` in `src/data/ageGroups.ts`.

## Core data types (`src/types.ts`)

- **`Resource`** — a video/activity/book/printable. Bilingual
  title/description/content, `topics: string[]` (slugs), `skills`,
  `settings`, optional `ageGroups`/`selCompetencies`, and a required
  `licensing: LicensingMetadata`.
- **`Topic`** — a parent-facing "challenge" tag (`slug`, `label`, `labelZh`);
  see `src/data/topics.ts` / `src/data/topicMappings.ts` (the latter also
  carries free-text keyword lists used by `matchTopicFromQuery()` to resolve
  a parent's typed-in description to a topic slug, in both languages).
- **`ParentingSituation`** — the heart of the app (`src/data/situations.ts`,
  16 entries). Has a `default: SituationContent` used by every non-flagship
  topic, and an optional `ageVariants: { younger?, older? }` used by the five
  flagship journeys (`getting-angry`, `interrupting`, `sharing`,
  `fear-of-failure`, `friend-conflict`). `resolveSituationContent(situation,
  bucket)` picks the right one, falling back to `default` if a variant is
  missing. Each situation also references `selCompetencies: SelCompetencyId[]`
  and an optional `practiceActivityId`.
- **`Activity`** — a Practice-section activity (`src/data/activities.ts`, 5
  entries), each with a learning goal, materials, numbered instructions,
  sample parent language, and reflection questions — all bilingual, all
  original, each carrying `licensing: ORIGINAL_DEMO`.
- **`SelCompetency`** — the five fixed SEL competencies
  (`src/data/selCompetencies.ts`), each with a bilingual label + one-sentence
  description.

## Example: resolving a situation for display

```ts
const situation = getSituation("getting-angry"); // src/data/situations.ts
const { ageBucket } = useAgeGroup();             // "younger" | "older"
const content = resolveSituationContent(situation, ageBucket);
// content.heading / content.understand / content.respond / content.trySaying
// are all ready to render, already resolved to the right age variant.
```

## Discovery filtering

All resource reads go through `getContentProvider()`
(`src/content/ContentProvider.ts`), never `src/data/resources.ts` directly,
except for `Discover.tsx`'s (formerly `Library.tsx`) browse shelves for
topics/competencies/age-groups (those are navigational, not licensed
content, so there's nothing to filter).
The provider excludes any resource whose `licensing.licenseStatus` is
`"restricted"` or `"unknown"` from every listing/search method — but a
direct, already-known id still resolves via `getResourceById`, so a shared
link doesn't 404; the detail page then renders
`licensing.restrictedMessage` text instead of the resource's actual content.
This is demonstrated in the catalog by the `partner-video-pending-rights`
fixture and is covered by `src/content/ContentProvider.test.ts`.
