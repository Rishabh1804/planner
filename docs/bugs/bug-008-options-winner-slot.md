# BUG-008 — Options Cockpit winner-slot derivation

Status: Fixed before live wiring  
Area: Options / UI scaffold  
File reviewed: `src/ui/options-cockpit.js`  
Confirmed fix commit: `cbe1dc1262aaf48c0579894f406dce634853597e`

## Symptom

`deriveWinnerSlots()` originally assigned every winner slot to the first recommendation.

That meant these winner labels could all point to the same option even when the underlying dimensions differed:

- Best overall
- Lowest fatigue
- Best baby pacing
- Strongest honeymoon value
- Best budget control

## Additional QA finding

A full QA audit found a second scoring risk before live wiring:

Pending or unknown low-preference metrics could incorrectly win slots such as `lowestFatigue` or `budgetControl` because missing values were treated as zero before the low-score inversion.

## Impact

Live app impact remains low because the Options Cockpit files are currently non-wired scaffolds.

Future wiring impact was medium. If wired without correction, the Options tab could display misleading winner cards. The UI would look polished but the comparison layer would not be analytically honest.

## Fix applied

`src/ui/options-cockpit.js` now uses dimension-aware winner derivation and guards pending metrics.

The fix adds:

- High and low winner preferences by slot.
- Numeric metric scoring.
- Object metric scoring through `score` or `value`.
- Separate label scoring for high-preference and low-preference slots.
- Pending/unknown metric guard so missing values cannot win low-preference slots.
- Safe fallback handling for missing or non-array recommendations.
- More robust readable winner reasons.

## QA notes

Verified by static review:

- The file remains non-wired.
- Live `index.html` was not touched.
- Live `styles.css` was not touched.
- Storage namespace was not touched.
- Planner behavior was not touched.
- Service worker was not touched.

## Follow-up checks before live wiring

- Confirm each winner slot can select a different option when the data supports it.
- Confirm `lowestFatigue` and `budgetControl` use low-score preference correctly.
- Confirm pending/unknown values do not win low-preference slots.
- Confirm `bestOverall`, `babyPacing`, and `honeymoonValue` use high-score preference correctly.
- Confirm fallback content appears when Planner is incomplete.
- Confirm compact winner cards do not create horizontal overflow on mobile.
