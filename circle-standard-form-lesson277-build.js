'use strict';
const fs=require('fs'),path=require('path');
const d=require('./circle-standard-form-lesson277-data.json');
const e=require('./circle-standard-form-lesson277-explanation.json');
if(d.index!==277||d.practice.length!==18||d.test.length!==5||e.sections.length!==16)throw Error('Lesson 277 invalid counts');
const base=path.join(__dirname,'dist',d.base);
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const nav=['explanation','problems','answers','test','video/english','video/arabic'].map(x=>'<a href="/'+d.base+'/'+x+'/">'+x+'</a>').join(' · ');
const shell=(type,body)=>'<!doctype html><html lang="en"><head><meta charset="utf-8"><link rel="stylesheet" href="/styles.css"><title>Standard Form — '+type+'</title></head><body><main class="page-shell"><section class="lesson-card"><div class="crumb">Geometry and Trigonometry · Circles · Circle Equation</div><div class="page-type">'+type+'</div><div class="lesson-title">Standard Form</div>'+body+'<nav>'+nav+'</nav></section></main></body></html>';
const write=(route,body)=>{const p=path.join(base,route);fs.mkdirSync(p,{recursive:true});fs.writeFileSync(path.join(p,'index.html'),shell(route,body))};
let explanation='<article class="lesson-content"><!-- SUMMIT_RETROFIT:circle-standard-form:BOTH -->';
for(const s of e.sections)explanation+='<section class="lesson-section"><h2>'+esc(s[0])+'</h2><p>'+esc(s[1])+'</p><p>'+esc(s[2])+'</p></section>';
write('explanation',explanation+'</article>');
let problems='',answers='';
for(const [i,q] of d.practice.entries()){if(i===0||i===3||i===11||i===16){problems+='<h2>'+q.group+'</h2>';answers+='<h2>'+q.group+'</h2>'}problems+='<section class="lesson-section"><h3>Question '+(i+1)+'</h3><p>'+esc(q.prompt)+'</p>'+q.choices.map(c=>'<p>'+esc(c)+'</p>').join('')+'</section>';answers+='<section class="lesson-section"><h3>Solution '+(i+1)+'</h3><p>'+esc(q.prompt)+'</p><p>'+esc(q.solution)+'</p><strong>'+esc(q.answer)+'</strong></section>'}
write('problems',problems);write('answers',answers);
write('test',d.test.map((q,i)=>'<section class="lesson-section"><h3>Question '+(i+1)+'</h3><p>'+esc(q.prompt)+'</p></section>').join(''));
console.log('Lesson 277: core routes generated');
