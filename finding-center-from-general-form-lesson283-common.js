'use strict';
const fs=require('fs'),path=require('path');
const data=require('./finding-center-from-general-form-lesson283-math-data.json');
const explanations=require('./finding-center-from-general-form-lesson283-explanation.json');
const videos=require('./finding-center-from-general-form-lesson283-videos.json');
const routes=['explanation','problems','answers','test','video/english','video/arabic'];
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function page(kind,body,lang='en'){
const links=routes.map(r=>'<a href="/'+data.base+'/'+r+'/">'+esc(r)+'</a>').join(' · ');
return '<!doctype html><html lang="'+lang+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>'+esc(data.title)+' — '+esc(kind)+' | SUMMIT MATH</title></head><body><header class="topbar"><a class="brand" href="/">SUMMIT MATH</a><nav><a href="/">Home</a><a href="/#subjects">Subjects</a></nav></header><main class="page-shell"><section class="lesson-card"><div class="crumb">'+esc(data.subject)+' · '+esc(data.section)+'</div><div class="page-type">'+esc(kind)+'</div><div class="lesson-title">'+esc(data.title)+'</div><article class="lesson-content">'+body+'</article><nav>'+links+'</nav></section></main></body></html>';
}
function write(route,html){if(!routes.includes(route))throw Error('Unknown route');const dir=path.join(__dirname,'dist',data.base,route);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html)}
module.exports={data,explanations,videos,esc,page,write};
