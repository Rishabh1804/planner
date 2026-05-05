# `src/engine/`

Decision and recommendation logic belongs here once the root bundle is split.

## Owns

- destination scoring
- budget derivation
- travel fatigue rules
- baby-comfort weighting
- recommendation ranking
- decision-signal interpretation

## Rule

Engine code should accept data/state inputs and return computed results. It should not touch DOM nodes directly.
