# Synthesis — Data ↔ Engine

**Date:** 2026-05-05  
**Type:** Pair synthesis  
**Areas:** Data layer, Engine layer  
**Status:** Active  
**Use before changing:** Destination catalog, experience tiers, budget assumptions, scoring logic, recommendation ranking, decision-signal weighting, readiness-task derivation.

---

## 1. Scope

This report studies how the Data layer and Engine layer should interact.

Data describes the planning universe. Engine interprets that data for a specific user context.

The boundary matters because recommendation quality depends on both: data must be structured enough to reason over, and engine logic must not hide hard-coded product assumptions that belong in data.

---

## 2. Why this matters

Holiday Planner should not become a static collection of destination opinions.

It should become a structured reasoning tool.

That requires a clear separation:

```txt
Data = what we know
Engine = how we reason with what we know
```

If data is too vague, the engine cannot produce explainable recommendations.

If the engine hard-codes facts, future updates become risky and hidden.

If both are cleanly separated, the app can gain velocity by adding better data and improving reasoning independently.

---

## 3. Ownership boundary

### Data owns

Data owns structured facts, options, and labels.

This includes:

- destination catalog,
- destination combinations,
- month suitability,
- weather/season notes,
- visa/admin notes,
- approximate flight/transfer effort,
- stay style assumptions,
- experience-tier definitions,
- static readiness-task templates,
- preference marker definitions,
- warning/risk labels.

Data should answer:

> What can the app know before seeing this user's exact choices?

### Engine owns

Engine owns calculation, weighting, ranking, and interpretation.

This includes:

- scoring destinations,
- applying Planner context,
- deriving budget envelopes,
- ranking options,
- adjusting weights from Decide signals,
- deriving confidence labels,
- producing readiness emphasis,
- explaining why something ranks higher or lower.

Engine should answer:

> Given this data and this user's context, what follows?

### Data must not own

Data must not own:

- current user state,
- dynamic recommendation rank,
- user-specific budget result,
- active shortlist,
- selected option,
- UI rendering state,
- hidden conditional logic.

### Engine must not own

Engine must not own:

- static destination facts,
- hard-coded destination catalog details,
- hard-coded label lists that belong in data,
- DOM rendering,
- localStorage persistence,
- UI event binding.

---

## 4. State/data flow

### Intended flow

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

The engine should be pure wherever possible.

Given the same data and context, it should return the same result.

### Example flow

```txt
Data:
  Bali has high honeymoon value, moderate transfer effort, August weather caveats.

Planner:
  August, infant age 11 months, comfort tier, low fatigue tolerance.

Decide:
  Non-negotiable: fewer hotel switches.

Engine:
  Bali remains attractive but gets transfer-risk and pacing warnings.
```

---

## 5. Data shape principles

### Principle 1 — Data should be explicit

Avoid prose-only data where the engine needs structured values.

Bad:

```txt
Bali is nice but can be tiring.
```

Better:

```txt
honeymoonValue: 92
transferEffort: 72
babyComfort: 68
augustFit: 74
notes: ["Strong resort value", "Watch transfer load"]
```

### Principle 2 — Data should include explanation hooks

Scores alone are not enough. The app needs user-facing reasons.

Example:

```txt
riskFlags: ["long-transfer", "heat-sensitive"]
explanationBullets: ["Strong villa/resort value", "Needs slower pacing with infant"]
```

### Principle 3 — Data should separate facts from assumptions

Fact-like:

- visa type,
- flight duration estimate,
- transfer count,
- seasonality note.

Assumption-like:

- premium stay improves fit,
- comfort tier may require better location,
- baby pacing reduces itinerary density.

Assumptions should be labelled so future versions can revise them.

### Principle 4 — Data should be versionable

Destination data will evolve.

Future catalog entries should support:

- stable IDs,
- source notes if needed,
- last reviewed date,
- confidence level,
- assumptions.

---

## 6. Engine principles

### Principle 1 — Engine should be pure

The engine should not touch DOM or storage.

Good:

```txt
rankDestinations(destinations, plannerState, decisionSignals)
```

Bad:

```txt
rankDestinations() reads localStorage and updates HTML cards
```

### Principle 2 — Engine should explain itself

Engine output should include not only a score, but reasons.

Example:

```txt
{
  score: 82,
  label: "Strong fit",
  reasons: ["Good resort quality", "Transfer risk manageable if paced slowly"],
  warnings: ["August heat", "Infant sleep disruption risk"]
}
```

### Principle 3 — Engine should accept weights from context

Planner and Decide should influence weights.

Example:

- Low fatigue tolerance increases transfer penalty.
- Premium tier increases tolerance for resort-led destinations.
- Baby sleep non-negotiable increases baby comfort weight.

### Principle 4 — Engine should not hide product policy

If the product rule is “budget derives from experience tier,” that should be visible in engine helpers and synthesis docs, not buried in UI copy.

---

## 7. Derived vs independent behavior

### Derived by Engine from Data

Engine should derive:

- destination score,
- budget range,
- confidence label,
- risk flags,
- recommendation order,
- upgrade suggestions,
- readiness task emphasis.

### Data independently defines

Data should independently define:

- available destinations,
- available destination modes,
- experience tier labels,
- static risk labels,
- base scores or features,
- task templates,
- explanation copy fragments.

### Dangerous middle ground

Bad pattern:

```txt
Destination catalog says Bali has high transfer effort.
Engine ignores transfer effort and hard-codes Bali as top pick.
```

Bad pattern:

```txt
Engine has a hard-coded list of destinations separate from data.
```

Good pattern:

```txt
Data defines Bali's features.
Engine ranks Bali differently depending on Planner and Decide context.
```

---

## 8. Failure modes

### Failure mode 1 — Hard-coded engine facts

Engine contains destination-specific facts that should live in data.

**Impact:** Updating data does not update recommendations.

**Prevention:** Destination facts and static assumptions live in `src/data`.

### Failure mode 2 — Data cannot support explanation

Data has scores but no reasons, warnings, or labels.

**Impact:** Recommendations become opaque.

**Prevention:** Data should include explanation hooks and risk flags.

### Failure mode 3 — UI bypasses engine

UI computes rankings directly instead of calling engine helpers.

**Impact:** Recommendation logic splits across files.

**Prevention:** UI should render engine output, not recreate engine logic.

### Failure mode 4 — Engine reads storage directly

Engine pulls user state from localStorage.

**Impact:** Engine becomes hard to test and unsafe to reuse.

**Prevention:** State layer passes context into engine.

### Failure mode 5 — Budget logic splits across layers

Budget is partly in data, partly in UI, partly in engine.

**Impact:** User sees inconsistent ranges.

**Prevention:** Data provides base cost assumptions; engine derives final envelope; UI displays it.

### Failure mode 6 — Decision signals are not integrated

Decide captures preferences, but engine ignores them.

**Impact:** Decide has no product consequence.

**Prevention:** Define signal-to-weight logic in engine.

---

## 9. Compounding opportunities

### Opportunity 1 — Better data improves every tab

Once destination data is structured, Options, Decide, and Ready all benefit.

Example:

- Options uses scores and reasons.
- Decide uses risk flags as prompts.
- Ready uses destination-specific task templates.

### Opportunity 2 — Better engine logic improves every destination

Once ranking/confidence logic improves, every destination can become smarter without rewriting UI.

### Opportunity 3 — Data review can become a product habit

Future versions can update catalog assumptions without touching UI code.

### Opportunity 4 — Engine can expose transparent tradeoffs

The app can say:

> “This ranks lower mainly because transfer effort conflicts with your low fatigue tolerance.”

That makes recommendations feel reasoned, not arbitrary.

### Opportunity 5 — Synthesis can identify missing data

When a synthesis report asks for a behavior the data cannot support, that becomes a clear catalog task.

---

## 10. Implementation implications

### Current live state

The live runtime remains inline in `index.html`.

Current non-wired modules include basic planner options and basic engine helpers, but the larger destination catalog is not yet extracted.

### Future data scaffolds

Recommended next data scaffolds:

- `src/data/destination-catalog.js`
- `src/data/destination-modes.js`
- `src/data/readiness-tasks.js`
- `src/data/risk-labels.js`

### Future engine scaffolds

Recommended next engine scaffolds:

- `src/engine/decision-signals.js`
- `src/engine/confidence.js`
- `src/engine/readiness.js`
- `src/engine/explanations.js`

### Suggested extraction order

1. Extract stable destination IDs and labels.
2. Extract destination feature scores and notes.
3. Extract risk labels and explanation hooks.
4. Update engine helpers to consume catalog-shaped data.
5. Add decision-signal weighting.
6. Add confidence/explanation output.
7. Wire UI only after parity checks.

---

## 11. QA checks

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

## 12. Open questions

1. Should destination scores be manually assigned, calculated from lower-level features, or both?
2. Should scores be visible to the user or converted into labels only?
3. How should low-confidence data be shown?
4. Which Decide signals should change weights versus only changing explanation text?
5. Should readiness tasks be generated by engine or selected from static templates?
6. How often should destination catalog assumptions be reviewed?

---

## 13. Future synthesis links

This report should connect to:

- Planner ↔ Options,
- Planner ↔ Decide,
- Options ↔ Ready,
- State ↔ UI,
- State → Data → Engine → UI,
- Bugs ↔ QA ↔ Synthesis.

---

## 14. Core rule from this synthesis

Data describes the world. Engine reasons over the world.

If data becomes logic, it becomes hard to maintain. If engine becomes data, recommendations become hidden and brittle.

The velocity comes from improving facts and reasoning independently while keeping their contract clear.
