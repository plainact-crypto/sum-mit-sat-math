# Y-Intercept as Initial Value — Retrofit Verification

- Route: `/algebra/linear-functions/y-intercept-as-initial-value/explanation/`
- Classification: `BOTH`
- Graph added/present: yes — native deterministic graph generated from `y = 3x + 7`.
- Desmos added/present: yes — lesson-specific `DESMOS STRATEGY` with Enter / Look for / Use it to answer / Why it works / Faster or not?.
- Linear graph QA: `x=0 -> y=7`, `x=1 -> y=10`, `x=2 -> y=13`; all three points satisfy `y = 3x + 7` by direct substitution.
- Y-intercept cross-check: at `x=0`, `y=3(0)+7=7`, so the y-intercept is exactly `(0,7)` and the initial value is `7`.
- Slope cross-check: from `(0,7)` to `(2,13)`, `(13-7)/(2-0)=6/2=3`, matching the equation and graph specification.
- Desmos claim cross-check: entering `y = 3x + 7` gives the same line and y-axis crossing `(0,7)`; reading `b` directly is faster when slope-intercept form is already given, while graphing is useful for visual/context verification.
- Context cross-checks preserved from the lesson: `C=12+6h` gives `C(0)=12`; `V=48-3t` gives `V(0)=48`.
- Registry/build contract QA: CURRENT `main` source contains the deterministic graph block and complete lesson-specific Desmos strategy required by the shared retrofit build/gate.
- Existing teaching text preserved; no video/audio/player files touched.
- QA date: 2026-09-07.
