# Linear Function Tables — Retrofit QA

- Slug: `linear-function-tables`
- Classification: `BOTH`
- Graph required: yes
- Desmos useful: yes
- QA date: 2026-09-10
- Route: `/algebra/linear-functions/linear-function-tables/explanation/`

## Graph math cross-check

The lesson's deterministic graph uses `y = 2x + 1` with table points `(-1,-1)`, `(1,3)`, and `(3,7)`.

Required linear substitutions:
- `x = -1` gives `y = 2(-1)+1 = -1` → `(-1,-1)` is on the line.
- `x = 1` gives `y = 2(1)+1 = 3` → `(1,3)` is on the line.
- `x = 3` gives `y = 2(3)+1 = 7` → `(3,7)` is on the line.

Rate checks:
- From `(-1,-1)` to `(1,3)`: `(3-(-1))/(1-(-1)) = 4/2 = 2`.
- From `(1,3)` to `(3,7)`: `(7-3)/(3-1) = 4/2 = 2`.

Thus the three table points are collinear with constant rate of change `2`, and using `(1,3)` gives `3 = 2(1)+b`, so `b = 1`.

## Desmos Strategy QA

The CURRENT explanation contains the required lesson-specific fields: Enter, Look for, Use it to answer, Why it works, and Faster or not?. It instructs the learner to enter the three points in a Desmos table and then enter `y = 2x + 1`. The expected result—that all three points lie on that line—is independently verified above.

## Existing lesson quick-check QA

1. `(0,2),(2,8),(4,14)`: slope `6/2 = 3`.
2. `(1,7),(3,3),(6,-3)`: slopes `-4/2 = -2` and `-6/3 = -2`, so linear.
3. `(2,5),(6,13)`: slope `8/4 = 2`; `5=2(2)+b` gives `b=1`, so `y=2x+1`.
4. `(-1,6),(2,0),(5,k)`: slope `(0-6)/(2-(-1))=-6/3=-2`; another run of 3 changes y by -6, so `k=-6`.
5. `(0,12),(4,10),(10,7)`: `(10-12)/(4-0)=-2/4=-1/2`; `(7-10)/(10-4)=-3/6=-1/2`.

All five displayed quick-check answers are correct.

## Completion gate

The persistent source already contains the deterministic native graph and the complete DESMOS STRATEGY block. This QA record restores the missing Worker 1 completion record on CURRENT main without rewriting correct teaching text. Production build/Pages success remains the final publish gate for this commit.
