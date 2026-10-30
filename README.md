# juliacook
A platform that brings Julia Cook's books, videos, and activities together, helping parents and teachers understand children's behaviors and find simple, practical ways to support them.

## Status

This repository currently contains a bilingual (Simplified Chinese
default / English) prototype of a China-first social-emotional-learning
parenting app, inspired by Julia Cook's work but **not currently licensed
or endorsed by Julia Cook or her publisher** — see
[docs/licensing-architecture.md](./docs/licensing-architecture.md) for why
that matters and how the app enforces it in the UI and data model.

## Docs

- [docs/product-vision.md](./docs/product-vision.md) — what this app is, who it's for, and what's real vs. prototype content.
- [docs/information-architecture.md](./docs/information-architecture.md) — navigation, routes, and page structure.
- [docs/content-model.md](./docs/content-model.md) — data types, localization approach, and age-aware content.
- [docs/licensing-architecture.md](./docs/licensing-architecture.md) — licensing metadata, branding safeguards, and the known `pictures/` risk.
- [docs/china-launch-checklist.md](./docs/china-launch-checklist.md) — what's required beyond this codebase for a real China launch.

## Development

```bash
npm install
npm run dev     # start the dev server
npm run build   # tsc -b && vite build
npm run test    # vitest run
npm run lint    # oxlint
```
