const fs=require('fs');
const path=require('path');
const dist=path.join(__dirname,'dist');
const configs=[
 {lesson:'Solving One-Step Linear Equations',audio:'https://www.aidocmaker.com/g0/audio?name=a44f2a5c7bcb403b8152cf49bb97a08d',scene:['DESMOS STRATEGY','Enter x + 7 = 19','Desmos: x = 12','Manual algebra is faster · use Desmos to verify']},
 {lesson:'Solving Multi-Step Linear Equations',audio:'https://www.aidocmaker.com/g0/audio?name=bcb9b14a3739446c8d380537ec00c719',scene:['DESMOS STRATEGY','Enter 3(x − 4) + 5 = 20','Desmos: x = 9','Check: 3(9 − 4) + 5 = 20']},
 {lesson:'Variables on Both Sides',audio:'https://www.aidocmaker.com/g0/audio?name=38755b9cbdd1494daf8ef20f8bfb3100',scene:['DESMOS STRATEGY','Enter 3x + 5 = x + 17','Desmos: x = 6','Both sides = 23 · manual algebra remains core']}
];
function walk(dir,out=[]){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p,out);else if(e.name==='index.html')out.push(p)}return out}
const pages=walk(dist).map(file=>({file,html:fs.readFileSync(file,'utf8')}));
for(const cfg of configs){
 const lessonPages=pages.filter(p=>p.html.includes(`<div class="lesson-title">${cfg.lesson}</div>`)&&p.html.includes('Video Explanation · English'));
 const external=lessonPages.filter(p=>p.html.includes('summit-explainer-player')&&p.html.includes('data-desmos-aligned="true"'));
 if(external.length===1){console.log(`Desmos alignment already supplied by external explainer for ${cfg.lesson}`);continue}
 const hits=lessonPages.filter(p=>p.html.includes('summit-native-player'));
 if(hits.length!==1)throw new Error(`Expected one aligned external or native English video for ${cfg.lesson}; found external=${external.length}, native=${hits.length}`);
 let h=hits[0].html;
 if(h.includes(`SUMMIT_VIDEO_DESMOS:${cfg.lesson}`))continue;
 const m=h.match(/const tracks=(\[[^;]+?\]),scenes=(\[[^;]+?\]),player=/s);
 if(!m)throw new Error(`Video arrays not found for ${cfg.lesson}`);
 const tracks=JSON.parse(m[1]),scenes=JSON.parse(m[2]);
 if(tracks.length!==scenes.length)throw new Error(`Pre-alignment track/scene mismatch for ${cfg.lesson}`);
 tracks.push(cfg.audio);scenes.push(cfg.scene);
 h=h.replace(m[0],`const tracks=${JSON.stringify(tracks)},scenes=${JSON.stringify(scenes)},player=`);
 h=h.replace(/(<span class="summit-counter" id="svCounter">1 \/ )\d+(<\/span>)/,'$1'+tracks.length+'$2');
 h=h.replace('<div class="summit-native-player" id="summitNativeLesson">',`<div class="summit-native-player" id="summitNativeLesson" data-desmos-aligned="true"><!-- SUMMIT_VIDEO_DESMOS:${cfg.lesson} -->`);
 fs.writeFileSync(hits[0].file,h);
 console.log(`Added narrated Desmos scene to ${cfg.lesson}`)
}
require('./video-solving-by-square-roots-explainer.js');
require('./video-completing-the-square-explainer.js');

// External teacher-style explainer for the radical-equations Extraneous Solutions lesson.
{
 const lesson='Extraneous Solutions', slug='extraneous-solutions';
 const explainerUrl='https://scrimba.com/explain/guide0rthoscq0?claim=d95hqtar5gfj513h&fullscreen=1';
 const candidates=walk(dist).filter(file=>{const n=file.split(path.sep).join('/').toLowerCase();const h=fs.readFileSync(file,'utf8');return n.endsWith(`/${slug}/video/english/index.html`)&&n.includes('/radical')&&h.includes(`<div class="lesson-title">${lesson}</div>`)&&h.includes('Video Explanation · English')});
 if(candidates.length!==1)throw new Error(`Expected exactly one radical-equations English video page for ${lesson}; found ${candidates.length}`);
 const file=candidates[0]; let h=fs.readFileSync(file,'utf8');
 const tag=`SUMMIT_EXPLAINER:${slug}`;
 if(!h.includes(tag)){
  const oldBody='<div class="soon">VIDEO PAGE</div><p class="video-note">This is a separate independent video route for this lesson. Video content can be added here without changing Explanation, Problems, or Answers.</p>';
  if(!h.includes(oldBody))throw new Error(`Video placeholder marker not found for ${lesson}`);
  const style='<style>.summit-video-shell{margin:22px 0 8px;max-width:100%}.summit-explainer-frame{position:relative;width:100%;aspect-ratio:16/9;border-radius:22px;overflow:hidden;background:#0f172a;box-shadow:0 18px 45px rgba(20,36,61,.16)}.summit-explainer-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:#fff}.summit-explainer-actions{display:flex;justify-content:flex-end;margin-top:10px}.summit-explainer-actions a{display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:999px;background:#14243d;color:#fff;text-decoration:none;font-weight:800}.video-note{text-align:center;margin:12px 0 0;color:#697386;font-size:.95rem}@media(max-width:640px){.summit-explainer-frame{border-radius:18px}.summit-explainer-actions a{width:100%}}</style>';
  const body=`<div class="summit-video-shell summit-explainer-player" data-graph-aligned="true" data-desmos-aligned="true" data-requested-voice-gender="female"><!-- ${tag} --><div class="summit-explainer-frame"><iframe src="${explainerUrl}" title="${lesson} — SUMMIT MATH video lesson" loading="eager" allow="autoplay; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><div class="summit-explainer-actions"><a href="${explainerUrl}" target="_blank" rel="noopener">Open full-screen lesson ↗</a></div><p class="video-note">English · Teacher-style explanation · Worked radical example · Extraneous-candidate verification · Desmos strategy · Quick check</p></div>${style}`;
  h=h.replace(oldBody,body);fs.writeFileSync(file,h);
 }
 console.log(`Embedded SUMMIT explainer at ${path.relative(dist,file)}`);
}
require('./video-graphing-linear-functions-explainer.js');
