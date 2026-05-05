# Holiday Planner Charter

## Status

Active standalone app under Codex constitutional governance.

## Purpose

Holiday Planner is a mobile-first PWA for planning family holidays with low cognitive load. It converts a small set of guided choices into destination options, trip rhythm, budget envelope, readiness checklist, and decision notes.

## Authority

The Constitution of the Republic of Codex v1.1 is the governing authority for this repo. Codex remains the institutional archive; Planner is an independent satellite app with shared governance.

## Product Shape

The app should guide the user through:

1. Dates
2. Experience tier
3. Destination direction
4. Generated trip story
5. Options, budget, readiness, and decision signals

The Planner tab is the source of truth. Other tabs must derive from Planner state.

## Principles

- Planner-first data collection.
- Mobile-first layout.
- No horizontal scrolling as a steady-state design.
- Accessible controls, targeting 44px touch height where practical.
- Progressive disclosure over crowded dashboards.
- Derived budget from experience tier, with optional soft cap.
- Family-friendly trip pacing.
- Recommendation logic driven by shared data, not scattered hard-coded cards.

## Current Architecture

Static PWA at repo root:

```txt
index.html
styles.css
app.js
manifest.json
sw.js
icon.svg
README.md
```

## Stabilization Goals

- Verify GitHub Pages boot from root `index.html`.
- Verify manifest installability.
- Verify service-worker update behavior.
- Eliminate mobile horizontal overflow.
- Preserve existing localStorage state during migration.
- Split `app.js` only when the split improves maintainability.

## Non-goals for Current Phase

- No backend.
- No login.
- No paid booking integrations.
- No live airfare or visa scraping until data-source reliability is designed.
