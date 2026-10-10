const fs=require('fs'),path=require('path'),zlib=require('zlib');
const d=JSON.parse(fs.readFileSync(path.join(__dirname,'vertical-translation-content.json'),'utf8'));
const c=JSON.parse(zlib.gunzipSync(Buffer.from(fs.readFileSync(path.join(__dirname,'curriculum.json.gz.b64'),'utf8').trim(),'base64')).toString('utf8'));
const all=[];for(const s of c)for(const sec of s.sections||[]){for(const l of sec.leaves||[])all.push([s,sec,null,l]);for(const g of sec.groups||[])for(const l of g.leaves||[])all.push([s,sec,g,l]);}
const ix=all.findIndex(a=>a[3].title===d.title&&a[3].slug===d.slug);
if(ix<0||ix+1!==d.index||(ix+1)%5!==2)throw Error('Canonical index/ownership mismatch');
const [s,sec,g,l]=all[ix];
if(s.title!==d.location[0]||sec.title!==d.location[1]||(g&&g.title)!==d.location[2])throw Error('Canonical curriculum location mismatch');
const base=path.join(__dirname,'dist',l.base.replace(/^\/|\/$/g,''));
const esc=x=>String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const groups=[['Skill Check',3],['Core Practice',8],['Exam-Style',5],['Challenge',2]];
let n=0;for(const [name,size] of groups)for(let i=0;i<size;i++){const q=d.practice[n];if(!q||q.number!==n+1||q.group!==name||!q.solution||!q.answer)throw Error('Practice QA '+n);n++;}
if(n!==18||d.practice.length!==18||d.test.length!==5||d.test.some((q,i)=>q.number!==i+1||q.options.length!==4||q.correct<0||q.correct>3))throw Error('Test QA');
function page(kind,body,lang='en'){
const links=['explanation','problems','answers','test','video/english','video/arabic'].map(x=>'<a href="/'+l.base.replace(/^\/|\/$/g,'')+'/'+x+'/">'+esc(x)+'</a>').join(' · ');
return '<!doctype html><html lang="'+lang+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>'+esc(d.title+' — '+kind)+'</title><style>.vt-item{border:1px solid #cbd5e1;border-radius:12px;padding:15px;margin:12px 0}.vt-chart{max-width:100%;height:auto}.vt-option{display:block;margin:8px 0;padding:8px;border:1px solid #ccd;border-radius:8px}.vt-links{display:flex;flex-wrap:wrap;gap:12px}</style></head><body><header class="topbar"><a class="brand" href="/">SUMMIT <small>SAT MATH</small></a><nav><a href="/">Home</a><a href="/#subjects">Subjects</a><a href="/#subjects">Practice</a></nav></header><main class="page-shell"><section class="lesson-card"><div class="crumb">'+esc(d.location.join(' · '))+'</div><div class="page-type">'+esc(kind)+'</div><div class="lesson-title">'+esc(d.title)+'</div><div class="subject-label">'+esc(s.title)+'</div><article class="lesson-content">'+body+'</article><div class="vt-links">'+links+'</div></section></main></body></html>';
}
function save(route,html){const p=path.join(base,route,'index.html');fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,html);}
module.exports={d,ix,l,base,esc,groups,page,save};
