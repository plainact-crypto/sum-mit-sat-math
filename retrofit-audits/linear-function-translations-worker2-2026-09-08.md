# Explanation Retrofit QA — Linear Function Translations

- Slug: `linear-function-translations`
- Route: `/algebra/linear-functions/linear-function-translations/explanation/`
- Classification: `BOTH`
- Graph required: yes
- Graph present: yes
- Desmos useful: yes
- Desmos Strategy present: yes
- Source marker: `RETROFIT_DONE`
- QA date: 2026-09-08

## Independent math cross-check

The deterministic graph compares `y = 2x + 1` with `y = 2x + 4`, a vertical translation upward by 3 units.

Three-point substitution check for the original line:
- `x=-1`: `y=2(-1)+1=-1`.
- `x=0`: `y=1`.
- `x=1`: `y=3`.

Three-point substitution check for the translated line:
- `x=-1`: `y=2(-1)+4=2`.
- `x=0`: `y=4`.
- `x=1`: `y=6`.

At each checked x-value, the translated output is exactly 3 greater. Both lines have slope 2, while their y-intercepts are 1 and 4, so the lines are parallel and the graph specification correctly represents a vertical shift of +3.

The lesson-specific DESMOS STRATEGY enters both equations, tells the learner to look for parallel lines separated vertically by 3, uses the visual to confirm that only the intercept changed, explains why adding 3 raises every output by 3, and correctly identifies Desmos as a fast way to see translations.

The existing teaching text, deterministic graph, and Desmos block were preserved unchanged.