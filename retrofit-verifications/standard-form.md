# Standard Form — Retrofit Verification

- Route: `/algebra/linear-equations-in-two-variables/standard-form/explanation/`
- Classification: `BOTH`
- Graph added/present: yes — native deterministic graph generated from `3x + 2y = 12`, equivalently `y = -1.5x + 6`.
- Desmos added/present: yes — lesson-specific `DESMOS STRATEGY` with Enter / Look for / Use it to answer / Why it works / Faster or not?.
- Linear graph QA: `x=0 -> y=6`, `x=2 -> y=3`, `x=4 -> y=0`; direct substitution gives `3(0)+2(6)=12`, `3(2)+2(3)=12`, and `3(4)+2(0)=12`.
- Intercept cross-check: setting `y=0` gives `3x=12`, so x-intercept `(4,0)`; setting `x=0` gives `2y=12`, so y-intercept `(0,6)`.
- Slope cross-check: from `(0,6)` to `(2,3)`, `(3-6)/(2-0)=-3/2=-1.5`, matching the rearranged equation `y=-1.5x+6`.
- Desmos claim cross-check: entering `3x + 2y = 12` produces the same line and the exact axis crossings `(4,0)` and `(0,6)`. Manual zero-substitution is faster for finding simple intercepts; Desmos is useful for visual verification.
- Registry/build contract QA: CURRENT `main` registry contains the deterministic graph specification, verified intercepts, three QA x-values, and complete lesson-specific Desmos strategy required by the shared retrofit build/gate.
- Existing teaching text preserved; no video/audio/player files touched.
- QA date: 2026-09-07.
