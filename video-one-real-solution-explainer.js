const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, 'dist');
const marker = 'Video Explanation · English';
const oldBody = '<div class="soon">VIDEO PAGE</div><p class="video-note">This is a separate independent video route for this lesson. Video content can be added here without changing Explanation, Problems, or Answers.</p>';
const lesson = 'One Real Solution';
const slug = 'one-real-solution';
const url = 'https://scrimba.com/explain/guide02kentaoa?claim=vh2n8ob0qvcb53d0&fullscreen=1';
function walk(dir,out=[]){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())walk(p,out);else if(entry.name==='index.html')out.push(p)}return out}
function embed(lessonName,lessonSlug,explainerUrl,voiceGender,note,graphAligned=true,desmosAligned=true){
  const hits=walk(dist).filter(file=>{const normalized=file.split(path.sep).join('/');const html=fs.readFileSync(file,'utf8');return normalized.endsWith(`advanced-math/quadratic-equations/${lessonSlug}/video/english/index.html`)&&html.includes(`<div class="lesson-title">${lessonName}</div>`)&&html.includes(marker)});
  if(hits.length!==1)throw new Error(`Expected exactly one English video page for ${lessonName}; found ${hits.length}`);
  const file=hits[0];let html=fs.readFileSync(file,'utf8');const tag=`SUMMIT_EXPLAINER:${lessonSlug}`;
  if(!html.includes(tag)){if(!html.includes(oldBody))throw new Error(`Video placeholder marker not found for ${lessonName}`);const style=`<style>.summit-video-shell{margin:22px 0 8px;max-width:100%}.summit-explainer-frame{position:relative;width:100%;aspect-ratio:16/9;border-radius:22px;overflow:hidden;background:#0f172a;box-shadow:0 18px 45px rgba(20,36,61,.16)}.summit-explainer-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:#fff}.summit-explainer-actions{display:flex;justify-content:flex-end;margin-top:10px}.summit-explainer-actions a{display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:999px;background:#14243d;color:#fff;text-decoration:none;font-weight:800}.video-note{text-align:center;margin:12px 0 0;color:#697386;font-size:.95rem}@media(max-width:640px){.summit-explainer-frame{border-radius:18px}.summit-explainer-actions a{width:100%}}</style>`;const body=`<div class="summit-video-shell summit-explainer-player" data-graph-aligned="${graphAligned}" data-desmos-aligned="${desmosAligned}" data-requested-voice-gender="${voiceGender}"><!-- ${tag} --><div class="summit-explainer-frame"><iframe src="${explainerUrl}" title="${lessonName} — SUMMIT MATH video lesson" loading="eager" allow="autoplay; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><div class="summit-explainer-actions"><a href="${explainerUrl}" target="_blank" rel="noopener">Open full-screen lesson ↗</a></div><p class="video-note">${note}</p></div>${style}`;html=html.replace(oldBody,body);fs.writeFileSync(file,html)}
  console.log(`Embedded SUMMIT explainer at ${path.relative(dist,file)}`);
}
embed(lesson,slug,url,'female','English · Teacher-style explanation · Worked examples · Verified tangent graph · Desmos strategy · Quick check',true,true);
embed('Two Real Solutions','two-real-solutions','https://scrimba.com/explain/guide0tc64pusj?claim=28q24u89am194vu0&fullscreen=1','male','English · Teacher-style explanation · Worked examples · Verified two-root graph · Desmos strategy · Quick check',true,true);
embed('No Real Solutions','no-real-solutions','https://scrimba.com/explain/guide0deunnaqu?claim=ldjim2deg2jnr0pa&fullscreen=1','female','English · Teacher-style explanation · Worked examples · Verified no-root graph · Desmos strategy · Quick check',true,true);
embed('Sum of Roots','sum-of-roots','https://scrimba.com/explain/guide0b7ltfoqc?claim=9b9bnp7rdagsdujo&fullscreen=1','male','English · Teacher-style explanation · Worked examples · Verified root graph · Desmos strategy · Quick check',true,true);
