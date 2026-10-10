'use strict';
const {shell,write,esc}=require('./repeated-percent-change-lesson178-layout');
const {practice,factor,round}=require('./repeated-percent-change-lesson178-verified-data');
if(practice.length!==18||new Set(practice.map(x=>x.q)).size!==18)throw Error('Exactly 18 unique questions');
const groups=[['SKILL CHECK',0,3],['CORE PRACTICE',3,11],['EXAM-STYLE PRACTICE',11,16],['CHALLENGE PROBLEMS',16,18]];
if(groups.map(x=>x[2]-x[1]).join(',')!=='3,8,5,2')throw Error('Distribution error');
for(const [i,x] of practice.entries())if(Math.abs(round(x.start*factor(x.changes))-x.end)>1e-8||!x.steps.includes(String(x.answer)))throw Error('Math QA '+(i+1));
for(const solutions of [false,true]){let body='<p>'+(solutions?'Each solution matches its numbered practice question. The combined multiplier is shown explicitly.':'Solve each question using a chain of percentage multipliers. Keep enough precision before rounding. Full solutions are on Answers.')+'</p>';
 for(const [name,start,end] of groups){body+='<section class="group"><h2>'+name+' · '+(end-start)+' QUESTIONS</h2>';for(let i=start;i<end;i++){const x=practice[i];body+='<article class="problem"><h3>Question '+(i+1)+'</h3><p>'+esc(x.q)+'</p>'+(solutions?'<p><strong>Worked solution:</strong> '+esc(x.steps)+'</p><p><b>Final answer: '+esc(x.answer)+'</b></p>':'<p>Show each multiplier and your final answer before checking.</p>')+'</article>'}body+='</section>'}
 write(solutions?'answers':'problems',shell(solutions?'Answers & Solutions':'Practice Problems',body));}
console.log('Lesson 178: 18 unique practice questions, 18 aligned solutions, 3/8/5/2, math QA PASS.');
