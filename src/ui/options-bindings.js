// Options bindings module.
// Non-wired source module for future clean Options replacement.
//
// This file defines event delegation boundaries only. It does not bind to the live
// app automatically and does not mutate Planner state directly.

export const OPTIONS_ACTIONS = Object.freeze({
  shortlist: 'shortlist',
  compare: 'compare',
  lens: 'lens',
  winner: 'winner'
});

export function bindOptionsView(root, handlers = {}) {
  if (!root) return () => {};

  const handleClick = (event) => {
    const actionTarget = event.target.closest('[data-options-action]');
    if (actionTarget && root.contains(actionTarget)) {
      const action = actionTarget.dataset.optionsAction;
      const optionId = actionTarget.dataset.optionId || '';
      dispatchOptionAction(action, { optionId, target: actionTarget, event }, handlers);
      return;
    }

    const lensTarget = event.target.closest('[data-options-lens]');
    if (lensTarget && root.contains(lensTarget)) {
      dispatchOptionAction(OPTIONS_ACTIONS.lens, {
        lensId: lensTarget.dataset.optionsLens || '',
        target: lensTarget,
        event
      }, handlers);
      return;
    }

    const winnerTarget = event.target.closest('[data-winner-slot]');
    if (winnerTarget && root.contains(winnerTarget)) {
      dispatchOptionAction(OPTIONS_ACTIONS.winner, {
        slotId: winnerTarget.dataset.winnerSlot || '',
        optionId: winnerTarget.dataset.optionId || '',
        target: winnerTarget,
        event
      }, handlers);
    }
  };

  root.addEventListener('click', handleClick);

  return () => {
    root.removeEventListener('click', handleClick);
  };
}

function dispatchOptionAction(action, payload, handlers) {
  switch (action) {
    case OPTIONS_ACTIONS.shortlist:
      handlers.onShortlist?.(payload);
      break;
    case OPTIONS_ACTIONS.compare:
      handlers.onCompare?.(payload);
      break;
    case OPTIONS_ACTIONS.lens:
      handlers.onLensChange?.(payload);
      break;
    case OPTIONS_ACTIONS.winner:
      handlers.onWinnerSelect?.(payload);
      break;
    default:
      handlers.onUnknownAction?.({ action, ...payload });
  }
}

export function setActiveOptionsLens(root, activeLens) {
  if (!root) return;

  root.querySelectorAll('[data-options-lens]').forEach((button) => {
    button.setAttribute('aria-pressed', button.dataset.optionsLens === activeLens ? 'true' : 'false');
  });
}

export function showOptionsComparePanel(root, content = '') {
  const panel = root?.querySelector('#comparePanel');
  if (!panel) return;

  panel.textContent = content;
  panel.style.display = content ? '' : 'none';
}

export function clearOptionsComparePanel(root) {
  showOptionsComparePanel(root, '');
}
