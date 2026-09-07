# Point-Slope Form — Retrofit Verification

- Route: `/algebra/linear-equations-in-two-variables/point-slope-form/explanation/`
- Classification: `BOTH`
- Graph added/present: yes — native deterministic graph generated from `y - 5 = 3(x - 2)`, equivalently `y = 3x - 1`.
- Desmos added/present: yes — lesson-specific `DESMOS STRATEGY` with Enter / Look for / Use it to answer / Why it works / Faster or not?.
- Linear graph QA: `x=0 -> y=-1`, `x=1 -> y=2`, `x=2 -> y=5`; direct substitution into `y=3x-1` verifies all three points.
- Given-point cross-check: substituting `(2,5)` into `y - 5 = 3(x - 2)` gives `0=0`.
- Slope cross-check: from `(1,2)` to `(2,5)`, `(5-2)/(2-1)=3`, matching the stated slope.
- Intercept cross-check: `x=0` gives y-intercept `(0,-1)`; `y=0` gives `x=1/3`.
- Desmos claim cross-check: entering `y - 5 = 3(x - 2)` is algebraically identical to `y=3x-1`, so it must render the same line through `(2,5)` with slope `3` and y-intercept `-1`. Writing point-slope form by hand is faster when slope and one point are given; Desmos is useful for visual verification.
- Registry/build contract QA: CURRENT `main` source contains the `BOTH / RETROFIT_DONE` marker, deterministic graph specification, three QA x-values, verified intercept data, and the complete lesson-specific Desmos strategy required by the shared retrofit build/gate.
- Existing teaching text preserved; no video/audio/player files touched.
- QA date: 2026-09-07.
