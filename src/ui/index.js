// Holiday Planner UI module boundary.
//
// Non-wired. Future UI extraction should import DOM, tab, and Options helpers here.

export {
  createElement,
  on,
  qs,
  qsa,
  setHidden,
  setHtml,
  setText,
  toggleClass
} from './dom.js';

export {
  activateTab,
  bindTabs,
  getTabIdFromButton
} from './tabs.js';

export {
  OPTIONS_COCKPIT_LENSES,
  OPTIONS_WINNER_SLOTS,
  createOptionSignal,
  createOptionsViewModel,
  deriveWinnerSlots,
  isOptionsViewModel,
  normalizeOptionRecommendation
} from './options-cockpit.js';

export {
  OPTIONS_VIEW_TARGETS,
  createOptionsView,
  renderCompactRecommendationCard,
  renderLensChip,
  renderLensStrip,
  renderOptionsCockpit,
  renderOptionsPrimaryCard,
  renderOptionsSecondaryPanels,
  renderWinnerCard,
  renderWinnerStrip
} from './options-view.js';

export {
  OPTIONS_ACTIONS,
  bindOptionsView,
  setActiveOptionsLens,
  showOptionsComparePanel
} from './options-bindings.js';
