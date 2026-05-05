# `archive/` — Historical Material

Historical exports and generated handoff bundles belong here instead of the active root.

## Intended Subsections

```txt
archive/
├── originals/   # Original monolithic dashboard HTML exports
└── scaffolds/   # Generated zip/scaffold handoff files
```

## Rule

Archive files are not part of the live PWA runtime. They should not be referenced by `index.html`, `manifest.json`, or `sw.js`.

Use this folder for preservation, not active feature work.
