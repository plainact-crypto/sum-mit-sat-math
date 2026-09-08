# Explanation Retrofit QA — Building an Equation from Slope and Y-Intercept

- Slug: `building-equation-slope-y-intercept`
- Route: `/algebra/linear-functions/building-equation-slope-y-intercept/explanation/`
- Classification: `BOTH`
- Graph required: yes
- Graph present: yes
- Desmos useful: yes
- Desmos Strategy present: yes
- Source marker: `RETROFIT_DONE`
- QA date: 2026-09-08

## Independent math cross-check

The deterministic native graph uses `y = 3x - 4`.

Three-point substitution check:
- `(0,-4)`: `-4 = 3(0)-4`.
- `(1,-1)`: `-1 = 3(1)-4`.
- `(2,2)`: `2 = 3(2)-4`.

The y-intercept is `(0,-4)`. Setting `y=0` gives `3x-4=0`, so the x-intercept is `x=4/3`, matching the graph specification. From `(0,-4)` to `(1,-1)`, slope is `(-1-(-4))/(1-0)=3`, matching the stated slope.

The lesson-specific DESMOS STRATEGY enters `y = 3x - 4`, tells the learner to look for the y-axis crossing at `(0,-4)` and a rise of 3 for each run of 1, explains how that verifies `m=3` and `b=-4`, and correctly states that direct substitution into `y=mx+b` is faster when slope and intercept are already given.

The existing teaching text, deterministic graph, and Desmos block were preserved unchanged.