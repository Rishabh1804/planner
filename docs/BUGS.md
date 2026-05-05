# Holiday Planner Bug Checklist

This file is the persistent bug memory for Holiday Planner.

Every confirmed bug should be added here, even after it is fixed. Future versions must cross-reference this checklist before making related changes.

## How to use this checklist

For every bug, add:

- **ID:** Short stable identifier, for example `BUG-001`.
- **Status:** `Open`, `Fixed`, `Watching`, or `Regression-risk`.
- **Area:** Planner, Options, Decide, Ready, PWA, Storage, Layout, Data, Engine, Docs.
- **Version / date found:** Where it appeared.
- **Symptom:** What the user saw.
- **Root cause:** What caused it, once known.
- **Fix:** What changed.
- **Regression check:** What must be tested before future releases.
- **Related files:** Files likely involved.

---

## Active regression checklist

Before each user-visible release, check these known risk areas:

- [ ] No duplicate runtime execution from both inline `index.html` and external `app.js`.
- [ ] No stale service-worker HTML fallback trapping old app shells.
- [ ] No steady-state horizontal scrolling on mobile.
- [ ] Planner selections work after layout or tab changes.
- [ ] Touch targets remain approximately 44px where practical.
- [ ] `augustFamilyHoneymoon.*.v431` storage remains preserved until an explicit migration release.
- [ ] Any future `holidayPlanner.*.v1` migration copies state before changing active keys.
- [ ] Scenario exploration remains in Decide, not Planner.
- [ ] Product title remains `Holiday Planner` across `index.html`, manifest, dynamic title updates, and install surfaces.
- [ ] Icon references stay canonical at `./assets/icons/icon.svg` unless deliberately changed.

---

## Bugs and regressions

### BUG-001 — Text overflow / card content escaping container

- **Status:** Watching
- **Area:** Layout
- **Version / date found:** Pre-live mobile UI iterations, v41–v43 range
- **Symptom:** Text overflowed outside cards/containers on mobile after updates.
- **Root cause:** Long labels/content and flexible layouts did not consistently enforce wrapping/min-width boundaries.
- **Fix:** Added mobile/layout hardening during pre-live iterations.
- **Regression check:** On mobile, verify long destination names, card titles, chips, and explanatory text wrap without horizontal overflow.
- **Related files:** `index.html`, future `src/ui/*`, future stylesheet extraction.

### BUG-002 — Planner tab selection not responding

- **Status:** Watching
- **Area:** Planner / UI events
- **Version / date found:** Pre-live Planner tab iteration around v43/v44
- **Symptom:** Experience tier selection in Planner did not respond when tapped.
- **Root cause:** Interaction binding/state update path regressed during guided Planner changes.
- **Fix:** Selection behavior was repaired before Live v1 baseline.
- **Regression check:** Select date, experience tier, soft cap, and destination direction on mobile; confirm visual state and downstream readiness update.
- **Related files:** `index.html`, future `src/ui/planner*`, future `src/state/*`.

### BUG-003 — Plan mode horizontal scrolling

- **Status:** Watching
- **Area:** Mobile Layout
- **Version / date found:** Pre-live Plan mode iteration
- **Symptom:** Plan mode had horizontal scrolling on mobile.
- **Root cause:** Wide tab/card/form layouts were not fully constrained for mobile viewport width.
- **Fix:** Guided/stepwise Plan flow and layout hardening removed steady-state horizontal scroll before Live v1.
- **Regression check:** On mobile, scroll vertically through Plan mode and verify the page does not pan horizontally at rest.
- **Related files:** `index.html`, future `src/ui/*`, future stylesheet extraction.

### BUG-004 — Duplicate runtime risk from inline `index.html` plus external `app.js`

- **Status:** Fixed / Regression-risk
- **Area:** Boot / PWA
- **Version / date found:** Live stabilization before v1 baseline
- **Symptom:** Root `index.html` had the full app runtime inline while root `app.js` also contained runtime logic, creating duplicate `DOMContentLoaded` execution risk.
- **Root cause:** Single-file dashboard split left duplicate runtime paths active.
- **Fix:** Reduced root `app.js` to a service-worker boot guard only.
- **Regression check:** Confirm only one runtime path initializes app state and event listeners after any module wiring.
- **Related files:** `index.html`, `app.js`, future `src/app.js`, `src/pwa/registration.js`.

### BUG-005 — Stale service-worker HTML fallback risk

- **Status:** Fixed / Regression-risk
- **Area:** PWA
- **Version / date found:** Live stabilization before v1 baseline
- **Symptom:** Service worker could trap navigation behind stale cached HTML.
- **Root cause:** Navigation fallback behavior was too aggressive for a static GitHub Pages app during rapid iteration.
- **Fix:** Navigation requests are now network-first and `index.html` is not cached as a stale fallback.
- **Regression check:** Hard refresh live app after deployment; confirm latest shell loads and no stale cached HTML appears.
- **Related files:** `sw.js`, `app.js`, `src/pwa/*`.

### BUG-006 — Icon path drift between root icon and assets icon

- **Status:** Fixed / Regression-risk
- **Area:** PWA / Assets
- **Version / date found:** Live stabilization before v1 baseline
- **Symptom:** Multiple icon paths could drift between root `icon.svg`, manifest, service worker, and HTML head.
- **Root cause:** Asset migration left more than one possible canonical icon location.
- **Fix:** Canonical icon path became `./assets/icons/icon.svg`; obsolete root icon was removed.
- **Regression check:** Verify `index.html`, `manifest.json`, and `sw.js` all reference the same canonical icon path.
- **Related files:** `index.html`, `manifest.json`, `sw.js`, `assets/icons/icon.svg`.

### BUG-007 — Decision-log write SHA conflict

- **Status:** Fixed / Watching
- **Area:** Docs / Governance
- **Version / date found:** During extraction documentation updates
- **Symptom:** A docs decision-log update failed due to a stale SHA conflict.
- **Root cause:** File changed between fetch and update.
- **Fix:** Re-fetched latest file SHA and re-applied the decision-log update.
- **Regression check:** For docs updates, fetch latest file before writing and verify the final file after update.
- **Related files:** `docs/DECISIONS.md`.

---

## Bug entry template

```md
### BUG-XXX — Short bug name

- **Status:** Open
- **Area:** Planner / Options / Decide / Ready / PWA / Storage / Layout / Data / Engine / Docs
- **Version / date found:** YYYY-MM-DD or version label
- **Symptom:** What the user saw.
- **Root cause:** Unknown until confirmed.
- **Fix:** Pending.
- **Regression check:** What must be tested before future releases.
- **Related files:** `path/to/file`, `path/to/another-file`
```
