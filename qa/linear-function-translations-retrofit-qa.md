# Linear Function Translations — Explanation Retrofit QA

- Route: `/algebra/linear-functions/linear-function-translations/explanation/`
- Classification: `BOTH`
- Graph required: yes
- Desmos useful: yes
- Registry graph: `y = 2x + 1` and `y = 2x + 4`
- Verified substitution points for both lines: at `x=-1,0,1`, original outputs are `-1,1,3` and translated outputs are `2,4,6`.
- Cross-check: both slopes are `2`; the y-intercepts are `1` and `4`; every translated output is exactly `3` greater than the corresponding original output, so the second line is the first shifted vertically up 3 units.
- Desmos QA: entering `y=2x+1` and `y=2x+4` must show parallel lines separated by a vertical shift of 3. This is mathematically verified by equal slopes and intercept difference `4-1=3`.
- Required Desmos fields are supplied by the registry entry: Enter / Look for / Use it to answer / Why it works / Faster or not?.
- Teaching prose is intentionally preserved; shared retrofit build injects the deterministic graph and lesson-specific Desmos block from `explanation-retrofit-registry.js`.
- QA date: 2026-09-10
