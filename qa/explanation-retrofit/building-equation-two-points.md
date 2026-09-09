# Building an Equation from Two Points — Retrofit QA

- Slug: `building-equation-two-points`
- Classification: `BOTH`
- Graph required: yes
- Desmos useful: yes
- QA date: 2026-09-10
- Route: `/algebra/linear-functions/building-equation-two-points/explanation/`

## Graph math cross-check

Registry equation: `y = 2x + 1` from the given points `(2,5)` and `(6,13)`.

Slope: `(13 - 5) / (6 - 2) = 8 / 4 = 2`.

Using `(2,5)`: `5 = 2(2) + b`, so `b = 1`.

Required linear substitutions:
- `x = 0` gives `y = 1` → `(0,1)` is on the line.
- `x = 2` gives `y = 5` → `(2,5)` is on the line.
- `x = 6` gives `y = 13` → `(6,13)` is on the line.

Intercept checks:
- y-intercept: `x=0` gives `y=1`.
- x-intercept: `0=2x+1` gives `x=-1/2`.

## Desmos Strategy QA

The registry contains all mandatory lesson-specific fields: Enter, Look for, Use it to answer, Why it works, and Faster or not?. Entering `y = 2x + 1` must place both original points on the same line. This result is independently verified above rather than inferred from Desmos.

## Completion gate

The CURRENT registry contains a deterministic native graph specification with `qaX: [0,2,6]`, the verified intercepts, and both labeled original points. It also contains the lesson-specific Desmos Strategy block. Production build is the final gate for the committed state.