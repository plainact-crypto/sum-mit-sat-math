# SUMMIT Canonical Lesson Content Structure

This is the authoritative structure for every SUMMIT lesson content package.

Scope: Explanation, Practice Problems, Answers & Solutions, and Lesson Test.

Videos are explicitly OUT OF SCOPE. Video production may use a separate standard and must not change this document.

## 1. Canonical lesson package

Every completed lesson must contain exactly these four non-video learning routes:

1. `explanation/`
2. `problems/`
3. `answers/`
4. `test/`

A lesson is not "content complete" until all four are present, mathematically verified, and internally aligned.

## 2. Explanation — canonical page flow

Use the current approved SUMMIT site structure and visual language.

Required order:

1. LESSON OBJECTIVE
   - One clear learning outcome.
   - One compact equation, rule, or target example where useful.

2. WHAT YOU NEED TO KNOW / CORE IDEA
   - Explain the concept before procedures.
   - Keep language concise and student-facing.

3. KEY DEFINITIONS
   - Include only terms genuinely needed for the lesson.

4. CORE RULE
   - State the governing rule, formula, or principle clearly.

5. HOW IT WORKS
   - Show the main method or patterns in a compact structured form.

6. WORKED EXAMPLES
   - Use multiple worked examples, progressing from basic to harder/application cases.
   - Show the mathematical steps, not only the final answer.
   - Include checks where useful.
   - Typical SUMMIT pattern is 3–5 worked examples depending on the lesson.

7. GRAPH / VISUAL BLOCK — only when mathematically useful
   - Follow `EXPLANATION_STANDARD.md`.
   - Graphs must be deterministic and mathematically verified.

8. DESMOS STRATEGY — only when useful
   - Follow `EXPLANATION_STANDARD.md`.
   - Must contain: Enter / Look for / Use it to answer / Why it works / Faster or not?

9. COMMON MISTAKES
   - Lesson-specific mistakes only.

10. EXAM STRATEGY
    - Explain the fastest reliable approach for common exam-style questions.
    - Do not force test-prep language when it adds no value.

11. QUICK CHECK
    - Short self-check questions inside the explanation.
    - Answers may be revealed after the student attempts them.

12. LESSON RECAP
    - Summarize the method/rules in a compact form.

13. NEXT STEP
    - Link to Practice Problems, Answers & Solutions, and Lesson Test.
    - Video links may exist in the UI, but video content is not governed by this standard.

The exact number of visible numbered sections can vary when Graph/Desmos blocks are not needed, but the pedagogical sequence above must remain intact.

## 3. Practice Problems — exact structure

Every completed Practice Problems page contains EXACTLY 18 original questions.

Required distribution:

- 3 Skill Check
- 8 Core Practice
- 5 Exam-Style Practice
- 2 Challenge Problems

Total: 18.

Required order:
1. SKILL CHECK — questions 1–3
2. CORE PRACTICE — questions 4–11
3. EXAM-STYLE PRACTICE — questions 12–16
4. CHALLENGE PROBLEMS — questions 17–18

Rules:
- Difficulty must increase overall from start to finish.
- Questions must test the actual lesson objective.
- Use a suitable mix of numeric response, algebraic response, multiple choice, interpretation, graphs/tables, or contextual problems as appropriate.
- Practice may give instant correctness feedback.
- Practice feedback must NOT expose the full worked solution; full solutions belong on Answers.
- No duplicated questions.
- No trivial number swaps presented as "new" questions when the reasoning is unchanged.
- Any graph/table/data used must be mathematically verified.

## 4. Answers & Solutions — exact alignment

Answers must map 1:1 to Practice Problems.

Required:
- Exactly 18 solutions.
- Solution 1 answers Practice 1, Solution 2 answers Practice 2, etc.
- Preserve the same four groups: 3 / 8 / 5 / 2.
- Every answer must contain the correct final answer.
- Show enough working/reasoning to teach the method.
- Explain the key reason, operation, theorem, or interpretation.
- For multiple-choice questions, identify the correct choice and explain why it is correct.
- Do not introduce a different problem statement from the Practice page.
- Independently verify all arithmetic/algebra before publish.

## 5. Lesson Test — exact structure

Every completed Lesson Test contains EXACTLY 5 questions.

Required difficulty progression:
1. Easy
2. Easy / Medium
3. Medium
4. Medium / Hard
5. Hard / Exam-Style

Rules:
- The test samples the lesson skill; it is not a copy of Practice Problems.
- No per-question correctness reveal before final submission.
- Student submits once at the end.
- Show the final result only after Submit Test.
- The final review may show correct answers/explanations after submission.
- Questions must be mathematically verified.
- Test difficulty must genuinely rise from question 1 to question 5.

## 6. Cross-page alignment

Before a lesson is complete, verify:

- Explanation teaches every skill required by Practice.
- Practice uses only concepts already introduced in Explanation, except deliberate Challenge extensions that remain solvable from the taught method.
- Answers match Practice exactly 1:1.
- Test assesses the same lesson objective without copying the Practice set.
- Terminology, notation, variable conventions, and graph conventions are consistent across all four pages.
- All internal links work.
- The lesson title and curriculum location are identical across all four pages.

## 7. Mathematical QA

Every lesson must pass mathematical QA before publish.

Minimum requirements:
- Re-solve every Practice question independently.
- Re-check every Answer against its corresponding Practice question.
- Re-solve all five Test questions.
- Verify signs, fractions, decimals, domains, units, intercepts, roots, inequalities, and graph labels.
- For graphs, follow the deterministic graph QA in `EXPLANATION_STANDARD.md`.
- For Desmos, independently verify the expected result without relying on Desmos alone.

## 8. Visual / UX consistency

All four routes must use the existing SUMMIT site shell:
- Same top navigation.
- Same breadcrumb style.
- Same lesson title treatment.
- Same cards, spacing, typography, controls, and responsive behavior already used by approved live lesson pages.
- Do not invent a new visual system per lesson.

The current live SUMMIT lesson pages are the visual reference. This document locks the content structure, not a separate redesign.

## 9. Completion definition

A lesson may be marked CONTENT 100% READY only when:

- Explanation = complete
- Problems = 18/18 complete
- Answers = 18/18 aligned
- Test = 5/5 complete
- Mathematical QA = passed
- Cross-page alignment = passed

Video availability has NO effect on non-video content completion under this standard.

## 10. Production rule

All future SUMMIT content production must follow this structure unless the owner explicitly changes this standard.

Workers or scripts must not:
- create placeholder text and count it as complete content,
- change the 18-question Practice distribution,
- publish Answers that do not map 1:1,
- change the 5-question Test structure,
- skip mathematical verification,
- alter video routes as part of non-video content production.

This file is the source of truth for the structure of SUMMIT lesson content.
