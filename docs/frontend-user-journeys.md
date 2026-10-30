# Frontend User Journeys (Phase 4)

Concrete, route-by-route walkthroughs of the key flows the Phase 4 redesign
is built around. Each step names the actual page/component involved so this
doc stays checkable against the code.

## 1. "My child just had a meltdown" — situation to practice

1. Parent opens `/` (`Home.tsx`) and taps a common situation (e.g. "孩子一
   生气就大哭大闹").
2. Lands on `/situation/getting-angry` (`SituationPage.tsx`): understand →
   respond → try-saying → linked SEL competencies → a single button into
   the matching practice activity.
3. Taps through to `/activities/calm-down-toolbox-activity`
   (`ActivityDetail.tsx`), which renders the full guide via
   `ActivityGuideViewer` (goal, materials, numbered steps, sample parent
   language, reflection questions) with a `SaveButton` in the header.
4. Taps the save button; the activity is now in My Space's Saved tab
   (`activity:calm-down-toolbox-activity` in `useSavedResources()`), ready
   to revisit without re-navigating from a situation.

## 2. Browsing by book — Discover's Stories mode to the Book Hub

1. Parent opens `/discover` (`Discover.tsx`, default Topics mode) and taps
   the "故事" mode chip → `/discover?mode=stories`.
2. Scans the "按系列浏览" series list — a stack of collapsed `<details>`
   elements, one per book series plus a trailing "无系列" group — and
   expands "Louis" to see its four books.
3. Taps "我的嘴巴是座火山！" → `/books/my-mouth-is-a-volcano`
   (`BookDetail.tsx`): full bibliographic detail, its topic chip, and its
   companion resources grouped into whichever of
   听/看/练习/打印/家长指导 sections actually have content for this book
   (empty sections are omitted, not shown as placeholders).
4. Taps a companion activity link, landing on the same
   `/activities/:id` detail page as journey 1 — the Book Hub and Activities
   surfaces share one activity-detail destination.

## 3. Finding something to do right now — Activities filters

1. Parent opens `/activities` (`Activities.tsx`) with a child home with no
   extra materials and five spare minutes.
2. Taps the "无需材料" filter chip → the list narrows to
   `activityNeedsNoMaterials()`-true activities only.
3. Taps "快速（10 分钟内）" instead (filters are mutually exclusive single
   selections against "all") → narrows to `isQuickActivity()`-true
   activities.
4. Alternatively, taps the Language Lab entry card → `/language-lab` for an
   interactive "try saying" practice session instead of a materials-based
   activity; or taps the printables entry card → `/discover?mode=resources`
   pre-scrolled to the worksheet format section.

## 4. Searching from Home — query to filtered results

1. Parent types a description into Home's search box (or Discover's
   `SearchBar`) and submits.
2. Lands on `/discover?q=<text>` in "results" mode:
   `getContentProvider().searchResources({ query, topic, filters })`
   returns matching resources (licensing-filtered — never surfaces
   `restricted`/`unknown` content), and `searchBooks({ query, topic })`
   returns matching books, shown in a separate "书籍" section beneath the
   resource results.
3. Can narrow further via the filter modal (type/setting/skill) or a topic
   chip; each active filter renders as a removable chip above the results.
4. An old bookmarked `/library?q=...` link still resolves to the same
   results page via the backward-compatible redirect (preserving the query
   string) — see
   [frontend-information-architecture.md](./frontend-information-architecture.md#backward-compatible-redirects).

## 5. Returning later — My Space as the personal home base

1. Parent opens `/my` (defaults to the Saved tab) to find everything they
   bookmarked across situations, books, activities, and raw resources in
   one place, grouped by kind.
2. Switches to "最近浏览" (`/my?tab=recent`) to re-find something they
   viewed but didn't save — e.g. the activity detail page visited in
   journey 1 appears here automatically, most-recent-first, because every
   detail page calls `recordView(kind, id)` on mount.
3. Switches to "我的记录" (`/my?tab=reflections`) to review notes
   previously jotted down on a situation page's reflect field.
4. Switches to "设置" (`/my?tab=settings`) to change language or the
   child's age group — affecting content shown across every other tab and
   page, since locale/age-group are app-wide contexts, not per-page state.
