// Holiday Planner engine module boundary.
//
// Export pure helpers here so future UI/app wiring imports from one stable path.

export {
  clampScore,
  compareByScoreDesc,
  DEFAULT_SCORE_WEIGHTS,
  normalizeWeights,
  scoreLabel,
  weightedScore
} from './scoring.js';

export {
  applyExperienceMultiplier,
  createBudgetEnvelope,
  DEFAULT_BUDGET_PARTS,
  EXPERIENCE_BUDGET_MULTIPLIERS,
  formatBudgetRange,
  formatINR,
  safeNumber,
  sumBudgetParts
} from './budget.js';

export {
  deriveDestinationScore,
  rankDestinations,
  shortlistRecommendations,
  topRecommendation
} from './recommendations.js';
