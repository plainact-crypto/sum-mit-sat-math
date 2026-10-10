const fs=require('fs'),path=require('path'),d=require('./population-parameters-lesson213-data.json');
if(d.practice.length!==18)throw Error('18 practice questions required');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const nav=['explanation','problems','answers','test','video/english','video/arabic'].map(x=>'<a href="/'+d.base+'/'+x+'/">'+x+'</a>').join(' · ');
const page=(type,body)=>'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="/styles.css"><title>'+d.title+' — '+type+'</title></head><body><main class="page-shell"><section class="lesson-card"><div class="crumb">Sampling and Inference</div><h1>'+d.title+'</h1><h2>'+type+'</h2>'+body+'<nav>'+nav+'</nav></section></main></body></html>';
const group=i=>[0,3,11,16].includes(i)?'<h2>'+d.practice[i].group+'</h2>':'';
const problems=d.practice.map((q,i)=>group(i)+'<section><h3>Question '+q.index+'</h3><p>'+esc(q.prompt)+'</p><input aria-label="Answer '+q.index+'"></section>').join('');
const answers=d.practice.map((q,i)=>group(i)+'<section><h3>Solution '+q.index+'</h3><p>'+esc(q.prompt)+'</p><p>'+esc(q.solution)+'</p><strong>'+q.answer+'</strong></section>').join('');
for(const [route,html] of [['problems',page('Practice Problems',problems)],['answers',page('Answers and Solutions',answers)]]){const dir=path.join(__dirname,'dist',d.base,route);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html)}
