const fs=require('fs');const path=require('path');
const root=__dirname,dist=path.join(root,'dist');
fs.copyFileSync(path.join(root,'feedback-widget.js'),path.join(dist,'feedback-widget.js'));
fs.copyFileSync(path.join(root,'feedback-email-hook.js'),path.join(dist,'feedback-email-hook.js'));
// Keep these root-relative here. brand-guard.js rewrites them once for GitHub Pages.
// Using the project base here caused it to be applied twice in production.
const inject='<script src="/feedback-email-hook.js"></script><script src="/feedback-widget.js"></script>';
let injected=0;
function walk(p){for(const name of fs.readdirSync(p)){const f=path.join(p,name),st=fs.statSync(f);if(st.isDirectory())walk(f);else if(name==='index.html'){let h=fs.readFileSync(f,'utf8');if(!/\/(explanation|problems|answers|test|video\/arabic|video\/english)\/?$/.test('/'+path.relative(dist,path.dirname(f)).replace(/\\/g,'/')))continue;if(!h.includes('feedback-widget.js')){h=h.replace('</body>',inject+'</body>');fs.writeFileSync(f,h);injected++}}}}
walk(dist);
console.log(`Feedback widget + email hook injected into ${injected} lesson pages.`);
