# Linear Function Tables — Explanation Retrofit QA

- Route: `/algebra/linear-functions/linear-function-tables/explanation/`
- Classification: `BOTH`
- Graph required/present: Yes / Yes
- Desmos useful/present: Yes / Yes
- Verified: 2026-09-09

## Independent math cross-check

The native graph uses `y = 2x + 1` and the three table points `(-1,-1)`, `(1,3)`, `(3,7)`.

Linear substitution QA:
- `x=-1`: `2(-1)+1=-1`
- `x=1`: `2(1)+1=3`
- `x=3`: `2(3)+1=7`

Both table intervals have slope `4/2 = 2`, so the three points are collinear and the graph specification is mathematically consistent.

The lesson-specific DESMOS STRATEGY contains all mandatory fields: Enter, Look for, Use it to answer, Why it works, and Faster or not?. Its claimed model is independently verified by the substitutions above.

Quick-check audit:
- Q1 slope: `(8-2)/(2-0)=3`.
- Q2 slopes: `(3-7)/(3-1)=-2` and `(-3-3)/(6-3)=-2`; linear.
- Q3: slope `2`; using `(2,5)` gives `b=1`, so `y=2x+1`.
- Q4: slope from `(-1,6)` to `(2,0)` is `-2`; at `x=5`, `k=-6`.
- Q5: `(10-12)/(4-0)=-1/2` and `(7-10)/(10-4)=-1/2`.

No teaching text was rewritten during this QA pass.