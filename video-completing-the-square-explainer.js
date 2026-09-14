const fs=require('fs'),path=require('path');
const file=path.join(__dirname,'dist','advanced-math','quadratic-equations','completing-the-square','video','english','index.html');
if(!fs.existsSync(file)) throw new Error('Missing Completing the Square English video route');
let html=fs.readFileSync(file,'utf8');
const marker='<div class="soon">VIDEO PAGE</div><p class="video-note">This is a separate independent video route for this lesson. Video content can be added here without changing Explanation, Problems, or Answers.</p>';
const url='https://scrimba.com/explain/guide0qhg8euhm?claim=ut0hn9ar0as2cunr&fullscreen=1';
if(!html.includes('SUMMIT_EXPLAINER:completing-the-square')) {
  if(!html.includes(marker)) throw new Error('Video placeholder marker not found');
  const embed=`<div class="summit-video-shell summit-explainer-player" data-graph-aligned="false" data-desmos-aligned="true" data-requested-voice-gender="male"><!-- SUMMIT_EXPLAINER:completing-the-square --><div style="position:relative;width:100%;aspect-ratio:16/9;overflow:hidden"><iframe src="${url}" title="Completing the Square — SUMMIT MATH video lesson" style="position:absolute;inset:0;width:100%;height:100%;border:0" allow="autoplay; fullscreen" allowfullscreen></iframe></div><p class="video-note">English · Teacher-style explanation · Worked examples · Desmos verification · Quick check</p></div>`;
  fs.writeFileSync(file,html.replace(marker,embed));
}
console.log('Embedded Completing the Square explainer');
