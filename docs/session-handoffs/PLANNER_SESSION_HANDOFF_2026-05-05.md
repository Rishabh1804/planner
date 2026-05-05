# Planner Session Handoff — 2026-05-05

## Project

- Repo: `Rishabh1804/planner`
- Goal: Turn the static HTML travel dashboard into a coherent PWA, with the immediate priority of fixing the mobile **Options** tab breakage.
- Current user intent: replace the hybrid/legacy runtime Options render path with one coherent Options runtime structure. Do **not** add another CSS containment patch.

## Current GitHub State Confirmed

Known recent commits:

| SHA | Message / Purpose |
|---|---|
| `0e5a373e84fb567b18e720f1dbba6906e560c8c1` | Restored live `index.html` with Options replacement |
| `53b7d568314197017663159ce553a792fa4a558b` | First Options containment CSS patch |
| `630501ad045920a84cb39d75f41fae8a4433177a` | Stronger legacy rail overflow CSS patch |
| `8fe349ba595763656f12b9904bc0775e66bac30f` | Bumped PWA cache to v3 and cached `src/ui/options-view.css` |

Current live `index.html` blob SHA seen through GitHub connector:

```txt
355d739bee4153209ecc0c9269f237a45061e024
```

The connector successfully fetched metadata for:

- `index.html`
- `styles.css`
- `src/ui/options-view.css`
- `app.js`
- `sw.js`

But the large `index.html` content was exposed only as an internal blob/download URL and was not available to the local shell. Direct `git clone` failed due DNS resolution: `Could not resolve host: github.com`.

## Root Cause Assessment

This is not primarily a cache problem anymore.

The breakage is caused by hybrid runtime markup:

- New Options shell exists.
- Old runtime functions still populate the Options containers with legacy card structures.
- Legacy card/domain CSS creates giant left rails and horizontal overflow on mobile.

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

It still writes legacy classes such as:

```txt
.recommendation-card
.recommendation-head
.recommendation-tagline
.fit-badge
```

Secondary culprit:

```js
renderMonthExplorer()
```

Likely writes old month/destination cards such as:

```txt
.destination-card
.card-domain-*
.domain-card-*
```

Moderate-risk renderers:

```js
renderDynamicBudget()
generatedStays output
budgetBreakdownList output
flightOptionList output
```

Lower-risk but still inspect:

```js
renderScenarioPlanB()
renderDerivedTabs()
renderPlannerGate()
```

## Required IDs To Preserve

Keep every one of these IDs because existing runtime logic may reference them:

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

Also preserve `optionsWinnerStrip` if present.

## Correct Patch Plan

Patch `index.html` runtime functions directly.

Do not patch by adding more broad CSS rules.
Do not use `app.js` as an enhancer workaround.
Do not create duplicate parallel implementations.

Use the existing Options shell and emit only Options-specific classes inside Options containers.

Recommended class vocabulary from `src/ui/options-view.css`:

```txt
.options-view
.options-cockpit
.options-cockpit__hero
.options-winner-strip
.options-winner-card
.options-lens-strip
.options-lens-chip
.options-primary-card
.options-primary-card__head
.options-comparison-list
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
.options-shortlist-tray
.options-secondary-panels
.options-secondary-panel
.options-secondary-panel__body
.options-budget-panel
.options-budget-panel__summary
.options-budget-panel__figures
```

## Function-Level Guidance

### `renderRecommendations()`

Replace legacy `recommendation-card` output with `options-compact-card` output.

Avoid these classes in Options:

```txt
recommendation-card
recommendation-head
recommendation-tagline
card-domain-*
domain-card-*
```

Preserve shortlist buttons and any `data-*` attributes used by event delegation.

### `renderMonthExplorer()`

Render month choices as contained chips or compact cards:

```txt
.options-lens-chip
.options-compact-card
```

Render destination board items as wrapped, full-width-safe `options-compact-card` structures.

### `renderDynamicBudget()`

Keep all budget IDs live:

```txt
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

Use compact wrapped rows/cards, not legacy rail cards.

### `generatedStays`

Render stay cards with Options-specific compact markup and no legacy domain rail class.

### `renderScenarioPlanB()`

Keep scenario fallback output contained; it is probably not the primary rail culprit, but should not emit rail-domain cards into Options.

### `renderDerivedTabs()` and `renderPlannerGate()`

Inspect only to ensure they do not overwrite the Options shell or re-inject legacy placeholder content.

## Acceptance Criteria

- Mobile Options tab has no horizontal overflow.
- No giant orphan left rail appears.
- Options tab uses one coherent class system.
- All required IDs remain available.
- Planner state/storage behavior remains unchanged.
- Shortlist interactions remain functional.
- Budget and flight panels still render.
- No new `app.js` enhancer is introduced.
- No broad CSS nuke is added as the primary fix.

## Suggested Commit Message For Runtime Fix

```txt
fix: replace options runtime legacy cards
```

## Important Note

The 2026-05-05 session committed only documentation/handoff context. It did **not** commit the runtime Options fix.
