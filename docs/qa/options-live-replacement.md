# QA — Options Live Replacement

Status: Active  
Area: Options tab  
Created: 2026-05-05

Use this checklist before replacing the live Options section.

This checklist is stricter than the density scaffold QA because it governs the first user-visible Options replacement.

## Required references

Before implementation, review:

- `docs/contracts/options-contract.md`
- `docs/BUGS.md`
- `docs/bugs/README.md`
- `docs/qa/options-density-upgrade.md`
- `docs/synthesis/2026-05-05-options-density-upgrade.md`
- `docs/synthesis/2026-05-05-options-engine-density.md`
- `docs/synthesis/2026-05-05-options-decide-ready-density-compound.md`

## Architecture gate

- [ ] No runtime enhancer is used as the final implementation.
- [ ] No duplicate Options implementation exists in the live DOM.
- [ ] No hidden legacy Options shell remains after replacement unless explicitly documented as temporary and inert.
- [ ] Existing render IDs are preserved or deliberately migrated with the renderer in the same change.
- [ ] The live replacement is isolated enough to revert in one commit.

## Planner and state gate

- [ ] Planner remains the source of truth for dates.
- [ ] Planner remains the source of truth for experience tier.
- [ ] Planner remains the source of truth for destination direction.
- [ ] Options does not create independent budget-tier state.
- [ ] Existing `augustFamilyHoneymoon.*.v431` storage keys remain untouched.
- [ ] Planner incomplete state keeps Options guarded or empty.

## Options render target gate

Verify these targets still render correctly or have been intentionally replaced by equivalent source-module renderers:

- [ ] `recommendationContext`
- [ ] `scenarioPlanB`
- [ ] `recommendationStack`
- [ ] `shortlistStrip`
- [ ] `comparePanel`
- [ ] `monthStrip`
- [ ] `destinationBoard`
- [ ] `optionsStayCard`
- [ ] `generatedStays`
- [ ] `optionsBudgetCard`
- [ ] `budgetTotal`
- [ ] `budgetSummary`
- [ ] `flightBudget`
- [ ] `hotelBudget`
- [ ] `experienceBudget`
- [ ] `budgetReasons`
- [ ] `budgetBreakdownList`
- [ ] `flightDataNote`
- [ ] `flightOptionList`

## Functional gate

- [ ] Recommendation cards render after Planner completion.
- [ ] Recommendation ranking still responds to destination direction.
- [ ] Recommendation ranking still responds to experience tier.
- [ ] Recommendation ranking still responds to month/date changes.
- [ ] Shortlist action still stores and displays selected items.
- [ ] Compare action still displays comparison detail or has a documented replacement.
- [ ] Month explorer still works if retained.
- [ ] Budget envelope updates after Planner changes.
- [ ] Stay strategy updates after Planner changes.
- [ ] Scenario lens output can appear when scenario state exists, but scenario controls remain in Decide.

## Layout gate

- [ ] No steady-state horizontal scroll on mobile.
- [ ] Long destination names wrap inside cards.
- [ ] Winner strip wraps safely on narrow screens.
- [ ] Lens and comparison chips wrap safely.
- [ ] Expanded details do not force page width.
- [ ] Touch targets are approximately 44px where practical.
- [ ] Compact cards remain readable without forcing every detail into the first screen.
- [ ] Secondary panels for month, stay, and budget do not dominate the first viewport.

## Runtime gate

- [ ] No duplicate app initialization.
- [ ] No duplicate event listeners on Planner controls.
- [ ] No duplicate event listeners on recommendation actions.
- [ ] `app.js` remains a boot guard until a deliberate full runtime extraction.
- [ ] Service-worker behavior is unchanged unless separately reviewed.
- [ ] Browser title remains `Holiday Planner` or a deliberate Holiday Planner dynamic title.

## Bug regression gate

Cross-check focused bug reviews:

- [ ] BUG-001 text overflow.
- [ ] BUG-002 Planner selection not responding.
- [ ] BUG-003 horizontal scroll.
- [ ] BUG-004 duplicate runtime.
- [ ] BUG-005 stale service-worker fallback.
- [ ] BUG-006 icon path drift.
- [ ] BUG-008 Options winner-slot derivation.

## Acceptance criteria

The replacement is acceptable when:

1. Options feels like a compact comparison cockpit instead of a vertical report.
2. Existing dynamic recommendation, shortlist, budget, stay, and month behavior still works.
3. The implementation has one clear source path, not legacy plus patch layers.
4. The mobile layout has no steady-state horizontal overflow.
5. The change can be reverted cleanly if needed.
