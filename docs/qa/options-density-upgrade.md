# QA — Options Density and Comparison Cockpit

Status: Active

Applies to the first major upgrade after the app shift: the Options tab density and comparison cockpit work.

## Required synthesis references

Before implementation, check these reports:

- `docs/synthesis/2026-05-05-options-density-upgrade.md`
- `docs/synthesis/2026-05-05-options-decide-density.md`
- `docs/synthesis/2026-05-05-options-engine-density.md`
- `docs/synthesis/2026-05-05-options-decide-ready-density-compound.md`

Core rule: reduce scroll, not signal. Options compares first and explains second.

## Pre-implementation checklist

- Keep Planner as source of truth for destination direction and experience tier.
- Keep existing storage namespace unchanged.
- Preserve existing live IDs used by inline runtime where possible.
- Do not move scenario exploration into Options.
- Do not add independent budget-tier state to Options.
- Do not hard-code labels that contradict engine or data output.
- Avoid wide tables or fixed-width comparison layouts.

## Layout QA

- Options has no steady-state horizontal scroll on mobile.
- Winner strip wraps safely on narrow screens.
- Lens and filter chips wrap safely.
- Compact cards keep long option names inside the card.
- At least one recommendation can be understood without expanding details.
- Expanded detail does not break card width.
- Budget, stay, and month depth is available but not forced into the first screen.
- Touch targets are approximately 44px where practical.

## Functional QA

- Planner selections still update Options.
- Recommendation cards still render from the current data path.
- Shortlist display still renders.
- Budget envelope still updates.
- Stay strategy still renders.
- Destination and month explorer still renders if retained.
- Decide remains the home for reactions, worries, non-negotiables, and scenario exploration.
- Ready still receives enough selected-option context in later wiring.

## Regression checks

Cross-reference:

- `docs/BUGS.md`
- `docs/QA.md`
- `docs/synthesis/INDEX.md`

Specific regression risks:

- Text overflow or card content escaping container.
- Planner selection not responding.
- Plan mode or Options horizontal scrolling.
- Duplicate runtime execution.
- Stale service-worker fallback.
- SHA conflicts on documentation updates.

## Acceptance criteria for first live patch

The first live Options density patch is acceptable when:

1. The top of Options feels like a comparison cockpit, not a report.
2. The recommendation area is visibly shorter before expansion.
3. Existing generated content still appears.
4. Mobile does not introduce horizontal overflow.
5. No state or storage migration is required.
6. Decide and Ready boundaries remain intact.
