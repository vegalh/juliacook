# Content Research Gaps

This is a deliberately honest list of everything this research pass did
**not** fully resolve — gaps that are either genuinely open questions, or
scope limits accepted for this pass. Nothing here is hidden from the data
model itself: every gap below is either an empty field, an explicit
`mappingNote`, or a code comment in the relevant source file, so future
work can find and address it without re-deriving why it's there.

## 1. `teen-communication` has no confident book match

Of this app's 16 `topicSlug`s, 15 now have a `verified_detailed` book
mapped to them. `teen-communication` does not. During research, no title
in the official catalog was found whose own tags or evident subject matter
confidently addresses teen-specific communication dynamics (as opposed to
younger-child communication, which several titles do cover — e.g. *A Bad
Case of Tattle Tongue*, *Decibella and Her 6-Inch Voice* — but those are
`verified_catalog_only` and aimed at a younger age band, not re-opened and
confirmed as a strong fit for the teen-specific situation).

**This is left as an open gap rather than forced.** `booksForTopic(
"teen-communication")` returns an empty array, and
`src/data/books/books.test.ts` has an explicit test asserting this gap
stays documented rather than silently "fixed" with a weak match. If a
better-fitting title is identified later (e.g. by individually opening the
remaining catalog-only titles for their own TAGS sections), this is the
first gap to close.

## 2. Three `hypothesis`-confidence topic mappings

Three books are linked to a topic based on this app's editorial judgment,
not the publisher's own tag language:

| Book | Topic | Why it's a hypothesis |
| --- | --- | --- |
| Well, I Can Top That! | `not-listening` | The book's own TAGS section could not be successfully re-fetched during this pass (a genuine access/timing gap, noted honestly in its `mappingNote`); the mapping relies on the book's known subject (one-upping conversations, not actually listening to others) rather than a confirmed tag match. |
| The Anti-Test Anxiety Society | `fear-of-failure` | The book's primary, confirmed subject is test anxiety specifically; `fear-of-failure` is a closely related but broader concept. Linked as a secondary, lower-confidence match alongside its real anchor topic. |
| I Got This! I Have Bounce Back Superpowers | `low-confidence` | The book's own tags center on resilience/"bouncing back," which overlaps with but isn't identical to general low self-confidence; judged a reasonable fit but not a tag-verbatim match. |

Each carries a `mappingNote` field explaining this, and the Book Hub UI
(`BookDetail.tsx`) surfaces a visible "this is our interpretation, not an
official claim" disclosure for any `hypothesis`-confidence book — see
[book-hub-design.md](./book-hub-design.md).

## 3. A rejected hypothesis: "How To Be Comfortable in Your Own Feathers"

Initially hypothesized as a possible `low-confidence` match based on title
alone. Fetching the book's own TAGS section revealed its real subject is
eating disorders (anorexia, bulimia, body image) — a serious, specific
topic that a general "low confidence" situation page should not
misrepresent or trivialize. The hypothesis was discarded, the book is
included as `verified_catalog_only` with no `topicSlugs`, and *I Got This!
I Have Bounce Back Superpowers* was identified as a better-fitting
replacement (see #2 above). This is recorded so nobody re-proposes the
same mismatch without knowing why it was rejected.

## 4. 73 of 88 books are catalog-only (title + URL only)

Only 15 of the 88 total books received the full individual-page research
pass (publisher, illustrator, ISBN, grades/ages, official tags, original
summary). The other 73 were confirmed to exist via the official title
index but not individually opened. This was a deliberate scope decision —
depth over breadth for the 16-topic mapping system, with the full catalog
still represented honestly for completeness/future search — not an
oversight. See [julia-cook-book-catalog.md](./julia-cook-book-catalog.md)
for the full list grouped by series. Extending `verified_detailed` status
to more of these 73 is the most direct way to grow topic coverage (e.g. the
"Worry & Anxiety," "Communication," and "Mental Health" series groupings
look like promising candidates to open next).

## 5. Two publisher-side catalog anomalies

The official "Search by Title" index itself contains irregularities,
observed and worked around rather than silently "corrected":
- **"The Big Oops"** appears twice, under two different series headings.
  Included once in this catalog.
- **"Cell Phoney"** and **"But It's Just a Game"** appear to share the same
  detail-page URL on the publisher's site. Included as "But It's Just a
  Game" only, since no distinct URL for "Cell Phoney" could be confirmed.
  If the publisher later fixes this, "Cell Phoney" should be re-added as
  its own catalog entry.

## 6. No official per-book video/audiobook/poster/quiz catalog

The publisher's official YouTube channel was confirmed to exist
(`https://www.youtube.com/channel/UCS1Yfoy5FqdRCNC0bNmmN5Q`), but no
systematic mapping of individual videos to individual books was attempted
in this pass, and no audiobook, poster, or quiz/game catalog was found
anywhere on the publisher's site at all. Additionally, **YouTube is not
reliably accessible in Mainland China**, which is directly relevant given
this app's China-first audience — even if video-to-book mapping were done,
linking to YouTube as a primary resource would need a China-accessible
mirror or alternative to be genuinely useful to most users. This is
recorded as an explicit gap in `bookResources.ts`'s
`official-youtube-channel` record rather than a feature that was
attempted and abandoned silently.

## 7. The "Cookie Bytes" naming collision

The real publisher runs an actual newsletter called **COOKIE BYTES**
(`https://juliacookonline.com/cookie-bytes/`, hosted on Substack, with free
and paid tiers), which is coincidentally close to this app's own name,
*Cookie Bytes by Julia*. This is purely a naming coincidence discovered
during research, not a sign this app's branding was derived from or
intended to resemble the publisher's newsletter. It matters enough to flag
prominently because:
- A user could reasonably mistake the two as the same product.
- UI copy referencing "Cookie Bytes" anywhere in this app should stay
  clearly scoped to this app's own original feature, and any link to the
  real newsletter (the `cookie-bytes-newsletter` `BookResource` record)
  should always be presented as an external, publisher-owned link, never
  implied to be part of this app.

See [julia-cook-resource-inventory.md](./julia-cook-resource-inventory.md)
for where this is recorded in data.

## 8. A pre-existing, minor documentation inconsistency (noted, not fixed)

The top-of-file comment in `src/data/topicMappings.ts` lists
`friend-conflict` among topics "newer... not yet cross-referenced with
[the] tag cloud" with empty `educationalTopics`. This is inaccurate:
`friend-conflict` already has a populated `educationalTopics` array and is
one of the original nine verified topics, not a newer addition. This was
noticed while adding `educationalTopics` for the six genuinely-empty newer
topics in this pass, but left unfixed per the instruction not to fix
unrelated pre-existing issues outside this work's scope. A future small
cleanup PR could correct that comment.

## 9. A pre-existing copyright risk, out of scope for this pass

`pictures/` at the repository root contains two PNG files tracked by git
(committed before this work began), at least one of which appears to embed
a real book cover image and a real photo. It is **not referenced by any
live application code** and is **not included in the production build**
(`npm run build` output was inspected and confirmed clean). Per the
decision already recorded in
[licensing-architecture.md](./licensing-architecture.md), removing or
replacing these files is the repository owner's call, not something this
research/implementation pass should do unilaterally. It is repeated here,
and again in the final delivery summary, so it isn't lost.
