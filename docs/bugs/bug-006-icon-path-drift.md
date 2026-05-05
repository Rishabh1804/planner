# BUG-006 — Icon path drift

Status: Fixed / Regression-risk  
Area: PWA / Assets  
Found during: Live stabilization before v1 baseline

## Symptom

Multiple icon paths could drift between root `icon.svg`, manifest, service worker, and HTML head.

## Root cause

Asset migration left more than one possible canonical icon location.

## Fix already applied

The canonical icon path became `./assets/icons/icon.svg`. The obsolete root icon was removed.

## Current risk

Low to medium during manifest, app-shell, or asset updates.

The risk is mostly install-surface drift: the browser, PWA manifest, and cached assets can silently disagree.

## Regression checks

Before release:

- Confirm `index.html` references `./assets/icons/icon.svg`.
- Confirm `manifest.json` references `./assets/icons/icon.svg`.
- Confirm `sw.js` caches the canonical icon path if it caches icons.
- Confirm no obsolete root `icon.svg` path is reintroduced.

## Related files

- `index.html`
- `manifest.json`
- `sw.js`
- `assets/icons/icon.svg`
