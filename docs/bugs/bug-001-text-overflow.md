# BUG-001 — Text overflow and card content escaping container

Status: Watching  
Area: Layout  
Found during: Pre-live mobile UI iterations, v41 to v43 range

## Symptom

Text overflowed outside cards and containers on mobile after updates.

The risky content types were:

- Long destination names.
- Card titles.
- Chips and tags.
- Dense explanatory text.
- Generated recommendation copy.

## Root cause

Long labels and flexible layouts did not consistently enforce wrapping, `min-width: 0`, or safe card boundaries.

## Fix already applied

Mobile and layout hardening was added during the pre-live iterations.

## Current risk

Medium during Options and card-density work.

The Options Density upgrade introduces compact cards, winner strips, chips, and expandable detail panels. These are exactly the kinds of components where overflow can return if text wrapping is not guarded.

## Regression checks

Before any user-visible layout release:

- Long option names stay inside cards.
- Winner cards wrap safely.
- Lens chips wrap safely.
- Comparison chips wrap safely.
- Expanded details do not push card width beyond viewport.
- No steady-state horizontal scroll appears on mobile.

## Related files

- `index.html`
- `styles.css`
- `src/ui/options-cockpit.css`
- future `src/ui/*`
