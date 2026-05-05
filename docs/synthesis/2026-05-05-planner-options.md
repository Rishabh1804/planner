# Synthesis — Planner ↔ Options

**Date:** 2026-05-05  
**Type:** Pair synthesis  
**Areas:** Planner tab, Options tab  
**Status:** Active  
**Use before changing:** Planner setup flow, destination recommendation cards, budget derivation, shortlist logic, destination ranking, experience-tier logic.

---

## 1. Scope

This report studies how the Planner tab and Options tab should interact.

Planner is the source-of-truth setup surface. Options is the derived recommendation surface.

The two are tightly connected because Options should not invent a separate trip. It should explain what the user's Planner choices imply.

---

## 2. Why this matters

Holiday Planner becomes useful when a user's setup choices create visible downstream consequences.

If the user selects:

- dates,
- experience tier,
- soft budget cap,
- destination direction,
- travel comfort preferences,
- baby/family pacing needs,

then Options should respond by changing:

- recommended destinations,
- budget range,
- trip pacing,
- stay strategy,
- flight/transfer caution,
- shortlist order,
- tradeoff explanation.

If Options does not clearly derive from Planner, the app feels like a static dashboard.

If Options overreacts or independently stores a second intent model, the app feels inconsistent.

The product velocity comes from making Planner choices immediately meaningful in Options.

---

## 3. Ownership boundary

### Planner owns

Planner owns the trip intent.

This includes:

- travel month or date window,
- trip duration,
- origin preference,
- traveler count,
- infant/family constraints,
- experience tier,
- optional soft cap,
- destination direction,
- high-level comfort/fatigue tolerance,
- completion state for unlocking downstream tabs.

Planner should answer:

> What kind of trip are we trying to build?

### Options owns

Options owns the interpretation of Planner intent into possible plans.

This includes:

- ranked destination cards,
- destination comparison,
- budget envelope explanation,
- stay strategy,
- transfer/flight caution,
- recommendation rationale,
- shortlist candidates,
- tradeoffs between destination combinations.

Options should answer:

> Given this trip intent, what are the best plausible options?

### Planner must not own

Planner must not own:

- detailed scenario exploration,
- destination card comparison,
- final recommendation ranking,
- long budget breakdowns,
- Ready checklist logic,
- Decide preference signal logic.

### Options must not own

Options must not own:

- independent experience tier,
- independent trip dates,
- independent traveler count,
- independent source-of-truth budget cap,
- hidden hard-coded assumptions that override Planner,
- separate Planner completion state.

---

## 4. State/data flow

### Intended flow

```txt
Planner choices
  ↓
State layer
  ↓
Data + Engine
  ↓
Options recommendations
```

Planner should write intent into state.

Options should read state, combine it with data, then ask the engine to derive recommendations.

Options should never duplicate the Planner form internally.

### Example state flow

```txt
Planner:
  experienceTier = comfort
  destinationDirection = UAE + Bali
  month = August
  infantAgeMonths = 11
  fatigueTolerance = low

Engine:
  converts those choices into scoring weights and budget envelope

Options:
  shows UAE + Bali as possible but explains August heat, baby pacing, transfer load, and premium stay requirements
```

### State that should be shared

- selected dates/month,
- trip length,
- experience tier,
- soft cap,
- destination direction,
- infant/family constraints,
- origin preference,
- Planner completion state.

### State that should be local to Options

- temporary sort order,
- expanded/collapsed card state,
- selected comparison view,
- visible explanation depth,
- temporary shortlist UI focus.

### State that should be promoted from Options to shared state

- shortlisted destination,
- rejected destination with reason,
- selected option for Ready checklist,
- user preference signal that affects Decide.

---

## 5. Derived vs independent behavior

### Derived from Planner

Options should derive:

- budget range,
- recommendation ranking,
- destination warnings,
- travel-fatigue warnings,
- baby-comfort warnings,
- pacing suggestions,
- shortlist ordering,
- upgrade suggestions.

### Independently editable in Options

Options may allow local adjustments for exploration, but those must be framed as scenario tests, not source-of-truth changes.

Examples:

- “What if we upgrade stays?”
- “What if we reduce transfers?”
- “What if we choose a single country?”

These should either:

1. remain local to Options as temporary views, or
2. be explicitly sent back as a Planner/Decide decision.

### Dangerous middle ground

Avoid silent local overrides.

Bad pattern:

```txt
Planner says comfort tier.
Options silently assumes premium tier for Bali card.
Ready uses yet another budget range.
```

Good pattern:

```txt
Planner says comfort tier.
Options says Bali is possible, but high-quality/premium stays materially improve the fit.
User can mark “worth upgrading resort” in Decide.
Ready reflects the chosen upgrade later.
```

---

## 6. Failure modes

### Failure mode 1 — Hard-coded recommendation drift

Options shows recommendations based on old assumptions rather than current Planner state.

**Example:** User changes experience tier from comfort to frugal, but Options still shows premium stay suggestions.

**Prevention:** Options recommendations must be derived from shared state and data/engine helpers.

### Failure mode 2 — Budget split-brain

Planner derives budget from experience tier, while Options uses a separate static budget.

**Prevention:** Budget envelope must come from one engine pathway.

### Failure mode 3 — Planner becomes overloaded

Because Options depends on Planner, there is a temptation to put more explanation into Planner.

**Prevention:** Planner collects only enough intent to generate the story. Options explains detailed tradeoffs.

### Failure mode 4 — Options becomes a second Planner

Options adds its own controls for dates, tier, destination direction, and trip profile.

**Prevention:** Options may explore scenarios, but source-of-truth setup stays in Planner.

### Failure mode 5 — Locked downstream tabs feel empty or broken

If Options depends on Planner completion, empty Options state may look like a bug.

**Prevention:** Options should show a clear locked/empty state explaining which Planner choices are needed.

### Failure mode 6 — One destination dominates regardless of user input

Static recommendation order can make Planner choices feel meaningless.

**Prevention:** Ranking should visibly react to experience tier, fatigue tolerance, baby comfort, and destination direction.

---

## 7. Compounding opportunities

### Opportunity 1 — Planner choices become immediate narrative

When Planner choices update Options, the app can generate a story:

> “Because you chose a comfort-led family trip in August with low fatigue tolerance, the best options reduce transfers and protect resort quality.”

This makes the app feel intelligent without needing more tabs.

### Opportunity 2 — Options can teach the user tradeoffs

Options can translate Planner intent into decision language:

- “This saves money but adds transfer friction.”
- “This gives stronger honeymoon value but needs a premium stay.”
- “This is baby-safe but less exciting.”

### Opportunity 3 — Options can feed Decide

When a user reacts to an option, that reaction should feed Decide.

Examples:

- User expands Bali and marks concern about transfers.
- Decide can surface “transfer fatigue” as a decision signal.
- Future recommendation can reduce transfer-heavy options.

### Opportunity 4 — Options can feed Ready

Once an option is selected, Ready can become specific.

Example:

- Option selected: UAE + Sri Lanka.
- Ready checklist updates to passports, flights, hotel cancellation, infant supplies, transfer planning, visa/admin tasks.

---

## 8. Implementation implications

### Current live state

The live app still keeps runtime inline in `index.html`.

Non-wired scaffolds now exist in:

- `src/state/storage.js`,
- `src/state/migration.js`,
- `src/data/planner-options.js`,
- `src/data/index.js`,
- `src/engine/scoring.js`,
- `src/engine/budget.js`,
- `src/engine/recommendations.js`,
- `src/engine/index.js`,
- `src/ui/dom.js`,
- `src/ui/tabs.js`,
- `src/ui/index.js`.

### Future module boundaries

Planner UI should eventually write to a shared state object.

Options UI should eventually read:

- shared state from `src/state`,
- destination catalog from `src/data`,
- budget and ranking helpers from `src/engine`.

Options should not directly compute its own independent scoring if equivalent engine helpers exist.

### Suggested extraction sequence

1. Extract destination catalog data.
2. Extract Planner state shape and completion logic.
3. Extract budget derivation into engine.
4. Extract recommendation ranking into engine.
5. Wire Options to read engine output.
6. Only then extract Options UI rendering.

---

## 9. QA checks

Before changing Planner or Options:

- [ ] Review `docs/BUGS.md` for Planner selection, overflow, and hard-coded drift risks.
- [ ] Confirm Planner selections still work on mobile.
- [ ] Confirm Options is locked or explanatory before Planner completion.
- [ ] Confirm changing experience tier changes budget/recommendation explanation.
- [ ] Confirm changing destination direction changes recommendation emphasis.
- [ ] Confirm no horizontal scroll appears in either Planner or Options.
- [ ] Confirm no destination card text escapes its card.
- [ ] Confirm budget range derives from tier and not static copy.
- [ ] Confirm Options does not show scenario exploration that belongs in Decide unless clearly temporary.

---

## 10. Open questions

1. Should Options allow temporary scenario controls, or should all scenario exploration live only in Decide?
2. Should a user be able to shortlist before completing all Planner fields?
3. Should soft cap be treated as a warning threshold or a hard filter?
4. Should premium upgrade suggestions appear in Options or Decide?
5. How visible should the scoring/ranking explanation be to the user?

---

## 11. Future synthesis links

This report should connect to:

- Planner ↔ Decide,
- Options ↔ Ready,
- Data ↔ Engine,
- State ↔ UI,
- Planner → Options → Decide compound synthesis,
- Planner → Options → Ready compound synthesis.

---

## 12. Core rule from this synthesis

Planner defines intent. Options interprets intent.

If Options starts defining intent, the app will drift. If Planner starts explaining every option, the app will bloat.

The velocity comes from keeping the boundary clean.
