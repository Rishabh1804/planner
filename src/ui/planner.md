# Planner UI

Planner-screen UI belongs here once the bundle is split.

## Owns

- guided Plan builder
- dates step
- experience-tier step
- destination-direction step
- Planner breadcrumbs
- generated story unlock state

## Rule

Planner is the source of truth for trip setup. Other tabs should derive from Planner state instead of storing duplicate setup choices.
