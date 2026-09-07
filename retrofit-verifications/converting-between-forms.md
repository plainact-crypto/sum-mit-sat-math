# Converting Between Forms — Retrofit Verification

- Route: `/algebra/linear-equations-in-two-variables/converting-between-forms/explanation/`
- Classification: `BOTH`
- Graph added/present: yes — native deterministic graph for `2x + y = 7`, equivalently `y = -2x + 7`.
- Desmos added/present: yes — lesson-specific `DESMOS STRATEGY` with Enter / Look for / Use it to answer / Why it works / Faster or not?.
- Linear graph QA: `x=0 -> y=7`, `x=1 -> y=5`, `x=2 -> y=3`; substitution into both `y=-2x+7` and `2x+y=7` verifies all three points.
- Slope/intercept cross-check: slope is `-2`, y-intercept is `(0,7)`, and x-intercept is `(7/2,0)`.
- Equivalence cross-check: rearranging `2x+y=7` by subtracting `2x` from both sides gives exactly `y=-2x+7`, so both forms have the same solution set and graph.
- Desmos claim cross-check: entering both equations must produce coincident lines because the equations are algebraically equivalent; manual algebra is faster for conversion, while Desmos is useful as a visual equivalence check.
- Existing worked examples QA: `3x+2y=14 -> y=-(3/2)x+7`; `y=4x-9 -> 4x-y=9`; `y-5=2(x-3) -> y=2x-1`; `2x+y=8` through `(2,4)` gives `y-4=-2(x-2)`; `6x+3y=24` has slope `-2`.
- Quick-check QA: all five revealed answers independently verified by algebra/substitution.
- Registry/build contract QA: CURRENT `main` source contains the `BOTH / RETROFIT_DONE` marker, deterministic graph specification, three verified graph points, and the complete lesson-specific Desmos strategy required by the shared retrofit build/gate.
- Existing teaching text preserved; no video/audio/player files touched.
- QA date: 2026-09-07.
