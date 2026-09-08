# Explanation Retrofit QA — Rate of Change

- Slug: `rate-of-change`
- Route: `/algebra/linear-functions/rate-of-change/explanation/`
- Classification: `BOTH`
- Graph required: yes
- Graph present: yes
- Desmos useful: yes
- Desmos Strategy present: yes
- Source marker: `RETROFIT_DONE`
- QA date: 2026-09-08

## Independent math cross-check

The deterministic graph uses `y = 3x + 2`.

Three-point substitution check:
- `x=0`: `y=3(0)+2=2`, so `(0,2)` is on the line.
- `x=1`: `y=3(1)+2=5`, so `(1,5)` is on the line.
- `x=2`: `y=3(2)+2=8`, so `(2,8)` is on the line.

The rate from `(0,2)` to `(2,8)` is `(8-2)/(2-0)=6/2=3`, matching both the coefficient of `x` and the lesson's stated constant rate of change. The y-intercept is correctly `2`.

The lesson-specific DESMOS STRATEGY enters `y = 3x + 2`, tells the learner to look for a rise of 3 for each run of 1 and the verified points `(0,2)`, `(1,5)`, `(2,8)`, uses the graph to confirm rate `3`, explains why slope equals constant rate for a linear function, and correctly says hand calculation is faster for clean points while Desmos is useful for verification.

Additional teaching examples were independently checked: `(17-5)/(6-2)=3`; `(0-8)/(3-(-1))=-2`; table differences give `9/3=3`; `y=-4x+11` has rate `-4`; `(12-9)/(8-2)=1/2`; and the tank context gives `(66-90)/(8-2)=-4` liters per minute.

The existing teaching text, deterministic graph, and Desmos block were preserved unchanged.