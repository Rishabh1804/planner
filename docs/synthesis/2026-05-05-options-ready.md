# Synthesis — Options ↔ Ready

**Date:** 2026-05-05  
**Type:** Pair synthesis  
**Areas:** Options tab, Ready tab  
**Status:** Active  
**Use before changing:** Destination cards, shortlist logic, selected option flow, booking-readiness checklist, Ready tab gating, destination-specific preparation tasks.

---

## 1. Scope

This report studies how the Options tab and Ready tab should interact.

Options helps the user evaluate plausible trip directions. Ready turns a chosen or shortlisted direction into concrete preparation and booking readiness.

The boundary matters because Ready should not become another recommendation engine. It should be the action layer that depends on prior recommendation and decision signals.

---

## 2. Why this matters

Holiday Planner is not useful if it only recommends destinations. It becomes useful when a recommendation turns into a clear, low-friction action plan.

Options answers:

> Which trip directions make sense?

Ready answers:

> What needs to be done to make the chosen direction safe, bookable, and practical?

If Ready is too generic, it feels like a static checklist.

If Ready starts ranking destinations independently, the app develops split-brain logic.

The product gains velocity when Options creates a structured candidate and Ready immediately converts that candidate into relevant tasks.

---

## 3. Ownership boundary

### Options owns

Options owns recommendation interpretation:

- ranked destination cards,
- destination comparisons,
- budget envelope explanation,
- stay strategy,
- transfer and fatigue warnings,
- shortlist candidates,
- rationale for why a trip direction fits or does not fit,
- tradeoffs between destination combinations.

Options should answer:

> What are our plausible choices and why?

### Ready owns

Ready owns action readiness:

- booking-readiness checklist,
- documents/admin readiness,
- flight-readiness tasks,
- stay-readiness tasks,
- infant/family preparation tasks,
- cancellation/flexibility checks,
- destination-specific action items,
- final readiness summary.

Ready should answer:

> Are we ready to book and execute this direction?

### Options must not own

Options must not own:

- final packing/admin checklist,
- detailed booking task workflow,
- final document readiness,
- infant supply checklist,
- readiness completion state.

### Ready must not own

Ready must not own:

- independent recommendation ranking,
- independent destination scoring,
- independent budget envelope,
- independent source-of-truth destination direction,
- hidden override of selected option.

---

## 4. State/data flow

### Intended flow

```txt
Planner intent
  ↓
Options recommendations
  ↓
Selected / shortlisted option
  ↓
Decide confidence and preference signals
  ↓
Ready checklist and booking-readiness plan
```

Ready should depend on a selected or shortlisted option.

If no option is selected, Ready should be guarded, partial, or generic with a clear explanation.

### Shared state from Options to Ready

Ready should receive:

- selected destination or route,
- shortlisted candidates,
- chosen experience tier,
- budget envelope,
- stay strategy,
- transfer/fatigue warnings,
- visa/admin warnings,
- selected constraints from Planner,
- preference signals from Decide where relevant.

### State local to Ready

Ready can own:

- checklist completion,
- task notes,
- booking status,
- document status,
- reminder flags,
- readiness confidence,
- manually added preparation items.

### State Ready may send back

Ready may send feedback upstream only as explicit warnings or blockers.

Examples:

```txt
Ready blocker:
  Passport validity insufficient

Suggested upstream impact:
  Option may need delay or destination change
```

```txt
Ready blocker:
  Flight timing too late for infant sleep

Suggested upstream impact:
  Reconsider selected flight/stay strategy
```

Ready should not silently modify Options ranking. It can flag blockers that require user review.

---

## 5. Derived vs independent behavior

### Derived in Ready

Ready should derive:

- destination-specific admin tasks,
- flight-readiness tasks,
- stay-readiness tasks,
- infant/family preparation emphasis,
- cancellation/flexibility reminders,
- transfer planning reminders,
- booking priority order.

### Independent in Ready

Ready can independently track:

- whether a task is done,
- notes on a task,
- manually added tasks,
- checklist filters,
- urgency display preferences.

### Dangerous middle ground

Bad pattern:

```txt
Options recommends UAE + Sri Lanka.
Ready shows generic international trip checklist with no destination-specific tasks.
```

Bad pattern:

```txt
Options recommends UAE + Sri Lanka.
Ready independently decides Bali is better and changes task list accordingly.
```

Good pattern:

```txt
Options recommends UAE + Sri Lanka.
Ready shows UAE + Sri Lanka specific booking, visa/admin, hotel, transfer, infant, and packing tasks.
If a blocker appears, Ready flags it as a reason to revisit Options.
```

---

## 6. Failure modes

### Failure mode 1 — Ready becomes generic

Ready shows the same checklist regardless of chosen destination.

**Impact:** Ready feels decorative and not useful.

**Prevention:** Ready tasks should derive from selected option, Planner constraints, and Decide signals.

### Failure mode 2 — Ready becomes a second recommendation engine

Ready starts ranking destinations or suggesting a different direction without using Options/Engine.

**Impact:** User sees conflicting product logic.

**Prevention:** Ready can flag blockers but should not rerank. Reranking belongs to Options/Engine.

### Failure mode 3 — Ready unlocks too early

Ready appears actionable before the user has selected or shortlisted an option.

**Impact:** Checklist is vague and potentially misleading.

**Prevention:** Ready should have guarded modes: empty, partial, selected-option, booking-ready.

### Failure mode 4 — Ready ignores Decide signals

User marks “baby sleep” as non-negotiable, but Ready does not emphasize sleep-friendly flights/stays.

**Impact:** Decide feels disconnected from action.

**Prevention:** Ready should consume relevant Decide signals as checklist emphasis.

### Failure mode 5 — Ready stores duplicate option state

Ready saves a selected destination separately from Options in a conflicting format.

**Impact:** Refresh or future wiring can produce inconsistent selected plans.

**Prevention:** Selected option should have one shared state contract.

### Failure mode 6 — Ready does not reveal blockers upstream

Readiness blocker appears, but Options/Decide remain unaware.

**Impact:** User may continue with an impossible or risky plan.

**Prevention:** Ready blockers should be visible and optionally linked back to Options/Decide review.

---

## 7. Readiness modes

Ready should likely have four modes.

### Mode 1 — Empty / guarded

Condition:

```txt
Planner incomplete and no shortlisted option
```

Behavior:

- Explain what is needed first.
- Do not show a fake checklist.
- Link user back to Planner.

### Mode 2 — Partial readiness

Condition:

```txt
Planner complete but no selected option
```

Behavior:

- Show general family travel readiness.
- Keep destination-specific tasks locked.
- Encourage user to shortlist or choose an option.

### Mode 3 — Selected-option readiness

Condition:

```txt
At least one selected/shortlisted option exists
```

Behavior:

- Show destination-specific tasks.
- Reflect budget/stay/transfer assumptions.
- Surface likely blockers.

### Mode 4 — Booking-ready

Condition:

```txt
Option selected + key blockers cleared + confidence sufficient
```

Behavior:

- Show final booking checklist.
- Highlight remaining must-do items.
- Separate urgent actions from later packing/prep.

---

## 8. Compounding opportunities

### Opportunity 1 — Convert recommendations into action

Options can produce structured outputs that Ready consumes directly.

Example:

```txt
Option: UAE + Thailand
Risks: long transfers, heat, hotel switching
Ready tasks: flight timing, stroller logistics, flexible hotel booking, infant sleep kit
```

### Opportunity 2 — Ready can increase trust in Options

When Ready explains what it takes to execute a recommendation, the user can judge feasibility more clearly.

A recommendation becomes more credible when its preparation cost is visible.

### Opportunity 3 — Ready can feed future recommendation confidence

If Ready finds many blockers, the app can reduce confidence in the selected option.

This should be explicit:

> “This option is still attractive, but readiness blockers suggest reviewing transfer load or choosing a simpler route.”

### Opportunity 4 — Ready can produce practical value even before booking

Even if the user has not booked, Ready can show what must be true before booking:

- valid passports,
- infant documents,
- flexible cancellation,
- acceptable flight windows,
- destination admin feasibility,
- hotel room suitability.

---

## 9. Implementation implications

### Current live state

The live runtime remains inline in `index.html`.

Ready currently exists as a tab-level surface, but future extraction should prevent it from becoming a separate logic island.

### Future module boundaries

Options should eventually output a selected option object such as:

```txt
selectedOption:
  id
  destinationMode
  destinations
  budgetEnvelope
  stayStrategy
  riskFlags
  recommendationRationale
```

Ready should eventually consume:

```txt
selectedOption
plannerState
decisionSignals
readinessTasks
```

Ready should store:

```txt
readinessProgress
manualTasks
blockers
bookingStatus
```

### Suggested scaffolds

Future non-wired scaffolds could include:

- `src/state/selected-option.js`
- `src/state/readiness-state.js`
- `src/data/readiness-tasks.js`
- `src/engine/readiness.js`

---

## 10. QA checks

Before changing Options or Ready:

- [ ] Ready is guarded when no Planner/Option context exists.
- [ ] Ready does not rank destinations independently.
- [ ] Ready tasks change when selected option changes.
- [ ] Ready reflects infant/family constraints from Planner.
- [ ] Ready reflects relevant Decide signals, such as baby sleep or visa worries.
- [ ] Ready blockers are visible and understandable.
- [ ] Ready checklist completion does not alter selected destination silently.
- [ ] Refresh preserves selected option and checklist progress without duplication.
- [ ] Mobile Ready layout has no horizontal scroll.
- [ ] Long checklist labels wrap inside cards.

---

## 11. Open questions

1. What exact user action promotes an Option into Ready?
2. Should Ready activate on shortlist or only on final selection?
3. Should Ready blockers feed back into Options ranking automatically or only as a warning?
4. Should Ready include packing lists, or only booking/admin readiness?
5. Should Ready support multiple shortlisted options side-by-side?
6. What is the minimum selected option shape Ready needs?

---

## 12. Future synthesis links

This report should connect to:

- Planner ↔ Options,
- Planner ↔ Decide,
- Planner → Options → Ready,
- Planner → Options → Decide → Ready,
- State ↔ UI,
- Data ↔ Engine,
- Bugs ↔ QA ↔ Synthesis.

---

## 13. Core rule from this synthesis

Options recommends. Ready prepares.

Ready may reveal blockers, but it should not become a hidden recommendation engine.

The velocity comes from making every recommendation immediately actionable without duplicating recommendation logic.
