# Licensing Architecture

## Why this exists

This app's name and concept reference Julia Cook's parenting/children's-book
catalog, but **no formal licensing agreement with Julia Cook or her
publisher exists for this codebase.** Everything in this document exists to
make sure the prototype (a) never fabricates or reproduces her protected
content, (b) never implies an endorsement it doesn't have, and (c) has a
clear, auditable seam where a real licensing agreement could be plugged in
later without a rewrite.

## Known copyright risk: `pictures/`

`pictures/` (two PNG mockup images, `8c9dedd400ac32dbc50480064b4f51f0.png`
and `9f198b3c30a8d039559ff953093b8405.png`) was committed to this repository
before this work began and has already been pushed to `origin/main`. One of
these mockups appears to embed what looks like a real Julia Cook book cover
and a real photograph of a person. **Neither file is referenced by any live
application code** — they are design-reference mockups only, not part of
the running app.

This was surfaced to the repository owner during this work, and the
decision made was: **leave `pictures/` as-is for now; the owner will handle
it separately** (e.g. confirming rights, removing it, or scrubbing it from
history). This document exists so that decision and its context aren't
lost. If you're reading this and `pictures/` still contains the images
above, treat it as **unresolved** until confirmed otherwise — in particular,
do not let `pictures/` content leak into the deployed app's `public/` or
`dist/` output, and consider that `git filter-repo`/history rewriting may be
required before any public/commercial launch if the embedded assets turn
out to be unlicensed.

## The branding problem, and how it's mitigated

`public/assets/julia-cook-logo.jpg` is a generic icon, not Julia Cook's
actual logo, despite being referenced in earlier code comments as the
"official Julia Cook logo." That false claim has been removed. Going
forward:

- `src/branding/config.ts` exposes `getBrandMode()` / `isOfficiallyAuthorized()`,
  gated by a build-time env var (`VITE_BRAND_MODE=authorized`). **No such
  var is set anywhere in this repo today**, so the app always builds in
  `"demo"` mode.
- `src/components/Logo.tsx` renders a neutral "CB" placeholder in demo mode
  and only renders the bundled image asset if `isOfficiallyAuthorized()` is
  true. Until a real brand agreement and verified assets exist, flipping
  that env var would be incorrect.
- `src/pages/Profile.tsx` renders an explicit, user-visible disclosure in
  both languages: the app is "currently a development/demo build and is not
  yet officially authorized or endorsed."

## Content licensing metadata (`src/content/types.ts`)

Every `Resource` (and, for consistency, every `Activity`) carries a
`licensing: LicensingMetadata` field:

```ts
interface LicensingMetadata {
  contentOrigin: "original_demo" | "verified_bibliographic" | "licensed_partner";
  rightsHolder: string;
  licenseStatus:
    | "original"                       // written for this app, not Julia Cook material
    | "public_metadata"                // real book, metadata-only, independently written synopsis
    | "licensed_pending_verification"  // reserved for future partner content
    | "licensed_approved"              // reserved for future partner content
    | "restricted"                     // must never be shown beyond metadata
    | "unknown";                       // treated the same as "restricted"
  permittedTerritories: string[];      // ISO 3166-1 alpha-2, or ["*"]
  permittedUses: PermittedUse[];       // e.g. "metadata_display", "external_link", "stream"
  attribution?: string;
  reviewStatus: "draft" | "pending_review" | "approved";
}
```

Three reusable fixtures live in `src/content/licensing.ts`:

- **`ORIGINAL_DEMO`** — used by every originally-authored piece of content
  in this prototype (situations, activities, demo resource write-ups).
- **`VERIFIED_BIBLIOGRAPHIC`** — used for the handful of resources that
  reference a real, published Julia Cook book by title/synopsis only, with
  an external link to the publisher's own listing; no book content is
  reproduced.
- **`RESTRICTED_PENDING_RIGHTS`** — a placeholder representing a
  hypothetical future licensed-partner resource whose China rights aren't
  cleared yet. It exists purely to exercise the filtering logic below; it is
  not a real partner and should not be mistaken for one.

## Discovery filtering: what it does and does not protect

`isHiddenFromDiscovery(licensing)` (`src/content/types.ts`) returns `true`
for `licenseStatus` of `"restricted"` or `"unknown"`. `ContentProvider`
(`src/content/ContentProvider.ts`) applies this filter to every
listing/search method, so such content never appears in topic pages,
search results, or library browsing. A direct, already-known resource id
still resolves (so a shared link doesn't silently 404), but the detail page
renders a `licensing.restrictedMessage` placeholder instead of real content.

**This is a display convenience for a demo, not a security boundary.**
Everything shipped in the public JS bundle — including the "restricted"
resource's metadata — is readable by anyone who opens dev tools or fetches
the bundle directly. A real production system must enforce this
server-side: territory checks (including for the China market specifically
— see [china-launch-checklist.md](./china-launch-checklist.md)), auth, and
rights windows all need to live behind an authenticated API, with the
client bundle never containing content it isn't allowed to show anyone. The
stubbed `RemoteContentProvider` class documents the integration point for
that future backend; `getContentProvider()` switches between it and the
local demo provider via `VITE_CONTENT_SOURCE` (`"local"` | `"remote"`,
defaulting to `"local"` since no backend exists yet).

## What changed in the data this pass, and why

A pre-change audit of the existing content found two concrete problems that
have been fixed:

1. A resource was labeled "Julia explains anger in kids" as if it were an
   actual video featuring Julia Cook. It has been reworded to describe a
   "demonstration video concept" — original content for this prototype, not
   a claim about a real asset.
2. A topic slug mismatch (`friendship` referenced in code vs. `friend-conflict`
   defined in data) has been fixed so resource-to-topic linking is
   consistent.
