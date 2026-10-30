# China Launch Checklist

This prototype demonstrates the product experience and a licensing-aware
architecture that *could* support a China launch, but a real launch needs
work well outside what a code change can deliver. This is a non-exhaustive
checklist of what stands between "this demo" and "a live product in
mainland China," grouped by area. None of these items are implemented by
this prototype; consult qualified China-market legal/compliance counsel
before acting on any of them.

## Rights & licensing

- [ ] A signed licensing agreement with Julia Cook / the rights holder
      (e.g. National Center for Youth Issues) covering: which works may be
      adapted/translated, in which territories (explicitly including
      mainland China), for which media (text, video, audio, print), and for
      how long.
- [ ] Confirm whether the agreement permits **translation** into Simplified
      Chinese (a derivative work), not just display of English-language
      metadata.
- [ ] Resolve the `pictures/` risk documented in
      [licensing-architecture.md](./licensing-architecture.md) — confirm
      rights to the embedded book cover/photo, or remove the files (and,
      if necessary, scrub them from git history) before any public release.
- [ ] Obtain a verified, licensed brand asset (logo) before flipping
      `VITE_BRAND_MODE=authorized`; do not ship the current placeholder
      logo as if it were official.
- [ ] Legal review of the `LicensingMetadata.permittedTerritories` model
      against actual contract terms — the current `["*"]` / `[]` values in
      `src/content/licensing.ts` are prototype placeholders, not contractual
      facts.

## Regulatory & compliance (mainland China)

- [ ] ICP filing (备案) for the domain/hosting serving the app to mainland
      China users.
- [ ] Hosting inside mainland China (or an approved CDN) if required for
      acceptable latency/compliance — this prototype assumes nothing about
      deployment infrastructure.
- [ ] Children's/minors' data-protection compliance review (e.g. PIPL,
      and rules specific to minors' personal information) — note that the
      current `useReflections`/`useSavedResources` hooks are intentionally
      local-only (no backend, no account, no child-identifying fields) but
      that constraint would need to be re-validated against real product
      requirements, not assumed to satisfy every applicable rule.
- [ ] Content review/registration requirements that may apply to
      children's educational content distributed in China.
- [ ] App store requirements if distributed as a native app (e.g. a
      mainland China Android app store review process distinct from
      Google Play/App Store).

## Backend & infrastructure (currently absent)

- [ ] A real content/licensing backend implementing the
      `ContentProvider` interface's `RemoteContentProvider` (currently a
      throwing stub in `src/content/ContentProvider.ts`), enforcing
      territory/rights checks **server-side** — the client-side
      `isHiddenFromDiscovery` filtering documented in
      [licensing-architecture.md](./licensing-architecture.md) is not
      sufficient on its own.
- [ ] Authentication/accounts, if the product needs to move beyond fully
      local, anonymous usage.
- [ ] Analytics/monitoring choices that are compliant with mainland China
      regulations and with whatever data-residency commitments are made.

## Localization beyond translation

- [ ] Native-speaker (ideally China-based parenting-content) review pass on
      all Simplified Chinese copy in `src/i18n/translations.ts` and
      `src/data/*.ts` — the current Chinese copy was written for this
      prototype and has not had an external native-speaker editorial pass.
- [ ] Confirm the five flagship SEL journeys
      (`getting-angry`/`interrupting`/`sharing`/`fear-of-failure`/`friend-conflict`)
      reflect culturally appropriate parenting guidance for the target
      market, not a direct translation of Western parenting norms.

## Testing & quality

- [x] Automated test coverage for the licensing-filter logic, locale
      switching, age-bucket resolution, situation-content resolution, and
      the local saved/reflection hooks (`npm run test`).
- [ ] End-to-end/browser automation tests (this pass validated the flows
      manually via live browser smoke-testing, not automated e2e tests).
- [ ] Accessibility audit beyond the aria-labels already present.
- [ ] Load/performance testing once a real backend exists.
