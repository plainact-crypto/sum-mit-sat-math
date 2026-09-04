# SUMMIT Explanation Retrofit Plan — Existing Content

Goal: bring every previously published Explanation up to the current Graph + Desmos standard without rewriting correct teaching content unnecessarily.

## Scope
Audit every existing Explanation in curriculum order.

For each Explanation, assign one status:
- PASS_NEITHER
- NEEDS_GRAPH
- NEEDS_DESMOS
- NEEDS_BOTH
- RETROFIT_DONE

## Locked retrofit batch order
The old-content retrofit must be executed in this order. Do not pick lessons randomly.

### Batch A — Slope / Graphing
- graphing-linear-functions
- slope-from-a-graph
- positive-slope
- negative-slope
- zero-slope
- undefined-slope
- slope-from-two-points
- slope-from-a-table
- slope-from-slope-intercept-form
- slope-from-standard-form

### Batch B — Intercepts
- finding-x-intercept
- finding-y-intercept
- finding-both-intercepts
- y-intercept-as-initial-value

### Batch C — Equation Forms / Building Equations
- slope-intercept-form
- standard-form
- point-slope-form
- converting-between-forms
- building-equation-slope-one-point
- building-equation-slope-y-intercept
- building-equation-two-points

### Batch D — Linear Functions / Tables / Rate
- linear-function-tables
- function-notation-linear-functions
- rate-of-change
- linear-function-translations
- linear-word-problems
- linear-function-word-problems

### Batch E — Line Relationships
- parallel-lines
- perpendicular-lines
- collinear-points

### Batch F — Algebra Solving
- multi-step
- variables-both-sides
- literal-equations
- generated Solving One-Step Linear Equations template in generate.js

### Batch G — Lower Graph Value
- fractions
- decimals

If a newly discovered old Explanation is absent from these named lists, classify it and place it into the closest pedagogical batch before retrofit.

## Retrofit rules
1. Preserve correct existing explanation text unless a factual or clarity defect is found.
2. Add only the missing visual/tool blocks required by EXPLANATION_STANDARD.md.
3. Graphs must be deterministic from mathematical source data and independently QA-verified.
4. Desmos instructions must be lesson-specific and independently verified mathematically.
5. Do not use AI-generated graph images or fake Desmos screenshots.
6. Do not mark retrofit complete until build succeeds and the final route contains the required block(s).
7. Use the shared `explanation-tools.js` graph engine and Desmos Strategy structure. Do not invent a second graph implementation.
8. Every graph spec must pass `explanation-tools-qa.js`; every Desmos block must include Enter, Look for, Use it to answer, Why it works, and Faster or not?.

## Worker distribution
There are 3 Content Workers. Retrofit ownership uses curriculum-order index among existing Explanation pages that are not yet retrofit-complete:
- Worker 1: indices 1,4,7,10,...
- Worker 2: indices 2,5,8,11,...
- Worker 3: indices 3,6,9,12,...

The locked batch order is higher priority than arbitrary file order. Within the current batch, worker ownership may split the remaining items using the 1/4/7, 2/5/8, 3/6/9 pattern.

## Per-run priority
Each Content Worker must protect forward curriculum production while steadily repairing the backlog.

On each run:
1. First finish any incomplete/failed write from the previous run.
2. Work only inside the earliest incomplete retrofit batch.
3. If the worker's earliest owned Explanation in that batch still needs Graph/Desmos retrofit, retrofit exactly ONE existing Explanation.
4. Otherwise process the worker's normal next new content item.
5. New Explanation items must follow EXPLANATION_STANDARD.md immediately; never create new retrofit debt.

If forward production becomes materially stalled because all workers are retrofitting, alternate retrofit and new-content runs for that worker. Correctness takes priority over speed.

## QA for old content
For every retrofit item record in the commit/result:
- lesson name + route
- classification
- graph added? yes/no
- Desmos block added? yes/no
- math cross-check performed
- build result

## Completion condition
Retrofit is complete only when every existing Explanation has a recorded classification and every NEEDS_GRAPH / NEEDS_DESMOS / NEEDS_BOTH item is upgraded and build-verified.
