# Synthesis — Planner ↔ Decide

**Date:** 2026-05-05  
**Type:** Pair synthesis  
**Areas:** Planner tab, Decide tab  
**Status:** Active  
**Use before changing:** Guided Plan builder, scenario exploration, preference signals, first reactions, decision capture, tab reduction, Planner simplification.

---

## 1. Scope

This report studies how the Planner tab and Decide tab should interact.

Planner is the setup surface. Decide is the preference, reaction, and scenario-evaluation surface.

The boundary matters because the product previously risked putting too much scenario exploration into Planner. Moving scenario exploration to Decide was a key simplification.

---

## 2. Why this matters

Planner should make the user feel momentum.

Decide should make the user feel clarity.

These are related but different jobs.

Planner asks:

> What are we trying to build?

Decide asks:

> Given the possible directions, what do we actually prefer?

If Planner contains too much exploration, the first step becomes heavy and horizontal-scroll prone.

If Decide lacks enough upstream context from Planner, the decision surface becomes generic and disconnected.

The app gains velocity when Planner rapidly captures intent and Decide compounds that intent into sharper preference signals.

---

## 3. Ownership boundary

### Planner owns

Planner owns foundational trip intent:

- dates/month,
- trip duration,
- origin preference,
- travelers and infant constraints,
- experience tier,
- soft cap if used,
- destination direction,
- guided setup completion,
- generated trip story / breadcrumbs.

Planner should be compact, guided, and progressive.

### Decide owns

Decide owns interpretation of user reactions and tradeoffs:

- first-reaction capture,
- preference markers,
- non-negotiables,
- worries,
- worth-upgrading signals,
- skip signals,
- scenario exploration,
- notes that explain why a direction feels right or wrong,
- final decision confidence.

Decide should be reflective, comparative, and signal-rich.

### Planner must not own

Planner must not own:

- scenario exploration,
- detailed tradeoff comparison,
- repeated preference scoring,
- decision confidence,
- non-negotiable checklists,
- option rejection notes.

### Decide must not own

Decide must not own:

- source-of-truth dates,
- source-of-truth experience tier,
- source-of-truth destination direction,
- source-of-truth traveler profile,
- initial Planner completion state.

Decide can influence recommendations, but it should not silently rewrite Planner.

---

## 4. State/data flow

### Intended flow

```txt
Planner setup
  ↓
Options recommendations
  ↓
Decide reactions and preference signals
  ↓
Engine adjusts confidence / shortlist emphasis
  ↓
Ready reflects chosen direction
```

Planner should provide context to Decide.

Decide should add decision signals, not duplicate Planner setup.

### Example flow

```txt
Planner:
  August, comfort tier, low fatigue tolerance, UAE + Bali direction

Options:
  Bali is high honeymoon value but transfer/heat sensitive

Decide:
  User marks "Less hotel switching", "Slow mornings", and "Premium resort worth upgrading"

Engine:
  Increases value of resort quality and reduces transfer-heavy routes
```

### State shared from Planner to Decide

- month/date window,
- trip length,
- destination direction,
- experience tier,
- traveler/infant constraints,
- fatigue tolerance,
- generated trip story.

### State created in Decide

- preference markers,
- worries,
- non-negotiables,
- upgrade-worthy items,
- skip signals,
- scenario reactions,
- final confidence notes.

### State Decide may send upstream

Decide should not silently rewrite Planner. However, it can create explicit suggested changes.

Example:

```txt
Decide signal:
  "Too many transfers"

Suggested Planner change:
  "Consider switching destination direction to UAE only or UAE + Sri Lanka."
```

This should be user-approved, not automatic.

---

## 5. Derived vs independent behavior

### Derived in Decide from Planner

Decide should derive:

- which decision prompts are relevant,
- which worries are likely,
- which preference markers matter,
- which scenario comparisons to show,
- which recommendation tradeoffs need reflection.

### Independent in Decide

Decide independently captures:

- user reactions,
- emotional preference,
- willingness to compromise,
- non-negotiables,
- confidence level,
- explicit scenario choices.

### Dangerous middle ground

Bad pattern:

```txt
Planner asks for destination direction.
Decide also asks for destination direction using different wording.
Options reads one of them unpredictably.
```

Good pattern:

```txt
Planner sets destination direction.
Decide asks whether that direction feels exciting, tiring, expensive, or worth upgrading.
If Decide reveals mismatch, it suggests a Planner change.
```

---

## 6. Failure modes

### Failure mode 1 — Scenario exploration leaks back into Planner

Planner becomes overloaded with branching comparisons and option testing.

**Impact:** First tab becomes heavy, more confusing, and more likely to develop layout overflow.

**Prevention:** Planner should only collect setup and show the generated trip story. Scenario exploration belongs in Decide.

### Failure mode 2 — Decide duplicates Planner controls

Decide asks the same foundational questions again.

**Impact:** State split-brain and user confusion.

**Prevention:** Decide should read Planner context and capture reactions to it.

### Failure mode 3 — Decide signals do not affect anything

User marks worries/preferences, but recommendations and Ready state do not respond.

**Impact:** Decide feels like decorative notes.

**Prevention:** Decide signals should feed engine weighting, shortlist confidence, or Ready checklist emphasis.

### Failure mode 4 — Decide silently rewrites Planner

Decide changes trip intent without the user realizing.

**Impact:** User loses trust because the app seems to change assumptions unexpectedly.

**Prevention:** Decide can suggest Planner changes but should require explicit confirmation.

### Failure mode 5 — Planner completion blocks Decide too aggressively

Decide may be useful even with partial Planner setup.

**Impact:** User cannot express early preferences.

**Prevention:** Decide can have a partial mode, but should label missing context clearly.

### Failure mode 6 — Preference signals become too abstract

Decide collects signals that are not connected to real trip tradeoffs.

**Impact:** The app feels like a survey instead of a planning tool.

**Prevention:** Tie Decide prompts to visible Options tradeoffs and Planner context.

---

## 7. Compounding opportunities

### Opportunity 1 — Decide becomes a learning layer

Decide can learn what the family actually values:

- slow mornings,
- fewer transfers,
- premium stay quality,
- direct flights,
- easier food access,
- baby sleep.

This makes future recommendation rounds smarter.

### Opportunity 2 — Decide can reduce tab count pressure

If Decide handles exploration well, Planner can remain simple.

This supports the larger product goal of reducing tab complexity.

### Opportunity 3 — Decide can produce a confidence score

By combining first reaction, worries, non-negotiables, and worth-upgrading signals, Decide can produce:

- high confidence,
- promising but needs adjustment,
- risky unless simplified,
- reject.

### Opportunity 4 — Decide can create explainable recommendations

Instead of showing a generic score, the app can explain:

> “This option ranks highly because it protects your non-negotiables: slow mornings, fewer hotel changes, and premium resort quality.”

### Opportunity 5 — Decide can inform Ready

Ready can use Decide signals to prioritize tasks.

Example:

- If user worries about baby sleep, Ready emphasizes hotel room setup, flight timing, nap windows, and transfer planning.
- If user worries about visa delays, Ready emphasizes admin deadlines.

---

## 8. Implementation implications

### Current live state

The live app still keeps runtime inline in `index.html`.

Non-wired scaffolds exist for state, data, engine, PWA, and shared UI helpers.

Scenario exploration should remain associated with Decide during future extraction.

### Future module boundaries

Planner UI module should eventually own:

- guided setup rendering,
- Planner breadcrumbs,
- generated story summary,
- Planner completion state.

Decide UI module should eventually own:

- first-reaction controls,
- preference signal controls,
- scenario exploration controls,
- decision confidence rendering,
- notes/import/export only where relevant.

Engine should eventually own:

- how Decide signals influence ranking,
- how non-negotiables affect suitability,
- how worries affect risk labels,
- how upgrade-worthiness affects budget explanation.

### Suggested extraction sequence

1. Keep Planner UI extraction minimal and setup-only.
2. Extract Decide signal data into `src/data`.
3. Extract signal-to-weight logic into `src/engine`.
4. Extract Decide UI rendering after Planner and Options are stable.
5. Add a compound synthesis for Planner → Options → Decide before wiring feedback loops.

---

## 9. QA checks

Before changing Planner or Decide:

- [ ] Confirm scenario exploration remains in Decide, not Planner.
- [ ] Confirm Planner can be completed without overwhelming the first tab.
- [ ] Confirm Decide reads Planner context and does not ask duplicate setup questions.
- [ ] Confirm Decide signals are stored separately from Planner intent.
- [ ] Confirm Decide does not silently rewrite Planner choices.
- [ ] Confirm changing Planner context changes which Decide prompts feel relevant.
- [ ] Confirm Decide remains usable on mobile without horizontal scrolling.
- [ ] Confirm preference chips/touch targets remain approximately 44px where practical.
- [ ] Confirm no old scenario controls remain hidden in Planner markup after UI extraction.

---

## 10. Open questions

1. Should Decide be locked until Planner is complete, or should it support partial preference capture?
2. Should Decide signals immediately affect Options, or only after the user confirms them?
3. Should scenario exploration live entirely in Decide, or should Options have temporary comparison controls?
4. Should Decide produce a visible confidence score?
5. Should Decide be renamed if it becomes broader than final decision capture?

---

## 11. Future synthesis links

This report should connect to:

- Planner ↔ Options,
- Options ↔ Ready,
- State ↔ UI,
- Data ↔ Engine,
- Planner → Options → Decide compound synthesis,
- Bugs ↔ QA ↔ Synthesis compound synthesis.

---

## 12. Core rule from this synthesis

Planner captures intent. Decide captures reaction.

If Planner starts doing reaction work, it becomes bloated. If Decide starts defining intent, the app becomes inconsistent.

The velocity comes from making Planner lightweight and Decide signal-rich.
