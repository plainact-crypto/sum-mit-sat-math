'use strict';
const {shell,write,esc}=require('./converting-area-units-lesson168-layout');
const q=[...require('./converting-area-units-lesson168-data-a'),...require('./converting-area-units-lesson168-data-b')];
if(q.length!==18||new Set(q.map(v=>v.q)).size!==18)throw Error('Practice must have 18 unique problems');
for(const [i,v] of q.entries())if(!v.q||!v.a||!v.why||!v.check())throw Error('Math QA failed on problem '+(i+1));
const groups=[['SKILL CHECK',0,3],['CORE PRACTICE',3,11],['EXAM-STYLE PRACTICE',11,16],['CHALLENGE PROBLEMS',16,18]];
if(groups.reduce((n,[,a,b])=>n+b-a,0)!==18)throw Error('Invalid 3/8/5/2 distribution');
for(const answers of [false,true]){
 let body='<p>'+(answers?'Read each matching problem and its fully worked solution.':'Solve each question first. Full worked solutions are on the Answers page.')+'</p>';
 for(const [label,a,b] of groups){
  body+='<section class="group"><h2>'+label+' · '+(b-a)+' QUESTIONS</h2>';
  for(let i=a;i<b;i++){const v=q[i];body+='<article class="problem"><h3>Question '+(i+1)+'</h3><p>'+esc(v.q)+'</p>';
   if(answers)body+='<p><b>Worked solution:</b> '+esc(v.why)+'</p><p><strong>Final answer: '+esc(v.a)+'</strong></p>';
   else body+='<p class="hint">Write your calculation, units, and final answer before checking the solutions.</p>';
   body+='</article>';}
  body+='</section>';
 }
 write(answers?'answers':'problems',shell(answers?'Answers & Solutions':'Practice Problems',body));
}
console.log('Lesson 168 practice QA PASS: 18 unique problems, 18 aligned worked answers, 3/8/5/2');
