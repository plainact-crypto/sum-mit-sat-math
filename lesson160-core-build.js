(function core(){
const fs=require('fs'),path=require('path'),D=require('./lesson160-model'),U=require('./lesson160-shell'),J=require('./lesson160-interactions');
const {e,base,shell,section,groups,card}=U;
const exp='<!-- SUMMIT_RETROFIT:unit-rates:NEITHER -->'+D.explanation.map((x,i)=>section(x[0],'<p>'+e(x[1])+'</p>'+(x[0]==='QUICK CHECK'?'<details><summary>Reveal answers</summary>'+e(x[2])+'</details>':'<p><strong>'+e(x[2])+'</strong></p>'),i)).join('');
const group=(fn)=>groups.map(g=>section(g[0],D.practice.slice(g[1],g[2]).map((q,j)=>fn(q,g[1]+j)).join(''))).join('');
const problems=section('PRACTICE','<p>18 questions: 3 Skill Check, 8 Core Practice, 5 Exam-Style, 2 Challenge.</p>')+group((q,i)=>card(q,i,'q'));
const answers=section('ANSWERS','<p>18 aligned worked solutions.</p>')+group((q,i)=>'<div class="summit-q" data-solution="'+i+'"><h3>'+(i+1)+'. '+e(q.prompt)+'</h3><b>'+e(q.answer)+'</b><p>'+e(q.solution)+'</p></div>');
const test=section('LESSON TEST','<p>Five graded questions. Submit once at the end.</p>')+D.test.map((q,i)=>section(['EASY','EASY / MEDIUM','MEDIUM','MEDIUM / HARD','HARD / EXAM-STYLE'][i],card(q,i,'t'))).join('')+'<button class="summit-action" id="submitTest">Submit Test</button><div id="testResult"></div>';
const pages={explanation:shell('Explanation',exp),problems:shell('Practice',problems,J.practice),answers:shell('Answers',answers),test:shell('Test',test,J.test)};
for(const [route,html] of Object.entries(pages)){const p=path.join(__dirname,'dist',base,route,'index.html');fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,html)}
})();
