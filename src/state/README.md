# `src/state/`

Persistence, state shape, and migration logic belongs here once the root bundle is split.

## Owns

- localStorage wrapper
- saved planner choices
- discussion notes
- budget cap and shortlist state
- migration from `augustFamilyHoneymoon.*.v431` to future `holidayPlanner.*.v1`

## Rule

State code may read and write storage, but should not render UI directly.
