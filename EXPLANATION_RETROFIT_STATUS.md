# SUMMIT MATH — Explanation Retrofit Status

Source of truth for the Graph + Desmos retrofit.

Inventory baseline: CURRENT main at the start of Steps 1–3 (latest observed content commit before tracker creation: `5ebf94dd4f1b20483cebfaf9de246969cb50aecf`).

Classification meanings:
- `BOTH` — lesson should include a mathematically generated graph and a lesson-specific DESMOS STRATEGY block.
- `GRAPH` — lesson should include a graph/visual, but Desmos does not materially improve the lesson.
- `DESMOS` — Desmos is useful for solving/verification, but a graph is not necessary to teach the concept.
- `NEITHER` — neither adds meaningful instructional value.

Final PASS is intentionally not assigned in Steps 1–8. Final PASS requires the per-lesson QA in Step 14.

| # | Lesson / slug | Source file | Curriculum area | Classification | Graph required | Desmos useful | Graph currently present | Desmos currently present | Retrofit / QA state |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | building-equation-slope-one-point | building-equation-slope-one-point-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 2 | building-equation-slope-y-intercept | building-equation-slope-y-intercept-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 3 | building-equation-two-points | building-equation-two-points-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 4 | collinear-points | collinear-points-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 5 | converting-between-forms | converting-between-forms-explanation.html | Algebra · Linear Equations in Two Variables | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 6 | decimals | decimals-explanation.html | Algebra · Linear Equations in One Variable | DESMOS | No | Yes | No | No | Classified · retrofit pending |
| 7 | finding-both-intercepts | finding-both-intercepts-explanation.html | Algebra · Linear Equations in Two Variables | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 8 | finding-x-intercept | finding-x-intercept-explanation.html | Algebra · Linear Equations in Two Variables | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 9 | finding-y-intercept | finding-y-intercept-explanation.html | Algebra · Linear Equations in Two Variables | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 10 | fractions | fractions-explanation.html | Algebra · Linear Equations in One Variable | DESMOS | No | Yes | No | Yes | Retrofit applied in `5ebf94d`; final QA pending |
| 11 | function-notation-linear-functions | function-notation-linear-functions-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 12 | graphing-linear-functions | graphing-linear-functions-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | Yes | Yes | RETROFIT_DONE · independently QA-verified 2026-09-06 |
| 13 | linear-function-tables | linear-function-tables-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 14 | linear-function-translations | linear-function-translations-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 15 | linear-function-word-problems | linear-function-word-problems-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 16 | linear-word-problems | linear-word-problems-explanation.html | Algebra · Linear Equations / Applications | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 17 | literal-equations | literal-equations-explanation.html | Algebra · Linear Equations in One Variable | DESMOS | No | Yes | No | No | Classified · retrofit pending |
| 18 | multi-step | multi-step-explanation.html | Algebra · Linear Equations in One Variable | DESMOS | No | Yes | No | No | Classified · retrofit pending |
| 19 | negative-slope | negative-slope-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 20 | parallel-lines | parallel-lines-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 21 | perpendicular-lines | perpendicular-lines-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 22 | point-slope-form | point-slope-form-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 23 | positive-slope | positive-slope-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | Yes | Yes | RETROFIT_DONE · independently QA-verified 2026-09-06 |
| 24 | rate-of-change | rate-of-change-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 25 | slope-from-a-graph | slope-from-a-graph-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 26 | slope-from-a-table | slope-from-a-table-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 27 | slope-from-slope-intercept-form | slope-from-slope-intercept-form-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 28 | slope-from-standard-form | slope-from-standard-form-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 29 | slope-from-two-points | slope-from-two-points-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 30 | slope-intercept-form | slope-intercept-form-explanation.html | Algebra · Linear Equations / Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 31 | standard-form | standard-form-explanation.html | Algebra · Linear Equations in Two Variables | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 32 | undefined-slope | undefined-slope-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 33 | variables-both-sides | variables-both-sides-explanation.html | Algebra · Linear Equations in One Variable | DESMOS | No | Yes | No | No | Classified · retrofit pending |
| 34 | y-intercept-as-initial-value | y-intercept-as-initial-value-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 35 | zero-slope | zero-slope-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
| 36 | solving-one-step-linear-equations | generate.js → `oneStepExplanation()` | Algebra · Linear Equations in One Variable | DESMOS | No | Yes | No | No | Classified · generator-source retrofit pending |

## Steps 1–3 — Inventory and classification
- Standalone `*-explanation.html` sources: **35**.
- Additional generated Explanation source in `generate.js`: **1**.
- Total tracked existing Explanation teaching sources: **36**.
- Classification: `BOTH` 30, `DESMOS` 6, `GRAPH` 0, `NEITHER` 0.

## Step 4 — Locked retrofit execution order
`EXPLANATION_RETROFIT_PLAN.md` now contains the fixed Batch A→G order: Slope/Graphing, Intercepts, Equation Forms/Building Equations, Linear Functions/Tables/Rate, Line Relationships, Algebra Solving, then lower-graph-value Fractions/Decimals. Workers must stay inside the earliest incomplete batch.

## Step 5 — Shared native Graph Engine
Created `explanation-tools.js` + `explanation-tools.css` and integrated them through `explanation-tools-build.js`.

The graph engine:
- renders deterministic responsive SVG from numeric math specs rather than images;
- supports linear functions `y=mx+b`, horizontal lines, vertical lines, multiple lines, labeled points and intersections;
- supports explicit graph bounds and accessible labels;
- is light/dark compatible through inherited design tokens/currentColor;
- is designed for later extension to quadratics/exponentials/rational functions;
- is injected into every built Explanation route by the production build.

## Step 6 — Graph math QA
Created `explanation-tools-qa.js` and added it to `npm run build`.

Graph QA includes:
- at least three substitution points for every linear spec;
- y-intercept verification;
- x-intercept verification when declared;
- horizontal line self-test;
- vertical line validation;
- independent two-line intersection solving;
- labeled-point-on-line validation;
- malformed graph spec / invalid JSON rejection.

Any Explanation that contains a `data-summit-graph` spec with inconsistent math causes the build QA step to fail.

## Step 7 — Shared Desmos Strategy component
`explanation-tools.js` exposes one reusable `desmosStrategyHTML()` component with the mandatory structure:
- Enter
- Look for
- Use it to answer
- Why it works
- Faster or not?
- optional Math cross-check

The component refuses to render when a required field is missing. Existing hand-authored retrofit blocks are still accepted if they use the same mandatory labels.

## Step 8 — Desmos QA
`explanation-tools-qa.js` scans old Explanation sources containing a Desmos marker/heading and rejects a block missing any mandatory field. Mathematical claims must still be independently cross-checked per lesson during Step 9/14; the shared QA establishes the structural gate and the graph engine supplies deterministic math verification where graph results are involved.

## Build integration
`package.json` now runs:
1. `explanation-tools-build.js`
2. `explanation-tools-qa.js`
3. existing brand guard/audit

This means Graph/Desmos infrastructure is part of the normal production build, not a dist-only patch.
