# Holiday Planner Releases

Release notes for structural and user-facing changes.

## Live v1 Baseline — 2026-05-05

### User-visible status

- GitHub Pages deployment is live at `https://rishabh1804.github.io/planner/`.
- Root app loads successfully on mobile.
- Planner date, experience tier, and destination direction selection work.
- Plan mode has no horizontal scrolling in the mobile smoke test.

### Repository Organization

- Added `docs/STRUCTURE.md` to define the active and target repository layout.
- Added `src/` section guides for future app split.
- Added `assets/` and `archive/` section guides.
- Added `docs/ROADMAP.md` and `docs/QA.md`.

### PWA Hygiene

- Moved the canonical app icon into `assets/icons/icon.svg`.
- Updated `index.html`, `manifest.json`, and `sw.js` icon references to `./assets/icons/icon.svg`.
- Bumped service-worker cache to `holiday-planner-v2`.
- Removed stale HTML fallback behavior from service-worker navigation handling.
- Reduced root `app.js` to a service-worker boot guard to avoid duplicate runtime execution while the full app remains inline in `index.html`.

### localStorage

- Preserved existing `augustFamilyHoneymoon.*.v431` storage keys.
- No storage migration was performed in this release.

### QA notes

- Mobile smoke test passed: load, Planner selections, and no horizontal scroll in Plan mode.
- Next release should begin source extraction with `src/state` first, then `src/data`, then `src/engine`, with UI extraction last.

## Unreleased

- Begin controlled source extraction from inline `index.html` runtime into `src/` modules.

## Release Rule

Every release entry should note:

- user-visible changes
- path changes
- service-worker cache changes
- localStorage migration impact
- QA notes
