# Graphing Linear Functions — Explanation Retrofit QA

- Route: `/algebra/linear-functions/graphing-linear-functions/explanation/`
- Classification: `BOTH`
- Graph required: yes
- Desmos useful: yes
- Registry graph: `y = 2x + 1`
- Verified linear points by substitution: `x=0 -> y=1`, `x=1 -> y=3`, `x=2 -> y=5`.
- Slope cross-check: `(5-3)/(2-1)=2` and `(3-1)/(1-0)=2`, matching the equation's slope.
- Intercept cross-check: at `x=0`, `y=1`, so the y-intercept is `(0,1)`; setting `y=0` gives `x=-1/2`, matching the registry x-intercept.
- Desmos QA: entering `y = 2x + 1` must show a line through `(0,1)`, `(1,3)`, and `(2,5)`, rising 2 units for every 1 unit right.
- Required Desmos fields are supplied by the registry entry: Enter / Look for / Use it to answer / Why it works / Faster or not?.
- Teaching prose is preserved; the shared retrofit build injects the deterministic graph and lesson-specific Desmos block from `explanation-retrofit-registry.js`.
- QA date: 2026-09-10
