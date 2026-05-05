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
  { id: 'budget', label: 'Budget control', dimension: 'budgetPressure' }
];

export const OPTIONS_WINNER_SLOTS = [
  { id: 'bestOverall', label: 'Best overall', dimension: 'fitScore' },
  { id: 'lowestFatigue', label: 'Lowest fatigue', dimension: 'fatigueLevel' },
  { id: 'babyPacing', label: 'Best baby pacing', dimension: 'babyEase' },
  { id: 'honeymoonValue', label: 'Strongest honeymoon value', dimension: 'honeymoonValue' },
  { id: 'budgetControl', label: 'Best budget control', dimension: 'budgetPressure' }
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
  primaryWarning: null,
  reasons: [],
  readyImplications: [],
  decidePrompts: []
};

export function normalizeOptionRecommendation(rawOption = {}) {
  const option = { ...FALLBACK_RECOMMENDATION, ...rawOption };

  return {
    ...option,
    id: String(option.id || option.title || FALLBACK_RECOMMENDATION.id),
    title: String(option.title || FALLBACK_RECOMMENDATION.title),
    fitScore: Number.isFinite(Number(option.fitScore)) ? Number(option.fitScore) : 0,
    chips: Array.isArray(option.chips) ? option.chips.slice(0, 5) : [],
    reasons: Array.isArray(option.reasons) ? option.reasons : [],
    readyImplications: Array.isArray(option.readyImplications) ? option.readyImplications : [],
    decidePrompts: Array.isArray(option.decidePrompts) ? option.decidePrompts : []
  };
}

export function createOptionsViewModel({
  plannerSummary = '',
  budgetEnvelope = null,
  recommendations = [],
  activeLens = 'balanced',
  shortlist = []
} = {}) {
  const normalizedRecommendations = recommendations.length
    ? recommendations.map(normalizeOptionRecommendation)
    : [normalizeOptionRecommendation(FALLBACK_RECOMMENDATION)];

  return {
    plannerSummary,
    budgetEnvelope,
    lenses: OPTIONS_COCKPIT_LENSES,
    activeLens,
    winnerSlots: deriveWinnerSlots(normalizedRecommendations),
    recommendations: normalizedRecommendations,
    shortlist: Array.isArray(shortlist) ? shortlist : []
  };
}

export function deriveWinnerSlots(recommendations = []) {
  const options = recommendations.map(normalizeOptionRecommendation);
  const firstOption = options[0] || normalizeOptionRecommendation(FALLBACK_RECOMMENDATION);

  return OPTIONS_WINNER_SLOTS.map((slot) => ({
    ...slot,
    optionId: firstOption.id,
    optionTitle: firstOption.title,
    reason: deriveWinnerReason(slot, firstOption)
  }));
}

function deriveWinnerReason(slot, option) {
  switch (slot.id) {
    case 'lowestFatigue':
      return option.fatigueLevel?.label || 'Lower transfer load';
    case 'babyPacing':
      return option.babyEase?.label || 'Better family pacing';
    case 'honeymoonValue':
      return option.honeymoonValue?.label || 'Stronger stay payoff';
    case 'budgetControl':
      return option.budgetPressure?.label || 'Clearer budget pressure';
    default:
      return option.fitLabel || 'Strongest current fit';
  }
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
