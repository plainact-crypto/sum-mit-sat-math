const fs=require('fs'),path=require('path');
const dist=path.join(__dirname,'dist');
const route=path.join(dist,'advanced-math/quadratic-equations/discriminant/video/english/index.html');
const oldBody='<div class="soon">VIDEO PAGE</div><p class="video-note">This is a separate independent video route for this lesson. Video content can be added here without changing Explanation, Problems, or Answers.</p>';
if(!fs.existsSync(route))throw new Error('Missing Discriminant English video route');
let html=fs.readFileSync(route,'utf8');
if(!html.includes('<div class="lesson-title">Discriminant</div>'))throw new Error('Wrong lesson at Discriminant video route');
if(html.includes('SUMMIT_EXPLAINER:discriminant')){console.log('Discriminant explainer already embedded.');process.exit(0)}
if(!html.includes(oldBody))throw new Error('Discriminant video placeholder marker not found');
const url='https://scrimba.com/explain/guide0af0omjrp?claim=5u0c1l0h4upljhns&fullscreen=1';
const style='<style>.summit-video-shell{margin:22px 0 8px;max-width:100%}.summit-explainer-frame{position:relative;width:100%;aspect-ratio:16/9;border-radius:22px;overflow:hidden;background:#0f172a;box-shadow:0 18px 45px rgba(20,36,61,.16)}.summit-explainer-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:#fff}.summit-explainer-actions{display:flex;justify-content:flex-end;margin-top:10px}.summit-explainer-actions a{display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:999px;background:#14243d;color:#fff;text-decoration:none;font-weight:800}.video-note{text-align:center;margin:12px 0 0;color:#697386;font-size:.95rem}@media(max-width:640px){.summit-explainer-frame{border-radius:18px}.summit-explainer-actions a{width:100%}}</style>';
const body='<div class="summit-video-shell summit-explainer-player" data-graph-aligned="false" data-desmos-aligned="true"><!-- SUMMIT_EXPLAINER:discriminant --><div class="summit-explainer-frame"><iframe src="'+url+'" title="Discriminant — SUMMIT MATH video lesson" loading="eager" allow="autoplay; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><div class="summit-explainer-actions"><a href="'+url+'" target="_blank" rel="noopener">Open full-screen lesson ↗</a></div><p class="video-note">English · Teacher-style explanation · Worked examples · Verified root graph · Desmos verification · Quick check</p></div>'+style;
html=html.replace(oldBody,body);fs.writeFileSync(route,html);console.log('Embedded Discriminant English explainer');
