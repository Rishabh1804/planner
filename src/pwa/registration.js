// Holiday Planner PWA registration helper.
//
// Non-wired scaffold. Root app.js still performs the live service-worker
// registration while the app runtime remains inline in index.html.

export const DEFAULT_SERVICE_WORKER_URL = './sw.js';
export const DEFAULT_SERVICE_WORKER_SCOPE = './';

export function canRegisterServiceWorker(navigatorRef = globalThis?.navigator) {
  return Boolean(navigatorRef && 'serviceWorker' in navigatorRef);
}

export async function registerServiceWorker(options = {}) {
  const {
    navigatorRef = globalThis?.navigator,
    serviceWorkerUrl = DEFAULT_SERVICE_WORKER_URL,
    scope = DEFAULT_SERVICE_WORKER_SCOPE,
    onSuccess,
    onError
  } = options;

  if (!canRegisterServiceWorker(navigatorRef)) {
    return {
      registered: false,
      reason: 'service-worker-unavailable'
    };
  }

  try {
    const registration = await navigatorRef.serviceWorker.register(serviceWorkerUrl, { scope });
    if (typeof onSuccess === 'function') onSuccess(registration);

    return {
      registered: true,
      reason: 'registered',
      registration
    };
  } catch (error) {
    if (typeof onError === 'function') onError(error);

    return {
      registered: false,
      reason: 'registration-failed',
      error
    };
  }
}

export function registerServiceWorkerOnLoad(options = {}) {
  const {
    windowRef = globalThis?.window,
    onError = (error) => console.warn('Holiday Planner service worker registration failed:', error)
  } = options;

  if (!windowRef || typeof windowRef.addEventListener !== 'function') {
    return {
      scheduled: false,
      reason: 'window-unavailable'
    };
  }

  windowRef.addEventListener('load', () => {
    registerServiceWorker({ ...options, onError });
  });

  return {
    scheduled: true,
    reason: 'load-listener-attached'
  };
}
