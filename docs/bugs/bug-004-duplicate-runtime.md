# BUG-004 — Duplicate runtime risk

Status: Fixed / Regression-risk  
Area: Boot / PWA  
Found during: Live stabilization before v1 baseline

## Symptom

Root `index.html` had the full app runtime inline while root `app.js` also contained runtime logic. This created a duplicate `DOMContentLoaded` execution risk.

## Root cause

The original single-file dashboard split left duplicate runtime paths active.

## Fix already applied

Root `app.js` was reduced to a service-worker boot guard only.

## Current risk

High whenever new modules are wired into the live shell.

The project is intentionally keeping most runtime behavior inline until extraction is safe. Any future `app.js` or `src/app.js` wiring must avoid initializing the same app twice.

## Regression checks

Before any runtime wiring release:

- Confirm only one runtime path initializes app state.
- Confirm event listeners are not bound twice.
- Confirm Planner selections do not double-toggle.
- Confirm generated cards are not duplicated.
- Confirm service-worker registration remains isolated from app rendering logic.

## Related files

- `index.html`
- `app.js`
- `src/pwa/registration.js`
- future `src/app.js`
