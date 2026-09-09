# Variables on Both Sides — Explanation Retrofit Verification

- Route: `/algebra/linear-equations-in-one-variable/variables-both-sides/explanation/`
- Classification: `DESMOS_USEFUL` (`DESMOS` in registry)
- Graph required / added: No
- Desmos required / present: Yes
- Required Desmos fields verified: Enter; Look for; Use it to answer; Why it works; Faster or not?
- Source marker: `RETROFIT: DESMOS / RETROFIT_DONE / QA_VERIFIED_2026-09-09`

## Independent math cross-check

Primary Desmos example: `3x + 5 = x + 17`.

Subtracting `x` gives `2x + 5 = 17`; subtracting `5` gives `2x = 12`; therefore `x = 6`.
Substitution: left side `3(6)+5 = 23`; right side `6+17 = 23`.

Worked examples independently checked:
- `7x - 4 = 3x + 20` → `4x = 24` → `x = 6`; both sides equal `38`.
- `2(2x + 3) = 3x + 11` → `4x + 6 = 3x + 11` → `x = 5`; both sides equal `26`.
- `5 - 2x = 3x - 15` → `20 = 5x` → `x = 4`; both sides equal `-3`.
- Ride plans: `12 + 4x = 2 + 6x` → `10 = 2x` → `x = 5`; both totals are `$32`.
- Exam-strategy example `8x + 1 = 5x + 19` → `3x = 18` → `x = 6`; both sides equal `49`.

Special cases independently checked:
- `4x + 7 = 4x + 7` reduces to `7 = 7`, so all real numbers satisfy it.
- `3x + 2 = 3x - 5` reduces to `2 = -5`, so there is no solution.

Quick checks independently solved:
1. `5x + 2 = 3x + 14` → `x = 6`.
2. `8x - 9 = 5x + 12` → `x = 7`.
3. `2(x + 4) = x + 11` → `x = 3`.
4. `9 - 3x = x + 1` → `x = 2`.
5. `4x + 6 = 4x - 2` → contradiction `6 = -2`, so no solution.

All displayed solutions are mathematically consistent. A graph is not pedagogically required for this algebra-solving lesson; the lesson-specific Desmos block is appropriate as a verification strategy rather than the primary method.