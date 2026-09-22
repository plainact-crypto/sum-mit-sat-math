const fs=require('fs');
const path=require('path');
const dist=path.join(__dirname,'dist');
const route=path.join(dist,'advanced-math','quadratic-equations','sum-of-roots','video','english','index.html');
if(!fs.existsSync(route)) throw new Error('Sum of Roots English video route missing');
let html=fs.readFileSync(route,'utf8');
const marker='SUMMIT_EXPLAINER:sum-of-roots';
if(!html.includes(marker)){
  const oldBody='<div class="soon">VIDEO PAGE</div><p class="video-note">This is a separate independent video route for this lesson. Video content can be added here without changing Explanation, Problems, or Answers.</p>';
  if(!html.includes(oldBody)) throw new Error('Sum of Roots video placeholder not found');
  const style='<style>.summit-video-shell{margin:22px 0 8px;max-width:100%}.summit-explainer-frame{position:relative;width:100%;aspect-ratio:16/9;border-radius:22px;overflow:hidden;background:#0f172a;box-shadow:0 18px 45px rgba(20,36,61,.16)}.summit-explainer-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:#fff}.summit-explainer-actions{display:flex;justify-content:flex-end;margin-top:10px}.summit-explainer-actions a{display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:999px;background:#14243d;color:#fff;text-decoration:none;font-weight:800}.video-note{text-align:center;margin:12px 0 0;color:#697386;font-size:.95rem}@media(max-width:640px){.summit-explainer-frame{border-radius:18px}.summit-explainer-actions a{width:100%}}</style>';
  const url='https://scrimba.com/explain/guide01vcc2dmq?claim=jfsa20nfnc8l32sk&fullscreen=1';
  const body='<div class="summit-video-shell summit-explainer-player" data-desmos-aligned="true"><!-- '+marker+' --><div class="summit-explainer-frame"><iframe src="'+url+'" title="Sum of Roots — SUMMIT MATH video lesson" loading="eager" allow="autoplay; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><div class="summit-explainer-actions"><a href="'+url+'" target="_blank" rel="noopener">Open full-screen lesson ↗</a></div><p class="video-note">English · Sum of roots −b/a · Worked examples · Parameter questions · Quick check</p></div>'+style;
  html=html.replace(oldBody,body);
  fs.writeFileSync(route,html);
}
console.log('Embedded Sum of Roots English explainer');