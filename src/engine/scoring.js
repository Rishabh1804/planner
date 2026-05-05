// Holiday Planner scoring helpers.
//
// Non-wired scaffold. These functions are pure and have no DOM/storage access.
// They are intended to replace inline scoring logic only after parity checks.

export const DEFAULT_SCORE_WEIGHTS = Object.freeze({
  babyComfort: 0.30,
  monthFit: 0.20,
  budgetFit: 0.15,
  travelFatigue: 0.15,
  honeymoonValue: 0.10,
  visaEase: 0.10
});

export function clampScore(value, min = 0, max = 100) {
  const number = Number(value);
  if (!Number.isFinite(number)) return min;
  return Math.min(max, Math.max(min, number));
}

export function normalizeWeights(weights = DEFAULT_SCORE_WEIGHTS) {
  const entries = Object.entries(weights).filter(([, value]) => Number.isFinite(Number(value)) && Number(value) > 0);
  const total = entries.reduce((sum, [, value]) => sum + Number(value), 0);

  if (!total) return { ...DEFAULT_SCORE_WEIGHTS };

  return Object.fromEntries(entries.map(([key, value]) => [key, Number(value) / total]));
}

export function weightedScore(scores, weights = DEFAULT_SCORE_WEIGHTS) {
  const normalizedWeights = normalizeWeights(weights);

  return clampScore(
    Object.entries(normalizedWeights).reduce((total, [key, weight]) => {
      return total + clampScore(scores?.[key] ?? 0) * weight;
    }, 0)
  );
}

export function scoreLabel(score) {
  const value = clampScore(score);
  if (value >= 85) return 'Excellent fit';
  if (value >= 75) return 'Strong fit';
  if (value >= 65) return 'Good fit';
  if (value >= 50) return 'Conditional fit';
  return 'Weak fit';
}

export function compareByScoreDesc(a, b) {
  return clampScore(b?.score ?? b?.fitScore ?? 0) - clampScore(a?.score ?? a?.fitScore ?? 0);
}
