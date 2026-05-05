# Holiday Planner QA Checklist

Use this checklist before and after structural changes.

## Boot

- Root `index.html` loads on GitHub Pages.
- No blank page on hard refresh.
- Console has no fatal JavaScript errors.
- CSS loads from the expected path.
- App logic loads from the expected path.

## PWA

- `manifest.json` loads successfully.
- Manifest name is `Holiday Planner`.
- Icon path resolves.
- Service worker installs without errors.
- Navigation requests are network-first and not trapped by stale cached HTML.
- Cache name is bumped after runtime asset path changes.

## Planner Flow

- Dates can be selected.
- Experience tier selection works.
- Optional soft cap can be entered and cleared.
- Destination direction selection works.
- Planning month selection works.
- Completed choices become visible breadcrumbs.
- Downstream tabs remain empty/guarded until Planner state is ready.

## Mobile Layout

- No steady-state horizontal scrolling.
- Touch targets are approximately 44px where practical.
- Tabs fit without layout breakage.
- Cards wrap instead of overflowing.
- Long destination names do not escape cards.

## Data and Storage

- Existing `augustFamilyHoneymoon.*.v431` localStorage data is preserved.
- Clearing notes does not clear unrelated planner state.
- Imported notes validate JSON before applying.
- Exported notes can be imported again.

## Recommendation Logic

- Recommendation cards derive from planner state.
- Budget envelope derives from experience tier and destination data.
- Decide-tab signals influence recommendations without duplicating Planner state.
- Scenario exploration stays in Decide, not Planner.
