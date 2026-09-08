# Explanation Retrofit QA — Slope from Two Points

- Slug: `slope-from-two-points`
- Route: `/algebra/linear-functions/slope-from-two-points/explanation/`
- Classification: `BOTH`
- Graph required: yes
- Graph present: yes
- Desmos useful: yes
- Desmos Strategy present: yes
- Source marker: `RETROFIT_DONE`
- QA date: 2026-09-08

## Independent math cross-check

The native graph uses `y = 2x + 1` with labeled points `(2,5)` and `(6,13)`.

Three-point substitution check:
- `x = 0` gives `y = 2(0)+1 = 1`, so `(0,1)` is on the line.
- `x = 2` gives `y = 2(2)+1 = 5`, so `(2,5)` is on the line.
- `x = 6` gives `y = 2(6)+1 = 13`, so `(6,13)` is on the line.

Slope from the two labeled points is `(13-5)/(6-2) = 8/4 = 2`, matching the line coefficient. The lesson-specific Desmos instructions enter the same two points and `y = 2x + 1`, so the claimed visual result is mathematically consistent.

The existing teaching text, native graph, and Desmos block were preserved unchanged.