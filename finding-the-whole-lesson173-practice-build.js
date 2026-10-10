'use strict';
const {shell,write,esc}=require('./finding-the-whole-lesson173-layout');
const {practice}=require('./finding-the-whole-lesson173-data');
if(practice.length!==18||new Set(practice.map(x=>x.q)).size!==18)throw Error('Exactly 18 unique practice questions required');
const groups=[['SKILL CHECK',0,3],['CORE PRACTICE',3,11],['EXAM-STYLE PRACTICE',11,16],['CHALLENGE PROBLEMS',16,18]];
if(groups.map(x=>x[2]-x[1]).join(',')!=='3,8,5,2')throw Error('Invalid distribution');
for(const [i,p] of practice.entries())if(Math.abs(p.whole*p.p/100-p.part)>1e-8||!p.steps.includes(String(p.whole)))throw Error('Independent mathematical check failed: '+(i+1));
for(const solutions of [false,true]){
 let body='<p>'+(solutions?'Every numbered solution matches the same-numbered practice question. Work is shown before the final answer.':'Solve all 18 questions. Show the percent multiplier, equation, division, and units. Full worked solutions are on the Answers page.')+'</p>';
 for(const [name,start,end] of groups){body+='<section class="group"><h2>'+name+' · '+(end-start)+' QUESTIONS</h2>';for(let i=start;i<end;i++){let p=practice[i];body+='<article class="problem"><h3>Question '+(i+1)+'</h3><p>'+esc(p.q)+'</p>';if(solutions)body+='<p><strong>Worked solution:</strong> '+esc(p.steps)+'</p><p><b>Final answer: '+esc(p.whole)+'</b></p>';else body+='<p class="hint">Set up the percentage equation before dividing. Check your units.</p>';body+='</article>'}body+='</section>'}
 write(solutions?'answers':'problems',shell(solutions?'Answers & Solutions':'Practice Problems',body));
}
console.log('Lesson 173 practice and solutions: 18 unique items, 18 aligned answers, 3/8/5/2, mathematical QA PASS.');
