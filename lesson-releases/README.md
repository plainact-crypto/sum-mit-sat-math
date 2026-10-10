# SUMMIT lesson release contract

Each worker MUST create exactly one uniquely named JSON manifest for each completed lesson at `lesson-releases/<lesson-slug>.json` in its lesson branch, alongside lesson content and builder scripts, before marking a lesson complete or opening its release PR. Do not share or overwrite another worker's manifest.

Example:

```json
{
  "lesson": "interquartile-range",
  "builders": ["interquartile-range-lesson190-explanation-build.js", "interquartile-range-lesson190-practice-build.js", "interquartile-range-lesson190-test-build.js", "interquartile-range-lesson190-video-build.js"],
  "routes": ["/ACTUAL/CANONICAL/LESSON/PATH/explanation/", "/ACTUAL/CANONICAL/LESSON/PATH/problems/", "/ACTUAL/CANONICAL/LESSON/PATH/answers/", "/ACTUAL/CANONICAL/LESSON/PATH/test/", "/ACTUAL/CANONICAL/LESSON/PATH/video/english/", "/ACTUAL/CANONICAL/LESSON/PATH/video/arabic/"]
}
```

Replace placeholders with actual paths from curriculum. List every builder necessary for the release; any missing or failed builder fails the Vercel build. Every listed route must produce a non-placeholder `dist/<route>/index.html`; otherwise the Vercel build fails. The manifest is required for reliable release verification and must be committed along with the lesson before merge to `main`. Do not label a release LIVE_VERIFIED until production is READY and each route has been checked on the live domain.
