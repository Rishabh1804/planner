// Holiday Planner budget helpers.
//
// Non-wired scaffold. The live app still derives budget inline in index.html.

export const EXPERIENCE_BUDGET_MULTIPLIERS = Object.freeze({
  frugal: 0.78,
  mid: 0.92,
  comfort: 1,
  highQuality: 1.18,
  premium: 1.42
});

export const DEFAULT_BUDGET_PARTS = Object.freeze({
  flights: 0,
  stays: 0,
  localSpend: 0,
  buffer: 0
});

export function safeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export function applyExperienceMultiplier(amount, experienceTier = 'comfort', multipliers = EXPERIENCE_BUDGET_MULTIPLIERS) {
  const multiplier = safeNumber(multipliers[experienceTier], multipliers.comfort ?? 1);
  return Math.round(safeNumber(amount) * multiplier);
}

export function sumBudgetParts(parts = DEFAULT_BUDGET_PARTS) {
  return Object.values({ ...DEFAULT_BUDGET_PARTS, ...parts }).reduce((sum, value) => sum + safeNumber(value), 0);
}

export function createBudgetEnvelope(parts, options = {}) {
  const {
    experienceTier = 'comfort',
    lowVariance = 0.9,
    highVariance = 1.12,
    multipliers = EXPERIENCE_BUDGET_MULTIPLIERS
  } = options;

  const baseTotal = sumBudgetParts(parts);
  const adjustedTotal = applyExperienceMultiplier(baseTotal, experienceTier, multipliers);

  return {
    experienceTier,
    baseTotal,
    adjustedTotal,
    low: Math.round(adjustedTotal * safeNumber(lowVariance, 0.9)),
    high: Math.round(adjustedTotal * safeNumber(highVariance, 1.12)),
    parts: { ...DEFAULT_BUDGET_PARTS, ...parts }
  };
}

export function formatINR(amount) {
  const value = safeNumber(amount);

  if (value >= 100000) {
    const lakhs = value / 100000;
    return `₹${Number.isInteger(lakhs) ? lakhs.toFixed(0) : lakhs.toFixed(1)}L`;
  }

  return `₹${Math.round(value).toLocaleString('en-IN')}`;
}

export function formatBudgetRange(envelope) {
  return `${formatINR(envelope.low)}–${formatINR(envelope.high)}`;
}
