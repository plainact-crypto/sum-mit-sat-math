const fs=require('fs'),path=require('path');
const data=require('./finding-x-intercept-lesson12-full-scenes.json');
const base='dist/algebra/linear-equations-in-two-variables/finding-x-intercept/video';
for(const lang of ['english','arabic']){
 const scenes=data[lang];
 if(scenes.length!==12)throw Error('Expected 12 chapters');
 const cards=scenes.map(([title,words],i)=>'<section><h2>'+String(i+1)+'. '+title+'</h2><p>'+words+'</p></section>').join('');
 const html='<!doctype html><html lang="'+(lang==='arabic'?'ar':'en')+'"><head><meta charset="utf-8"><link rel="stylesheet" href="/styles.css"><title>Finding X-Intercept Full Lesson</title></head><body><main class="page-shell"><h1>Finding X-Intercept — '+lang+'</h1>'+cards+'</main></body></html>';
 const target=path.join(__dirname,base,lang,'index.html');
 fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,html);
}
