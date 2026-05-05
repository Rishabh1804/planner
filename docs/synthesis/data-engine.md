# Synthesis — Data ↔ Engine

**Date:** 2026-05-05  
**Type:** Pair synthesis  
**Areas:** Data layer, Engine layer  
**Status:** Active  
**Use before changing:** Destination catalog, experience tiers, budget assumptions, scoring logic, recommendation ranking, decision-signal weighting, readiness-task derivation.

---

## Scope

Data describes the planning universe. Engine interprets that data for a specific user context.

Core boundary:

```txt
Data = what we know
Engine = how we reason with what we know
```

This boundary matters because recommendation quality depends on both: data must be structured enough to reason over, and engine logic must not hide hard-coded product assumptions that belong in data.

---

## Ownership boundary

### Data owns

- destination catalog
- destination combinations
- month suitability
- weather/season notes
- visa/admin notes
- approximate flight/transfer effort
- stay style assumptions
- experience-tier definitions
- static readiness-task templates
- preference marker definitions
- warning/risk labels

Data should answer:

> What can the app know before seeing this user's exact choices?

### Engine owns

- scoring destinations
- applying Planner context
- deriving budget envelopes
- ranking options
- adjusting weights from Decide signals
- deriving confidence labels
- producing readiness emphasis
- explaining why something ranks higher or lower

Engine should answer:

> Given this data and this user's context, what follows?

---

## Flow

```txt
Data catalog
  +
Planner state
  +
Decide signals
  ↓
Engine calculations
  ↓
Options ranking / Ready emphasis / explanation text
```

The engine should be pure wherever possible. Given the same data and context, it should return the same result.

---

## Data shape principles

1. Data should be explicit, not prose-only.
2. Data should include explanation hooks, not just scores.
3. Data should separate facts from assumptions.
4. Data should be versionable with stable IDs and review dates where useful.

Example destination feature shape:

```txt
id: bali
honeymoonValue: 92
transferEffort: 72
babyComfort: 68
augustFit: 74
riskFlags: ["long-transfer", "heat-sensitive"]
explanationBullets: ["Strong resort value", "Needs slower pacing with infant"]
```

---

## Engine principles

1. Engine should not touch DOM.
2. Engine should not read localStorage directly.
3. Engine should explain itself with scores, labels, reasons, and warnings.
4. Engine should accept weights from Planner context and Decide signals.
5. Engine should not hide product policy in UI copy.

---

## Failure modes

### Hard-coded engine facts

Engine contains destination-specific facts that should live in data.

**Prevention:** Destination facts and static assumptions live in `src/data`.

### Data cannot support explanation

Data has scores but no reasons, warnings, or labels.

**Prevention:** Data should include explanation hooks and risk flags.

### UI bypasses engine

UI computes rankings directly instead of calling engine helpers.

**Prevention:** UI should render engine output, not recreate engine logic.

### Engine reads storage directly

Engine pulls user state from localStorage.

**Prevention:** State layer passes context into engine.

### Budget logic splits across layers

Budget is partly in data, partly in UI, partly in engine.

**Prevention:** Data provides base cost assumptions; engine derives final envelope; UI displays it.

---

## Compounding opportunities

- Better destination data improves Options, Decide, and Ready.
- Better engine logic improves every destination without rewriting UI.
- Data review can become a product habit.
- Engine explanations can make recommendations feel reasoned, not arbitrary.
- Synthesis can reveal missing data fields before implementation starts.

---

## Implementation implications

Recommended next data scaffolds:

- `src/data/destination-catalog.js`
- `src/data/destination-modes.js`
- `src/data/readiness-tasks.js`
- `src/data/risk-labels.js`

Recommended next engine scaffolds:

- `src/engine/decision-signals.js`
- `src/engine/confidence.js`
- `src/engine/readiness.js`
- `src/engine/explanations.js`

Suggested extraction order:

1. Extract stable destination IDs and labels.
2. Extract destination feature scores and notes.
3. Extract risk labels and explanation hooks.
4. Update engine helpers to consume catalog-shaped data.
5. Add decision-signal weighting.
6. Add confidence/explanation output.
7. Wire UI only after parity checks.

---

## QA checks

Before changing Data or Engine:

- [ ] Confirm engine helpers have no DOM access.
- [ ] Confirm engine helpers do not read localStorage directly.
- [ ] Confirm destination facts live in data, not engine.
- [ ] Confirm UI does not duplicate ranking logic.
- [ ] Confirm budget range has one derivation path.
- [ ] Confirm recommendation output includes score and explanation.
- [ ] Confirm changing Planner context changes engine output where expected.
- [ ] Confirm Decide signals can be represented without rewriting Planner intent.
- [ ] Confirm data changes can be reviewed without touching UI.
- [ ] Confirm added catalog values have stable IDs.

---

## Open questions

1. Should destination scores be manually assigned, calculated from lower-level features, or both?
2. Should scores be visible to the user or converted into labels only?
3. Which Decide signals should change weights versus only changing explanation text?
4. Should readiness tasks be generated by engine or selected from static templates?
5. How often should destination catalog assumptions be reviewed?

---

## Core rule

Data describes the world. Engine reasons over the world.

If data becomes logic, it becomes hard to maintain. If engine becomes data, recommendations become hidden and brittle.
