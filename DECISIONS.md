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
