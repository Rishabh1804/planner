# Compound Synthesis — Options → Decide → Ready Density Upgrade

**Date:** 2026-05-05  
**Type:** Compound synthesis  
**Areas:** Options, Decide, Ready  
**Status:** Active  
**Upgrade:** Major Upgrade 1 — Options Density + Comparison Cockpit  
**Builds on:**

- `2026-05-05-options-ready.md`
- `2026-05-05-options-decide-density.md`
- `2026-05-05-options-engine-density.md`

---

## 1. Scope

This report studies how the Options density upgrade affects the downstream flow into Decide and Ready.

The upgrade should make Options shorter and more comparative without breaking the larger product loop:

```txt
Options compares
  ↓
Decide captures reaction
  ↓
Ready prepares action
```

---

## 2. Why this matters

A compact Options tab can create momentum, but only if it still carries enough signal downstream.

If Options becomes too compressed, Decide and Ready lose context.

If Options remains too verbose, the user loses momentum before reaching Decide or Ready.

The density upgrade must therefore preserve the recommendation handoff.

---

## 3. Desired loop after upgrade

### Step 1 — Options compactly compares

The user sees:

- best overall,
- lowest fatigue,
- best baby pacing,
- strongest honeymoon value,
- budget-sensitive options.

### Step 2 — User reviews or shortlists

The user can:

- expand tradeoffs,
- shortlist an option,
- select a candidate,
- note a concern later in Decide.

### Step 3 — Decide captures reaction

Decide uses the selected/shortlisted option context to ask better questions.

Examples:

- “Is transfer load a dealbreaker?”
- “Is premium resort quality worth upgrading?”
- “Does this feel too packed?”

### Step 4 — Ready prepares action

Ready uses the selected/shortlisted option and Decide signals to show readiness tasks.

Examples:

- flight timing,
- document/admin checks,
- hotel suitability,
- infant sleep logistics,
- transfer planning.

---

## 4. Handoff contract

The density upgrade should preserve these handoff fields.

### From Options to Decide

```txt
optionId
optionTitle
rankLabel
primaryWarning
expandedTradeoffContext
shortlistStatus
```

### From Options to Ready

```txt
optionId
destinationMode
budgetPressure
fatigueLevel
babyEase
readyImplications
selectedStatus
```

### From Decide to Ready

```txt
nonNegotiables
worries
worthUpgrading
skipSignals
confidence
```

---

## 5. Failure modes across the loop

### Failure mode 1 — Compact Options breaks Decide context

Decide cannot tell which tradeoff the user reacted to.

**Prevention:** Preserve option IDs and warning IDs.

### Failure mode 2 — Compact Options breaks Ready specificity

Ready receives only an option name, not enough implication data.

**Prevention:** Preserve ready implication tags on option objects.

### Failure mode 3 — Ready becomes generic after Options compression

Readiness tasks do not change with selected option.

**Prevention:** Ready should consume selected option and Decide signals.

### Failure mode 4 — Decide compensates by duplicating Options

Decide re-shows full option cards because Options is too compact.

**Prevention:** Decide should show focused reaction prompts, not duplicate recommendation cards.

### Failure mode 5 — Options becomes action-heavy

Options adds too many Ready actions to compensate for compactness.

**Prevention:** Options can shortlist/select; Ready owns task execution.

---

## 6. UX implication

Options should feel like:

```txt
Scan → compare → inspect → shortlist
```

Decide should feel like:

```txt
React → weigh → clarify → gain confidence
```

Ready should feel like:

```txt
Prepare → check → clear blockers → book
```

The upgrade succeeds only if each tab keeps its role.

---

## 7. Implementation implications

### In the first UI pass

Prioritize:

- compact option summaries,
- visible shortlist/select action,
- expandable detail,
- stable option identifiers,
- budget/fatigue/baby/honeymoon chips,
- no horizontal scroll.

Do not overbuild:

- full Decide handoff,
- full Ready task generation,
- complex score explanation,
- automatic ranking mutation.

### In later passes

Add:

- reaction handoff from expanded tradeoffs,
- Ready implication tags,
- selected-option readiness mode,
- confidence adjustment from Decide signals.

---

## 8. QA checks

Before shipping the Options density upgrade:

- [ ] Options compact cards remain understandable without opening details.
- [ ] Expanded details still preserve enough reasoning for trust.
- [ ] Shortlist/select action remains visible.
- [ ] Option identity remains stable for future Decide/Ready handoff.
- [ ] No deep scenario exploration is added to Options.
- [ ] Ready does not become active from unclear or missing option state.
- [ ] The compact layout does not create horizontal scroll.
- [ ] Decide remains the deeper reaction surface.
- [ ] Ready remains the action/readiness surface.

---

## 9. Core rule

The Options density upgrade should reduce scroll, not reduce signal.

Every compact recommendation must still be able to flow into Decide and Ready later.
