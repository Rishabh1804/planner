# BUG-002 — Planner tab selection not responding

Status: Watching  
Area: Planner / UI events  
Found during: Pre-live Planner tab iteration around v43/v44

## Symptom

Experience tier selection in Planner did not respond when tapped.

## Root cause

The interaction binding or state update path regressed during guided Planner changes.

## Fix already applied

Selection behavior was repaired before the Live v1 baseline.

## Current risk

High whenever layout, tab, event binding, or Planner source-of-truth behavior changes.

This matters because the Planner is the input source for downstream Options, Decide, and Ready behavior.

## Regression checks

Before any user-visible release:

- Date selection works.
- Experience tier selection works.
- Optional soft cap entry still works.
- Destination direction selection works.
- Planner breadcrumbs update after selections.
- Options receives updated Planner-derived recommendation context.
- Selection works on mobile touch, not just desktop click.

## Related files

- `index.html`
- future `src/ui/planner*`
- future `src/state/*`
- future Planner to Options wiring code
