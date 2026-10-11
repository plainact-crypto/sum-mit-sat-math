'use strict';
const fs=require('fs'),path=require('path');
const math=require('./sector-area-lesson273-math-data.json');
const explanation=require('./sector-area-lesson273-explanation.json');
const videos=require('./sector-area-lesson273-videos.json');
const routes=['explanation','problems','answers','test','video/english','video/arabic'];
const escapeHTML=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const links=routes.map(route=>'<a href="/'+math.base+'/'+route+'/">'+escapeHTML(route)+'</a>').join(' · ');
function page(kind,body,lang='en'){
const header='<header class="topbar"><a class="brand" href="/"><span class="brand-mark"></span><span class="brand-copy">SUMMIT<small>SAT MATH</small></span></a><nav><a href="/">Home</a><a href="/#subjects">Subjects</a><a href="/#subjects">Practice</a><a href="/#subjects">Progress</a></nav></header>';
return '<!doctype html><html lang="'+lang+'" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>'+escapeHTML(math.title)+' — '+escapeHTML(kind)+' | SUMMIT SAT MATH</title></head><body>'+header+'<main class="page-shell"><section class="lesson-card"><div class="crumb">'+escapeHTML(math.subject)+' · '+escapeHTML(math.section)+'</div><div class="page-type">'+escapeHTML(kind)+'</div><div class="lesson-title">'+escapeHTML(math.title)+'</div><article class="lesson-content">'+body+'</article><nav aria-label="Lesson routes">'+links+'</nav><a class="back" href="/#subjects">← Back to curriculum tree</a></section></main></body></html>';
}
function write(route,html){if(!routes.includes(route))throw Error('Unknown lesson route '+route);const dir=path.join(__dirname,'dist',math.base,route);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html);}
module.exports={math,explanation,videos,routes,escapeHTML,page,write};