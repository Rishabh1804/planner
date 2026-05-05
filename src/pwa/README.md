# `src/pwa/`

PWA helper code belongs here once the root bundle is split.

## Owns

- service-worker registration helper
- install prompt helper
- update notification helper
- app-shell freshness behavior that does not belong inside `sw.js`

## Rule

The root `sw.js` remains at repository root to preserve GitHub Pages scope. This folder is for helper code imported by the app, not for moving the service worker itself.
