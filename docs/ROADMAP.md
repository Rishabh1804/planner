# Holiday Planner Roadmap

## Phase 0 — Stabilize Current PWA

- Verify GitHub Pages boot from root `index.html`.
- Verify manifest installability.
- Keep `sw.js` at root and avoid caching HTML.
- Eliminate mobile horizontal overflow.
- Confirm Planner step selection works on touch devices.
- Preserve existing `augustFamilyHoneymoon.*.v431` localStorage keys.

## Phase 1 — Organize Repo Sections

- Keep deployment-critical files at root.
- Move static assets into `assets/`.
- Keep governance and planning docs in `docs/`.
- Keep historical exports and generated bundles in `archive/`.
- Prepare `src/` subsections before splitting the live bundle.

## Phase 2 — Split the Bundle

Target split:

```txt
src/
├── data/
├── state/
├── engine/
├── ui/
└── pwa/
```

Recommended first extraction order:

1. storage helpers
2. static planner data
3. scoring and budget helpers
4. UI render helpers
5. event binding/bootstrap

## Phase 3 — Feature Integration

- Add destination profiles as data files, not hard-coded UI cards.
- Add recommendation changes through `src/engine/`.
- Add new screens through `src/ui/`.
- Add storage changes through `src/state/` with migration notes.

## Phase 4 — Release Hygiene

- Add `docs/QA.md` for manual test passes.
- Add `docs/RELEASES.md` for version notes.
- Add service-worker cache bump discipline to every runtime-path change.
