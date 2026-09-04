# SUMMIT MATH — Explanation Retrofit Status

Source of truth for the Graph + Desmos retrofit.

Inventory baseline: CURRENT main at the start of Steps 1–3 (latest observed content commit before tracker creation: `5ebf94dd4f1b20483cebfaf9de246969cb50aecf`).

Classification meanings:
- `BOTH` — lesson should include a mathematically generated graph and a lesson-specific DESMOS STRATEGY block.
- `GRAPH` — lesson should include a graph/visual, but Desmos does not materially improve the lesson.
- `DESMOS` — Desmos is useful for solving/verification, but a graph is not necessary to teach the concept.
- `NEITHER` — neither adds meaningful instructional value.

Final PASS is intentionally not assigned in Steps 1–3. Final PASS requires the per-lesson QA in Step 14.

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
| 12 | graphing-linear-functions | graphing-linear-functions-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
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
| 23 | positive-slope | positive-slope-explanation.html | Algebra · Linear Functions | BOTH | Yes | Yes | No | No | Classified · retrofit pending |
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

## Step 1 result — Inventory

- Existing standalone `*-explanation.html` source files found: **35**.
- In addition, `generate.js` contains the generated One-Step Linear Equations Explanation template; it is not a standalone `*-explanation.html` source file and must be handled through its generator source when the retrofit reaches that lesson.
- No standalone Explanation source file from the current tree is intentionally omitted from the 35-row tracker above.

## Step 2 result — Canonical tracker

This file is the canonical repository tracker for the retrofit. Future retrofit commits should update the relevant row rather than creating a second competing status list.

The production route for each lesson is generated from the curriculum leaf `base` plus `/explanation/`; final route verification remains mandatory in Step 14.

## Step 3 result — Classification summary

- `BOTH`: **30**
- `GRAPH`: **0**
- `DESMOS`: **5**
- `NEITHER`: **0**
- Total classified standalone Explanation sources: **35 / 35**

Why there are no `NEITHER` lessons in the current standalone inventory: the existing files are almost entirely linear equations/functions. Even the equation-solving lessons without a graph benefit from Desmos as a verification/alternative-method skill. Desmos must still be presented as optional when manual algebra is faster.

The separate generated One-Step Linear Equations Explanation should be treated as `DESMOS` when its generator template is retrofitted: manual algebra is usually faster, while Desmos is useful as a verification tool.