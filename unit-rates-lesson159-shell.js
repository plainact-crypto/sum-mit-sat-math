'use strict';
const {fs,path}=require('./unit-rates-lesson159-data-loader');
const base='problem-solving-and-data-analysis/rates/unit-rates';
const routes=['explanation','problems','answers','test','video/english','video/arabic'];
const escapeText=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const scriptData=x=>JSON.stringify(x).replace(/</g,'\\u003c');
function write(route,body,language='en'){
 const names={explanation:'Explanation',problems:'Practice Problems',answers:'Answers & Solutions',test:'Lesson Test','video/english':'Full Lesson Video - English','video/arabic':'Full Lesson Video - Arabic'};
 const links=routes.map(r=>'<a href="/'+base+'/'+r+'/">'+r+'</a>').join(' | ');
 const html='<!doctype html><html lang="'+language+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>Unit Rates - '+names[route]+' | SUMMIT MATH</title></head><body><header class="topbar"><a class="brand" href="/">SUMMIT<small>MATH</small></a></header><main class="page-shell"><section class="lesson-card"><div class="crumb">Problem-Solving and Data Analysis - Rates</div><div class="page-type">'+names[route]+'</div><div class="lesson-title">Unit Rates</div><article class="lesson-content" '+(language==='ar'?'dir="rtl"':'')+'>'+body+'</article><nav>'+links+'</nav></section></main></body></html>';
 const file=path.join(__dirname,'dist',base,route,'index.html');fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,html);return file;
}
module.exports={base,routes,escapeText,scriptData,write};
