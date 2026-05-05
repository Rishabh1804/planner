# Holiday Planner QA Checklist

Use this checklist before and after structural changes.

Before every user-visible release, cross-reference [`docs/BUGS.md`](./BUGS.md) and run the active regression checklist there.

## QA Snapshot — 2026-05-05 — Live v1 before module wiring

### Live status

- GitHub Pages URL: `https://rishabh1804.github.io/planner/`.
- Live runtime status: full Planner runtime remains inline in root `index.html`.
- Root `app.js` status: service-worker boot guard only.
- Source modules status: `src/state`, `src/data`, `src/engine`, `src/pwa`, and `src/ui` scaffolds exist but are not wired into the live app.

### User-confirmed mobile smoke test

- Page loads successfully.
- Planner date, experience tier, and destination direction selections work.
- Plan mode has no horizontal scrolling.

### Current structural safety notes

- No live runtime wiring changed after the smoke test.
- Existing `augustFamilyHoneymoon.*.v431` localStorage keys remain the active production storage contract.
- `holidayPlanner.*.v1` migration helpers exist but do not run automatically.
- Service-worker navigation remains network-first.
- Screen-specific UI extraction has not started.

### Required retest before first wired module

- Hard refresh the live Pages URL.
- Confirm Planner selections still work.
- Confirm no steady-state horizontal scroll in Plan mode.
- Confirm service worker registers without fatal console errors.
- Confirm saved state survives refresh.
- Cross-reference `docs/BUGS.md` active regression checklist.

### Required retest after first wired module

- Repeat the full mobile smoke test.
- Test one existing saved-state scenario.
- Test one clean-browser/no-storage scenario.
- Confirm no duplicate event handling.
- Confirm no service-worker stale-cache regression.
- Cross-reference `docs/BUGS.md` active regression checklist.

---

## Boot

- Root `index.html` loads on GitHub Pages.
- No blank page on hard refresh.
- Console has no fatal JavaScript errors.
- CSS loads from the expected path.
- App logic loads from the expected path.

## PWA

- `manifest.json` loads successfully.
- Manifest name is `Holiday Planner`.
- Icon path resolves.
- Service worker installs without errors.
- Navigation requests are network-first and not trapped by stale cached HTML.
- Cache name is bumped after runtime asset path changes.

## Planner Flow

- Dates can be selected.
- Experience tier selection works.
- Optional soft cap can be entered and cleared.
- Destination direction selection works.
- Planning month selection works.
- Completed choices become visible breadcrumbs.
- Downstream tabs remain empty/guarded until Planner state is ready.

## Mobile Layout

- No steady-state horizontal scrolling.
- Touch targets are approximately 44px where practical.
- Tabs fit without layout breakage.
- Cards wrap instead of overflowing.
- Long destination names do not escape cards.

## Data and Storage

- Existing `augustFamilyHoneymoon.*.v431` localStorage data is preserved.
- Clearing notes does not clear unrelated planner state.
- Imported notes validate JSON before applying.
- Exported notes can be imported again.

## Recommendation Logic

- Recommendation cards derive from planner state.
- Budget envelope derives from experience tier and destination data.
- Decide-tab signals influence recommendations without duplicating Planner state.
- Scenario exploration stays in Decide, not Planner.
