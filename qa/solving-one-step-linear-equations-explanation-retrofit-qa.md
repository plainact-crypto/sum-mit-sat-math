# Solving One-Step Linear Equations — Explanation Retrofit QA

- Classification: DESMOS_USEFUL
- Graph required: No
- Desmos added/present: Yes
- Persistent teaching source: `generate.js` → `oneStepExplanation()`
- Canonical route: `/algebra/linear-equations-in-one-variable/solving-one-step-linear-equations/explanation/`
- QA date: 2026-09-10

## Standard checks

The generated Explanation contains the required lesson-specific `DESMOS STRATEGY` fields: Enter, Look for, Use it to answer, Why it works, and Faster or not?. No graph is required because the lesson teaches inverse operations rather than graph interpretation.

## Independent math cross-check

Desmos verification example: `x + 7 = 19` gives `x = 12`; substitution gives `12 + 7 = 19`.

Worked examples independently checked:
- `x + 11 = 19` → `x = 8`; `8 + 11 = 19`.
- `x - 13 = -5` → `x = 8`; `8 - 13 = -5`.
- `x - 7 = 18` → `x = 25`; `25 - 7 = 18`.
- `-6x = 42` → `x = -7`; `-6(-7) = 42`.
- `x/8 = -3` → `x = -24`; `-24/8 = -3`.

Quick Check independently checked:
1. `x + 9 = 17` → `x = 8`.
2. `x - 6 = 15` → `x = 21`.
3. `7x = 49` → `x = 7`.
4. `x/5 = 8` → `x = 40`.
5. `-3x = 24` → `x = -8`.

All displayed solutions are mathematically correct. The retrofit teaching source already contains the required Desmos block, so no teaching prose was rewritten.