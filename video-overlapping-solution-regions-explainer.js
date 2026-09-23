const fs=require('fs'),path=require('path');
const dist=path.join(__dirname,'dist');
const marker='Video Explanation · English';
const oldBody='<div class="soon">VIDEO PAGE</div><p class="video-note">This is a separate independent video route for this lesson. Video content can be added here without changing Explanation, Problems, or Answers.</p>';
const lesson='Overlapping Solution Regions';
const slug='overlapping-solution-regions';
const url='https://scrimba.com/explain/guide05nn4jida?claim=da15uqina4vodkr3&fullscreen=1';
function walk(dir,out=[]){if(!fs.existsSync(dir))return out;for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);entry.isDirectory()?walk(p,out):entry.name==='index.html'&&out.push(p)}return out}
const file=walk(dist).find(f=>{const h=fs.readFileSync(f,'utf8');return h.includes(marker)&&h.includes(`<div class="lesson-title">${lesson}</div>`)});
if(!file)throw new Error(`English video route not found for ${lesson}`);
let html=fs.readFileSync(file,'utf8');
const tag=`SUMMIT_EXPLAINER:${slug}`;
if(!html.includes(tag)){
 if(!html.includes(oldBody))throw new Error(`Video placeholder marker not found for ${lesson}`);
 const style=`<style>.summit-video-shell{margin:22px 0 8px;max-width:100%}.summit-explainer-frame{position:relative;width:100%;aspect-ratio:16/9;border-radius:22px;overflow:hidden;background:#0f172a;box-shadow:0 18px 45px rgba(20,36,61,.16)}.summit-explainer-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:#fff}.summit-explainer-actions{display:flex;justify-content:flex-end;margin-top:10px}.summit-explainer-actions a{display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:999px;background:#14243d;color:#fff;text-decoration:none;font-weight:800}.video-note{text-align:center;margin:12px 0 0;color:#697386;font-size:.95rem}@media(max-width:640px){.summit-explainer-frame{border-radius:18px}.summit-explainer-actions a{width:100%}}</style>`;
 const body=`<div class="summit-video-shell summit-explainer-player" data-graph-aligned="true" data-desmos-aligned="true" data-requested-voice-gender="female"><!-- ${tag} --><div class="summit-explainer-frame"><iframe src="${url}" title="${lesson} — SUMMIT MATH video lesson" loading="eager" allow="autoplay; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><div class="summit-explainer-actions"><a href="${url}" target="_blank" rel="noopener">Open full-screen lesson ↗</a></div><p class="video-note">English · Systems of inequalities · Overlap regions · Boundary rules · SAT strategy · Quick check</p></div>${style}`;
 html=html.replace(oldBody,body);fs.writeFileSync(file,html);
}
console.log(`[video] ${lesson}: ${file}`);
