# Compound Synthesis — Planner → Options → Decide

**Date:** 2026-05-05  
**Type:** Compound synthesis  
**Areas:** Planner, Options, Decide  
**Status:** Active  
**Builds on:**

- `2026-05-05-planner-options.md`
- `2026-05-05-planner-decide.md`

**Use before changing:** Full planning flow, tab reduction, recommendation loops, shortlist logic, scenario exploration, decision confidence, signal-to-ranking behavior.

---

## 1. Scope

This report studies the core product loop:

```txt
Planner captures intent
  ↓
Options interprets intent
  ↓
Decide captures reaction
  ↓
Engine sharpens recommendations
  ↓
User moves toward a confident plan
```

This is the first compound synthesis because it connects the two most important pair boundaries:

- Planner ↔ Options,
- Planner ↔ Decide.

Together, they define the heart of the app.

---

## 2. Why this matters

Holiday Planner should not be a collection of tabs.

It should feel like a planning conversation that gets smarter with every choice.

The user should experience a clear progression:

1. “Here is the trip we want.”
2. “Here are the best options for that trip.”
3. “Here is what we actually feel about those options.”
4. “Here is the direction we are increasingly confident about.”

This gives the app velocity.

Each step creates usable signal for the next step.

---

## 3. The compounding loop

### Step 1 — Planner creates structured intent

Planner turns vague desire into structured state.

Example:

```txt
August
2 adults + infant
Comfort tier
Low fatigue tolerance
UAE + Bali direction
Soft cap optional
```

### Step 2 — Options generates interpretable choices

Options turns Planner state into options.

Example:

```txt
UAE + Bali:
  High honeymoon value
  Higher transfer/fatigue risk
  Needs strong resort choice

UAE + Sri Lanka:
  Better baby pacing
  Lower admin complexity
  Softer honeymoon feel
```

### Step 3 — Decide captures human response

Decide turns visible options into preference signals.

Example:

```txt
Feels exciting: UAE + Bali
Worry: too many transfers
Non-negotiable: baby sleep
Worth upgrading: premium resort
Skip: packed sightseeing
```

### Step 4 — Engine converts reaction into sharper recommendation

Engine combines Planner intent and Decide signals.

Example:

```txt
Boost resort quality
Penalize transfer-heavy options
Keep Bali possible but require slower pacing
Increase confidence in UAE + Sri Lanka as backup
```

### Step 5 — Ready becomes specific later

Ready should eventually translate the chosen direction into action.

Example:

```txt
Book slower flight timing
Prioritize resort room layout
Check visa/admin timeline
Plan infant supplies
Avoid long day tours
```

---

## 4. Ownership across the loop

| Area | Owns | Must not own |
|---|---|---|
| Planner | Setup intent | Scenario exploration, detailed ranking |
| Options | Derived plans and tradeoffs | Source-of-truth setup fields |
| Decide | Reactions, preferences, decision signals | Silent Planner rewrites |
| Engine | Scoring, budget, ranking, confidence | UI-only assumptions |
| State | Persistence and shared shape | Product interpretation |

---

## 5. Signal taxonomy

The app needs a clear taxonomy of signals.

### Intent signals

Created in Planner.

Examples:

- month,
- dates,
- duration,
- experience tier,
- destination direction,
- traveler profile,
- fatigue tolerance.

Intent signals define what the trip is trying to be.

### Interpretation signals

Created in Options from intent + data + engine.

Examples:

- destination fit,
- budget envelope,
- transfer risk,
- baby comfort,
- honeymoon value,
- stay quality requirement.

Interpretation signals explain what the intent implies.

### Reaction signals

Created in Decide.

Examples:

- first reaction,
- worry,
- non-negotiable,
- worth-upgrading,
- skip signal,
- confidence note.

Reaction signals explain what the user feels after seeing the implications.

### Commitment signals

Created when the user chooses a direction.

Examples:

- shortlisted,
- rejected,
- chosen option,
- booking-ready direction,
- final confidence.

Commitment signals should eventually feed Ready.

---

## 6. Derived vs independent behavior across the loop

### Must be derived

- Options ranking from Planner intent and data.
- Budget envelope from experience tier and destination/stay assumptions.
- Risk labels from data and Planner constraints.
- Decision prompts from Planner + Options context.
- Ready tasks from selected option and Decide signals.

### May be independent

- User notes.
- Local card expansion.
- Temporary comparison views.
- Draft reactions before confirmation.
- UI sorting/filtering preference.

### Must require explicit confirmation

- Changing Planner intent from Decide.
- Promoting a scenario into the main plan.
- Migrating old storage keys.
- Replacing selected destination direction.
- Locking a final option for Ready.

---

## 7. Velocity model

The synthesis system should help us build faster by making dependencies explicit.

### Without synthesis

```txt
Improve Planner UI
  ↓
Options assumptions become stale
  ↓
Decide prompts feel unrelated
  ↓
Ready checklist becomes generic
  ↓
Need reactive cleanup
```

### With synthesis

```txt
Improve Planner UI
  ↓
Check Planner ↔ Options synthesis
  ↓
Update derived recommendation contract
  ↓
Check Planner ↔ Decide synthesis
  ↓
Update reaction signal prompts
  ↓
Future Ready work already has cleaner inputs
```

This is compounding because each report reduces coordination cost for future work.

---

## 8. Failure modes across the compound loop

### Failure mode 1 — Static dashboard relapse

The app looks polished but does not react meaningfully to user choices.

**Prevention:** Every visible downstream recommendation should trace back to Planner intent, Options interpretation, or Decide reaction.

### Failure mode 2 — Signal duplication

The same signal is captured in multiple tabs with different names.

**Prevention:** Maintain signal taxonomy and ownership.

### Failure mode 3 — Hidden override chain

Decide modifies ranking, Options modifies budget, Ready modifies final tasks, but none of it is visible.

**Prevention:** Surface important assumption changes as explicit user-facing explanations.

### Failure mode 4 — Planner overload

Because Planner is upstream, it absorbs all controls.

**Prevention:** Planner captures enough to start; Options and Decide carry the rest.

### Failure mode 5 — Decide has no consequence

Decide captures preferences but nothing changes.

**Prevention:** Map Decide signals to ranking, confidence, or Ready checklist effects.

### Failure mode 6 — Readiness before commitment

Ready becomes active before a direction is selected.

**Prevention:** Ready should be guarded or generic until a commitment signal exists.

---

## 9. Compounding synthesis rules

### Rule 1 — Pair reports create edges

A pair synthesis creates a product edge.

Example:

```txt
Planner ↔ Options = intent-to-recommendation edge
Planner ↔ Decide = intent-to-reaction edge
```

### Rule 2 — Compound reports create loops

A compound synthesis connects edges into loops.

Example:

```txt
Planner → Options → Decide = intent-to-recommendation-to-reaction loop
```

### Rule 3 — Loops should produce new implementation priorities

This compound report implies the next important implementation priorities:

1. Formalize shared Planner state shape.
2. Formalize destination catalog and scoring data.
3. Define Decide signal schema.
4. Connect Decide signals to engine weighting.
5. Keep Ready guarded until selected option exists.

### Rule 4 — Every loop needs QA

Compound synthesis must create QA checks that pair reports alone may miss.

---

## 10. Implementation implications

### Suggested next scaffolds

To support this compound loop, the next useful non-wired scaffolds are:

- `src/state/planner-state.js`
- `src/state/decision-signals.js`
- `src/data/destination-catalog.js`
- `src/engine/decision-signals.js`
- `src/engine/confidence.js`

### Suggested first wired change

Do not start by wiring UI rendering.

Start by wiring the smallest safe logic path, such as:

- root `app.js` imports PWA registration helper, or
- inline app reads a pure constant from a module only if deployment supports module loading cleanly.

However, because the live app is currently stable, first wired change should be preceded by:

1. QA snapshot,
2. BUGS checklist review,
3. synthesis review,
4. cache strategy review.

---

## 11. QA checks from compound synthesis

Before a release that changes Planner, Options, or Decide:

- [ ] Can a user explain the current trip intent from Planner breadcrumbs?
- [ ] Do Options visibly respond to Planner choices?
- [ ] Does Decide respond to the options shown, not generic assumptions?
- [ ] Are Planner setup controls duplicated anywhere else?
- [ ] Are Decide signals stored separately from Planner intent?
- [ ] Does changing experience tier alter budget interpretation?
- [ ] Does changing destination direction alter option emphasis?
- [ ] Does selecting a worry/non-negotiable have a visible consequence or planned consequence?
- [ ] Is scenario exploration still outside Planner?
- [ ] Is Ready still guarded until there is a chosen/shortlisted direction?

---

## 12. Open questions

1. What is the minimum Planner state required to unlock Options?
2. What is the minimum Options output required to make Decide meaningful?
3. Which Decide signals should immediately affect ranking?
4. Which Decide signals should only affect Ready?
5. Should confidence be calculated numerically, narratively, or both?
6. How should the app explain when user preferences conflict with budget or fatigue constraints?

---

## 13. Future synthesis links

This report should eventually connect to:

- Options ↔ Ready,
- Data ↔ Engine,
- State ↔ UI,
- Planner → Options → Ready,
- Bugs ↔ QA ↔ Synthesis,
- State → Data → Engine → UI.

---

## 14. Core rule from this synthesis

The app's velocity comes from compounding signals.

Planner creates intent. Options explains implications. Decide captures reaction. Engine sharpens the next recommendation. Ready converts commitment into action.

Every future feature should strengthen that loop, not bypass it.
