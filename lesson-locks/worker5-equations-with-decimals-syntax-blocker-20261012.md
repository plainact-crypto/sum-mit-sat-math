# Lesson 5 release lock — 2026-10-12

Resolved: the registry's trailing extra brace was removed in commit 4a0de477; syntax was independently checked. The lesson-specific Desmos directions and algebraic check were committed in 878f8143. Its Vercel preview for 878f8143 is READY and the build verified all six canonical routes.

Still BLOCKED_RELEASE: the global explanation-retrofit-build.js fails on the unrelated vertex-standard-form Explanation route and is skipped as noncritical. The required Lesson 5 builder does not yet enforce the Explanation release gate; two attempts to add a dedicated or in-builder QA gate were blocked by repository safety checks. Do not merge or mark LIVE_VERIFIED until the Explanation release gate, all required builders, full build, and six production routes pass. Continue the next owned lesson while blocked.
