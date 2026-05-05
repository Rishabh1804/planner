# Holiday Planner Decision Log

## 2026-05-05 — Create Holiday Planner as a separate governed app

**Decision:** Keep Holiday Planner in its own repository, `Rishabh1804/planner`, rather than embedding it inside the Codex repo.

**Rationale:**

- Holiday Planner is a separate product with separate deployment needs.
- A separate repo gives a clean GitHub Pages path and local PWA scope.
- Codex remains the constitutional archive and institutional memory layer.
- Planner can still follow the Republic's rules through repo-local governance files.

**Consequences:**

- Planner gets its own `CLAUDE.md`, charter, and decision log.
- Codex may later link to Planner as a governed satellite app.
- Service worker scope stays isolated to the Planner repo path.

## 2026-05-05 — Title normalized to Holiday Planner

**Decision:** The app title is `Holiday Planner` with no version suffix.

**Rationale:**

- Product title should remain stable for users and install prompts.
- Version labels belong in commits, releases, or docs, not browser/app title.

**Consequences:**

- `index.html` title should be `Holiday Planner`.
- `manifest.json` name should be `Holiday Planner`.
- Future versioning should happen through cache names, tags, or release notes.

## 2026-05-05 — Split single-file dashboard into PWA files

**Decision:** Move from a monolithic HTML dashboard toward split static PWA files.

**Rationale:**

- The original file had too much markup, CSS, data, and behavior in one place.
- Split files make PWA metadata, service-worker behavior, styling, and app logic easier to review.
- Future split into `src/data.js`, `src/state.js`, `src/engine.js`, `src/views.js`, and `src/start.js` should be done when it reduces maintenance risk.

**Consequences:**

- Initial static split may keep substantial logic in `app.js`.
- Next structural pass should separate data/scoring/rendering/event binding.
- Any split must preserve boot behavior and saved localStorage state.

## 2026-05-05 — Preserve old localStorage namespace during first migration

**Decision:** Keep existing `augustFamilyHoneymoon.*.v431` keys during the first PWA extraction.

**Rationale:**

- The dashboard already has saved-state behavior tied to those keys.
- Renaming keys immediately risks silent data loss.

**Consequences:**

- A future migration may move to `holidayPlanner.*.v1` keys.
- Migration must preserve existing data or provide a clear reset path.

## 2026-05-05 — Stabilize live root shell before deeper source split

**Decision:** Keep the production app logic inline in `index.html` temporarily, and reduce root `app.js` to a small service-worker boot guard.

**Rationale:**

- `index.html` already contains the full working Planner runtime.
- Root `app.js` also contained the same runtime, causing duplicate `DOMContentLoaded` execution risk.
- `sw.js` still caches `./app.js`, so the file must remain present until the service-worker asset list is changed in a controlled release.

**Consequences:**

- The app can go live from the root shell without double-running the Planner logic.
- `app.js` remains as a cache-safe boot/registration file.
- Deeper extraction should start from `src/state` and `src/data`, then move runtime out of inline HTML after parity checks.

## 2026-05-05 — Complete icon asset migration

**Decision:** Point `index.html`, `manifest.json`, and `sw.js` to `./assets/icons/icon.svg`, then remove the obsolete root `icon.svg`.

**Rationale:**

- App assets should live under the `assets/` section.
- Keeping two icon paths creates drift and makes PWA cache behavior harder to reason about.

**Consequences:**

- The canonical app icon path is now `assets/icons/icon.svg`.
- Root `icon.svg` should not be reintroduced unless a deployment platform requires it.

## 2026-05-05 — Add non-wired state extraction scaffolds

**Decision:** Add `src/state/storage.js` and `src/state/migration.js` before wiring modular source files into the live app.

**Rationale:**

- The live app should stay stable while extraction begins.
- Storage is the safest first extraction boundary because it has a clear contract and no DOM dependency.
- Migration helpers need to exist before any future move from `augustFamilyHoneymoon.*.v431` to `holidayPlanner.*.v1`.

**Consequences:**

- The live runtime remains inline in `index.html` for now.
- `src/state/storage.js` mirrors the current production storage keys and safe localStorage wrapper.
- `src/state/migration.js` previews and copies current state into future `holidayPlanner.*.v1` keys, but does not run automatically.
- Future wiring must include a parity check before replacing inline storage helpers.

## 2026-05-05 — Add non-wired planner data scaffold

**Decision:** Add `src/data/planner-options.js` and `src/data/index.js` before extracting the larger destination, visa, stay, budget, and recommendation catalogs.

**Rationale:**

- Planner options are a small, clear data boundary with no DOM dependency.
- Mirroring these options outside `index.html` reduces future extraction risk without changing the live app.
- An explicit `src/data/index.js` export boundary lets future modules import data from one stable path.

**Consequences:**

- The live runtime remains inline in `index.html` for now.
- Experience tiers, destination modes, first-reaction choices, preference markers, scenario choices, and decision signals now have a source-module scaffold.
- Future extraction can add larger catalogs in separate files instead of expanding one oversized module.

## 2026-05-05 — Add non-wired engine scaffolds

**Decision:** Add pure engine scaffolds for scoring, budget envelopes, and recommendation ranking before wiring them into the live app.

**Rationale:**

- Scoring, budget, and ranking logic should be testable without DOM or storage dependencies.
- Engine extraction should happen after state and data boundaries exist, but before UI extraction.
- Keeping the helpers non-wired protects the live Pages baseline while the module shape is reviewed.

**Consequences:**

- The live runtime remains inline in `index.html` for now.
- `src/engine/scoring.js` defines score weights and weighted-score helpers.
- `src/engine/budget.js` defines experience-tier budget multipliers and range formatting helpers.
- `src/engine/recommendations.js` defines pure ranking helpers.
- `src/engine/index.js` is the stable export boundary for future app wiring.
