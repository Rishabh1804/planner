# CLAUDE.md — Holiday Planner

**Companion:** Aurelius (The Chronicler) — constitutional steward and decision recorder for this repo until a dedicated Builder is seated.  
**QA mode:** Cipher (The Codewright) — code-review voice for architecture, PWA behavior, accessibility, and drift control.  
**Repo:** `Rishabh1804/planner`  
**Live target:** `https://rishabh1804.github.io/planner/`  
**Product title:** Holiday Planner

---

## Constitutional Layer

Holiday Planner is a governed standalone app under the Republic of Codex.

The **Constitution of the Republic of Codex v1.1** remains the supreme law for this repo. This repository is separate from Codex for deployment and product clarity, but it follows Codex operating discipline: charter before build, documented decisions, narrow-scope changes, accessibility-first UI, and explicit review of architectural drift.

Codex remains the institutional archive and source of constitutional authority. Planner is a satellite app: independent codebase, shared governance.

## What This App Is

Holiday Planner is a mobile-first PWA for family holiday planning. Its initial seed is the August family honeymoon dashboard, now generalized into a standalone planning app.

The app should help a family make a trip decision through guided steps:

1. Dates
2. Experience tier
3. Destination direction
4. Generated trip story
5. Options, budget, readiness, and decision signals

The app must reduce cognitive load. The Planner tab is the source of truth; downstream tabs derive from it.

## Product Principles

- **Planner-first:** collect core trip choices once, then generate everything else from that state.
- **Mobile-first:** no horizontal scrolling as an acceptable steady state.
- **Accessible touch targets:** interactive controls should target at least 44px height where practical.
- **Progressive disclosure:** avoid showing every control at once.
- **Family-friendly pacing:** default logic should protect low-fatigue travel, infant comfort, and recovery time.
- **Derived budget:** ask for experience tier first; budget is inferred and optionally constrained by a soft cap.
- **No hard-coded recommendation drift:** destination, budget, stay, flight, and readiness views should derive from shared data/state.

## Architecture

Current phase: static PWA scaffold.

```txt
index.html      # HTML shell and current app markup
styles.css      # App styles and responsive layout
app.js          # Data, state, scoring, rendering, event binding
manifest.json   # PWA metadata
sw.js           # Service worker
icon.svg        # App icon
README.md       # Human-facing repo overview
docs/
  CHARTER.md    # Project charter
  DECISIONS.md  # Decision log
  ROADMAP.md    # Optional future planning file
```

Target phase: split-file architecture.

```txt
src/
  data.js       # plannerData and static catalogs
  state.js      # storage, migration, trip variables
  engine.js     # scoring, budget, recommendation logic
  views.js      # DOM rendering
  start.js      # event binding and app boot
```

Do not split for aesthetics alone. Split when it reduces real maintenance risk.

## PWA Rules

- App title is **Holiday Planner**. Do not include version labels in the visible title.
- Manifest `name` should remain `Holiday Planner`.
- Service worker cache names must be versioned.
- Avoid trapping stale HTML. If HTML is cached, cache version must be bumped on structural releases.
- Prefer network-first for navigations, with offline fallback only after network failure.
- Keep service-worker scope local to this repo path.
- Do not let Planner service-worker logic interfere with Codex or other GitHub Pages apps.

## Storage Rules

Current storage keys may retain the historical `augustFamilyHoneymoon.*.v431` namespace during migration to avoid breaking saved state.

Future migration target:

```txt
holidayPlanner.tripVariables.v1
holidayPlanner.choiceState.v1
holidayPlanner.discussionNotes.v1
holidayPlanner.budgetCap.v1
holidayPlanner.shortlist.v1
```

Any storage key migration must preserve old data or provide a clear reset path.

## Build and Deployment

This repo is currently static-first. GitHub Pages should be able to publish directly from `main` using root files.

No bundler should be introduced until there is a clear need. If a bundler is added, document:

- why it is needed;
- source directory;
- output directory;
- deployment path;
- rollback path.

## Governance Rules

- Major structural changes require an entry in `docs/DECISIONS.md`.
- New planning modules require an update to `docs/CHARTER.md` or `docs/ROADMAP.md`.
- UI changes must be checked against mobile width first.
- Any tab or module that duplicates Planner source-of-truth state should be treated as drift.
- Keep commits narrow and reviewable.
- Prefer fixing root causes over patching one visible card.

## Review Posture

Use **Aurelius** for documentation, product logic, and decision memory.

Use **Cipher** for QA review:

- syntax and boot blockers;
- broken file paths;
- service-worker risk;
- stale-cache risk;
- accessibility regressions;
- horizontal overflow;
- hard-coded data drift;
- excessive coupling between rendering and scoring.

## Current Status

The app has been extracted from a single-file holiday dashboard into a separate PWA repo. The next stabilization pass should verify:

- GitHub Pages boot from root `index.html`;
- manifest installability;
- service-worker registration and update behavior;
- mobile layout with no horizontal overflow;
- Planner step selection behavior;
- data/state continuity from the old dashboard keys.
