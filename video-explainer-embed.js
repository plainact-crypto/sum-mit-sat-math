const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, 'dist');
const marker = 'Video Explanation · English';
const oldBody = '<div class="soon">VIDEO PAGE</div><p class="video-note">This is a separate independent video route for this lesson. Video content can be added here without changing Explanation, Problems, or Answers.</p>';

const explainers = [
  {
    lesson: 'Graphing Linear Functions',
    slug: 'graphing-linear-functions',
    url: 'https://scrimba.com/explain/guide05ogm0rlm?claim=nik5dk4t49vsuvg7&fullscreen=1',
    graphAligned: true,
    desmosAligned: true,
    note: 'English · Real-life example · Animated graph · Desmos strategy · Quick check'
  },
  {
    lesson: 'Equations with Fractions',
    slug: 'equations-with-fractions',
    url: 'https://scrimba.com/explain/guide04q4jveig?claim=1r5b670voa99ebn9&fullscreen=1',
    graphAligned: false,
    desmosAligned: true,
    note: 'English · Teacher-style explanation · Worked examples · Desmos strategy · Quick check'
  }
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (entry.name === 'index.html') out.push(p);
  }
  return out;
}

const allPages = walk(dist);
const style = `<style>.summit-video-shell{margin:22px 0 8px;max-width:100%}.summit-explainer-frame{position:relative;width:100%;aspect-ratio:16/9;border-radius:22px;overflow:hidden;background:#0f172a;box-shadow:0 18px 45px rgba(20,36,61,.16)}.summit-explainer-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:#fff}.summit-explainer-actions{display:flex;justify-content:flex-end;margin-top:10px}.summit-explainer-actions a{display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:999px;background:#14243d;color:#fff;text-decoration:none;font-weight:800}.video-note{text-align:center;margin:12px 0 0;color:#697386;font-size:.95rem}@media(max-width:640px){.summit-explainer-frame{border-radius:18px}.summit-explainer-actions a{width:100%}}</style>`;

for (const cfg of explainers) {
  const hits = allPages.filter(file => {
    const html = fs.readFileSync(file, 'utf8');
    return html.includes(`<div class="lesson-title">${cfg.lesson}</div>`) && html.includes(marker);
  });
  if (hits.length !== 1) throw new Error(`Expected exactly one English video page for ${cfg.lesson}; found ${hits.length}`);

  const file = hits[0];
  let html = fs.readFileSync(file, 'utf8');
  const tag = `SUMMIT_EXPLAINER:${cfg.slug}`;
  if (html.includes(tag)) {
    console.log(`${cfg.lesson} explainer already embedded.`);
    continue;
  }
  if (!html.includes(oldBody)) throw new Error(`Video placeholder marker not found for ${cfg.lesson}`);

  const body = `<div class="summit-video-shell summit-explainer-player" data-graph-aligned="${cfg.graphAligned}" data-desmos-aligned="${cfg.desmosAligned}"><!-- ${tag} --><div class="summit-explainer-frame"><iframe src="${cfg.url}" title="${cfg.lesson} — SUMMIT MATH video lesson" loading="eager" allow="autoplay; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><div class="summit-explainer-actions"><a href="${cfg.url}" target="_blank" rel="noopener">Open full-screen lesson ↗</a></div><p class="video-note">${cfg.note}</p></div>${style}`;
  html = html.replace(oldBody, body);
  fs.writeFileSync(file, html);
  console.log(`Embedded SUMMIT explainer at ${path.relative(dist, file)}`);
}
