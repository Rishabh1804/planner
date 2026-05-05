# Focused Bug Reviews

This folder contains focused bug-review notes extracted from the broader Holiday Planner bug tracker.

Use this folder for implementation-specific debugging context.

Use `../BUGS.md` as the persistent master checklist and regression index.

## Current focused reviews

| ID | Title | Status | Area |
|---|---|---|---|
| BUG-001 | Text overflow and card content escaping container | Watching | Layout |
| BUG-002 | Planner tab selection not responding | Watching | Planner / UI events |
| BUG-003 | Plan mode horizontal scrolling | Watching | Mobile layout |
| BUG-004 | Duplicate runtime risk | Fixed / Regression-risk | Boot / PWA |
| BUG-005 | Stale service-worker HTML fallback risk | Fixed / Regression-risk | PWA |
| BUG-006 | Icon path drift | Fixed / Regression-risk | PWA / Assets |
| BUG-007 | Decision-log write SHA conflict | Fixed / Watching | Docs / Governance |
| BUG-008 | Options Cockpit winner-slot derivation | Fixed before live wiring | Options / UI scaffold |

## Rule

Do not delete resolved bug reviews. Fixed bugs stay here because they define future regression checks.
