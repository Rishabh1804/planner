// Holiday Planner DOM helper scaffold.
//
// Non-wired. These helpers describe the future UI boundary while the live
// runtime remains inline in index.html.

export function qs(selector, root = document) {
  return root.querySelector(selector);
}

export function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

export function setText(element, value = '') {
  if (!element) return;
  element.textContent = value == null ? '' : String(value);
}

export function setHtml(element, value = '') {
  if (!element) return;
  element.innerHTML = value == null ? '' : String(value);
}

export function toggleClass(element, className, force) {
  if (!element) return;
  element.classList.toggle(className, Boolean(force));
}

export function setHidden(element, hidden = true) {
  if (!element) return;
  element.hidden = Boolean(hidden);
}

export function createElement(tagName, options = {}) {
  const {
    className,
    text,
    html,
    attributes = {},
    children = []
  } = options;

  const element = document.createElement(tagName);

  if (className) element.className = className;
  if (text != null) element.textContent = text;
  if (html != null) element.innerHTML = html;

  Object.entries(attributes).forEach(([name, value]) => {
    if (value == null || value === false) return;
    element.setAttribute(name, value === true ? '' : String(value));
  });

  children.forEach((child) => {
    if (child) element.append(child);
  });

  return element;
}

export function on(element, eventName, handler, options) {
  if (!element || typeof handler !== 'function') {
    return () => {};
  }

  element.addEventListener(eventName, handler, options);
  return () => element.removeEventListener(eventName, handler, options);
}
