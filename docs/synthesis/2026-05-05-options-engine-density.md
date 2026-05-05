# Synthesis — Options Density ↔ Engine Output

**Date:** 2026-05-05  
**Type:** Pair synthesis  
**Areas:** Options UI, Engine output  
**Status:** Active  
**Upgrade:** Major Upgrade 1 — Options Density + Comparison Cockpit  
**Use before changing:** compact option cards, ranking labels, comparison chips, score display, explanation output, budget pressure labels.

---

## 1. Scope

This report studies how a compact Options UI should consume engine output.

The density upgrade should not hard-code labels just to make the layout smaller.

The core boundary:

```txt
Engine produces structured recommendation output.
Options renders that output compactly.
```

---

## 2. Why this matters

Compact UI is only safe if the information remains structured.

If we reduce vertical height by deleting reasoning, the product becomes shallow.

If we reduce vertical height by turning reasoning into consistent engine-derived labels, the product becomes faster and clearer.

The upgrade should therefore push us toward a better engine contract.

---

## 3. Desired engine output for compact cards

Each option card should eventually be renderable from a structured recommendation object.

Suggested shape:

```txt
recommendation:
  id
  title
  rank
  fitLabel
  fitScore
  summary
  chips
  budgetPressure
  fatigueLevel
  babyEase
  honeymoonValue
  warnings
  reasons
  readyImplications
```

### Compact fields

Used in collapsed card:

- title,
- fit label,
- rank,
- 3–5 chips,
- one-line summary,
- budget pressure,
- primary warning if any.

### Expanded fields

Used in detail accordion:

- reasons,
- warnings,
- budget explanation,
- transfer/fatigue explanation,
- baby comfort explanation,
- honeymoon value explanation,
- Ready implications.

---

## 4. Visual density should map to data priority

The UI should not decide priority by copy length.

Priority should come from engine output.

Example:

```txt
Primary chip: Best baby pacing
Secondary chip: Lower transfer load
Warning chip: Premium-sensitive
```

The engine or derived recommendation object should indicate which fields are primary, secondary, or warning.

---

## 5. Ranking and labels

Compact labels should be stable and explainable.

Examples:

- Strong fit
- Good fit
- Needs tradeoff
- Risky unless simplified
- Premium-sensitive
- Low fatigue
- Baby-friendly
- Honeymoon-strong

Labels should not be arbitrary UI copy. They should map to score ranges, risk flags, or explicit conditions.

---

## 6. Budget pressure model

The density upgrade should avoid repeating long budget paragraphs.

Engine should eventually produce:

```txt
budgetPressure:
  label: Medium
  reason: Resort quality matters for this route
  rangeImpact: +10–18%
```

UI collapsed card displays:

```txt
Budget: Medium pressure
```

Expanded view displays reason.

---

## 7. Warning model

Compact cards should show only the most important warnings.

Suggested warning priority:

1. Safety/admin blockers
2. Infant/family comfort blockers
3. Transfer/fatigue blockers
4. Budget pressure
5. Weather/seasonality
6. Experience mismatch

Expanded detail can show all warnings.

---

## 8. Failure modes

### Failure mode 1 — UI invents labels

Compact cards use labels not backed by engine/data.

**Prevention:** Labels should eventually come from engine output.

### Failure mode 2 — Engine output is too verbose

Engine returns long prose but no structured fields.

**Prevention:** Engine output should include compact fields and expanded fields separately.

### Failure mode 3 — All chips have equal weight

The user sees many tags but no hierarchy.

**Prevention:** Engine should identify primary, secondary, and warning chips.

### Failure mode 4 — Budget pressure is inconsistent

Budget pressure is displayed differently across cards and details.

**Prevention:** One budget-pressure field should drive both collapsed and expanded views.

### Failure mode 5 — Warning overload

Compact card shows too many warnings and becomes tall again.

**Prevention:** collapsed card shows the top warning only; expanded view shows more.

---

## 9. Implementation implications

### First implementation may be static

Because the live app is still inline, the first density upgrade may use existing inline data.

However, markup should be shaped as if future engine output will drive it.

Recommended DOM/data pattern:

```txt
option-card
  option-summary
  option-chip-list
  option-actions
  option-details
```

Avoid scattered one-off sections that will be hard to wire later.

### Future engine scaffolds

This synthesis supports later files:

- `src/engine/explanations.js`
- `src/engine/confidence.js`
- `src/engine/recommendation-output.js`

### Future data scaffolds

This synthesis supports later files:

- `src/data/risk-labels.js`
- `src/data/destination-catalog.js`
- `src/data/readiness-tasks.js`

---

## 10. QA checks

Before shipping Options density changes:

- [ ] Compact card labels correspond to real recommendation dimensions.
- [ ] Budget pressure appears consistently.
- [ ] Top warning is visible without expanding.
- [ ] Expanded view preserves full reasoning.
- [ ] No option card becomes taller only because all warnings are shown by default.
- [ ] UI can later map to structured engine output without redesigning markup.
- [ ] No ranking label contradicts expanded explanation.
- [ ] No chip duplicates another chip using different wording.

---

## 11. Core rule

The engine should decide what matters. Options should decide how compactly to show it.

Density is safe only when the underlying recommendation output is structured.
