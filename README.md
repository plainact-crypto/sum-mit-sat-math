# SUMMIT SAT MATH

Production source for the SUMMIT SAT MATH website.

- 298 curriculum leaf lessons
- 6 independent routes per leaf
- 1,788 lesson routes total
- 3 completed content pages for the first lesson
- 891 remaining scheduled Explanation / Problems / Answers pages
- 596 independent video routes (not scheduled)
- 298 lesson Test routes (not scheduled)
- Each Test contains 5 graded questions from Easy to Hard / SAT-style and shows results only after submission
- Remaining timed content starts 2026-09-03 22:00 Africa/Cairo and advances by 12 minutes per page
- Last remaining timed release: 2026-09-11 08:00 Africa/Cairo

`npm run build` generates the deployable static site into `dist/`. `postbuild.js` preserves the completed first-lesson pages, adds Test routes, and rewrites the remaining timed release queue.
