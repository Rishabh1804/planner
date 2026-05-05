// Options Cockpit UI helpers.
// Non-wired scaffold for Major Upgrade 1 — Options Density + Comparison Cockpit.
//
// This file defines the compact recommendation view model and small rendering helpers
// that future wired runtime code can use without duplicating Options logic in the DOM.

export const OPTIONS_COCKPIT_LENSES = [
  { id: 'balanced', label: 'Balanced', dimension: 'fit' },
  { id: 'baby', label: 'Baby comfort', dimension: 'babyEase' },
  { id: 'fatigue', label: 'Low fatigue', dimension: 'fatigueLevel' },
  { id: 'honeymoon', label: 'Honeymoon value', dimension: 'honeymoonValue' },
  { id: 'budget', label: 'Budget control', dimension: 'budgetPressure' },
  { id: 'seasonality', label: 'Season fit', dimension: 'seasonalityFit' },
  { id: 'localDepth', label: 'City depth', dimension: 'destinationDepth' }
];

export const OPTIONS_WINNER_SLOTS = [
  { id: 'bestOverall', label: 'Best overall', dimension: 'fitScore', preference: 'high' },
  { id: 'lowestFatigue', label: 'Lowest fatigue', dimension: 'fatigueLevel', preference: 'low' },
  { id: 'babyPacing', label: 'Best baby pacing', dimension: 'babyEase', preference: 'high' },
  { id: 'honeymoonValue', label: 'Strongest honeymoon value', dimension: 'honeymoonValue', preference: 'high' },
  { id: 'budgetControl', label: 'Best budget control', dimension: 'budgetPressure', preference: 'low' }
];

const FALLBACK_RECOMMENDATION = {
  id: 'option-pending',
  title: 'Recommendations loading',
  rank: null,
  fitLabel: 'Pending',
  fitScore: 0,
  verdict: 'Complete the Planner to compare the strongest trip directions.',
  summary: 'Options will compare fatigue, baby comfort, honeymoon value, and budget pressure.',
  chips: [],
  budgetPressure: { label: 'Pending', tone: 'neutral' },
  fatigueLevel: { label: 'Pending', tone: 'neutral' },
  babyEase: { label: 'Pending', tone: 'neutral' },
  honeymoonValue: { label: 'Pending', tone: 'neutral' },
  flightFit: null,
  hotelFit: null,
  seasonalityFit: null,
  restaurantDepth: null,
  shoppingProfile: null,
  photoValue: null,
  localMovementBurden: null,
  destinationDepth: null,
  activityDensity: null,
  confidence: null,
  dataFreshness: null,
  sourceSummary: null,
  budgetEnvelope: null,
  primaryWarning: null,
  warnings: [],
  reasons: [],
  tradeoffs: [],
  readyImplications: [],
  decidePrompts: []
};

const LABEL_SCORE = new Map([
  ['excellent', 100],
  ['strong', 90],
  ['high', 82],
  ['good', 74],
  ['deep', 74],
  ['rich', 74],
  ['easy', 72],
  ['low', 24],
  ['medium', 52],
  ['moderate', 52],
  ['mixed', 48],
  ['watch', 42],
  ['limited', 34],
  ['weak', 18],
  ['hard', 18],
  ['risky', 12],
  ['pending', 0]
]);

export function normalizeOptionRecommendation(rawOption = {}) {
  const safeRawOption = rawOption && typeof rawOption === 'object' ? rawOption : {};
  const option = { ...FALLBACK_RECOMMENDATION, ...safeRawOption };

  return {
    ...option,
    id: String(option.id || option.title || FALLBACK_RECOMMENDATION.id),
    title: String(option.title || FALLBACK_RECOMMENDATION.title),
    fitScore: Number.isFinite(Number(option.fitScore)) ? Number(option.fitScore) : 0,
    chips: normalizeList(option.chips, 5),
    warnings: normalizeList(option.warnings),
    reasons: normalizeList(option.reasons),
    tradeoffs: normalizeList(option.tradeoffs),
    readyImplications: normalizeList(option.readyImplications),
    decidePrompts: normalizeList(option.decidePrompts)
  };
}

export function createOptionsViewModel({
  plannerSummary = '',
  budgetEnvelope = null,
  recommendations = [],
  activeLens = 'balanced',
  shortlist = [],
  catalogSummary = null
} = {}) {
  const sourceRecommendations = Array.isArray(recommendations) ? recommendations : [];
  const normalizedRecommendations = sourceRecommendations.length
    ? sourceRecommendations.map(normalizeOptionRecommendation)
    : [normalizeOptionRecommendation(FALLBACK_RECOMMENDATION)];

  return {
    plannerSummary,
    budgetEnvelope,
    catalogSummary,
    lenses: OPTIONS_COCKPIT_LENSES,
    activeLens,
    winnerSlots: deriveWinnerSlots(normalizedRecommendations),
    recommendations: normalizedRecommendations,
    shortlist: Array.isArray(shortlist) ? shortlist : []
  };
}

export function deriveWinnerSlots(recommendations = []) {
  const options = Array.isArray(recommendations)
    ? recommendations.map(normalizeOptionRecommendation)
    : [normalizeOptionRecommendation(FALLBACK_RECOMMENDATION)];
  const fallbackOption = options[0] || normalizeOptionRecommendation(FALLBACK_RECOMMENDATION);

  return OPTIONS_WINNER_SLOTS.map((slot) => {
    const winner = findWinnerForSlot(options, slot) || fallbackOption;

    return {
      ...slot,
      optionId: winner.id,
      optionTitle: winner.title,
      reason: deriveWinnerReason(slot, winner)
    };
  });
}

function findWinnerForSlot(options, slot) {
  if (!options.length) return null;

  return options.reduce((best, option) => {
    const bestScore = metricScore(best, slot.dimension, slot.preference);
    const nextScore = metricScore(option, slot.dimension, slot.preference);
    return nextScore > bestScore ? option : best;
  }, options[0]);
}

function metricScore(option, dimension, preference = 'high') {
  const rawValue = dimension === 'fitScore' ? option.fitScore : option[dimension];
  const score = scoreValue(rawValue);
  return preference === 'low' ? 100 - score : score;
}

function scoreValue(value) {
  if (Number.isFinite(Number(value))) return Number(value);

  if (value && typeof value === 'object') {
    if (Number.isFinite(Number(value.score))) return Number(value.score);
    if (Number.isFinite(Number(value.value))) return Number(value.value);
    return scoreLabel(value.label || value.tone || value.summary || value.status || '');
  }

  return scoreLabel(value);
}

function scoreLabel(value) {
  const normalized = String(value || '').trim().toLowerCase();
  if (!normalized) return 0;

  for (const [keyword, score] of LABEL_SCORE.entries()) {
    if (normalized.includes(keyword)) return score;
  }

  return 50;
}

function deriveWinnerReason(slot, option) {
  switch (slot.id) {
    case 'lowestFatigue':
      return readableMetric(option.fatigueLevel) || 'Lower transfer load';
    case 'babyPacing':
      return readableMetric(option.babyEase) || 'Better family pacing';
    case 'honeymoonValue':
      return readableMetric(option.honeymoonValue) || 'Stronger stay payoff';
    case 'budgetControl':
      return readableMetric(option.budgetPressure) || 'Clearer budget pressure';
    default:
      return option.fitLabel || 'Strongest current fit';
  }
}

export function readableMetric(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') return value.label || value.summary || value.tone || value.status || '';
  return String(value);
}

function normalizeList(value, limit = Infinity) {
  const list = Array.isArray(value) ? value : [];
  return list.slice(0, limit);
}

export function createOptionSignal(option, signalType, metadata = {}) {
  const normalized = normalizeOptionRecommendation(option);

  return {
    optionId: normalized.id,
    optionTitle: normalized.title,
    signalType,
    createdAt: new Date().toISOString(),
    metadata
  };
}

export function isOptionsViewModel(value) {
  return Boolean(
    value &&
    Array.isArray(value.lenses) &&
    Array.isArray(value.winnerSlots) &&
    Array.isArray(value.recommendations)
  );
}
