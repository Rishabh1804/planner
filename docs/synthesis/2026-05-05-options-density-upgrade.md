# Synthesis — Options Density Upgrade

**Date:** 2026-05-05  
**Type:** Upgrade synthesis  
**Area:** Options tab  
**Status:** Active  
**Upgrade:** Major Upgrade 1 — Options Density + Comparison Cockpit  
**Use before changing:** Options tab layout, recommendation cards, comparison rows, ranking summaries, budget display, expandable details, mobile density.

---

## 1. Upgrade intent

The Options tab currently risks becoming too vertical: too many stacked sections, too much repeated explanation, and not enough quick comparison.

The upgrade goal is to convert Options from a long report into a compact comparison cockpit.

Core transformation:

```txt
Before:
  stacked recommendations + repeated detail + vertical reading

After:
  compact comparison + progressive disclosure + decision momentum
```

The user should be able to scan the Options tab quickly and understand:

- which option is best overall,
- which option is safest for fatigue,
- which option is best for baby comfort,
- which option is strongest for honeymoon value,
- which option has budget pressure,
- which option needs deeper review.

---

## 2. Why this matters

Options is the first tab where Planner intent becomes visible as actual trip choices.

If Options is too vertical, the user cannot compare. The tab becomes a reading task.

If Options is too compressed without structure, the user loses reasoning and trust.

The design target is therefore:

```txt
Compare first. Explain second. Expand third.
```

This preserves recommendation quality while reducing scroll fatigue.

---

## 3. Product role of Options after the upgrade

Options should answer:

> Given the Planner setup, what are the best trip directions, how do they compare, and which ones deserve deeper attention?

Options should not answer:

- What is our foundational trip intent? That belongs to Planner.
- What do we emotionally prefer? That belongs to Decide.
- What do we need to book? That belongs to Ready.

Options is the interpretation and comparison layer.

---

## 4. Required information hierarchy

The upgraded Options tab should have five levels of information.

### Level 1 — Planner-derived context

A compact summary of why these options are being shown.

Example:

```txt
Based on August, comfort tier, low fatigue tolerance, and family travel with infant.
```

This should be short. It should not become a second Planner.

### Level 2 — Best-fit strip

A compact row/grid of top labels.

Examples:

- Best overall
- Lowest fatigue
- Best baby pacing
- Strongest honeymoon value
- Best budget control

Each chip/card should identify the winning option and the reason in one line.

### Level 3 — Comparison controls

Compact filters/sorts:

- Best fit
- Low fatigue
- Baby ease
- Honeymoon value
- Budget control
- Fewer transfers

These controls should change emphasis, not create a separate state model.

### Level 4 — Compact option rows/cards

Each option should show:

- option name,
- fit label or score,
- 3–5 comparison chips,
- one-line rationale,
- one primary action such as “Review tradeoffs” or “Shortlist”.

### Level 5 — Expandable detail

Full explanation should be collapsed by default.

Expanded detail may include:

- why it ranks here,
- budget note,
- transfer/fatigue note,
- baby comfort note,
- honeymoon value note,
- Ready implications,
- Decide prompts.

---

## 5. Vertical-density rules

### Rule 1 — No repeated long budget prose per card

Budget should be summarized globally once, then each option should show budget pressure.

Global:

```txt
Comfort-tier envelope: estimated range and assumptions.
```

Per option:

```txt
Budget pressure: Low / Medium / High / Premium-sensitive
```

### Rule 2 — Cards should default to one-screen scanability

On mobile, the user should see at least two compact option summaries within a reasonable screen span.

The exact count depends on device height, but the principle is clear: one option should not consume the whole viewport unless expanded.

### Rule 3 — Explanation must be collapsible

Detailed explanation remains available, but not forced.

Default view should be decision-ready, not prose-heavy.

### Rule 4 — Comparison beats description

Prefer chips, labels, and consistent fields over paragraphs.

Bad:

```txt
This is a good option because it gives you a balanced mix of...
```

Better:

```txt
Fit: Strong · Fatigue: Medium · Baby ease: Good · Budget: Premium-sensitive
```

### Rule 5 — No horizontal scrolling as a density solution

The upgrade must reduce verticality without creating horizontal scrolling.

Mobile comparison should use wrapped chips or stacked rows, not a wide table.

---

## 6. Mobile layout principles

### Recommended mobile structure

```txt
Options

Planner-derived summary card

Best-fit strip
  2-column compact cards or horizontal snap only if no page-level horizontal overflow

Filter chips
  wrapping chip group

Option comparison list
  compact cards with consistent fields

Expanded tradeoffs
  accordion/details region inside selected card
```

### Avoid

- wide tables,
- nested horizontal scroll areas unless extremely controlled,
- long repeated card copy,
- multiple CTA rows per card,
- unclear expanded/collapsed state,
- cards with unconstrained long labels.

### Touch targets

Primary interactive controls should remain around 44px where practical:

- shortlist button,
- expand button,
- filter chips,
- sort chips.

Small labels may be smaller, but tap targets should not become tiny.

---

## 7. State implications

Options density should not create new source-of-truth state.

### Allowed local UI state

- selected sort/filter emphasis,
- expanded option ID,
- compact/detail display mode,
- temporarily highlighted comparison dimension.

### Shared state

- shortlist,
- selected option,
- rejected option reason,
- option reaction intended for Decide.

### Not allowed

- independent Planner fields,
- independent budget tier,
- independent destination direction,
- hidden duplicate ranking model.

---

## 8. Failure modes

### Failure mode 1 — Compact but shallow

The tab becomes shorter but loses reasoning.

**Prevention:** Preserve expandable detail and one-line rationale.

### Failure mode 2 — Dense but confusing

Too many chips and scores appear without hierarchy.

**Prevention:** Use consistent fields and only 3–5 chips per compact option.

### Failure mode 3 — Horizontal scroll regression

Comparison is implemented as a wide table.

**Prevention:** Mobile uses stacked comparison rows and wrapping chips.

### Failure mode 4 — Hidden ranking drift

Visual compactness leads to hard-coded labels instead of engine-derived labels.

**Prevention:** Labels must eventually come from engine output.

### Failure mode 5 — Options duplicates Decide

Options adds too much preference capture to compensate for compact cards.

**Prevention:** Options may collect shortlist/review actions, but scenario exploration and deep reaction capture remain in Decide.

### Failure mode 6 — Options bypasses Ready

Shortlisted options do not create a clean Ready handoff.

**Prevention:** Compact cards should preserve selected/shortlisted option identity and key readiness implications.

---

## 9. Implementation implications

This upgrade should be done in layers.

### Layer 1 — Markup/layout refactor

- Convert long stacked sections into compact sections.
- Add best-fit strip.
- Add compact comparison cards.
- Add accordion/detail pattern.

### Layer 2 — CSS density system

- compact card padding,
- wrapping chip groups,
- consistent row spacing,
- mobile-safe widths,
- no overflow.

### Layer 3 — State wiring later

- filter/sort state,
- expanded card state,
- shortlist/selected-option state,
- engine-derived labels.

### Layer 4 — Engine integration later

- option score,
- reason labels,
- warnings,
- budget pressure,
- Ready implication tags.

---

## 10. QA checks

Before shipping this upgrade:

- [ ] Options tab has no steady-state horizontal scroll on mobile.
- [ ] At least the top recommendation summary is visible quickly without excessive scrolling.
- [ ] Long option names wrap inside cards.
- [ ] Filter/sort chips wrap safely.
- [ ] Expanded detail does not break layout.
- [ ] Collapsed option cards still communicate meaningful comparison.
- [ ] Budget explanation is not repeated as long prose in every card.
- [ ] Shortlist/selection action remains obvious.
- [ ] Touch targets remain approximately 44px where practical.
- [ ] Planner state remains the source of Options recommendations.
- [ ] Scenario exploration remains outside Planner and primarily in Decide.
- [ ] Ready handoff data remains identifiable from selected/shortlisted option.

---

## 11. Upgrade success definition

The Options tab is successful when the user can answer these in under one minute:

1. What is the best overall option?
2. What is the lowest-fatigue option?
3. What is the strongest honeymoon option?
4. Which option is most budget-sensitive?
5. Which one should I inspect further?

If the user needs to read several long cards before answering, the upgrade has not succeeded.

---

## 12. Core rule

Options should compare first and explain second.

The tab should feel like a compact decision cockpit, not a vertical report.
