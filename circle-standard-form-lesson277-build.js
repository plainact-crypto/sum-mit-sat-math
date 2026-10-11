'use strict';
const fs=require('fs'),path=require('path');
const d=require('./circle-standard-form-lesson277-data.json');
const e=require('./circle-standard-form-lesson277-explanation.json');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
if(d.index!==277||d.slug!=='standard-form'||d.practice.length!==18||d.test.length!==5||e.sections.length!==16)throw Error('Lesson 277 invalid metadata/counts');
const base=path.join(__dirname,'dist',d.base),baseUrl='/'+d.base;
const nav=['explanation','problems','answers','test','video/english','video/arabic'].map(x=>'<a href="'+baseUrl+'/'+x+'/">'+esc(x)+'</a>').join(' · ');
const header='<header class="topbar"><a class="brand" href="/"><span class="brand-mark"></span><span class="brand-copy">SUMMIT<small>SAT MATH</small></span></a><nav><a href="/">Home</a><a href="/#subjects">Subjects</a><a href="/#subjects">Practice</a></nav></header>';
const shell=(type,body)=>'<!doctype html><html lang="en" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>Standard Form — '+esc(type)+' | SUMMIT SAT MATH</title></head><body>'+header+'<main class="page-shell"><section class="lesson-card"><div class="crumb">Geometry and Trigonometry · Circles · Circle Equation</div><div class="page-type">'+esc(type)+'</div><div class="lesson-title">Standard Form</div><div class="subject-label">Geometry and Trigonometry</div>'+body+'<nav class="next-links">'+nav+'</nav></section></main></body></html>';
const write=(route,body)=>{const p=path.join(base,route);fs.mkdirSync(p,{recursive:true});fs.writeFileSync(path.join(p,'index.html'),shell(route==='explanation'?'Explanation':route==='problems'?'Practice Problems':route==='answers'?'Answers & Solutions':'Lesson Test',body))};
let explanation='<article class="lesson-content"><!-- SUMMIT_RETROFIT:circle-standard-form:BOTH -->';
for(const [i,s] of e.sections.entries()){const quick=i===14?'<details class="answer-reveal"><summary>Reveal quick-check answers</summary><p>'+esc(s[2])+'</p></details>':'<p class="tip-line">'+esc(s[2])+'</p>';explanation+='<section class="lesson-section"><span class="section-kicker">'+String(i+1).padStart(2,'0')+' · '+esc(s[0])+'</span><h2>'+esc(s[0])+'</h2><p>'+esc(s[1])+'</p>'+quick+'</section>'}
write('explanation',explanation+'</article>');
let problems='<article class="lesson-content">',answers='<article class="lesson-content">';
for(const [i,q] of d.practice.entries()){if([0,3,11,16].includes(i)){problems+='<h2>'+esc(q.group)+'</h2>';answers+='<h2>'+esc(q.group)+'</h2>'}problems+='<section class="lesson-section"><h3>Question '+(i+1)+'</h3><p>'+esc(q.prompt)+'</p>'+q.choices.map(c=>'<p>'+esc(c)+'</p>').join('')+'</section>';answers+='<section class="lesson-section"><h3>Solution '+(i+1)+'</h3><p>'+esc(q.prompt)+'</p><p>'+esc(q.solution)+'</p><strong>Answer: '+esc(q.answer)+'</strong></section>'}
write('problems',problems+'</article>');write('answers',answers+'</article>');
write('test','<article class="lesson-content">'+d.test.map((q,i)=>'<section class="lesson-section"><h3>Question '+(i+1)+'</h3><p>'+esc(q.prompt)+'</p></section>').join('')+'</article>');
console.log('Lesson 277 core: four canonical content routes generated.');
