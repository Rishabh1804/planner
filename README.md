# Holiday Planner

A standalone PWA scaffold for the guided family holiday planning dashboard.

## Files

- `index.html` — app shell and markup migrated from the v45 dashboard.
- `styles.css` — dashboard styles split out from the original single-file HTML.
- `app.js` — current dashboard behaviour, including planner state, scoring, rendering, and event binding.
- `manifest.json` — installable PWA metadata.
- `sw.js` — service worker for offline app-shell fallback and static asset caching.
- `icon.svg` — lightweight app icon used by the manifest and browser tab.

## Notes

The existing `augustFamilyHoneymoon.*.v431` localStorage keys are intentionally preserved during this first split so saved planning data can survive the migration. A later migration can rename the namespace to `holidayPlanner` after we add a safe key migration routine.
