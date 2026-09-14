const fs=require('fs'),path=require('path');
const file=path.join(__dirname,'dist','advanced-math','quadratic-equations','solving-by-square-roots','video','english','index.html');
if(!fs.existsSync(file))throw new Error('Missing Solving by Square Roots English video route');
let html=fs.readFileSync(file,'utf8');
const old='<div class="soon">VIDEO PAGE</div><p class="video-note">This is a separate independent video route for this lesson. Video content can be added here without changing Explanation, Problems, or Answers.</p>';
const url='https://scrimba.com/explain/guide0h38bmska?claim=mscccjbcc985qelq&fullscreen=1';
if(!html.includes('SUMMIT_EXPLAINER:solving-by-square-roots')){
 if(!html.includes(old))throw new Error('Video placeholder marker not found');
 const body=`<div class="summit-video-shell summit-explainer-player" data-graph-aligned="false" data-desmos-aligned="true" data-requested-voice-gender="female"><!-- SUMMIT_EXPLAINER:solving-by-square-roots --><div style="position:relative;width:100%;aspect-ratio:16/9;overflow:hidden"><iframe src="${url}" title="Solving by Square Roots — SUMMIT MATH video lesson" style="position:absolute;inset:0;width:100%;height:100%;border:0" allow="autoplay; fullscreen" allowfullscreen></iframe></div><p class="video-note">English · Teacher-style explanation · Square-root rule · Worked examples · Desmos verification · Quick check</p></div>`;
 html=html.replace(old,body);fs.writeFileSync(file,html);
}
console.log('Embedded Solving by Square Roots explainer');
