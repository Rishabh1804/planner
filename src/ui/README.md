# `src/ui/`

Rendering and interaction modules belong here once the root bundle is split.

## Owns

- Planner step UI
- Options tab rendering
- Decide tab rendering
- Ready checklist rendering
- event binding that belongs to a specific screen/module

## Rule

UI code may touch the DOM, but should call state and engine helpers instead of duplicating planning logic.
