# Building an Equation from Two Points — retrofit verification

- Worker: Content Worker 2
- Classification: BOTH
- Graph added/present: Yes — deterministic native graph from `y = 2x + 1`
- Desmos added/present: Yes — lesson-specific DESMOS STRATEGY with Enter / Look for / Use it to answer / Why it works / Faster or not?
- Source route: `/algebra/linear-functions/building-equation-two-points/explanation/`

## Independent math cross-check

Using the lesson's graph points `(2,5)` and `(6,13)`:

`m = (13 - 5) / (6 - 2) = 8/4 = 2`.

Substituting `(2,5)` into `y = 2x + b` gives `5 = 4 + b`, so `b = 1`; therefore the line is `y = 2x + 1`.

Linear graph QA at three x-values:
- `x=0` → `y=1`
- `x=2` → `y=5`
- `x=6` → `y=13`

Both original points satisfy the equation exactly. The Desmos claim is independently verified: plotting `y=2x+1`, `(2,5)`, and `(6,13)` must place both points on the line because substitution gives exact equality.

Additional teaching-text spot checks are correct: `(1,4),(3,10)` gives `y=3x+1`; `(-1,7),(3,-1)` gives `y=-2x+5`; `(2,1),(8,4)` gives `y=x/2`; `(4,-2),(7,4)` gives `y=2x-10`.

Publish gate expectation: build must contain the BOTH classification marker, deterministic graph, and complete Desmos block.