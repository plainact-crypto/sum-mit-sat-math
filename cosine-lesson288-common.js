'use strict';
const fs=require('fs'),path=require('path');
const data=require('./cosine-lesson288-math-data.json');
const explanations=require('./cosine-lesson288-explanation.json');
const videos=require('./cosine-lesson288-videos.json');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const routes=['explanation','problems','answers','test','video/english','video/arabic'];
function page(kind,body,lang='en'){
const nav=routes.map(r=>'<a href="/'+data.base+'/'+r+'/">'+r+'</a>').join(' | ');
return '<!doctype html><html lang="'+lang+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>Cosine | SUMMIT MATH</title></head><body><header class="topbar"><a class="brand" href="/">SUMMIT MATH</a></header><main class="page-shell"><section class="lesson-card"><div class="crumb">Geometry and Trigonometry · Right-Triangle Trigonometry</div><div class="page-type">'+kind+'</div><div class="lesson-title">Cosine</div><article class="lesson-content">'+body+'</article><nav>'+nav+'</nav></section></main></body></html>';
}
function write(route,html){const dir=path.join(__dirname,'dist',data.base,route);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html)}
module.exports={data,explanations,videos,esc,page,write};
