'use strict';
const fs=require('fs'),path=require('path');
const stem='conditional-probability-lesson208-',base='problem-solving-and-data-analysis/probability/conditional-probability';
const files=['skill-check','core-a','core-b1','core-b2','exam-a','exam-b','challenge'];
const q=files.flatMap(s=>require('./'+stem+s+'.json'));
if(q.length!==18||q.some((v,i)=>v.index!==i+1||Math.abs(v.answer-(v.qa[2]==='multiply'?v.qa[0]*v.qa[1]:v.qa[0]/v.qa[1]))>1e-8))throw Error('Practice math QA');
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
for(const kind of ['problems','answers']){
 const html='<!doctype html><html lang="en"><meta charset="utf-8"><link rel="stylesheet" href="/styles.css"><title>Conditional Probability</title><main class="page-shell"><section class="lesson-card"><h1>Conditional Probability — '+kind+'</h1>'+q.map(v=>'<section><h2>Question '+v.index+' — '+v.group+'</h2><p>'+esc(v.prompt)+'</p>'+(kind==='answers'?'<p>'+esc(v.solution)+'</p><b>Answer: '+v.answer+'</b>':'<input type="number" step="any" aria-label="Question '+v.index+'">')+'</section>').join('')+'</section></main></html>';
 const dir=path.join('dist',base,kind);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html);
}
console.log('Lesson 208 practice/answers 18/18');