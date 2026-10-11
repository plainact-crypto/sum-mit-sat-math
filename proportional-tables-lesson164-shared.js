'use strict';
const fs=require('fs'),path=require('path');
const base='problem-solving-and-data-analysis/proportional-relationships/proportional-tables';
const routes=['explanation','problems','answers','test','video/english','video/arabic'];
const builders=['proportional-tables-lesson164-explanation-build.js','proportional-tables-lesson164-practice-build.js','proportional-tables-lesson164-test-build.js','proportional-tables-lesson164-video-build.js'];
const manifest=require('./lesson-releases/proportional-tables.json');
function check(v,m){if(!v)throw Error('[Lesson164] '+m)}
check(manifest.lesson==='proportional-tables'&&JSON.stringify(manifest.builders)===JSON.stringify(builders),'release builders');
check(JSON.stringify(manifest.routes)===JSON.stringify(routes.map(r=>'/'+base+'/'+r+'/')),'canonical routes');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safe=x=>JSON.stringify(x).replace(/</g,'\\u003c');
const nav=routes.map(r=>'<a href="/'+base+'/'+r+'/">'+esc(r)+'</a>').join(' · ');
function write(route,body,lang='en'){
 check(routes.includes(route),'unknown route '+route);
 const dir=path.join(__dirname,'dist',base,route);fs.mkdirSync(dir,{recursive:true});
 const label={explanation:'Explanation',problems:'Practice Problems',answers:'Answers & Solutions',test:'Lesson Test','video/english':'Full Lesson Video — English','video/arabic':'Full Lesson Video — Arabic'}[route];
 const html='<!doctype html><html lang="'+lang+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>Proportional Tables — '+label+' | SUMMIT MATH</title></head><body><header class="topbar"><a class="brand" href="/">SUMMIT<small>MATH</small></a></header><main class="page-shell"><section class="lesson-card"><div class="crumb">Problem-Solving and Data Analysis · Proportional Relationships</div><div class="page-type">'+label+'</div><div class="lesson-title">Proportional Tables</div><article class="lesson-content">'+body+'</article><nav aria-label="Lesson pages">'+nav+'</nav></section></main></body></html>';
 check(html.length>1000,'page placeholder');fs.writeFileSync(path.join(dir,'index.html'),html,'utf8');
}
module.exports={base,routes,builders,check,esc,safe,write};
