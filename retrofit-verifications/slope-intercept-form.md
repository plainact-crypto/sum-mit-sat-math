# Slope-Intercept Form — Retrofit Verification

- Route: `/algebra/linear-equations-in-two-variables/slope-intercept-form/explanation/`
- Classification: `BOTH`
- Graph added/present: yes — native deterministic graph generated from `y = 3x - 4`.
- Desmos added/present: yes — lesson-specific `DESMOS STRATEGY` with Enter / Look for / Use it to answer / Why it works / Faster or not?.
- Linear graph QA: `x=0 -> y=-4`, `x=1 -> y=-1`, `x=2 -> y=2`; all three points satisfy `y = 3x - 4` by direct substitution.
- Y-intercept cross-check: at `x=0`, `y=3(0)-4=-4`, so the y-intercept is exactly `(0,-4)`.
- Slope cross-check: from `(0,-4)` to `(1,-1)`, `(-1-(-4))/(1-0)=3`, matching `m=3`; from `(1,-1)` to `(2,2)`, `(2-(-1))/(2-1)=3` again.
- Desmos claim cross-check: entering `y = 3x - 4` gives the same line, y-axis crossing `(0,-4)`, and constant rise 3 per run 1. Reading `m` and `b` directly is faster when slope-intercept form is already given; graphing is useful for visual verification.
- Existing worked-example checks preserved: `y=3x+5` has `m=3,b=5`; `y=-2x+7` has `m=-2,b=7`; `y=(3/4)x-6` has `m=3/4,b=-6`; `y=5x` has `b=0`; `y=11` has `m=0`.
- Registry/build contract QA: CURRENT `main` source contains the deterministic graph block and complete lesson-specific Desmos strategy required by the shared retrofit build/gate.
- Existing teaching text preserved; no video/audio/player files touched.
- QA date: 2026-09-07.
