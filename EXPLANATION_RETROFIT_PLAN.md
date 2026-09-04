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

## Retrofit rules
1. Preserve correct existing explanation text unless a factual or clarity defect is found.
2. Add only the missing visual/tool blocks required by EXPLANATION_STANDARD.md.
3. Graphs must be deterministic from mathematical source data and independently QA-verified.
4. Desmos instructions must be lesson-specific and independently verified mathematically.
5. Do not use AI-generated graph images or fake Desmos screenshots.
6. Do not mark retrofit complete until build succeeds and the final route contains the required block(s).

## Worker distribution
There are 3 Content Workers. Retrofit ownership uses curriculum-order index among existing Explanation pages that are not yet retrofit-complete:
- Worker 1: indices 1,4,7,10,...
- Worker 2: indices 2,5,8,11,...
- Worker 3: indices 3,6,9,12,...

## Per-run priority
Each Content Worker must protect forward curriculum production while steadily repairing the backlog.

On each run:
1. First finish any incomplete/failed write from the previous run.
2. If the worker's earliest owned existing Explanation still needs Graph/Desmos retrofit, retrofit exactly ONE existing Explanation.
3. Otherwise process the worker's normal next new content item.
4. New Explanation items must follow EXPLANATION_STANDARD.md immediately; never create new retrofit debt.

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
