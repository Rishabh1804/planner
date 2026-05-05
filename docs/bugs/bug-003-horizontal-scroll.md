# BUG-003 — Plan mode horizontal scrolling

Status: Watching  
Area: Mobile layout  
Found during: Pre-live Plan mode iteration

## Symptom

Plan mode had horizontal scrolling on mobile.

## Root cause

Wide tab, card, and form layouts were not fully constrained for mobile viewport width.

## Fix already applied

The guided stepwise Plan flow and layout hardening removed steady-state horizontal scroll before Live v1.

## Current risk

High during any compact comparison work.

The Options Density upgrade must not solve vertical density by introducing horizontal movement. Mobile should remain vertical-first with wrapping, collapsing, and progressive disclosure.

## Regression checks

Before any user-visible layout release:

- Scroll vertically through Plan and Options on mobile.
- Verify the page does not pan horizontally at rest.
- Verify tabs do not force the page body wider than the viewport.
- Verify compact cards, chips, grids, and details remain inside the viewport.
- Verify all wide content uses wrapping or vertical stacking.

## Related files

- `index.html`
- `styles.css`
- `src/ui/options-cockpit.css`
- future stylesheet extraction
