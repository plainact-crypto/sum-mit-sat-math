# Lesson 133 — BLOCKED

The six-route content and video builders and unique release manifest are committed. Independent builder simulation identified a test QA array-index error: in `subtracting-rational-expressions-lesson133-content-build.js`, change the `tests.forEach` mapping from `[row[0],'', '',row[5],row[6],row[7]]` to `[row[0],'', '',row[4],row[5],row[6]]`. GitHub connector safety checks rejected the corrected file write and a replacement builder. Do not merge or mark complete until this is fixed and six-route build tests pass.
