#!/usr/bin/env python3
import argparse, json, math, os, textwrap
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
    path = FONT_BOLD if bold else FONT_REG
    return ImageFont.truetype(path, size)


def wrap(draw, text, fnt, max_width):
    words = text.split()
    lines, cur = [], ""
    for word in words:
        test = (cur + " " + word).strip()
        if draw.textbbox((0, 0), test, font=fnt)[2] <= max_width:
            cur = test
        else:
            if cur: lines.append(cur)
            cur = word
    if cur: lines.append(cur)
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
    for x in range(x0, x1 + 1, step): draw.line((x, y0, x, y1), fill=GRID, width=2)
    for y in range(y0, y1 + 1, step): draw.line((x0, y, x1, y), fill=GRID, width=2)
    cx = (x0 + x1) // 2
    cy = (y0 + y1) // 2
    draw.line((x0, cy, x1, cy), fill=INK, width=5)
    draw.line((cx, y0, cx, y1), fill=INK, width=5)
    return cx, cy, step


def draw_line_graph(draw, box, point=(2,5), show_slope=False, final=False):
    cx, cy, step = draw_grid(draw, box)
    def pt(x,y): return (cx + int(x*step), cy - int(y*step))
    a, b = pt(-3,-8), pt(4,13)
    draw.line((*a,*b), fill=BLUE, width=9)
    p = pt(*point)
    draw.ellipse((p[0]-14,p[1]-14,p[0]+14,p[1]+14), fill=RED)
    draw.text((p[0]+25,p[1]-35), f"({point[0]}, {point[1]})", font=font(40, True), fill=INK)
    if show_slope:
        p2 = pt(point[0]+1, point[1]+3)
        mid = (p2[0], p[1])
        draw.line((*p,*mid), fill=RED, width=8)
        draw.line((*mid,*p2), fill=RED, width=8)
        draw.text(((p[0]+mid[0])//2-15, p[1]+15), "1", font=font(36,True), fill=RED)
        draw.text((mid[0]+15,(mid[1]+p2[1])//2-18), "3", font=font(36,True), fill=RED)
    if final:
        draw.rounded_rectangle((620, 1180, 1010, 1285), radius=24, fill=SOFT)
        draw.text((655,1205), "y = 3x − 1", font=font(52,True), fill=BLUE)


def render_scene(scene, idx, out_path):
    img = Image.new("RGB", (W,H), BG)
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((45,45,160,120), radius=22, fill=INK)
    d.text((72,62), f"{idx}/5", font=font(34,True), fill=(255,255,255))
    d.text((830,58), "SUMMIT", font=font(42,True), fill=INK)
    d.text((902,105), "MATH", font=font(20,True), fill=BLUE)
    y = 165
    y = draw_multiline(d, scene["title"], (80,y), font(58,True), max_width=900, spacing=12)
    d.line((80,y+10, 260,y+10), fill=BLUE, width=8)
    y += 60
    for line in scene.get("body",[]):
        y = draw_multiline(d, line, (85,y), font(42), max_width=900, spacing=12)
        y += 22
    kind = scene.get("visual")
    if kind == "slope":
        draw_line_graph(d, (145,900,935,1640), show_slope=True)
        d.rounded_rectangle((120,760,470,850), radius=24, fill=SOFT)
        d.text((155,780), "Right 1 · Up 3", font=font(42,True), fill=BLUE)
    elif kind == "point":
        draw_line_graph(d, (145,930,935,1640))
        d.text((175,835), "x = 2    →    y = 5", font=font(48,True), fill=BLUE)
    elif kind == "formula":
        d.rounded_rectangle((105,780,975,930), radius=30, outline=BLUE, width=6)
        d.text((175,825), "y − y₁ = m(x − x₁)", font=font(56,True), fill=INK)
        d.text((155,1010), "m = 3", font=font(48,True), fill=BLUE)
        d.text((155,1090), "(x₁, y₁) = (2, 5)", font=font(48,True), fill=BLUE)
        d.line((380,1180,380,1280), fill=RED, width=7)
        d.polygon([(365,1270),(395,1270),(380,1300)], fill=RED)
        d.rounded_rectangle((120,1330,960,1450), radius=24, fill=(255,240,236))
        d.text((185,1360), "y − 5 = 3(x − 2)", font=font(54,True), fill=INK)
    elif kind == "final":
        d.text((110,790), "y − 5 = 3(x − 2)", font=font(48), fill=INK)
        d.text((110,875), "y − 5 = 3x − 6", font=font(48), fill=INK)
        d.rounded_rectangle((90,960,650,1080), radius=24, fill=SOFT)
        d.text((145,990), "y = 3x − 1", font=font(60,True), fill=BLUE)
        draw_line_graph(d, (470,1120,1010,1630), final=False)
        d.rounded_rectangle((70,1680,1010,1850), radius=30, fill=INK)
        d.text((125,1710), "Full lesson on SUMMIT", font=font(44,True), fill=(255,255,255))
        d.text((125,1775), "Find the complete lesson below ↓", font=font(36), fill=(220,235,250))
    else:
        draw_line_graph(d, (145,930,935,1640))
    img.save(out_path, quality=95)


def synth_scene_audio(pipeline, text, voice, wav_path):
    chunks=[]
    for _, _, audio in pipeline(text, voice=voice, speed=1.0, split_pattern=r"\n+"):
        chunks.append(np.asarray(audio, dtype=np.float32))
    if not chunks: raise RuntimeError("Kokoro returned no audio")
    audio=np.concatenate(chunks)
    sf.write(wav_path, audio, 24000)
    return len(audio)/24000.0


def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("spec")
    ap.add_argument("--out", default="short.mp4")
    ap.add_argument("--voice", default=None, help="Kokoro voice e.g. af_heart or am_adam")
    args=ap.parse_args()
    spec=json.load(open(args.spec, encoding="utf-8"))
    voice=args.voice or spec.get("voice","af_heart")
    lang=spec.get("lang_code","a")
    work=Path("shorts/.render")
    work.mkdir(parents=True, exist_ok=True)
    pipeline=KPipeline(lang_code=lang)
    clips=[]
    for i, scene in enumerate(spec["scenes"], 1):
        png=work/f"scene-{i}.png"
        wav=work/f"scene-{i}.wav"
        render_scene(scene, i, png)
        dur=synth_scene_audio(pipeline, scene["narration"], voice, wav)
        clip=ImageClip(str(png)).with_duration(dur).with_audio(AudioFileClip(str(wav)))
        clips.append(clip)
    final=concatenate_videoclips(clips, method="compose")
    Path(args.out).parent.mkdir(parents=True, exist_ok=True)
    final.write_videofile(args.out, fps=30, codec="libx264", audio_codec="aac", preset="medium", threads=2)

if __name__ == "__main__": main()
