// Holiday Planner tab helper scaffold.
//
// Non-wired. The live tab behavior remains inline in index.html.

export function getTabIdFromButton(button) {
  return button?.dataset?.tabTarget || button?.getAttribute?.('aria-controls') || null;
}

export function activateTab(tabId, options = {}) {
  const {
    root = document,
    buttonSelector = '[data-tab-target]',
    panelSelector = '[data-tab-panel]',
    activeClass = 'is-active'
  } = options;

  const buttons = Array.from(root.querySelectorAll(buttonSelector));
  const panels = Array.from(root.querySelectorAll(panelSelector));

  buttons.forEach((button) => {
    const isActive = getTabIdFromButton(button) === tabId;
    button.classList.toggle(activeClass, isActive);
    button.setAttribute('aria-selected', String(isActive));
  });

  panels.forEach((panel) => {
    const isActive = panel.id === tabId || panel.dataset.tabPanel === tabId;
    panel.classList.toggle(activeClass, isActive);
    panel.hidden = !isActive;
  });

  return tabId;
}

export function bindTabs(options = {}) {
  const {
    root = document,
    buttonSelector = '[data-tab-target]',
    onChange
  } = options;

  const buttons = Array.from(root.querySelectorAll(buttonSelector));
  const unbinders = buttons.map((button) => {
    const handler = () => {
      const tabId = getTabIdFromButton(button);
      if (!tabId) return;
      activateTab(tabId, options);
      if (typeof onChange === 'function') onChange(tabId, button);
    };

    button.addEventListener('click', handler);
    return () => button.removeEventListener('click', handler);
  });

  return () => unbinders.forEach((unbind) => unbind());
}
