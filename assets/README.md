# `assets/` — Static Assets

Static media belongs here instead of the repository root.

## Intended Subsections

```txt
assets/
├── icons/      # PWA icons, favicon sources, maskable icons
├── images/     # Destination imagery or illustrative assets
└── fonts/      # Local fonts, only if external font loading is replaced
```

## Rule

When moving assets, update all references in:

- `index.html`
- `manifest.json`
- `sw.js`

Do not move service-worker-controlled assets without bumping the service-worker cache name.
