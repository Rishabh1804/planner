# BUG-005 — Stale service-worker HTML fallback risk

Status: Fixed / Regression-risk  
Area: PWA  
Found during: Live stabilization before v1 baseline

## Symptom

The service worker could trap navigation behind stale cached HTML.

## Root cause

Navigation fallback behavior was too aggressive for a static GitHub Pages app during rapid iteration.

## Fix already applied

Navigation requests are now network-first and `index.html` is not cached as a stale fallback.

## Current risk

Medium during PWA, cache, or release shell updates.

If stale HTML returns, a user may see an older shell even after new code has shipped.

## Regression checks

Before release:

- Hard refresh the live app after deployment.
- Confirm the latest shell loads.
- Confirm service worker install does not pin old `index.html`.
- Confirm navigation requests remain network-first.
- Confirm app can still load core assets while online.

## Related files

- `sw.js`
- `app.js`
- `manifest.json`
- `src/pwa/*`
