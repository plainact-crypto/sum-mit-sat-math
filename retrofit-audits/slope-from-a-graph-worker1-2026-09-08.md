# Explanation Retrofit QA — Slope from a Graph

- Slug: `slope-from-a-graph`
- Route: `/algebra/linear-functions/slope-from-a-graph/explanation/`
- Classification: `BOTH`
- Graph required: yes
- Graph present: yes
- Desmos useful: yes
- Desmos Strategy present: yes
- Source marker: `RETROFIT_DONE`
- QA date: 2026-09-08

## Independent math cross-check

The native worked-example graph uses `y = 2x` and labels `(1,2)`, `(2,4)`, and `(4,8)`.

Three-point substitution check:
- `(1,2)`: `2 = 2(1)`.
- `(2,4)`: `4 = 2(2)`.
- `(4,8)`: `8 = 2(4)`.

The slope from `(1,2)` to `(4,8)` is `(8-2)/(4-1)=6/3=2`, matching the graphed equation. The y-intercept and x-intercept are both `0`, consistent with `y=2x`.

The lesson-specific Desmos block enters `y=2x` with the points `(1,2)` and `(4,8)`, correctly identifies the rise/run relationship, and correctly states that manual rise-over-run is faster when two clean graph points are already visible.

The existing teaching text, deterministic native graph, and Desmos block were preserved unchanged.
