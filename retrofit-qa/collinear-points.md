# Collinear Points — Retrofit QA

- Date: 2026-09-10
- Classification: BOTH
- Graph added/present: Yes — deterministic native graph from `y = 2x + 1` through A(1,3), B(3,7), C(5,11).
- Desmos added/present: Yes — lesson-specific `DESMOS STRATEGY` with Enter / Look for / Use it to answer / Why it works / Faster or not?.
- Math cross-check: `2(1)+1=3`, `2(3)+1=7`, `2(5)+1=11`; `m_AB=(7-3)/(3-1)=2`, `m_BC=(11-7)/(5-3)=2`, and `m_AC=(11-3)/(5-1)=2`.
- Worked-example checks: noncollinear example slopes 2 and 1; fractional example slopes both `-2/3`; vertical example has common `x=4`; equation example points all satisfy `y=3x+1`; missing-coordinate example gives `k=10` and verifies slope 2.
- Quick-check verification: 1 collinear; 2 not collinear (`2` vs `5/3`); 3 collinear vertical; 4 collinear with slope 2; 5 gives `k=4` from slope 3.
- Source route verified to contain `RETROFIT: BOTH / RETROFIT_DONE`, the native graph block, and the complete Desmos Strategy block before this QA commit.