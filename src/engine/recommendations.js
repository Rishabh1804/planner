// Holiday Planner recommendation helpers.
//
// Non-wired scaffold. These helpers keep ranking behavior pure and testable.

import { compareByScoreDesc, scoreLabel, weightedScore } from './scoring.js';

export function deriveDestinationScore(destination, context = {}) {
  const scores = {
    babyComfort: destination?.babyComfort ?? destination?.scores?.babyComfort ?? 0,
    monthFit: destination?.monthFit?.[context.month] ?? destination?.scores?.monthFit ?? 0,
    budgetFit: destination?.budgetFit ?? destination?.scores?.budgetFit ?? 0,
    travelFatigue: destination?.travelFatigue ?? destination?.scores?.travelFatigue ?? 0,
    honeymoonValue: destination?.honeymoonValue ?? destination?.scores?.honeymoonValue ?? 0,
    visaEase: destination?.visaEase ?? destination?.scores?.visaEase ?? 0
  };

  return weightedScore(scores, context.weights);
}

export function rankDestinations(destinations = [], context = {}) {
  return destinations
    .map((destination) => {
      const score = deriveDestinationScore(destination, context);
      return {
        ...destination,
        score,
        scoreLabel: scoreLabel(score)
      };
    })
    .sort(compareByScoreDesc);
}

export function topRecommendation(destinations = [], context = {}) {
  return rankDestinations(destinations, context)[0] ?? null;
}

export function shortlistRecommendations(destinations = [], context = {}, limit = 3) {
  return rankDestinations(destinations, context).slice(0, limit);
}
