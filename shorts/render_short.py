#!/usr/bin/env python3
import argparse, json
from pathlib import Path

import numpy as np
import soundfile as sf
from PIL import Image, ImageDraw, ImageFont
from kokoro import KPipeline
from moviepy import ImageClip, AudioFileClip, concatenate_videoclips

W, H = 1080, 1920
BG = (248, 247, 242)
INK = (20, 31, 48)
BLUE = (30, 111, 186)
RED = (210, 65, 65)
GRID = (224, 226, 228)
SOFT = (233, 241, 249)
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"


def font(size, bold=False):
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REG, size)


def wrap(draw, text, fnt, max_width):
    words = text.split()
    lines, cur = [], ""
    for word in words:
        test = (cur + " " + word).strip()
        if draw.textbbox((0, 0), test, font=fnt)[2] <= max_width:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def draw_multiline(draw, text, xy, fnt, fill=INK, max_width=900, spacing=18):
    x, y = xy
    for line in wrap(draw, text, fnt, max_width):
        draw.text((x, y), line, font=fnt, fill=fill)
        y += fnt.size + spacing
    return y


def draw_grid(draw, box):
    x0, y0, x1, y1 = box
    step = 70
    for x in range(x0, x1 + 1, step):
        draw.line((x, y0, x, y1), fill=GRID, width=2)
    for y in range(y0, y1 + 1, step):
        draw.line((x0, y, x1, y), fill=GRID, width=2)
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    draw.line((x0, cy, x1, cy), fill=INK, width=5)
    draw.line((cx, y0, cx, y1), fill=INK, width=5)
    return cx, cy, step


def draw_line_graph(draw, box, m=3, b=-1, points=((2, 5),), show_slope=False):
    cx, cy, step = draw_grid(draw, box)
    def pt(x, y):
        return (cx + int(x * step), cy - int(y * step))
    x_a, x_b = -4, 4
    a, z = pt(x_a, m * x_a + b), pt(x_b, m * x_b + b)
    draw.line((*a, *z), fill=BLUE, width=9)
    for point in points:
        p = pt(*point)
        draw.ellipse((p[0]-14, p[1]-14, p[0]+14, p[1]+14), fill=RED)
        draw.text((p[0]+22, p[1]-34), f"({point[0]}, {point[1]})", font=font(34, True), fill=INK)
    if show_slope and points:
        p = pt(*points[0])
        p2 = pt(points[0][0]+1, points[0][1]+m)
        mid = (p2[0], p[1])
        draw.line((*p, *mid), fill=RED, width=8)
        draw.line((*mid, *p2), fill=RED, width=8)
        draw.text(((p[0]+mid[0])//2-15, p[1]+15), "1", font=font(34, True), fill=RED)
        draw.text((mid[0]+15, (mid[1]+p2[1])//2-18), str(m), font=font(34, True), fill=RED)


def draw_table(draw, rows, top=820):
    x0, x1 = 225, 855
    col = (x0 + x1) // 2
    row_h = 120
    y0 = top
    y1 = y0 + row_h * (len(rows) + 1)
    draw.rounded_rectangle((x0, y0, x1, y1), radius=28, fill=(255,255,255), outline=BLUE, width=5)
    draw.line((col, y0, col, y1), fill=GRID, width=4)
    draw.text((x0+125, y0+28), "x", font=font(46, True), fill=BLUE)
    draw.text((col+125, y0+28), "y", font=font(46, True), fill=BLUE)
    for i, (x, y) in enumerate(rows, start=1):
        yy = y0 + i * row_h
        draw.line((x0, yy, x1, yy), fill=GRID, width=3)
        draw.text((x0+120, yy+28), str(x), font=font(46, True), fill=INK)
        draw.text((col+120, yy+28), str(y), font=font(46, True), fill=INK)


def render_scene(scene, idx, total, out_path):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((45,45,170,120), radius=22, fill=INK)
    d.text((68,62), f"{idx}/{total}", font=font(32, True), fill=(255,255,255))
    d.text((830,58), "SUMMIT", font=font(42, True), fill=INK)
    d.text((902,105), "MATH", font=font(20, True), fill=BLUE)
    y = draw_multiline(d, scene["title"], (80,165), font(58, True), max_width=900, spacing=12)
    d.line((80,y+10,260,y+10), fill=BLUE, width=8)
    y += 60
    for line in scene.get("body", []):
        y = draw_multiline(d, line, (85,y), font(42), max_width=900, spacing=12)
        y += 20

    kind = scene.get("visual", "intro")
    if kind == "table":
        draw_table(d, scene.get("rows", [[0,2],[1,5],[2,8]]), top=820)
    elif kind == "table_rate":
        rows = scene.get("rows", [[0,2],[1,5],[2,8]])
        draw_table(d, rows, top=760)
        d.rounded_rectangle((150,1320,930,1470), radius=28, fill=SOFT)
        d.text((205,1360), scene.get("formula", "slope = Δy / Δx = 3 / 1 = 3"), font=font(42, True), fill=BLUE)
        d.text((220,1540), "same change each row → constant slope", font=font(34), fill=INK)
    elif kind == "table_intercept":
        rows = scene.get("rows", [[0,2],[1,5],[2,8]])
        draw_table(d, rows, top=760)
        d.rounded_rectangle((145,1320,935,1480), radius=28, fill=(255,240,236))
        d.text((205,1360), "when x = 0, y = 2", font=font(44, True), fill=RED)
        d.text((315,1530), "so b = 2", font=font(52, True), fill=INK)
    elif kind == "table_equation":
        d.rounded_rectangle((120,760,960,930), radius=30, outline=BLUE, width=6)
        d.text((240,810), "y = mx + b", font=font(62, True), fill=INK)
        d.text((165,1020), "m = 3", font=font(50, True), fill=BLUE)
        d.text((165,1110), "b = 2", font=font(50, True), fill=RED)
        d.line((420,1200,420,1290), fill=RED, width=7)
        d.polygon([(405,1280),(435,1280),(420,1310)], fill=RED)
        d.rounded_rectangle((120,1350,960,1490), radius=26, fill=SOFT)
        d.text((310,1385), "y = 3x + 2", font=font(60, True), fill=BLUE)
    elif kind == "table_final":
        d.text((130,760), "Check with x = 2:", font=font(44, True), fill=INK)
        d.text((130,850), "y = 3(2) + 2 = 8  ✓", font=font(58, True), fill=BLUE)
        draw_line_graph(d, (170,1040,910,1620), m=3, b=2, points=((0,2),(1,5),(2,8)))
        d.rounded_rectangle((70,1680,1010,1850), radius=30, fill=INK)
        d.text((125,1710), "Full lesson on SUMMIT", font=font(44, True), fill=(255,255,255))
        d.text((125,1775), "Find the complete lesson below ↓", font=font(36), fill=(220,235,250))
    elif kind == "slope":
        m = scene.get("m", 3); b = scene.get("b", -1); points = tuple(tuple(p) for p in scene.get("points", [[2,5]]))
        draw_line_graph(d, (145,900,935,1640), m=m, b=b, points=points, show_slope=True)
    elif kind == "point":
        m = scene.get("m", 3); b = scene.get("b", -1); points = tuple(tuple(p) for p in scene.get("points", [[2,5]]))
        draw_line_graph(d, (145,930,935,1640), m=m, b=b, points=points)
    elif kind == "formula":
        d.rounded_rectangle((105,780,975,930), radius=30, outline=BLUE, width=6)
        d.text((175,825), scene.get("formula", "y − y₁ = m(x − x₁)"), font=font(56,True), fill=INK)
        d.rounded_rectangle((120,1120,960,1280), radius=24, fill=(255,240,236))
        d.text((175,1160), scene.get("substitution", "y − 5 = 3(x − 2)"), font=font(50,True), fill=INK)
    elif kind == "final":
        d.rounded_rectangle((90,900,990,1080), radius=24, fill=SOFT)
        d.text((180,945), scene.get("equation", "y = 3x − 1"), font=font(60,True), fill=BLUE)
        m = scene.get("m", 3); b = scene.get("b", -1); points = tuple(tuple(p) for p in scene.get("points", [[2,5]]))
        draw_line_graph(d, (260,1160,820,1630), m=m, b=b, points=points)
        d.rounded_rectangle((70,1680,1010,1850), radius=30, fill=INK)
        d.text((125,1710), "Full lesson on SUMMIT", font=font(44,True), fill=(255,255,255))
        d.text((125,1775), "Find the complete lesson below ↓", font=font(36), fill=(220,235,250))
    else:
        d.rounded_rectangle((130,900,950,1420), radius=36, fill=SOFT)
        d.text((225,1080), "Understand the idea", font=font(58, True), fill=BLUE)
        d.text((290,1190), "then use the rule", font=font(46), fill=INK)
    img.save(out_path, quality=95)


def synth_scene_audio(pipeline, text, voice, wav_path):
    chunks = []
    for _, _, audio in pipeline(text, voice=voice, speed=1.0, split_pattern=r"\n+"):
        chunks.append(np.asarray(audio, dtype=np.float32))
    if not chunks:
        raise RuntimeError("Kokoro returned no audio")
    audio = np.concatenate(chunks)
    sf.write(wav_path, audio, 24000)
    return len(audio) / 24000.0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("spec")
    ap.add_argument("--out", default="short.mp4")
    ap.add_argument("--voice", default=None)
    args = ap.parse_args()
    spec = json.load(open(args.spec, encoding="utf-8"))
    voice = args.voice or spec.get("voice", "af_heart")
    lang = spec.get("lang_code", "a")
    work = Path("shorts/.render")
    work.mkdir(parents=True, exist_ok=True)
    clips = []
    pipeline = KPipeline(lang_code=lang)
    scenes = spec["scenes"]
    if len(scenes) > 5:
        raise ValueError("SUMMIT shorts are limited to 5 scenes")
    for i, scene in enumerate(scenes, 1):
        png = work / f"scene-{i}.png"
        wav = work / f"scene-{i}.wav"
        render_scene(scene, i, len(scenes), png)
        dur = synth_scene_audio(pipeline, scene["narration"], voice, wav)
        clips.append(ImageClip(str(png)).with_duration(dur).with_audio(AudioFileClip(str(wav))))
    final = concatenate_videoclips(clips, method="compose")
    Path(args.out).parent.mkdir(parents=True, exist_ok=True)
    final.write_videofile(args.out, fps=30, codec="libx264", audio_codec="aac", preset="medium", threads=2)


if __name__ == "__main__":
    main()
