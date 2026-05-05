# Holiday Planner Repository Structure

This repo is organized as a static GitHub Pages PWA with Codex constitutional governance.

## Current Safe Layout

```txt
/
├── index.html              # GitHub Pages entry point; keep at root
├── manifest.json           # PWA manifest; keep at root unless references are updated
├── sw.js                   # Service worker; keep at root to preserve app scope
├── app.js                  # Current app logic bundle
├── styles.css              # Current app stylesheet
├── icon.svg                # Current PWA icon
├── README.md               # Public repo overview
├── CLAUDE.md               # Repo operating context and constitutional rules
└── docs/
    ├── CHARTER.md          # Project charter
    ├── DECISIONS.md        # Decision log
    └── STRUCTURE.md        # This structure map
```

## Target Layout

The target layout separates the app into source sections while preserving a simple GitHub Pages deployment path.

```txt
/
├── index.html              # Deployment shell
├── manifest.json           # PWA manifest
├── sw.js                   # Root service worker
├── README.md
├── CLAUDE.md
├── assets/
│   └── icons/
│       └── icon.svg
├── src/
│   ├── data/
│   │   └── destinations.js
│   ├── state/
│   │   ├── storage.js
│   │   └── migration.js
│   ├── engine/
│   │   ├── scoring.js
│   │   ├── budget.js
│   │   └── recommendations.js
│   ├── ui/
│   │   ├── planner.js
│   │   ├── options.js
│   │   ├── decide.js
│   │   └── ready.js
│   ├── pwa/
│   │   └── registration.js
│   ├── app.js
│   └── styles.css
├── docs/
│   ├── CHARTER.md
│   ├── DECISIONS.md
│   ├── STRUCTURE.md
│   └── ROADMAP.md
└── archive/
    ├── originals/
    └── scaffolds/
```

## Sections and Responsibilities

### Root

Root is for deployment-critical files and high-level repo context only.

Keep at root:

- `index.html`
- `manifest.json`
- `sw.js`
- `README.md`
- `CLAUDE.md`

Avoid adding feature files directly to root.

### `assets/`

Static media and visual assets.

Recommended subsections:

- `assets/icons/`
- `assets/images/`
- `assets/fonts/` if local fonts are ever used

### `src/data/`

Static planning data.

Examples:

- destination catalog
- month suitability
- visa notes
- flight assumptions
- stay-style bands

### `src/state/`

State, persistence, and migration.

Examples:

- localStorage wrapper
- old `augustFamilyHoneymoon.*.v431` migration
- future `holidayPlanner.*.v1` keys

### `src/engine/`

Decision logic.

Examples:

- score calculation
- budget derivation
- destination matching
- fatigue and infant-comfort rules

### `src/ui/`

Rendering and interaction by product area.

Recommended subsections:

- `planner.js` — source-of-truth guided planner
- `options.js` — derived destination and stay options
- `decide.js` — scenario exploration and decision signals
- `ready.js` — checklist and readiness

### `src/pwa/`

PWA support code that is not the root service worker itself.

Examples:

- registration
- install prompt helper
- update notification helper

### `docs/`

Governance and planning documents.

Required:

- `CHARTER.md`
- `DECISIONS.md`
- `STRUCTURE.md`

Optional:

- `ROADMAP.md`
- `QA.md`
- `RELEASES.md`

### `archive/`

Historical material that should not remain in active root.

Recommended subsections:

- `archive/originals/` — monolithic HTML exports
- `archive/scaffolds/` — generated zip scaffolds or handoff bundles

## Migration Rule

Do not move executable files and data files in the same commit unless the path changes are trivial. Preferred sequence:

1. Add `docs/STRUCTURE.md`.
2. Move docs/reference material.
3. Move assets and update manifest references.
4. Move CSS/JS and update `index.html` plus `sw.js`.
5. Split `app.js` into `src/` modules.
6. Remove or archive obsolete root files.

Each step should keep the app bootable.

## Constitutional Note

The structure follows Charter Before Build: future features should enter through the relevant section instead of becoming root-level drift.
