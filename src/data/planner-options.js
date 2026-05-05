// Holiday Planner planner options data.
//
// Non-wired scaffold. The live app still uses inline plannerData in index.html.
// This module mirrors choice/data boundaries so extraction can proceed safely.

export const EXPERIENCE_TIERS = Object.freeze([
  Object.freeze({
    value: 'frugal',
    label: 'Frugal',
    description: 'Spend carefully; accept some compromises.',
    comfortPriority: 'low',
    budgetBand: 'lowest-practical'
  }),
  Object.freeze({
    value: 'mid',
    label: 'Mid',
    description: 'Comfortable but cost-aware.',
    comfortPriority: 'medium',
    budgetBand: 'balanced-value'
  }),
  Object.freeze({
    value: 'comfort',
    label: 'Comfort',
    description: 'Low-friction and family-friendly without luxury waste.',
    comfortPriority: 'high',
    budgetBand: 'family-comfort'
  }),
  Object.freeze({
    value: 'highQuality',
    label: 'High Quality',
    description: 'Better locations, smoother flights, stronger stays.',
    comfortPriority: 'very-high',
    budgetBand: 'quality-led'
  }),
  Object.freeze({
    value: 'premium',
    label: 'Premium',
    description: 'Minimize friction and maximize experience.',
    comfortPriority: 'maximum',
    budgetBand: 'premium'
  })
]);

export const DESTINATION_MODES = Object.freeze([
  Object.freeze({ label: 'UAE + Bali', value: 'UAE + Bali', domain: 'route' }),
  Object.freeze({ label: 'UAE + Thailand', value: 'UAE + Thailand', domain: 'route' }),
  Object.freeze({ label: 'UAE + Sri Lanka', value: 'UAE + Sri Lanka', domain: 'baby' }),
  Object.freeze({ label: 'Thailand + Vietnam', value: 'Thailand + Vietnam', domain: 'budget' }),
  Object.freeze({ label: 'Italy + UAE', value: 'Italy + UAE', domain: 'admin' }),
  Object.freeze({ label: 'UAE only', value: 'UAE only', domain: 'baby' }),
  Object.freeze({ label: 'Bali-heavy', value: 'Bali-heavy', domain: 'honeymoon' }),
  Object.freeze({ label: 'Europe option', value: 'Europe option', domain: 'admin' }),
  Object.freeze({ label: 'Sri Lanka option', value: 'Sri Lanka option', domain: 'stay' }),
  Object.freeze({ label: 'Vietnam option', value: 'Vietnam option', domain: 'budget' })
]);

export const OVERALL_FEELING_OPTIONS = Object.freeze([
  Object.freeze({ label: 'Feels exciting', value: 'Excited', domain: 'honeymoon' }),
  Object.freeze({ label: 'Feels too packed', value: 'Too packed', domain: 'risk' }),
  Object.freeze({ label: 'Need more honeymoon time', value: 'Need more honeymoon time', legacyValues: Object.freeze(['Need more Bali']), domain: 'honeymoon' }),
  Object.freeze({ label: 'Need more city / shopping time', value: 'Need more city / shopping time', legacyValues: Object.freeze(['Need more Dubai']), domain: 'budget' })
]);

export const PREFERENCE_MARKERS = Object.freeze([
  Object.freeze({ label: 'Prioritise villa / resort', value: 'Prioritise villa', domain: 'honeymoon' }),
  Object.freeze({ label: 'More shopping', value: 'More shopping', domain: 'budget' }),
  Object.freeze({ label: 'Less hotel switching', value: 'Less hotel switching', domain: 'risk' }),
  Object.freeze({ label: 'Better photos', value: 'Better photos', domain: 'honeymoon' }),
  Object.freeze({ label: 'Slow mornings', value: 'Slow mornings', domain: 'baby' }),
  Object.freeze({ label: 'Safer baby pacing', value: 'Safer baby pacing', domain: 'baby' })
]);

export const ALTERNATE_MONTHS = Object.freeze([
  Object.freeze({ label: 'Sep', value: 'Sep', domain: 'planner' }),
  Object.freeze({ label: 'Oct', value: 'Oct', domain: 'planner' }),
  Object.freeze({ label: 'Nov', value: 'Nov', domain: 'planner' }),
  Object.freeze({ label: 'Dec', value: 'Dec', domain: 'planner' })
]);

export const BACKUP_DESTINATIONS = Object.freeze([
  Object.freeze({ label: 'UAE only', value: 'uae', domain: 'baby' }),
  Object.freeze({ label: 'Sri Lanka', value: 'sri_lanka', domain: 'stay' }),
  Object.freeze({ label: 'Thailand', value: 'thailand', domain: 'stay' }),
  Object.freeze({ label: 'Vietnam', value: 'vietnam', domain: 'budget' }),
  Object.freeze({ label: 'UAE + Sri Lanka', value: 'uae_sri_lanka', domain: 'baby' }),
  Object.freeze({ label: 'UAE + Thailand', value: 'uae_thailand', domain: 'route' })
]);

export const FALLBACK_STRATEGY_OPTIONS = Object.freeze([
  Object.freeze({ label: 'Single country if baby fatigue is high', value: 'single_country_if_fatigue_high', domain: 'baby' }),
  Object.freeze({ label: 'Closer resort over long-haul', value: 'closer_resort_over_longhaul', domain: 'route' }),
  Object.freeze({ label: 'Reduce transfers first', value: 'reduce_transfers_first', domain: 'risk' }),
  Object.freeze({ label: 'Protect premium stay quality', value: 'protect_premium_stay_quality', domain: 'honeymoon' })
]);

export const NON_NEGOTIABLES = Object.freeze([
  Object.freeze({ label: 'Relaxed mornings', value: 'relaxed_mornings', domain: 'baby' }),
  Object.freeze({ label: 'Fewer bases', value: 'fewer_hotel_changes', domain: 'risk' }),
  Object.freeze({ label: 'Strong villa / resort', value: 'strong_resort', domain: 'honeymoon' }),
  Object.freeze({ label: 'Short transfers', value: 'short_transfers', domain: 'route' }),
  Object.freeze({ label: 'Easy food access', value: 'easy_food_access', domain: 'stay' }),
  Object.freeze({ label: 'Baby sleep', value: 'baby_sleep_priority', domain: 'baby' })
]);

export const WORRIES = Object.freeze([
  Object.freeze({ label: 'Long flights', value: 'long_flights', domain: 'route' }),
  Object.freeze({ label: 'Too hot', value: 'too_hot', domain: 'risk' }),
  Object.freeze({ label: 'Visa delays', value: 'visa_delays', domain: 'admin' }),
  Object.freeze({ label: 'Sleep disruption', value: 'baby_sleep_disruption', domain: 'baby' }),
  Object.freeze({ label: 'Too many bases', value: 'too_many_bases', domain: 'risk' }),
  Object.freeze({ label: 'Budget drift', value: 'budget_drift', domain: 'budget' })
]);

export const WORTH_UPGRADING = Object.freeze([
  Object.freeze({ label: 'Direct flights', value: 'direct_flights', domain: 'route' }),
  Object.freeze({ label: 'Stay location', value: 'better_location', domain: 'stay' }),
  Object.freeze({ label: 'Premium resort', value: 'premium_resort', domain: 'honeymoon' }),
  Object.freeze({ label: 'Private transfers', value: 'private_transfers', domain: 'route' }),
  Object.freeze({ label: 'Room view', value: 'room_view', domain: 'honeymoon' }),
  Object.freeze({ label: 'Flexible booking', value: 'flexible_cancellation', domain: 'admin' })
]);

export const SKIP_SIGNALS = Object.freeze([
  Object.freeze({ label: 'Packed days', value: 'packed_sightseeing', domain: 'risk' }),
  Object.freeze({ label: 'Long day tours', value: 'long_day_tours', domain: 'risk' }),
  Object.freeze({ label: 'Desert safari', value: 'desert_safari', domain: 'risk' }),
  Object.freeze({ label: 'Late nights', value: 'late_nights', domain: 'baby' }),
  Object.freeze({ label: 'Frequent taxis', value: 'frequent_taxis', domain: 'route' })
]);

export const PLANNER_UI_OPTIONS = Object.freeze({
  destinationModes: DESTINATION_MODES,
  overallFeeling: OVERALL_FEELING_OPTIONS,
  preferenceMarkers: PREFERENCE_MARKERS,
  alternateMonths: ALTERNATE_MONTHS,
  backupDestinations: BACKUP_DESTINATIONS,
  fallbackStrategy: FALLBACK_STRATEGY_OPTIONS,
  nonNegotiables: NON_NEGOTIABLES,
  worries: WORRIES,
  worthUpgrading: WORTH_UPGRADING,
  skipSignals: SKIP_SIGNALS
});
