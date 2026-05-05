# Synthesis — Options Density ↔ Decide

**Date:** 2026-05-05  
**Type:** Pair synthesis  
**Areas:** Options tab, Decide tab  
**Status:** Active  
**Upgrade:** Major Upgrade 1 — Options Density + Comparison Cockpit  
**Use before changing:** Options compact cards, shortlist/reaction actions, scenario links, Decide prompts, preference capture, tradeoff expansion.

---

## 1. Scope

This report studies how the Options density upgrade should interact with Decide.

Options will become more compact. Decide must absorb the deeper preference work without making Options feel shallow.

The key boundary:

```txt
Options compares choices.
Decide captures reactions to choices.
```

---

## 2. Why this matters

Reducing vertical height in Options creates a product risk: important reasoning may disappear.

The solution is not to keep Options tall. The solution is to route the right depth to the right place.

Options should show enough information to compare.

Decide should show enough structure to reflect, challenge, and commit.

This keeps Options fast while making Decide more valuable.

---

## 3. Ownership boundary

### Options owns

- compact comparison,
- fit labels,
- budget pressure labels,
- fatigue/baby/honeymoon chips,
- one-line rationale,
- shortlist action,
- “review tradeoffs” expansion,
- lightweight reason display.

### Decide owns

- first reactions,
- preference markers,
- worries,
- non-negotiables,
- worth-upgrading signals,
- skip signals,
- scenario exploration,
- final confidence.

### Shared edge

Options can create prompts for Decide.

Example:

```txt
Option chip: Transfer risk medium
Decide prompt: Is fewer transfer load a non-negotiable?
```

Options may send a reaction to Decide only if the action is explicit.

---

## 4. Interaction model

### From Options to Decide

Options can hand off:

- shortlisted option,
- option under review,
- reason user expanded an option,
- warning that triggered concern,
- dimension user filtered by,
- selected tradeoff to evaluate.

### From Decide to Options

Decide can hand back:

- stronger preference weights,
- rejected option reason,
- confidence label,
- upgrade willingness,
- non-negotiable constraints.

This should update future recommendation emphasis without silently rewriting Planner.

---

## 5. Compact Options should create Decide entry points

Each compact card should eventually support clear handoff actions.

Examples:

```txt
Shortlist
Compare in Decide
Mark concern
Review tradeoffs
```

However, the first implementation can keep this simple:

- one expand action,
- one shortlist/select action,
- one visible hint that deeper decision work belongs in Decide.

---

## 6. Failure modes

### Failure mode 1 — Options loses emotional context

Compact cards show scores but no human reaction path.

**Prevention:** Add clear pathway from option review to Decide.

### Failure mode 2 — Options becomes Decide

Options adds too many preference controls and scenario tools.

**Prevention:** Keep deep preference capture and scenario exploration in Decide.

### Failure mode 3 — Decide becomes disconnected

Options becomes compact, but Decide does not know which option or tradeoff the user was reviewing.

**Prevention:** Preserve option IDs, warnings, and shortlist/review actions in shared state.

### Failure mode 4 — Reactions silently alter recommendations

User taps a concern and Options immediately changes ranking without explanation.

**Prevention:** Make reaction effects visible and reversible.

### Failure mode 5 — Compact cards become score-only

Options becomes efficient but loses trust.

**Prevention:** Keep one-line rationale and expandable explanation.

---

## 7. Implementation implications

### Current upgrade should include

- compact option summaries,
- one-line rationale,
- expandable tradeoffs,
- visible shortlist/select affordance,
- no deep preference capture in Options.

### Future upgrade can include

- “Discuss in Decide” action,
- reaction handoff state,
- Decide prompt prefill from selected option warning,
- confidence update after Decide signals.

### Data/state needed later

Possible future state:

```txt
optionReviewContext:
  optionId
  sourceDimension
  warningId
  actionType
```

Possible future Decide signal:

```txt
reactionSignal:
  optionId
  signalType
  strength
  note
```

---

## 8. QA checks

Before shipping Options density changes:

- [ ] Options does not contain full scenario exploration.
- [ ] Compact cards still show enough reason to trust ranking.
- [ ] Expandable detail is available for deeper reasoning.
- [ ] Shortlist/select action is not buried.
- [ ] Any Decide handoff is explicit, not automatic.
- [ ] Decide remains the place for preference markers and non-negotiables.
- [ ] Option IDs remain stable for future reaction handoff.
- [ ] No duplicate Planner state appears in Options or Decide.

---

## 9. Core rule

Options should make the user curious enough to decide.

Decide should turn that curiosity into preference signal.
