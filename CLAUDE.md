# CLAUDE.md — Planner

## Project

Repo: `Rishabh1804/planner`

This repository is a static HTML/CSS/JS travel-planning dashboard being evolved into a coherent PWA. The current active workstream is the mobile **Options** tab repair and runtime consolidation.

## Current Priority

Fix the broken mobile Options tab by replacing hybrid/legacy runtime markup with one coherent Options runtime structure.

Do **not** solve this with another CSS containment patch. The visible symptoms are:

- giant left-side vertical orphan rails
- clipped text/cards
- off-canvas horizontal overflow on mobile
- legacy card/domain styling leaking into the new Options shell

The root problem is structural: new Options shell + old renderer output.

## Confirmed GitHub Context

Known recent commits:

- `0e5a373e84fb567b18e720f1dbba6906e560c8c1` — restored live `index.html` with Options replacement
- `53b7d568314197017663159ce553a792fa4a558b` — first Options containment CSS patch
- `630501ad045920a84cb39d75f41fae8a4433177a` — stronger legacy rail overflow CSS patch
- `8fe349ba595763656f12b9904bc0775e66bac30f` — bumped PWA cache to v3 and cached `src/ui/options-view.css`

Current live `index.html` blob SHA seen through the GitHub connector during the 2026-05-05 session:

```txt
355d739bee4153209ecc0c9269f237a45061e024
```

## Current Root Cause Assessment

This is not primarily a cache problem.

The new Options shell exists, but old runtime functions still populate Options containers with legacy classes. Those legacy classes are the likely source of mobile overflow and the orphan rail effect.

Confirmed/historical render chain:

```js
renderAll() ->
  renderMonthExplorer()
  renderDynamicBudget()
  renderScenarioSummary()
  renderRecommendations()
  renderScenarioPlanB()
  renderDerivedTabs()
```

Primary culprit:

```js
renderRecommendations()
```

Secondary culprit:

```js
renderMonthExplorer()
```

Also inspect before committing:

```js
renderDynamicBudget()
renderScenarioPlanB()
renderDerivedTabs()
renderPlannerGate()
```

Legacy classes that should not be emitted into Options runtime containers:

```txt
.recommendation-card
.recommendation-head
.recommendation-tagline
.destination-card
.card-domain-*
.domain-card-*
```

## Required IDs to Preserve

The following IDs are required by existing runtime logic and must remain available:

```txt
recommendationContext
scenarioPlanB
recommendationStack
shortlistStrip
comparePanel
monthStrip
destinationBoard
optionsStayCard
generatedStays
optionsBudgetCard
budgetTotal
budgetSummary
flightBudget
hotelBudget
experienceBudget
budgetReasons
budgetBreakdownList
flightDataNote
flightOptionList
```

Also preserve `optionsWinnerStrip` if present in the live shell.

## Correct Patch Direction

Patch `index.html` runtime functions directly.

Replace Options runtime output with markup using existing `src/ui/options-view.css` classes such as:

```txt
.options-compact-card
.options-compact-card__head
.options-compact-card__title
.options-compact-card__verdict
.options-fit-badge
.options-comparison-chip
.options-chip-row
.options-card-actions
.options-action-chip
.options-detail-panel
.options-lens-chip
.options-shortlist-tray
.options-budget-panel
```

Do not create a parallel enhancer in `app.js`.
Do not create duplicate render implementations.
Do not add another broad CSS nuke/containment pass unless a small final cleanup is proven necessary after the runtime markup is corrected.

## Patch Checklist

1. Fetch current `index.html`, `styles.css`, and `src/ui/options-view.css`.
2. Search inside `index.html` for:
   - `renderRecommendations`
   - `renderMonthExplorer`
   - `renderDynamicBudget`
   - `renderScenarioPlanB`
   - `renderDerivedTabs`
   - `renderPlannerGate`
3. Identify every write into Options containers.
4. Replace legacy Options output with coherent `.options-*` structures.
5. Preserve Planner storage, shortlist logic, score logic, budget derivation, and event delegation.
6. Confirm no required IDs were removed.
7. Review diff before commit.
8. Suggested commit message:

```txt
fix: replace options runtime legacy cards
```

## Tooling Notes From 2026-05-05 Session

- Local `git clone https://github.com/Rishabh1804/planner.git` failed due DNS: `Could not resolve host: github.com`.
- GitHub connector could fetch metadata and file SHAs.
- Large `index.html` content was exposed only as an internal blob/download URL in that session, not safely editable full text.
- No runtime commit was made during that session.

## Session Handoff

Detailed handoff log:

```txt
docs/session-handoffs/PLANNER_SESSION_HANDOFF_2026-05-05.md
```
