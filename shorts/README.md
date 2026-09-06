# SUMMIT Shorts Pipeline

Direct 9:16 MP4 generation for TikTok, Instagram Reels, and YouTube Shorts.

## Fixed SUMMIT rules

- Read the target SUMMIT lesson before writing the short.
- Write teacher-style narration relevant to the actual lesson.
- Do not call every topic "easy". Match the opener to the lesson: basic, tricky, straightforward, common mistake, or concept-heavy.
- Maximum 5 scenes.
- Whiteboard-first visuals: equations, graphs, arrows, highlights. Avoid poster-style image slides.
- Alternate natural female / male voice between shorts.
- End every short with: `The full lesson is available on SUMMIT. Find the complete lesson below.`
- Review the MP4 before publishing.

## Render locally

```bash
sudo apt-get install ffmpeg espeak-ng fonts-dejavu-core
python -m pip install -r shorts/requirements.txt
python shorts/render_short.py shorts/specs/slope-and-one-point.json --voice af_heart --out summit-short.mp4
```

Suggested Kokoro voices:

- Female: `af_heart`
- Male: `am_adam`

## Render in GitHub

Run **Actions → Render SUMMIT Short → Run workflow**.

Inputs:

- `spec`: path to a JSON file under `shorts/specs/`
- `voice`: Kokoro voice name

The workflow uploads `summit-short-mp4` as a downloadable MP4 artifact.

## Content workflow

1. Read target lesson.
2. Create the approved teacher-style script.
3. Convert it to a 5-scene JSON spec.
4. Render directly to narrated 1080×1920 MP4.
5. Review.
6. Publish the approved MP4 to TikTok, Instagram Reels, and YouTube Shorts with the full lesson link below.
