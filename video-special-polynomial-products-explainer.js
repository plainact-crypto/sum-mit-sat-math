const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, 'dist');
const marker = 'Video Explanation · English';
const oldBody = '<div class="soon">VIDEO PAGE</div><p class="video-note">This is a separate independent video route for this lesson. Video content can be added here without changing Explanation, Problems, or Answers.</p>';
const lesson = 'Special Polynomial Products';
const slug = 'special-polynomial-products';
const route = 'advanced-math/polynomial-operations/special-polynomial-products/video/english/index.html';
const url = 'https://scrimba.com/explain/guide0qncb6p7b?claim=154i5vvugmmv49v2&fullscreen=1';

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (entry.name === 'index.html') out.push(p);
  }
  return out;
}

let hits = walk(dist).filter(file => {
  const normalized = file.split(path.sep).join('/');
  const html = fs.readFileSync(file, 'utf8');
  return normalized.endsWith(route) && html.includes(`<div class="lesson-title">${lesson}</div>`) && html.includes(marker);
});

if (hits.length === 0) {
  const target = path.join(dist, route);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const shell = `<!doctype html><html lang="en" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>${lesson} — Video Explanation | SUMMIT MATH</title></head><body><main class="page-shell"><section class="lesson-card"><div class="crumb">Advanced Math · Polynomial Operations</div><div class="page-type">${marker}</div><div class="lesson-title">${lesson}</div><div class="subject-label">Advanced Math</div>${oldBody}<a class="back" href="../../explanation/">← Back to explanation</a></section></main></body></html>`;
  fs.writeFileSync(target, shell);
  hits = [target];
}
if (hits.length !== 1) throw new Error(`Expected exactly one English video page for ${lesson}; found ${hits.length}`);

const file = hits[0];
let html = fs.readFileSync(file, 'utf8');
const tag = `SUMMIT_EXPLAINER:${slug}`;
if (!html.includes(tag)) {
  if (!html.includes(oldBody)) throw new Error(`Video placeholder marker not found for ${lesson}`);
  const style = `<style>.summit-video-shell{margin:22px 0 8px;max-width:100%}.summit-explainer-frame{position:relative;width:100%;aspect-ratio:16/9;border-radius:22px;overflow:hidden;background:#0f172a;box-shadow:0 18px 45px rgba(20,36,61,.16)}.summit-explainer-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:#fff}.summit-explainer-actions{display:flex;justify-content:flex-end;margin-top:10px}.summit-explainer-actions a{display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:999px;background:#14243d;color:#fff;text-decoration:none;font-weight:800}.video-note{text-align:center;margin:12px 0 0;color:#697386;font-size:.95rem}@media(max-width:640px){.summit-explainer-frame{border-radius:18px}.summit-explainer-actions a{width:100%}}</style>`;
  const body = `<div class="summit-video-shell summit-explainer-player" data-graph-aligned="false" data-desmos-aligned="false" data-requested-voice-gender="male"><!-- ${tag} --><div class="summit-explainer-frame"><iframe src="${url}" title="${lesson} — SUMMIT MATH video lesson" loading="eager" allow="autoplay; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><div class="summit-explainer-actions"><a href="${url}" target="_blank" rel="noopener">Open full-screen lesson ↗</a></div><p class="video-note">English · Teacher-style explanation · Perfect-square binomials · Conjugates · Worked examples · Sign checks · Quick check</p></div>${style}`;
  html = html.replace(oldBody, body);
  fs.writeFileSync(file, html);
}
console.log(`Embedded SUMMIT explainer at ${path.relative(dist, file)}`);
require('./video-greatest-common-factor-explainer.js');
