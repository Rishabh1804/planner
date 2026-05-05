# `src/` — App Source Sections

This directory is the target home for feature code once the current root-level `app.js` is split.

## Intended Subsections

```txt
src/
├── data/       # Static catalogs and planning datasets
├── state/      # Persistence, storage keys, migration
├── engine/     # Scoring, budget, recommendation logic
├── ui/         # Rendering and user interaction by tab/module
├── pwa/        # Registration and install/update helpers
├── app.js      # Future source entry point
└── styles.css  # Future source stylesheet or CSS entry point
```

## Rule

Do not add new feature logic to root-level files unless it is part of a narrow stabilization patch. New feature work should identify its intended subsection here before implementation.
