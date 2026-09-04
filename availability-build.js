const fs=require('fs');
const path=require('path');
const root=__dirname,dist=path.join(root,'dist');
const schedule=JSON.parse(fs.readFileSync(path.join(dist,'schedule.json'),'utf8'));
const byBase=new Map();
for(const row of schedule){
  const base=row.route.replace(/\/(explanation|problems|answers)\/$/,'/');
  if(!byBase.has(base))byBase.set(base,{base,scheduledComplete:null});
  const rec=byBase.get(base);
  if(!rec.scheduledComplete||new Date(row.cairo)>new Date(rec.scheduledComplete))rec.scheduledComplete=row.cairo;
}
function ready(route){
  const f=path.join(dist,route.replace(/^\//,''),'index.html');
  if(!fs.existsSync(f))return false;
  const h=fs.readFileSync(f,'utf8');
  return !/COMING SOON|Scheduled release/i.test(h);
}
const rows=[];
for(const rec of byBase.values()){
  const states={
    explanation:ready(rec.base+'explanation/'),
    practice:ready(rec.base+'problems/'),
    answers:ready(rec.base+'answers/'),
    test:ready(rec.base+'test/')
  };
  const count=Object.values(states).filter(Boolean).length;
  rows.push({...rec,states,readyCount:count,total:4,complete:count===4});
}
fs.writeFileSync(path.join(dist,'lesson-availability.json'),JSON.stringify(rows,null,2));

// Render readiness inside the existing curriculum renderer. No observer, no fetch,
// no extra runtime loop: the build embeds a tiny lookup table into dist/app.js.
const appPath=path.join(dist,'app.js');
if(fs.existsSync(appPath)){
  let app=fs.readFileSync(appPath,'utf8');
  const compact=rows.map(r=>[r.base,!!r.complete,r.scheduledComplete||null]);
  const helper=`const __lessonAvailability=new Map(${JSON.stringify(compact)}.map(([b,c,d])=>[String(b).replace(/\\/$/,'')+'/',{complete:c,date:d}]));\nfunction availabilityBadge(base){const key=String(base||'').replace(/\\/$/,'')+'/';const rec=__lessonAvailability.get(key);if(!rec)return '';if(rec.complete)return '<div class="lesson-content-status ready"><span class="dot"></span><b>Content 100% ready</b></div>';let meta='Scheduled';if(rec.date){try{const d=new Date(rec.date);const a=new Intl.DateTimeFormat('en',{timeZone:'Africa/Cairo',month:'short',day:'numeric'}).format(d);const t=new Intl.DateTimeFormat('en',{timeZone:'Africa/Cairo',hour:'numeric',minute:'2-digit',hour12:true}).format(d);meta='Completes '+a+' · '+t}catch{}}return '<div class="lesson-content-status scheduled"><span class="dot"></span><b>Content still being completed</b><small>'+meta+'</small></div>';}\n`;
  if(!app.includes('const __lessonAvailability=')) app=helper+app;
  const marker='<div class="mini-progress"><span style="width:${pct}%"></span></div><div class="lesson-states">';
  const replacement='<div class="mini-progress"><span style="width:${pct}%"></span></div>${availabilityBadge(l.base)}<div class="lesson-states">';
  if(!app.includes(replacement)){
    if(!app.includes(marker))throw new Error('Availability injection marker not found in dist/app.js');
    app=app.replace(marker,replacement);
  }
  fs.writeFileSync(appPath,app);
}

const cssPath=path.join(dist,'styles.css');
if(fs.existsSync(cssPath)){
  let css=fs.readFileSync(cssPath,'utf8');
  if(!css.includes('.lesson-content-status{')){
    css+=`\n.lesson-content-status{display:flex;align-items:center;gap:7px;margin:10px 0 4px;padding:9px 11px;border-radius:12px;font-size:12px;font-weight:800;line-height:1.25;border:1px solid var(--line,#d8dee8);background:var(--card,#fff);color:var(--muted,#617083)}.lesson-content-status.ready{color:#147a46;border-color:rgba(20,122,70,.25);background:rgba(20,122,70,.08)}.lesson-content-status.scheduled{color:#805b12;border-color:rgba(128,91,18,.24);background:rgba(199,150,42,.10)}.lesson-content-status .dot{width:8px;height:8px;border-radius:50%;background:currentColor;display:inline-block;flex:0 0 auto}.lesson-content-status b{font-weight:900}.lesson-content-status small{font-size:11px;font-weight:700;opacity:.78;margin-left:auto}@media(max-width:700px){.lesson-content-status{width:100%;box-sizing:border-box}.lesson-content-status.scheduled{align-items:flex-start;flex-wrap:wrap}.lesson-content-status small{display:block;width:100%;margin-left:15px}}\n`;
    fs.writeFileSync(cssPath,css);
  }
}

const index=path.join(dist,'index.html');
if(fs.existsSync(index)){
  let html=fs.readFileSync(index,'utf8');
  html=html.replace(/<script[^>]+availability-ui\.js[^>]*><\/script>/gi,'');
  fs.writeFileSync(index,html);
}
console.log(`Lesson availability rendered safely for ${rows.length} lessons.`);
