'use strict';
const fs=require('fs'),path=require('path');
const d=require('./line-of-best-fit-lesson200-data.json');
const root=path.join(__dirname,'dist',d.base);
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
function shell(type,body){const nav=['explanation','problems','answers','test','video/english','video/arabic'].map(x=>'<a href="/'+d.base+'/'+x+'/">'+x+'</a>').join(' · ');return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>'+d.title+' — '+type+' | SUMMIT SAT MATH</title></head><body><main class="page-shell"><section class="lesson-card"><div class="crumb">Problem Solving and Data Analysis · Two-Variable Data</div><div class="page-type">'+type+'</div><h1>'+d.title+'</h1>'+body+'<nav>'+nav+'</nav></section></main></body></html>'}
const groups=[0,3,11,16];
const problems=shell('Practice Problems',d.practice.map((x,i)=>(groups.includes(i)?'<h2>'+esc(x.group)+'</h2>':'')+'<section class="question"><h3>Question '+(i+1)+'</h3><p>'+esc(x.prompt)+'</p><input aria-label="Answer '+(i+1)+'" data-answer="'+x.answer+'"><button onclick="const a=this.previousElementSibling;this.nextElementSibling.textContent=String(a.value).trim().toUpperCase()===String(a.dataset.answer).trim().toUpperCase()?\'Correct\':\'Try again\'">Check</button><p role="status"></p></section>').join(''));
const answers=shell('Answers & Solutions',d.practice.map((x,i)=>(groups.includes(i)?'<h2>'+esc(x.group)+'</h2>':'')+'<section class="solution"><h3>Solution '+(i+1)+'</h3><p>'+esc(x.prompt)+'</p><p>'+esc(x.solution)+'</p><strong>'+x.answer+'</strong></section>').join(''));
for(const [name,html] of [['problems',problems],['answers',answers]]){const dir=path.join(root,name);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html)}
console.log('Lesson 200: 18 practice and 18 aligned solutions');
