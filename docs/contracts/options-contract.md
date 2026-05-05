# Options Extraction Contract

Status: Active  
Area: Options tab  
Created: 2026-05-05

This contract governs the clean extraction and replacement of the Options tab.

The goal is to avoid patch layering, duplicate implementations, and inconsistent runtime behavior.

## Core rule

Options compares choices. It does not own Planner intent, scenario exploration, or booking readiness.

Planner owns intent.  
Options derives and compares recommendations.  
Decide captures reactions, worries, non-negotiables, and scenario exploration.  
Ready prepares the selected direction for action.

## Architecture decision

The Options upgrade must not be implemented as a runtime enhancer over the legacy DOM.

Allowed path:

1. Document the current live contract.
2. Build governed Options source modules.
3. Preserve existing runtime targets until a full replacement is ready.
4. Replace the live Options section cleanly.
5. Remove obsolete legacy Options structure in the same live replacement.

Not allowed:

- A second hidden Options implementation.
- Appending a cockpit shell through `app.js` while keeping the old shell as the real implementation.
- Duplicating recommendation state.
- Moving scenario exploration back into Options.
- Introducing independent budget-tier state in Options.

## Current live Options DOM targets

These IDs currently function as render or update targets and must be preserved unless a deliberate migration replaces the runtime contract:

| ID | Current role | Replacement rule |
|---|---|---|
| `recommendationContext` | Text summary of current Planner-derived recommendation context | Preserve as a render target or map to an equivalent context slot. |
| `scenarioPlanB` | Scenario lens output when Plan B inputs exist | Preserve target while scenario display remains supported, but do not move scenario controls into Options. |
| `recommendationStack` | Ranked recommendation card container | Preserve as the primary recommendation render target until renderer extraction. |
| `shortlistStrip` | Shortlist chip display | Preserve. |
| `comparePanel` | Compare output panel, hidden by default | Preserve or replace with a governed details panel using the same behavior. |
| `monthStrip` | Month selector buttons for destination explorer | Preserve if month explorer remains in Options. |
| `destinationBoard` | Month-specific destination explorer cards | Preserve if month explorer remains in Options. |
| `optionsStayCard` | Stay strategy card wrapper | Preserve or replace as a governed secondary Options panel. |
| `generatedStays` | Generated stay strategy target | Preserve. |
| `optionsBudgetCard` | Budget and flight card wrapper | Preserve or replace as a governed secondary Options panel. |
| `budgetTotal` | Dynamic total budget range | Preserve. |
| `budgetSummary` | Dynamic budget explanation | Preserve. |
| `flightBudget` | Dynamic flight budget range | Preserve. |
| `hotelBudget` | Dynamic hotel budget range | Preserve. |
| `experienceBudget` | Dynamic experience/local budget range | Preserve. |
| `budgetReasons` | Dynamic budget reason chips | Preserve. |
| `budgetBreakdownList` | Detailed budget breakdown rows | Preserve. |
| `flightDataNote` | Flight data caveat/note | Preserve. |
| `flightOptionList` | Flight option rows | Preserve. |

## Current live renderer map

The current inline runtime writes to the Options tab through these functions:

| Function | Main targets | Notes |
|---|---|---|
| `renderRecommendations()` | `recommendationContext`, `recommendationStack` | Renders Planner-gated recommendation cards and context. |
| `renderShortlist()` | `shortlistStrip` | Renders saved shortlisted destination names. |
| `renderMonthExplorer()` | `monthStrip`, `destinationBoard` | Renders month chips and month-specific destination cards. |
| `renderDynamicBudget()` | `budgetTotal`, `budgetSummary`, `flightBudget`, `hotelBudget`, `experienceBudget`, `budgetReasons`, `budgetBreakdownList`, `flightDataNote`, `flightOptionList` | Renders budget envelope and flight/stay breakdown. |
| `renderScenarioPlanB()` | `scenarioPlanB` | Displays scenario lens output only when scenario state exists. |
| `renderPlannerGate()` | `recommendationStack`, `destinationBoard`, `generatedStays`, `budgetBreakdownList`, `flightOptionList`, `scenarioPlanB` | Clears derived content when Planner is incomplete. |
| `renderDerivedTabs()` | `generatedStays` and other derived tab targets | Generates stay/readiness/story content once Planner is complete. |
| `renderAll()` | Calls the render pipeline | Planner readiness gates Options and other derived tabs. |

## Current Planner readiness contract

Options content is derived only after Planner is ready.

Current readiness condition:

- Start date exists.
- End date exists.
- Experience tier exists.
- Destination mode exists.

If Planner is incomplete:

- Derived recommendation content should not appear as final recommendations.
- Other derived tabs should remain empty or guarded.
- Fallback copy may explain what is missing.

## Current Options state dependencies

Options depends on these state categories:

- Travel variables: start date, end date, derived month, trip days.
- Planner choices: experience tier and destination mode.
- Optional soft budget cap.
- Scenario state for backup lens output only.
- Decision signals, where used by scoring.
- Shortlist state.

Options must not create a separate source of truth for these fields.

## Current recommendation data dependencies

The current recommendation pipeline uses:

- Destination catalog.
- Combination catalog.
- Destination month fit.
- Direction matches.
- Baby comfort.
- Travel fatigue.
- Honeymoon value.
- Visa ease/admin complexity.
- Base budget range.
- Experience tier multipliers.
- Scenario adjustment.
- Decision signal adjustment.

The clean Options module should render structured recommendation output, not re-score destinations inside view code once engine extraction is ready.

## Desired replacement structure

The replacement Options tab should default to:

1. Compact Planner-derived context.
2. Winner strip / best-fit comparison.
3. Lens or comparison chips.
4. Compact ranked recommendation cards.
5. Progressive detail for why, watch-outs, route, budget, and shortlist actions.
6. Secondary panels for month explorer, stay strategy, and budget/flight breakdown.

This should reduce vertical scan cost without reducing decision signal.

## CSS contract

The replacement should use existing design tokens and existing card/chip/button language where possible.

Options-specific classes are allowed only for layout and comparison behavior, for example:

- `options-cockpit`
- `options-winner-strip`
- `options-compact-card`
- `options-lens-strip`
- `options-secondary-panels`

CSS must guard against:

- Text overflow.
- Fixed-width cards.
- Horizontal scroll.
- Untappable controls below roughly 44px height where practical.

## Non-goals for first implementation

The first clean Options replacement should not:

- Migrate localStorage keys.
- Replace the full inline runtime.
- Move Decide scenario controls into Options.
- Change service-worker cache behavior.
- Redesign Ready.
- Introduce external dependencies.

## QA references

Before live replacement, consult:

- `docs/BUGS.md`
- `docs/bugs/README.md`
- `docs/qa/options-density-upgrade.md`
- `docs/qa/options-live-replacement.md`
- `docs/synthesis/2026-05-05-options-density-upgrade.md`
- `docs/synthesis/2026-05-05-options-engine-density.md`
- `docs/synthesis/2026-05-05-options-decide-ready-density-compound.md`
