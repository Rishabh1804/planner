# BUG-007 — Documentation SHA conflict

Status: Fixed / Watching  
Area: Docs / Governance  
Found during: extraction documentation updates

## Symptom

A documentation update failed because the target file had a stale SHA.

## Root cause

The file changed between fetch and update.

## Fix already applied

The file was re-fetched with the latest SHA and the update was re-applied.

## Current risk

Medium during rapid documentation and governance updates.

This is especially relevant while adding synthesis reports, QA files, bug reviews, and decision records.

## Regression checks

Before docs updates:

- Fetch the latest file before writing.
- Use the latest returned SHA.
- Avoid parallel writes to the same file.
- Verify final file content after the update.
- If a delayed conflict appears, re-fetch and re-apply against the current content.

## Related files

- `docs/DECISIONS.md`
- `docs/QA.md`
- `docs/synthesis/INDEX.md`
- `docs/BUGS.md`
- `docs/bugs/*`
