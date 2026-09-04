const fs=require('fs');const path=require('path');
const root=__dirname,dist=path.join(root,'dist');
fs.copyFileSync(path.join(root,'progress-tracker.js'),path.join(dist,'progress-tracker.js'));
const inject='<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script><script src="/progress-tracker.js"></script>';
function walk(p){for(const name of fs.readdirSync(p)){const f=path.join(p,name),st=fs.statSync(f);if(st.isDirectory())walk(f);else if(name==='index.html'){let h=fs.readFileSync(f,'utf8');if(!h.includes('/progress-tracker.js')){h=h.replace('</body>',inject+'</body>');fs.writeFileSync(f,h)}}}}
walk(dist);