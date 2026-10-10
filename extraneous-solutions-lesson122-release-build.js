const fs=require('fs'),path=require('path');
const base=path.join(__dirname,'dist/advanced-math/nonlinear-equations-and-functions/extraneous-solutions');
const content=JSON.parse(fs.readFileSync(path.join(__dirname,'extraneous-solutions-lesson122-video-content.json'),'utf8'));
function write(route,html){const d=path.join(base,route);fs.mkdirSync(d,{recursive:true});fs.writeFileSync(path.join(d,'index.html'),html);}
for(const lang of ['english','arabic']){
const scenes=content[lang];if(scenes.length!==12)throw Error('Missing full lesson scenes');
const body=scenes.map((s,i)=>'<section><h2>'+(i+1)+'. '+s.title+'</h2><p>'+s.narration+'</p><p dir="ltr">'+s.math+'</p></section>').join('');
write('video/'+lang,'<!doctype html><html lang="'+(lang==='arabic'?'ar':'en')+'"><head><meta charset="utf-8"><link rel="stylesheet" href="/styles.css"><title>Extraneous Solutions full lesson</title></head><body><main class="page-shell"><section class="lesson-card"><h1>Extraneous Solutions — '+lang+'</h1>'+body+'<a href="../../explanation/">Explanation</a> · <a href="../../problems/">Practice</a> · <a href="../../answers/">Answers</a> · <a href="../../test/">Test</a></section></main></body></html>');
}
write('video','<!doctype html><html><head><meta charset="utf-8"></head><body><main><h1>Extraneous Solutions — Full Lesson</h1><a href="./english/">English</a> · <a href="./arabic/">Arabic</a></main></body></html>');
console.log('Lesson 122 full lesson bilingual video content built');
