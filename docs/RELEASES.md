# Holiday Planner Releases

Release notes for structural and user-facing changes.

## Unreleased

### Repository Organization

- Added `docs/STRUCTURE.md` to define the active and target repository layout.
- Added `src/` section guides for future app split.
- Added `assets/` and `archive/` section guides.
- Added `docs/ROADMAP.md` and `docs/QA.md`.

### PWA Hygiene

- Moved the canonical app icon into `assets/icons/icon.svg`.
- Updated manifest icon path to `./assets/icons/icon.svg`.
- Bumped service-worker cache to `holiday-planner-v2`.
- Removed stale HTML fallback behavior from service-worker navigation handling.

## Release Rule

Every release entry should note:

- user-visible changes
- path changes
- service-worker cache changes
- localStorage migration impact
- QA notes
