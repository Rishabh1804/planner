# Synthesis Report Index

This index tracks all Holiday Planner synthesis reports.

Use it before changing a feature, tab, module, or release behavior that touches more than one product area.

## Active synthesis map

| Report | Type | Areas | Status | Use before changing |
|---|---|---|---|---|
| `2026-05-05-planner-options.md` | Pair | Planner ↔ Options | Active | Planner flow, recommendation cards, budget derivation, destination ranking |
| `2026-05-05-planner-decide.md` | Pair | Planner ↔ Decide | Active | Guided Plan builder, scenario exploration, preference signals, decision capture |

## Planned synthesis reports

| Priority | Report | Type | Why it matters |
|---|---|---|---|
| High | Options ↔ Ready | Pair | Prevent Ready from becoming a second recommendation engine. |
| High | Data ↔ Engine | Pair | Keep scoring/ranking grounded in explicit catalog data. |
| High | State ↔ UI | Pair | Prevent state duplication and broken persistence during module wiring. |
| Medium | PWA ↔ Runtime Boot | Pair | Protect service-worker/cache behavior during app.js wiring. |
| Medium | Planner → Options → Decide | Compound | Understand the full intent-to-shortlist-to-decision loop. |
| Medium | Planner → Options → Ready | Compound | Understand the full setup-to-booking-readiness loop. |
| Medium | Bugs ↔ QA ↔ Synthesis | Compound | Convert recurring bugs into reusable product intelligence. |

## Report status definitions

- **Draft:** initial thinking; not yet used for implementation guidance.
- **Active:** approved as a reference for future work.
- **Watching:** useful, but needs updates after the next implementation pass.
- **Superseded:** replaced by a newer synthesis.

## How to update this index

When adding a report:

1. Add it to the Active synthesis map or Planned synthesis reports.
2. Mark its status clearly.
3. Identify which future changes should consult it.
4. Link it from related QA or bug entries if relevant.

## Compounding synthesis rule

Whenever two pair synthesis reports begin to overlap, create or plan a compound synthesis.

Example:

- Planner ↔ Options says Planner owns intent and Options derives recommendations.
- Planner ↔ Decide says Planner owns setup and Decide owns scenario exploration.
- Together, they imply a future compound report: Planner → Options → Decide.

That compound report should define how a user moves from setup to recommendation to decision without duplicating state or overloading Planner.
