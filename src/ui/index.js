// Holiday Planner UI module boundary.
//
// Non-wired. Future UI extraction should import DOM, tab, and Options cockpit helpers here.

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
