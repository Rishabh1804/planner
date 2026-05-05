# QA Audit — Options Source Modules

Status: Passed after fixes  
Area: Options source modules  
Date: 2026-05-05

This audit reviewed the clean, non-wired Options implementation path before live replacement.

Reviewed files:

- `src/ui/options-cockpit.js`
- `src/ui/options-view.js`
- `src/ui/options-bindings.js`
- `src/ui/options-view.css`
- `src/ui/options-cockpit.css`
- `src/ui/index.js`
- `docs/bugs/bug-008-options-winner-slot.md`

## Scope

The audit covered:

- Winner-slot logic.
- Catalog-readiness.
- Rendering safety.
- Event-binding boundaries.
- CSS completeness.
- Mobile overflow risk.
- Documentation consistency.
- Live-shell safety.

## Fixes applied during audit

### 1. Pending metrics could win low-preference slots

Finding:

Pending or unknown values could incorrectly win low-preference slots such as `lowestFatigue` and `budgetControl` because missing labels effectively scored as zero and were then inverted.

Fix:

`src/ui/options-cockpit.js` now treats pending/unknown label scores as non-winning values. Low-preference slots use a separate magnitude scale before inversion.

Commit:

```txt
cbe1dc1262aaf48c0579894f406dce634853597e
```

### 2. Replacement stylesheet was incomplete

Finding:

`src/ui/options-view.css` contained only the extra Options view budget-panel styles, while the main cockpit/card styles still lived in `src/ui/options-cockpit.css`.

Risk:

A future live replacement could import the new view CSS and miss core cockpit styling, producing inconsistent UI.

Fix:

`src/ui/options-view.css` now contains the full replacement styling surface for cockpit, winner strip, compact cards, chips, secondary panels, and budget panels.

Commit:

```txt
3a17dd8efe8c527f6071a1dafb2cdb19d4724b59
```

### 3. BUG-008 documentation referenced an unconfirmed commit

Finding:

`docs/bugs/bug-008-options-winner-slot.md` referenced an earlier unconfirmed fix commit.

Fix:

The bug note now references the confirmed audit fix commit and includes the pending/unknown low-preference scoring issue.

Commit:

```txt
3540434caae0875b9c1b7d84f1103f0d95e3970d
```

## Checks passed

### Live shell safety

- [x] `index.html` was not changed.
- [x] `app.js` was not changed.
- [x] `styles.css` was not changed.
- [x] `sw.js` was not changed.
- [x] Storage namespace was not changed.
- [x] No live runtime enhancer was added.
- [x] No duplicate Options implementation was wired.

### Winner-slot logic

- [x] Winner slots are dimension-aware.
- [x] High-preference slots prefer higher interpreted scores.
- [x] Low-preference slots prefer lower interpreted burden/pressure scores.
- [x] Pending and unknown labels do not win low-preference slots.
- [x] Non-array recommendation input is guarded.
- [x] Empty recommendation input falls back safely.

### Catalog readiness

- [x] Options model accepts future interpreted fields.
- [x] Catalog fields are optional.
- [x] Missing catalog fields are ignored safely.
- [x] UI displays compact interpreted signals rather than raw catalog records.
- [x] View code does not calculate destination truth.
- [x] View code does not store source data.

### Rendering safety

- [x] Generated view text is escaped.
- [x] Compare panel uses safe text rendering by default.
- [x] Attribute values are escaped.
- [x] Unknown future fields do not break rendering.

### CSS/layout safety

- [x] Core wrappers use `min-width: 0`.
- [x] Long text uses wrapping guards.
- [x] Winner strip collapses from five columns to two and then one column.
- [x] Action buttons collapse from two columns to one on narrow screens.
- [x] Budget figures collapse to one column on mobile.
- [x] Chips wrap instead of forcing horizontal scroll.
- [x] Touch-target intent is preserved for interactive controls.

### Architecture safety

- [x] Data catalog remains separate from Options.
- [x] Engine remains responsible for scoring/calculation.
- [x] Options consumes interpreted recommendation objects.
- [x] Ready remains responsible for preparation actions.
- [x] Future deep catalog browsing remains out of Options.

## Known non-blockers

### `src/ui/options-cockpit.css` remains as an older scaffold

`src/ui/options-cockpit.css` still exists as the original non-wired density scaffold. It is not currently harmful because nothing live imports it.

For live replacement, prefer `src/ui/options-view.css` as the consolidated stylesheet path.

A later cleanup can either:

- keep `options-cockpit.css` as historical scaffold, or
- deprecate it after live replacement succeeds.

### No runtime/browser test yet

This audit was static. The modules are non-wired, so live browser behavior is unchanged.

Browser QA becomes mandatory when the live Options section is replaced.

## Remaining gates before live replacement

Before user-visible replacement:

1. Replace the live Options section in one controlled commit.
2. Import the consolidated Options view CSS through a full-file-safe route.
3. Preserve or deliberately migrate all IDs listed in `docs/contracts/options-contract.md`.
4. Verify Planner selection behavior.
5. Verify recommendation rendering.
6. Verify shortlist behavior.
7. Verify compare behavior.
8. Verify budget, stay, and month explorer behavior.
9. Verify no horizontal scroll on mobile.
10. Verify no duplicate runtime or duplicate event binding.

## Decision

The non-wired Options module is fit to proceed to controlled live replacement planning.

Do not use `app.js` as an enhancer. Do not keep duplicate Options implementations.
