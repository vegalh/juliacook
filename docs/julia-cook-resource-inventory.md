# Julia Cook Companion Resource Inventory

`src/data/books/bookResources.ts` records **companion resources** — things
beyond the book itself that the publisher offers around a title or the
brand as a whole (activity books, a Spanish edition, PDFs, a video channel,
a newsletter). This document explains what each record means, what
"verified" does and doesn't claim, and why none of these are reproduced or
hosted in this app.

## What "verified" means here (and what it doesn't)

Every `BookResource.existenceStatus` in this inventory is `"verified"`,
meaning: **a link to this item was actually observed live on
juliacookonline.com** (fetched 2026-10-11), confirming the resource exists
and the publisher offers it.

It does **not** mean:
- This app has any rights to the resource's content.
- The resource's content was reviewed, previewed, or copied.
- The link will necessarily still resolve when you read this (publisher
  sites change — see [content-research-gaps.md](./content-research-gaps.md)
  for how to handle link rot if discovered).

Every record's `accessType` tells you how a user actually gets it —
`purchase_required` (buy it from the publisher), `free_link` (publicly
downloadable), or `subscription` (sign up on the publisher's own site).
**No record has, or will ever have, an `accessType` that implies this app
hosts, sells, streams, or distributes the resource itself.** The Book Hub
UI always renders these as outbound links to `sourceUrl`, never as inline
content — see [book-hub-design.md](./book-hub-design.md). This is enforced
in code by `src/test/copyright-safeguards.test.ts`, which asserts no
`BookResource` claims local hosting.

Every record also sets `availableInChinaApp: false`. None of these
external resources are surfaced as usable features inside this China-first
app; they exist in the data model purely as honestly-labeled reference
links for a user who wants to pursue the official source further.

## Inventory (13 records)

### Per-book activity books (8)

Activity books are confirmed per book via a "buy the activity book"
purchase link present on that book's own official page — this is treated
as reliable evidence the companion product exists, without needing to
purchase or open it.

| Book | Resource |
| --- | --- |
| My Mouth Is a Volcano! | Activity Book |
| Teamwork Isn't My Thing and I Don't Like to Share | Activity Book |
| Bubble Gum Brain | Activity Book |
| Soda Pop Head | Activity Book |
| Bully B.E.A.N.S. | Activity Book |
| I Just Don't Like the Sound of No! | Activity Book |
| Wilma Jean the Worry Machine | Activity Book |
| The PROcrastinator | "Responsible Me!" Activity Book *(shared across the Responsible ME series — not confirmed unique to this title; other series titles weren't individually checked for the same link)* |

Of the 15 `verified_detailed` books, 8 have a confirmed activity book
(table above). The remaining 7 — Well, I Can Top That!; I Have Ants in My
Pants; Will You Be the "I" in Kind?; Jumping Into Kindergarten; Cliques
Just Don't Make Cents; The Anti-Test Anxiety Society; and I Got This! I
Have Bounce Back Superpowers — were not confirmed to have one in this
pass. That is a documented gap (not re-checked), not a claim that no
activity book exists for them.

### Spanish edition (1)

| Book | Resource |
| --- | --- |
| I Just Don't Like the Sound of No! | Spanish-language edition ("buy the book español") |

No Simplified Chinese edition was found for any title in the catalog.

### Brand-level resources (4)

These aren't tied to a specific book; they apply to the Julia Cook
catalog/brand as a whole and carry an empty `bookIds: []`.

| Resource | Access | Note |
| --- | --- | --- |
| Classroom Order Form (PDF) | Free download | A print order form for schools — not SEL content itself, included only as a verified brand-level link |
| Titles & Topics (PDF) | Free download | An official index of titles grouped by topic; used as a cross-check reference for this catalog, not reproduced |
| Official YouTube channel | Free, external | Channel's existence confirmed via the homepage link; individual videos were **not** catalogued or matched to specific books (see gap below), and YouTube is not reliably accessible in Mainland China |
| COOKIE BYTES newsletter | Subscription (free + paid tiers, hosted on Substack) | See naming-collision note below |

## The "Cookie Bytes" naming collision

The publisher runs a real newsletter called **COOKIE BYTES**
(`https://juliacookonline.com/cookie-bytes/`), linked from every page's
footer ("JOIN COOKIE BYTES!"). This is coincidentally very close to this
app's own name, **Cookie Bytes by Julia**, and to this app's own in-app
feature concepts. To be unambiguous: **this app's features are original
and unrelated to the publisher's newsletter** — the app does not embed,
mirror, or repurpose the newsletter's content, and the newsletter's
`BookResource` record exists solely to document that the real thing exists
and link out to it. See
[content-research-gaps.md](./content-research-gaps.md) for the full
discussion of why this collision matters and how it's handled in UI copy.

## Confirmed gap: no official per-book video/audio/poster/quiz catalog

No systematic per-book video index, audiobook catalog, poster set, or
quiz/game catalog was found anywhere on the publisher's site. The YouTube
channel exists, but mapping specific videos to specific books was out of
scope for this research pass. This is recorded as an open gap, not
silently omitted — see
[content-research-gaps.md](./content-research-gaps.md).

## Machine-readable export

[`julia-cook-book-inventory.json`](./julia-cook-book-inventory.json)
includes all 13 of these records (id, linked book ids, kind, title,
existence status, access type, source URL) alongside the book catalog, generated directly from
`src/data/books/bookResources.ts` so it cannot drift from the TypeScript
source of truth.
