# Perpendicular Lines — Explanation Retrofit QA

- Date: 2026-09-11
- Worker: Content Worker 3
- Classification: BOTH
- Graph added/present: Yes — deterministic native graph from `y = 2x + 1` and `y = -0.5x + 1`.
- Desmos added/present: Yes — lesson-specific DESMOS STRATEGY contains Enter, Look for, Use it to answer, Why it works, and Faster or not?.
- Route: `/algebra/linear-functions/perpendicular-lines/explanation/`

## Independent math cross-check

The graph uses slopes `2` and `-1/2`; their product is `-1`, so the nonvertical lines are perpendicular. Both equations have y-intercept `1`, so they intersect at `(0,1)`.

Three-point substitution for `y = 2x + 1`:
- `x=-1 -> y=-1`
- `x=0 -> y=1`
- `x=1 -> y=3`

Three-point substitution for `y = -0.5x + 1`:
- `x=-1 -> y=1.5`
- `x=0 -> y=1`
- `x=1 -> y=0.5`

Intersection cross-check: `2x+1=-0.5x+1 -> 2.5x=0 -> x=0`, then `y=1`.

Worked-example checks:
- Slopes `3` and `-1/3` multiply to `-1`.
- `2x+3y=6 -> y=(-2/3)x+2`; `3x-2y=8 -> y=(3/2)x-4`; product `-1`.
- Perpendicular to slope `2` through `(4,3)` gives `y=(-1/2)x+5`; substitution gives `3=-2+5`.
- Perpendicular to slope `-3/5` through `(5,1)` gives slope `5/3` and intercept `-22/3`; substitution gives `25/3-22/3=1`.
- Perpendicular to vertical `x=6` through `(-2,9)` is horizontal `y=9`.
- `4x+2y=10 -> y=-2x+5`; perpendicular slope `1/2` through `(-3,2)` gives `y=(1/2)x+7/2`.

Quick-check answers independently verified: perpendicular; perpendicular; `y=(-1/5)x+4`; `y=3x-5`; `x=-4`.

## Build/publish evidence

CURRENT main before this QA was `996e7c5db1a10eb2a0cf76973a24e14dd0f218cb`. Its GitHub Pages workflow completed successfully. The source route already contains the deterministic graph marker and complete DESMOS STRATEGY, so this audit closes the lesson's final retrofit QA without rewriting correct teaching text.
