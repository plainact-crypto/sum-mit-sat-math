const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const root = __dirname;
const out = path.join(root, 'dist');
const curriculumRaw = zlib.gunzipSync(Buffer.from(fs.readFileSync(path.join(root, 'curriculum.json.gz.b64'), 'utf8').trim(), 'base64')).toString('utf8');
const curriculum = JSON.parse(curriculumRaw);
const copyFiles = ['index.html', 'styles.css', 'app.js'];

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
for (const file of copyFiles) fs.copyFileSync(path.join(root, file), path.join(out, file));
fs.writeFileSync(path.join(out, 'curriculum.json'), curriculumRaw);

const leaves = [];
for (const subject of curriculum) {
  for (const section of subject.sections || []) {
    for (const leaf of section.leaves || []) leaves.push({subject, section, group: null, leaf});
    for (const group of section.groups || []) for (const leaf of group.leaves || []) leaves.push({subject, section, group, leaf});
  }
}

const start = Date.UTC(2026, 8, 3, 17, 12, 0);
let slot = 0;
const schedule = [];
const routes = new Set();
const collisions = [];
const subjectLeafCounts = {};
const esc = s => String(s).replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
const themeScript = `<script>(()=>{const s=localStorage.getItem("summit-theme")||"light";document.documentElement.dataset.theme=s;document.getElementById("themeToggle")?.addEventListener("click",()=>{const n=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=n;localStorage.setItem("summit-theme",n)})})();</script>`;
const header = `<header class="topbar"><a class="brand" href="/"><span class="brand-mark"></span><span class="brand-copy">SUMMIT<small>SAT MATH</small></span></a><nav><a href="/">Home</a><a href="/#subjects">Subjects</a><a href="/#subjects">Practice</a><a href="/#subjects">Progress</a></nav><div class="actions"><button class="lang">EN <span>|</span> عربي</button><button id="themeToggle" class="theme">◐</button></div></header>`;
function cairoParts(ms){const d=new Date(ms);const date=new Intl.DateTimeFormat('en-US',{timeZone:'Africa/Cairo',month:'long',day:'numeric',year:'numeric'}).format(d);const time=new Intl.DateTimeFormat('en-US',{timeZone:'Africa/Cairo',hour:'numeric',minute:'2-digit',hour12:true}).format(d);const isoLocal=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(d).replace(', ','T');return{date,time,isoLocal}}
function writeRoute(route,html){if(routes.has(route))collisions.push(route);routes.add(route);const dir=path.join(out,route.replace(/^\//,''));fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html)}
function pageShell(title,crumb,pageType,lessonTitle,subjectTitle,body){return `<!doctype html><html lang="en" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>${esc(title)} | SUMMIT SAT MATH</title></head><body>${header}<main class="page-shell"><section class="coming-card"><div class="crumb">${esc(crumb)}</div><div class="page-type">${esc(pageType)}</div><div class="lesson-title">${esc(lessonTitle)}</div><div class="subject-label">${esc(subjectTitle)}</div>${body}<a class="back" href="/#subjects">← Back to curriculum tree</a></section></main>${themeScript}</body></html>`}
for(const item of leaves){const{subject,section,group,leaf}=item;subjectLeafCounts[subject.title]=(subjectLeafCounts[subject.title]||0)+1;const crumb=[subject.title,section.title,group&&group.title].filter(Boolean).join(' · ');const base=leaf.base.replace(/\/$/,'');for(const type of ['Explanation','Problems','Answers']){const ms=start+slot*12*60*1000;const p=cairoParts(ms);const route=`${base}/${type.toLowerCase()}/`;const body=`<div class="soon">COMING SOON</div><div class="release"><div><small>Scheduled release</small><strong>${esc(p.date)}</strong></div><div><small>Cairo time (UTC+3)</small><strong>${esc(p.time)}</strong></div></div>`;writeRoute(route,pageShell(`${leaf.title} — ${type}`,crumb,type,leaf.title,subject.title,body));schedule.push({index:slot+1,subject:subject.title,section:section.title,group:group?group.title:null,lesson:leaf.title,pageType:type,route,cairo:`${p.isoLocal}+03:00`,timezone:'Africa/Cairo'});slot++}for(const lang of [['arabic','Arabic / عربي'],['english','English']]){const route=`${base}/video/${lang[0]}/`;const pageType=`Video Explanation · ${lang[1]}`;const body=`<div class="soon">VIDEO PAGE</div><p class="video-note">This is a separate independent video route for this lesson. Video content can be added here without changing Explanation, Problems, or Answers.</p>`;writeRoute(route,pageShell(`${leaf.title} — ${lang[1]} Video`,crumb,pageType,leaf.title,subject.title,body))}}
const first=cairoParts(start);const last=cairoParts(start+(slot-1)*12*60*1000);const audit={leafCount:leaves.length,totalLessonRoutes:leaves.length*5,scheduledPages:slot,videoPages:leaves.length*2,firstRelease:`${first.isoLocal}+03:00 Africa/Cairo`,lastRelease:`${last.isoLocal}+03:00 Africa/Cairo`,routeCollisions:collisions,subjectLeafCounts};fs.writeFileSync(path.join(out,'schedule.json'),JSON.stringify(schedule,null,2));const csvHeader='index,subject,section,group,lesson,pageType,route,cairo,timezone\n';const q=v=>`"${String(v??'').replace(/"/g,'""')}"`;const csv=csvHeader+schedule.map(r=>[r.index,r.subject,r.section,r.group,r.lesson,r.pageType,r.route,r.cairo,r.timezone].map(q).join(',')).join('\n')+'\n';fs.writeFileSync(path.join(out,'schedule.csv'),csv);fs.writeFileSync(path.join(out,'audit.json'),JSON.stringify(audit,null,2));if(leaves.length!==298||slot!==894||routes.size!==1490||collisions.length){console.error(audit);process.exit(1)}console.log(JSON.stringify(audit,null,2));
