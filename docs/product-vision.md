# Product Vision

## What this is

"Cookie Bytes by Julia" (working title) is a mobile-first, China-first
social-emotional-learning (SEL) companion for parents, built on top of —
but not yet contractually tied to — the Julia Cook parenting/children's-book
catalog. It helps a parent go from "my child is doing [behavior] right now"
to a concrete, age-appropriate thing to say or do, in Simplified Chinese
first and English second.

The experience is organized around four sections, reachable from a persistent
bottom nav:

- **首页 / Home** — a short list of common everyday situations ("发脾气",
  "打断别人", "不愿意分享", …) to jump straight into.
- **理解孩子 / Learn** — the five social-emotional-learning competencies
  (self-awareness, self-management, social awareness, relationship skills,
  responsible decision-making) explained in parent-friendly language, each
  linked back to the situations that exercise it.
- **一起试试看 / Practice** — short, concrete parent-and-child activities,
  ordered by the child's current age group.
- **资源库 / Library** — browse or search the full resource catalog by
  challenge, competency, age group, or resource type.

A parenting **situation** (e.g. "孩子一生气就大哭大闹") is the core unit of the
experience: it pairs a short "what's going on" explanation with two or three
concrete responses, a "say this, not that" rewrite, the SEL competencies it
touches, a linked practice activity, related resources, and a private,
local-only space to jot down what worked.

## Who it's for

Parents in mainland China raising children roughly ages 3–13, who want
quick, practical, non-judgmental guidance in their first language, without
needing to read a whole parenting book to handle today's meltdown.

## What is — and is not — real Julia Cook content right now

This is the single most important thing to understand about the current
state of the app, and it drives most of the architecture described in
[content-model.md](./content-model.md) and
[licensing-architecture.md](./licensing-architecture.md):

- **No Julia Cook book text, illustrations, audio, or video is reproduced
  anywhere in this app.** Every situation write-up, "try saying" rewrite,
  practice activity, and demo-resource description is original content
  written for this prototype.
- A handful of resource entries carry **verified bibliographic metadata**
  only — a real book's title and a short, independently-written synopsis,
  with an "external link" pointing to the publisher's own listing. These are
  clearly marked and never claim to contain the book's actual content.
- The product is **not** currently affiliated with, endorsed by, or
  licensed from Julia Cook, the National Center for Youth Issues, or any
  other rights holder. The UI actively avoids implying otherwise (see
  "Branding safeguards" in [licensing-architecture.md](./licensing-architecture.md)).
- One resource is deliberately staged as **rights-pending/restricted** to
  prove out the licensing-aware filtering described in
  [content-model.md](./content-model.md) — it demonstrates how a future,
  real licensed-partner feed would be kept out of public discovery until
  cleared, rather than representing any actual partner relationship.

## What "done" looks like for this prototype

This pass delivers a fully working, bilingual, licensing-aware **demo app**:
every page, every piece of UI chrome, and every data record described above
exists and has been exercised in the browser. It is explicitly **not** a
finished, launch-ready China product — see
[china-launch-checklist.md](./china-launch-checklist.md) for the real-world
steps (legal, infrastructure, compliance) that stand between this prototype
and an actual China launch.
