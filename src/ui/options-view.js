// Options view module.
// Non-wired source module for the clean Options Density + Comparison Cockpit replacement.
//
// This module owns markup generation only. It does not read storage, mutate Planner
// state, score destinations, or bind live events.

import {
  createOptionsViewModel,
  normalizeOptionRecommendation
} from './options-cockpit.js';

export const OPTIONS_VIEW_TARGETS = Object.freeze({
  root: 'options',
  recommendationContext: 'recommendationContext',
  scenarioPlanB: 'scenarioPlanB',
  recommendationStack: 'recommendationStack',
  shortlistStrip: 'shortlistStrip',
  comparePanel: 'comparePanel',
  monthStrip: 'monthStrip',
  destinationBoard: 'destinationBoard',
  optionsStayCard: 'optionsStayCard',
  generatedStays: 'generatedStays',
  optionsBudgetCard: 'optionsBudgetCard',
  budgetTotal: 'budgetTotal',
  budgetSummary: 'budgetSummary',
  flightBudget: 'flightBudget',
  hotelBudget: 'hotelBudget',
  experienceBudget: 'experienceBudget',
  budgetReasons: 'budgetReasons',
  budgetBreakdownList: 'budgetBreakdownList',
  flightDataNote: 'flightDataNote',
  flightOptionList: 'flightOptionList'
});

export function createOptionsView(optionsInput = {}) {
  const viewModel = createOptionsViewModel(optionsInput);

  return `
    <section class="panel options-panel" id="${OPTIONS_VIEW_TARGETS.root}">
      <h2 class="section-title">Options</h2>
      <p class="section-sub">Compare the strongest trip directions from your Planner choices.</p>
      <div class="options-view" data-options-view>
        ${renderOptionsCockpit(viewModel)}
        ${renderOptionsPrimaryCard(viewModel)}
        ${renderOptionsSecondaryPanels()}
      </div>
    </section>
  `.trim();
}

export function renderOptionsCockpit(viewModelInput = {}) {
  const viewModel = createOptionsViewModel(viewModelInput);

  return `
    <article class="card options-cockpit card-domain-honeymoon card-emphasis-primary" data-options-cockpit>
      <div class="options-cockpit__hero">
        <span class="options-cockpit__eyebrow">Planner-derived comparison</span>
        <h3 class="options-cockpit__title">Best-fit directions at a glance</h3>
        <p class="options-cockpit__summary">${escapeHtml(viewModel.plannerSummary || 'Complete the Planner to compare fatigue, baby comfort, honeymoon value, and budget pressure.')}</p>
      </div>
      ${renderWinnerStrip(viewModel.winnerSlots)}
      ${renderLensStrip(viewModel.lenses, viewModel.activeLens)}
    </article>
  `.trim();
}

export function renderWinnerStrip(winnerSlots = []) {
  return `
    <div class="options-winner-strip" aria-label="Recommendation winners">
      ${winnerSlots.map(renderWinnerCard).join('')}
    </div>
  `.trim();
}

export function renderWinnerCard(slot) {
  return `
    <button class="options-winner-card" type="button" data-option-id="${escapeAttribute(slot.optionId || '')}" data-winner-slot="${escapeAttribute(slot.id || '')}">
      <strong>${escapeHtml(slot.label || 'Winner')}</strong>
      <span>${escapeHtml(slot.optionTitle || 'Pending')}</span>
      <span>${escapeHtml(slot.reason || 'Complete Planner')}</span>
    </button>
  `.trim();
}

export function renderLensStrip(lenses = [], activeLens = 'balanced') {
  return `
    <div class="options-lens-strip" aria-label="Comparison lenses">
      ${lenses.map((lens) => renderLensChip(lens, activeLens)).join('')}
    </div>
  `.trim();
}

export function renderLensChip(lens, activeLens = 'balanced') {
  const isActive = lens.id === activeLens;

  return `
    <button class="options-lens-chip" type="button" data-options-lens="${escapeAttribute(lens.id)}" aria-pressed="${isActive ? 'true' : 'false'}">
      ${escapeHtml(lens.label)}
    </button>
  `.trim();
}

export function renderOptionsPrimaryCard(viewModelInput = {}) {
  const viewModel = createOptionsViewModel(viewModelInput);

  return `
    <article class="card recommendation-module options-primary-card card-domain-honeymoon card-emphasis-primary card-density-comfort">
      <div class="options-primary-card__head">
        <div>
          <h3>Best options for you</h3>
          <p>Generated from Planner choices and ranked through the recommendation engine.</p>
        </div>
      </div>
      <div class="recommendation-context options-compact-context" id="${OPTIONS_VIEW_TARGETS.recommendationContext}"></div>
      <div class="scenario-output" hidden id="${OPTIONS_VIEW_TARGETS.scenarioPlanB}"></div>
      <div class="recommendation-stack options-comparison-list" id="${OPTIONS_VIEW_TARGETS.recommendationStack}">
        ${viewModel.recommendations.map(renderCompactRecommendationCard).join('')}
      </div>
      <div class="shortlist-strip options-shortlist-tray" id="${OPTIONS_VIEW_TARGETS.shortlistStrip}">
        ${renderShortlistPlaceholder(viewModel.shortlist)}
      </div>
      <div class="recommendation-context options-detail-panel" id="${OPTIONS_VIEW_TARGETS.comparePanel}" style="display:none;"></div>
    </article>
  `.trim();
}

export function renderCompactRecommendationCard(optionInput = {}) {
  const option = normalizeOptionRecommendation(optionInput);

  return `
    <article class="options-compact-card" data-option-id="${escapeAttribute(option.id)}">
      <div class="options-compact-card__head">
        <div>
          <h4 class="options-compact-card__title">${escapeHtml(option.title)}</h4>
          <p class="options-compact-card__verdict">${escapeHtml(option.verdict || option.summary || '')}</p>
        </div>
        <span class="options-fit-badge">${escapeHtml(option.fitLabel || 'Fit pending')}</span>
      </div>
      <div class="options-chip-row" aria-label="Option signals">
        ${renderMetricChip('Budget', option.budgetPressure)}
        ${renderMetricChip('Fatigue', option.fatigueLevel)}
        ${renderMetricChip('Baby', option.babyEase)}
        ${renderMetricChip('Honeymoon', option.honeymoonValue)}
      </div>
      ${renderOptionChips(option.chips)}
      <div class="options-card-actions">
        <button class="options-action-chip primary" type="button" data-options-action="shortlist" data-option-id="${escapeAttribute(option.id)}">Shortlist</button>
        <button class="options-action-chip" type="button" data-options-action="compare" data-option-id="${escapeAttribute(option.id)}">Review trade-offs</button>
      </div>
    </article>
  `.trim();
}

function renderMetricChip(label, metric) {
  const readable = readableMetric(metric) || 'Pending';
  const tone = metric && typeof metric === 'object' ? metric.tone : '';

  return `<span class="options-comparison-chip" data-tone="${escapeAttribute(tone || 'neutral')}">${escapeHtml(label)}: ${escapeHtml(readable)}</span>`;
}

function renderOptionChips(chips = []) {
  if (!Array.isArray(chips) || !chips.length) return '';

  return `
    <div class="options-chip-row" aria-label="Option highlights">
      ${chips.map((chip) => `<span class="options-comparison-chip">${escapeHtml(chip)}</span>`).join('')}
    </div>
  `.trim();
}

function renderShortlistPlaceholder(shortlist = []) {
  if (!Array.isArray(shortlist) || !shortlist.length) {
    return '<strong>Shortlist:</strong><span>No options shortlisted yet.</span>';
  }

  return `
    <strong>Shortlist:</strong>
    ${shortlist.map((item) => `<span class="options-comparison-chip">${escapeHtml(item.title || item.name || item)}</span>`).join('')}
  `.trim();
}

export function renderOptionsSecondaryPanels() {
  return `
    <div class="options-secondary-panels" data-options-secondary-panels>
      <details class="options-secondary-panel" open>
        <summary>Month + destination explorer</summary>
        <div class="options-secondary-panel__body">
          <div aria-label="Travel month options" class="month-strip" id="${OPTIONS_VIEW_TARGETS.monthStrip}"></div>
          <div class="destination-board" id="${OPTIONS_VIEW_TARGETS.destinationBoard}"></div>
        </div>
      </details>

      <details class="options-secondary-panel" id="${OPTIONS_VIEW_TARGETS.optionsStayCard}">
        <summary>Stay strategy</summary>
        <div class="options-secondary-panel__body">
          <div class="grid grid-after" id="${OPTIONS_VIEW_TARGETS.generatedStays}"></div>
        </div>
      </details>

      <details class="options-secondary-panel" id="${OPTIONS_VIEW_TARGETS.optionsBudgetCard}">
        <summary>Budget + flight breakdown</summary>
        <div class="options-secondary-panel__body options-budget-panel">
          <div class="options-budget-panel__summary">
            <strong id="${OPTIONS_VIEW_TARGETS.budgetTotal}">Budget pending</strong>
            <p id="${OPTIONS_VIEW_TARGETS.budgetSummary}"></p>
          </div>
          <div class="options-budget-panel__figures">
            <span id="${OPTIONS_VIEW_TARGETS.flightBudget}"></span>
            <span id="${OPTIONS_VIEW_TARGETS.hotelBudget}"></span>
            <span id="${OPTIONS_VIEW_TARGETS.experienceBudget}"></span>
          </div>
          <div class="options-chip-row" id="${OPTIONS_VIEW_TARGETS.budgetReasons}"></div>
          <div class="breakdown-list" id="${OPTIONS_VIEW_TARGETS.budgetBreakdownList}"></div>
          <div class="flight-data-card" id="${OPTIONS_VIEW_TARGETS.flightDataNote}"></div>
          <div class="flight-option-list" id="${OPTIONS_VIEW_TARGETS.flightOptionList}"></div>
        </div>
      </details>
    </div>
  `.trim();
}

function readableMetric(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') return value.label || value.tone || '';
  return String(value);
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeAttribute(value = '') {
  return escapeHtml(value);
}
