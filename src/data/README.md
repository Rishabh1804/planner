# `src/data/`

Static planning data belongs here once the root bundle is split.

## Owns

- destination catalog
- month suitability data
- visa/admin seed notes
- flight estimate seed data
- stay and experience bands

## Rule

Data files should avoid DOM access. They should export plain objects or functions that return plain data.
