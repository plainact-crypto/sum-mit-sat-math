'use strict';
const fs=require('fs'),path=require('path');
const p='abcdefghij'.split('').flatMap(c=>require('./general-form-lesson282-practice-'+c+'.json'));
const t='abc'.split('').flatMap(c=>require('./general-form-lesson282-test-'+c+'.json'));
const base='geometry-and-trigonometry/circles/circle-equation/general-form',root=path.join(__dirname,'dist',base);
if(p.length!==18||t.length!==5)throw Error('count mismatch');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nav=['explanation','problems','answers','test','video/english','video/arabic'].map(x=>'<a href="/'+base+'/'+x+'/">'+esc(x)+'</a>').join(' · ');
function shell(type,body){return '<!doctype html><html lang="en" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>General Form — '+esc(type)+' | SUMMIT SAT MATH</title></head><body><header class="topbar"><a class="brand" href="/">SUMMIT <small>SAT MATH</small></a><nav><a href="/#subjects">Subjects</a></nav></header><main class="page-shell"><section class="lesson-card"><div class="crumb">Geometry and Trigonometry · Circles · Circle Equation</div><div class="page-type">'+esc(type)+'</div><div class="lesson-title">General Form</div>'+body+'<nav class="next-links">'+nav+'</nav></section></main></body></html>';}
function write(type,body){const dir=path.join(root,type);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),shell(type==='problems'?'Practice Problems':type==='answers'?'Answers & Solutions':'Lesson Test',body));}
function card(q,i,mode){return '<section class="lesson-section"><h3>Question '+(i+1)+'</h3><p>'+esc(q.prompt)+'</p>'+q.choices.map((c,j)=>'<label style="display:block;padding:8px"><input type="radio" name="q'+i+'" value="'+j+'"> '+esc(c)+'</label>').join('')+(mode==='practice'?'<button type="button" data-check="'+i+'">Check answer</button><p role="status" id="feedback'+i+'"></p>':'')+'</section>';}
let problems='<article class="lesson-content">',answers='<article class="lesson-content">';
p.forEach((q,i)=>{if([0,3,11,16].includes(i)){problems+='<h2>'+esc(q.group)+'</h2>';answers+='<h2>'+esc(q.group)+'</h2>';}problems+=card(q,i,'practice');answers+='<section class="lesson-section"><h3>Solution '+(i+1)+'</h3><p>'+esc(q.prompt)+'</p><p>'+esc(q.solution)+'</p><strong>Answer: '+esc(q.answer)+'</strong></section>';});
const pk=p.map(q=>q.choices.indexOf(q.answer));
problems+='</article><script>(()=>{const key='+JSON.stringify(pk)+';document.querySelectorAll("[data-check]").forEach(b=>b.addEventListener("click",()=>{const i=Number(b.dataset.check),v=document.querySelector("input[name=q"+i+"]:checked");document.getElementById("feedback"+i).textContent=!v?"Choose an answer first.":Number(v.value)===key[i]?"Correct.":"Try again."; }));})();</script>';
write('problems',problems);write('answers',answers+'</article>');
let test='<article class="lesson-content"><p>Answer all five questions before submitting. Correct answers and explanations are shown only after final submission.</p>';
t.forEach((q,i)=>{test+='<h3>'+esc(q.group)+'</h3>'+card(q,i,'test');});
test+='<button id="submit-test" type="button">Submit Test</button><div id="test-result" role="status" aria-live="polite"></div></article>';
const tk=t.map(q=>q.choices.indexOf(q.answer)),review=t.map(q=>({answer:q.answer,solution:q.solution}));
test+='<script>(()=>{const key='+JSON.stringify(tk)+',review='+JSON.stringify(review)+';let submitted=false;document.getElementById("submit-test").onclick=()=>{if(submitted)return;const picks=key.map((_,i)=>document.querySelector("input[name=q"+i+"]:checked"));if(picks.some(x=>!x)){document.getElementById("test-result").textContent="Answer all five questions first.";return;}submitted=true;let score=0;const lines=picks.map((x,i)=>{const ok=Number(x.value)===key[i];if(ok)score++;return "<p>Question "+(i+1)+": "+(ok?"Correct. ":"Review. ")+"Answer: "+review[i].answer+". "+review[i].solution+"</p>";});document.querySelectorAll("input[type=radio]").forEach(x=>x.disabled=true);document.getElementById("submit-test").disabled=true;document.getElementById("test-result").innerHTML="<h2>Score: "+score+"/5</h2>"+lines.join("");};})();</script>';
write('test',test);console.log('Lesson 282 practice 18, answers 18, progressive test 5.');

