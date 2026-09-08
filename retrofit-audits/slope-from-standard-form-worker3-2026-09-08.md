# Explanation Retrofit QA — Slope from Standard Form

- Slug: `slope-from-standard-form`
- Route: `/algebra/linear-functions/slope-from-standard-form/explanation/`
- Classification: `BOTH`
- Graph required: yes
- Graph present: yes
- Desmos useful: yes
- Desmos Strategy present: yes
- Source marker: `RETROFIT_DONE`
- QA date: 2026-09-08

## Independent math cross-check

The native graph uses `2x + y = 6`, equivalently `y = -2x + 6`.

Three-point substitution check in the original standard-form equation:
- `(0,6)`: `2(0)+6=6`.
- `(1,4)`: `2(1)+4=6`.
- `(2,2)`: `2(2)+2=6`.

The slope from `(0,6)` to `(1,4)` is `(4-6)/(1-0)=-2`, matching the standard-form shortcut `m=-A/B=-2/1=-2`. The y-intercept is `6`; setting `y=0` gives the x-intercept `x=3`.

The lesson-specific Desmos block enters the same equation, identifies the y-intercept and fall of 2 for each run of 1, and correctly states that `-A/B` is faster when standard form is already given.

The existing teaching text, deterministic native graph, and Desmos block were preserved unchanged.