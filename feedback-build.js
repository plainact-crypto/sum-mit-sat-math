const fs=require('fs');const path=require('path');
const root=__dirname,dist=path.join(root,'dist');
fs.copyFileSync(path.join(root,'feedback-widget.js'),path.join(dist,'feedback-widget.js'));
const inject='<script src="/sum-mit-sat-math/feedback-widget.js"></script>';
function walk(p){for(const name of fs.readdirSync(p)){const f=path.join(p,name),st=fs.statSync(f);if(st.isDirectory())walk(f);else if(name==='index.html'){let h=fs.readFileSync(f,'utf8');if(!/\/(explanation|problems|answers|test|video\/arabic|video\/english)\/?$/.test('/'+path.relative(dist,path.dirname(f)).replace(/\\/g,'/')))continue;if(!h.includes('feedback-widget.js')){h=h.replace('</body>',inject+'</body>');fs.writeFileSync(f,h)}}}}
walk(dist);
console.log('Feedback widget injected into lesson pages.');