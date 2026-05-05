# Bug Review Log

This file captures focused bug reviews done during implementation work.

For the broader recurring regression tracker, also check `docs/BUGS.md`.

---

## 2026-05-05 — Options Cockpit winner-slot derivation

**Area:** Options Density + Comparison Cockpit  
**File reviewed:** `src/ui/options-cockpit.js`  
**Status:** Fixed before live wiring  
**Fix commit:** `ef2bb7d7b01275665525abc83711e7d7993be825`

### Bug found

`deriveWinnerSlots()` assigned every winner slot to the first recommendation.

That meant these winner labels could all point to the same option even when the underlying dimensions differed:

- Best overall
- Lowest fatigue
- Best baby pacing
- Strongest honeymoon value
- Best budget control

### Impact

**Live app impact:** Low.

The Options Cockpit files are currently non-wired scaffolds, so the live app was not affected.

**Future wiring impact:** Medium.

If wired without correction, the Options tab could display misleading winner cards. The UI would look polished but the comparison layer would not be analytically honest.

### Fix applied

`src/ui/options-cockpit.js` now uses dimension-aware winner derivation.

The fix adds:

- High/low winner preferences by slot.
- Numeric metric scoring.
- Object metric scoring through `score` or `value`.
- Label/tone scoring for descriptive values.
- Safe fallback handling for missing or non-array recommendations.
- More robust readable winner reasons.

### QA notes

Verified by static review:

- The file remains non-wired.
- Live `index.html` was not touched.
- Live `styles.css` was not touched.
- Storage namespace was not touched.
- Planner behavior was not touched.
- Service worker was not touched.

### Follow-up checks before live wiring

Before wiring the Options Cockpit into the live shell:

- Confirm each winner slot can select a different option when the data supports it.
- Confirm `lowestFatigue` and `budgetControl` use low-score preference correctly.
- Confirm `bestOverall`, `babyPacing`, and `honeymoonValue` use high-score preference correctly.
- Confirm fallback content appears when Planner is incomplete.
- Confirm compact winner cards do not create horizontal overflow on mobile.
