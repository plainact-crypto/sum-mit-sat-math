const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, 'dist');
const lesson = 'Variables on Both Sides';
const marker = 'Video Explanation · English';
const tag = 'SUMMIT_EXPLAINER:variables-on-both-sides';
const url = 'https://scrimba.com/explain/guide09vlv4t21?claim=j3nv2k40ii7952in&fullscreen=1';
const oldBody = '<div class="soon">VIDEO PAGE</div><p class="video-note">This is a separate independent video route for this lesson. Video content can be added here without changing Explanation, Problems, or Answers.</p>';

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (entry.name === 'index.html') out.push(p);
  }
  return out;
}

const hits = walk(dist).filter(file => {
  const html = fs.readFileSync(file, 'utf8');
  return html.includes(`<div class="lesson-title">${lesson}</div>`) && html.includes(marker);
});
if (hits.length !== 1) throw new Error(`Expected exactly one English video page for ${lesson}; found ${hits.length}`);

const file = hits[0];
let html = fs.readFileSync(file, 'utf8');
if (html.includes(tag)) {
  console.log(`${lesson} explainer already embedded.`);
  process.exit(0);
}

const style = `<style>.summit-video-shell{margin:22px 0 8px;max-width:100%}.summit-explainer-frame{position:relative;width:100%;aspect-ratio:16/9;border-radius:22px;overflow:hidden;background:#0f172a;box-shadow:0 18px 45px rgba(20,36,61,.16)}.summit-explainer-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:#fff}.summit-explainer-actions{display:flex;justify-content:flex-end;margin-top:10px}.summit-explainer-actions a{display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:999px;background:#14243d;color:#fff;text-decoration:none;font-weight:800}.video-note{text-align:center;margin:12px 0 0;color:#697386;font-size:.95rem}@media(max-width:640px){.summit-explainer-frame{border-radius:18px}.summit-explainer-actions a{width:100%}}</style>`;
const body = `<div class="summit-video-shell summit-explainer-player" data-graph-aligned="false" data-desmos-aligned="true"><!-- ${tag} --><div class="summit-explainer-frame"><iframe src="${url}" title="${lesson} — SUMMIT MATH video lesson" loading="eager" allow="autoplay; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><div class="summit-explainer-actions"><a href="${url}" target="_blank" rel="noopener">Open full-screen lesson ↗</a></div><p class="video-note">English · Teacher-style explanation · Real-life pricing example · Worked examples · Special cases · Desmos strategy · Quick check</p></div>${style}`;

if (html.includes(oldBody)) {
  html = html.replace(oldBody, body);
} else {
  const start = html.indexOf('<div class="summit-video-shell">');
  const nativeMarker = html.indexOf('summit-native-player', start);
  const scriptEnd = html.indexOf('</script>', start);
  if (start < 0 || nativeMarker < 0 || scriptEnd < 0) throw new Error(`Expected native partial or placeholder for ${lesson}`);
  html = html.slice(0, start) + body + html.slice(scriptEnd + '</script>'.length);
}

fs.writeFileSync(file, html);
console.log(`Embedded Variables on Both Sides explainer at ${path.relative(dist, file)}`);
