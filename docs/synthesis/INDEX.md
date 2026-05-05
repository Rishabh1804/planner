# Synthesis Report Index

This index tracks all Holiday Planner synthesis reports.

Use it before changing a feature, tab, module, or release behavior that touches more than one product area.

## Active synthesis map

| Report | Type | Areas | Status | Use before changing |
|---|---|---|---|---|
| `2026-05-05-planner-options.md` | Pair | Planner ↔ Options | Active | Planner flow, recommendation cards, budget derivation, destination ranking |
| `2026-05-05-planner-decide.md` | Pair | Planner ↔ Decide | Active | Guided Plan builder, scenario exploration, preference signals, decision capture |
| `2026-05-05-options-ready.md` | Pair | Options ↔ Ready | Active | Destination cards, shortlist logic, selected option flow, booking-readiness checklist |
| `2026-05-05-data-engine.md` | Pair | Data ↔ Engine | Active | Destination catalog, scoring logic, budget assumptions, recommendation ranking |
| `2026-05-05-planner-options-decide-compound.md` | Compound | Planner → Options → Decide | Active | Full planning loop, recommendation feedback, decision confidence, signal compounding |

## Planned synthesis reports

| Priority | Report | Type | Why it matters |
|---|---|---|---|
| High | State ↔ UI | Pair | Prevent state duplication and broken persistence during module wiring. |
| High | Planner → Options → Ready | Compound | Understand the full setup-to-booking-readiness loop. |
| High | Planner → Options → Decide → Ready | Compound | Connect setup, recommendations, reactions, and execution readiness into one product loop. |
| Medium | PWA ↔ Runtime Boot | Pair | Protect service-worker/cache behavior during app.js wiring. |
| Medium | Bugs ↔ QA ↔ Synthesis | Compound | Convert recurring bugs into reusable product intelligence. |
| Medium | State → Data → Engine → UI | Compound | Protect modular source extraction and future wired runtime behavior. |

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
- Options ↔ Ready says Options recommends and Ready prepares.
- Together, they imply a future compound report: Planner → Options → Decide → Ready.

That compound report should define how a user moves from setup to recommendation to reaction to execution readiness without duplicating state or overloading any one tab.
