# Julia Cook Book Catalog — Research Methodology & Results

## Why this exists

This app references Julia Cook's published children's-book catalog as its
core educational content anchor. Before any of that catalog could be
modeled in code (`src/data/books/`), it had to be independently verified
against the publisher's own site — not assumed, not invented, and never
copied. This document records **how** that research was done, **what** was
verified to what depth, and **where the limits of that verification are**,
so anyone extending this catalog later knows exactly what still needs
checking.

No book text, illustrations, audio, or video appears anywhere in this
repository. Every summary in `src/data/books/books.ts` was written from
scratch for this app. See [licensing-architecture.md](./licensing-architecture.md)
for the broader copyright-safety system this catalog plugs into.

## Source

All research was done against the publisher's own live site,
**juliacookonline.com**, fetched on **2026-10-11**, primarily via:

- `https://juliacookonline.com/search-by-title/` — the official full title
  index (publisher's own catalog listing, used to confirm every title and
  its detail-page URL exists).
- `https://juliacookonline.com/search-by-topic/` — the official aggregate
  "popular tags" cloud (100+ tags).
- Each book's own detail page (e.g.
  `https://juliacookonline.com/2005/01/01/my-mouth-is-a-volcano/`), which
  carries a book-specific "TAGS" section, publisher/illustrator/ISBN/
  grades/ages/price, and purchase links (including, where present, an
  "activity book" and/or "Spanish edition" link).

No third-party summaries, reviews, or retailer listings (Amazon, etc.) were
used as sources — only the publisher's own site.

**Important methodology note:** a book's own TAGS section is a more
reliable signal than the aggregate tag-cloud page, which only surfaces tags
with enough aggregate usage to clear a popularity threshold. A real,
official tag can exist on a book's own page without appearing in the
aggregate cloud (e.g. "growth mindset" is on *Bubble Gum Brain*'s own page
but not in the aggregate cloud). Per-book verification always used the
book's own TAGS section where available.

## Two verification tiers

Every record in `src/data/books/books.ts` carries a
`verificationLevel: "verified_detailed" | "verified_catalog_only"`. Treat
this as the single source of truth for what's actually been checked:

| Tier | What's verified | Count |
| --- | --- | --- |
| `verified_detailed` | Publisher, illustrator, publication date, ISBN, grades/ages, official tags (from the book's own TAGS section), and an original synopsis — all individually fetched and checked | 15 |
| `verified_catalog_only` | Title and a working detail-page URL confirmed via the official title index only; detail page not individually opened in this pass | 73 |
| **Total** | | **88** |

The 15 `verified_detailed` titles were chosen to give **one deeply-verified
book per existing parenting-situation topic** (see
[book-content-architecture.md](./book-content-architecture.md)), covering
15 of this app's 16 `topicSlug`s. The 16th, `teen-communication`, has no
confident match — see [content-research-gaps.md](./content-research-gaps.md).

A machine-readable export of this same data (ids, titles, tags, topic
links, source URLs, verification level) lives at
[`julia-cook-book-inventory.json`](./julia-cook-book-inventory.json),
generated directly from `src/data/books/books.ts` /
`src/data/books/bookResources.ts` so it can't drift from the TypeScript
source of truth (`src/data/books/inventory.test.ts` guards against drift).

## The 15 deeply-verified titles

| Title | Series | Topic slug | Mapping confidence |
| --- | --- | --- | --- |
| My Mouth Is a Volcano! | Louis | `interrupting` | confirmed |
| Teamwork Isn't My Thing and I Don't Like to Share | Best Me I Can Be! | `sharing` | confirmed |
| Bubble Gum Brain: Ready, Get Mindset…GROW! | — | `fear-of-failure` | confirmed |
| Soda Pop Head | — | `getting-angry` | confirmed |
| Well, I Can Top That! | Communicate With Confidence | `not-listening` | **hypothesis** |
| Bully B.E.A.N.S. | — | `bullying` | confirmed |
| I Just Don't Like the Sound of No! | Best Me I Can Be! | `self-control` | confirmed |
| Wilma Jean the Worry Machine | — | `worry-anxiety` | confirmed |
| I Have Ants in My Pants | Louis | `transitions` | confirmed |
| Will You Be the "I" in Kind? | — | `kindness` | confirmed |
| Jumping Into Kindergarten | — | `school-reluctance` | confirmed |
| Cliques Just Don't Make Cents | Building Relationships | `excluded-by-peers` | confirmed |
| The Anti-Test Anxiety Society | — | `fear-of-failure`* | **hypothesis** |
| The PROcrastinator | Responsible ME | `procrastination` | confirmed |
| I Got This! I Have Bounce Back Superpowers | — | `low-confidence` | **hypothesis** |

\* *The Anti-Test Anxiety Society* is additionally linked as a secondary,
hypothesis-confidence match; see `mappingNote` on that record and
[content-research-gaps.md](./content-research-gaps.md) for the reasoning.

"Confirmed" means the book's own official tags directly match this app's
topic (e.g. *My Mouth Is a Volcano!*'s own tags literally include
"interrupting"). "Hypothesis" means this app's editorial team made the
connection — the book's own official tags don't use this app's exact topic
language, so the link is our judgment call, not a publisher claim. Every
hypothesis record carries a `mappingNote` explaining the reasoning and its
limits, and the Book Hub UI surfaces this distinction to the end user
rather than hiding it (see
[book-hub-design.md](./book-hub-design.md)).

## A rejected hypothesis, documented rather than silently dropped

*How To Be Comfortable in Your Own Feathers* was initially hypothesized as
a `low-confidence` match (title alone suggested a possible fit). Fetching
its own TAGS section revealed its real subject: anorexia, bulimia, body
image, eating disorders. Linking it to a general "low confidence" situation
would have been both inaccurate and potentially harmful (misrepresenting a
book about disordered eating as light reading for ordinary confidence
wobbles). It is included in this catalog as `verified_catalog_only` with
**no** `topicSlugs`, and the hypothesis was replaced with a better-fitting
title, *I Got This! I Have Bounce Back Superpowers* (2024, tags include
resilience, overcoming obstacles, talk back to worry).

## The remaining 73 catalog-only titles

These titles were confirmed to exist — correct title, correct series, a
working detail-page URL — via the official title index, grouped here by
the publisher's own series/category headings. None of them have topic
links, official tags, ISBNs, or original summaries yet; that is a
deliberate, honest gap (see
[content-research-gaps.md](./content-research-gaps.md)), not an oversight.

- **Awesome Dawson**: Awesome Dawson Has Big Emotions; Awesome Dawson It's
  Not Your Turn; Awesome Dawson My Emotions Have a Job
- **Best START/PreK**: The Lucky Button; The Big Oops; It's You & Me
  Against the Pee
- **Body & Hygiene**: Gas Happens; Hygiene…You Stink; I Am a Booger…Treat
  Me with Respect; Melvin the Magnificent Molar
- **Career & Life Skills**: I AM Money and I Don't Grow on Trees; I'm Your
  Flag So Please Treat Me Right; Schnauzer's Trousers: The Spotlight Isn't
  for Everyone; What Shoes Will You Wear
- **Child Safety**: The Ant Hill Disaster; I'm Not Scared I'm Prepared; The
  Bubble Wrap Queen; Smarter Than the Scoopers
- **Cletus & Bocephus**: I Can't Find My Whatchamacallit; Planning Isn't My
  Priority…and Making Priorities Isn't in My Plans; Study Skilled…NOT!
- **Communication**: A Bad Case of Tattle Tongue; Decibella and Her 6-Inch
  Voice; Lying Up a Storm; Rumor Has It; Table Talk
- **Cora June**: Good Things Come to Those Who Wait; The Great Compromise;
  The "I" in Integrity; My Way or the Highway
- **Family Dynamics**: The "D" Word; Deployment: One of Our Pieces Is
  Missing; Foster Care: One Dog's Story of Change; I Want to Be the Only
  Dog; My Mom Thinks She's My Volleyball Coach But She's Not; What Do I Say
  About That?
- **Health & Wellness**: The "CAN" in Cancer; I Am Vape
- **Herman Jiggle**: HJ Go to Sleep; HJ It's RECESS Not RESTRESS; HJ Just Be
  You; HJ Say Hello
- **Interpersonal Skills**: Ricky Sticky Fingers; Tease Monster; Winners
  Don't Whine and Whiners Don't Win
- **Learning Differences**: My Fantabulous Brain; Uniquely Wired
- **Louis**: It's Hard to Be a Verb; Personal Space Camp
- **Mental Health**: Be Where Your Feet Are; Blueloon; Grief is Like a
  Snowflake; A Flicker of Hope; Straight from the Horse's Mouth
- **Noodle**: Baditude: What to Do When Your Life Stinks; But It's Not My
  Fault; Cheaters Never Prosper; That Rule Doesn't Apply to Me; What's In
  It For Me
- **RJ**: I Just Want to Do It My Way; I Can't Believe You Said That;
  Sorry, I Forgot to Ask; Thanks for the Feedback…I Think; The Worst Day of
  My Life Ever
- **Recent Releases**: Teach Kids Not Content: How to Connect with Students
  and Love Teaching Again *(educator-facing title, not a child-facing
  picture book — flagged with `audience: "educator"` in the data)*
- **Relationships**: The Judgmental Flower; Making Friends Is an Art; Peer
  Pressure Gauge
- **Technology**: But It's Just a Game; Technology Tail
- **Worry & Anxiety**: Don't Be Afraid to Drop; I'm Stretched
- Also present elsewhere in the official catalog but with no good topic fit
  yet: *How To Be Comfortable in Your Own Feathers* (see above).

## A publisher-side catalog anomaly, noted rather than silently "fixed"

The official "Search by Title" page lists **"The Big Oops"** twice (once
under "Recent Releases", once under "Best START/PreK") and appears to have
a shared/duplicate href between **"Cell Phoney"** and **"But It's Just a
Game"** — both link to the same URL on the publisher's own site. This looks
like a bug on the publisher's site, not a research error here. This catalog
includes "The Big Oops" once and includes "But It's Just a Game" once,
omitting "Cell Phoney" as a separate entry, since no distinct URL for it
could be confirmed. If the publisher fixes this, "Cell Phoney" should be
re-added as its own title.
