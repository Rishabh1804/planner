// Holiday Planner external boot guard.
// The current production app logic is still inline in index.html while the bundle is being split.
// Keeping this file small prevents duplicate DOMContentLoaded app execution and keeps sw.js cache installation valid.

window.HOLIDAY_PLANNER_EXTERNAL_BOOT = {
  mode: 'inline-index-shell',
  splitStatus: 'pending-src-extraction',
  updatedAt: '2026-05-05'
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js', { scope: './' }).catch((error) => {
      console.warn('Holiday Planner service worker registration failed:', error);
    });
  });
}
