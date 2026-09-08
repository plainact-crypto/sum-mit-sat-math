const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, 'dist');
const lesson = 'Solving One-Step Linear Equations';
const tag = 'SUMMIT_EXPLAINER:solving-one-step-linear-equations-refresh-2026-09-08';

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
  return html.includes(`<div class="lesson-title">${lesson}</div>`) && html.includes(tag);
});
if (hits.length !== 1) throw new Error(`Expected exactly one refreshed page for ${lesson}; found ${hits.length}`);

const file = hits[0];
let html = fs.readFileSync(file, 'utf8');
html = html.replace('summit-video-shell summit-native-player summit-explainer-player', 'summit-video-shell summit-explainer-player');
fs.writeFileSync(file, html);
console.log(`Normalized external explainer marker at ${path.relative(dist, file)}`);
