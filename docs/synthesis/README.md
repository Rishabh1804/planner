# Holiday Planner Synthesis System

The synthesis system is Holiday Planner's cross-feature memory layer.

It is not a bug log, release note, roadmap, or decision log. It records how product areas interact so future versions can move faster without breaking the larger app logic.

## Purpose

Holiday Planner is a multi-tab planning product where each surface depends on the others:

- Planner defines trip intent.
- Options converts intent into possible plans.
- Decide captures preference signals and scenario exploration.
- Ready turns a chosen direction into booking readiness.
- State preserves user choices.
- Data defines the planning universe.
- Engine converts data and state into recommendations.
- PWA/runtime keeps the app reliable on mobile.

The biggest risk is not that one tab fails alone. The bigger risk is that one tab improves in isolation while weakening the system.

Synthesis reports prevent that by documenting interaction rules, ownership boundaries, data flow, regression risks, and future compounding opportunities.

## Report types

### Pair synthesis

A pair synthesis studies two areas and how they interact.

Examples:

- Planner ↔ Options
- Planner ↔ Decide
- Options ↔ Ready
- Data ↔ Engine
- State ↔ UI
- PWA ↔ Runtime Boot

### Compound synthesis

A compound synthesis studies three or more areas as a system.

Examples:

- Planner → Options → Decide
- Planner → Options → Ready
- State → Data → Engine → UI
- PWA → Runtime → Storage

### Retrospective synthesis

A retrospective synthesis studies something that happened during implementation and turns it into future leverage.

Examples:

- Why horizontal scroll kept recurring
- Why source-of-truth drift appears during tab redesign
- Why service-worker changes need stricter release controls

## When to run synthesis

Run a synthesis when:

- A tab or feature is being redesigned.
- A module is about to be wired into the live runtime.
- Two areas share state, assumptions, or user intent.
- A bug appears because two systems interacted unexpectedly.
- A feature feels locally correct but globally confusing.
- The app starts gaining complexity and needs alignment before the next iteration.

## Synthesis cadence

Recommended cadence:

- Before major wiring changes: one targeted pair synthesis.
- After a bug/regression: one retrospective synthesis if the bug involved cross-system behavior.
- Every few feature iterations: one compound synthesis across the current product flow.
- Before a release: review the synthesis index for relevant interaction rules.

## Required report sections

Each synthesis report should include:

1. **Scope** — what areas are being compared.
2. **Why this matters** — why this interaction affects product quality.
3. **Ownership boundary** — what each area owns and must not own.
4. **State/data flow** — what moves between the areas.
5. **Derived vs independent behavior** — what should be calculated from upstream state and what can be edited locally.
6. **Failure modes** — how this interaction can break.
7. **Compounding opportunities** — how this interaction can create velocity.
8. **Implementation implications** — what files/modules are involved.
9. **QA checks** — what to test when either side changes.
10. **Open questions** — unresolved product/technical questions.
11. **Future synthesis links** — related reports that should eventually connect.

## Relationship to other governance files

- `docs/DECISIONS.md` explains why structural decisions were made.
- `docs/QA.md` explains what must be tested.
- `docs/BUGS.md` records what has broken before.
- `docs/synthesis/` explains how product areas interact and how future work should compound.

## Core rule

A feature is not considered fully understood until its interaction with adjacent features has been synthesized.
