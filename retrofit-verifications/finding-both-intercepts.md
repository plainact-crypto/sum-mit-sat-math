# Finding Both Intercepts — Retrofit Verification

- Route: `/algebra/linear-equations-in-two-variables/finding-both-intercepts/explanation/`
- Classification: `BOTH`
- Graph added/present: yes — native deterministic graph from `3x + 2y = 12`, equivalently `y = -1.5x + 6`.
- Desmos added/present: yes — lesson-specific `DESMOS STRATEGY` with Enter / Look for / Use it to answer / Why it works / Faster or not?.
- Linear graph QA: `x=0 -> y=6`, `x=2 -> y=3`, `x=4 -> y=0`; all three points satisfy `3x + 2y = 12` by substitution.
- X-intercept cross-check: setting `y=0` gives `3x=12`, so `x=4` and the x-intercept is `(4,0)`.
- Y-intercept cross-check: setting `x=0` gives `2y=12`, so `y=6` and the y-intercept is `(0,6)`.
- Slope cross-check: from `(0,6)` to `(4,0)`, `(0-6)/(4-0)=-6/4=-3/2=-1.5`, matching the graph specification.
- Desmos claim cross-check: entering `3x + 2y = 12` produces the same line and axis crossings; zero-substitution is usually faster for exact intercepts, while Desmos is useful for visual verification.
- Registry/build contract QA: CURRENT `main` contains the `finding-both-intercepts` `BOTH` registry entry with deterministic graph data, verified intercept labels, and the complete lesson-specific Desmos strategy consumed by the shared retrofit build/gate.
- Existing teaching text preserved; no video/audio/player files touched.
- QA date: 2026-09-07.
