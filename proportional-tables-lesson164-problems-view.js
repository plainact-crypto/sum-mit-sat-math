'use strict';
const {check,esc,safe}=require('./proportional-tables-lesson164-runtime.js');
const P=require('./proportional-tables-lesson164-practice.json');
module.exports=function(){
check(P.length===18&&new Set(P.map(x=>x.question)).size===18,'18 original questions');
check(P.map(x=>x.group).join('|')===[...Array(3).fill('Skill Check'),...Array(8).fill('Core Practice'),...Array(5).fill('Exam-Style Practice'),...Array(2).fill('Challenge Problems')].join('|'),'3/8/5/2 groups');
let body='<p>18 problems: 3 Skill Check, 8 Core Practice, 5 Exam-Style, 2 Challenge. Feedback does not reveal worked solutions.</p>';
for(let i=0;i<P.length;i++){const x=P[i];if([0,3,11,16].includes(i))body+='<h2>'+esc(x.group)+'</h2>';body+='<section class="lesson-section"><h3>Problem '+(i+1)+'</h3><p>'+esc(x.question)+'</p><label for="p'+i+'">Numeric answer</label> <input id="p'+i+'" inputmode="decimal"><button type="button" data-check="'+i+'">Check</button><p id="f'+i+'" role="status"></p></section>'}
body+='<script>(function(){const keys='+safe(P.map(x=>x.answer))+';document.querySelectorAll("[data-check]").forEach(b=>b.onclick=()=>{const i=+b.dataset.check,input=document.getElementById("p"+i).value.trim(),v=Number(input);document.getElementById("f"+i).textContent=input!==""&&Number.isFinite(v)&&Math.abs(v-Number(keys[i]))<1e-8?"Correct — continue.":"Not yet. Recheck the ratio y/x.";});})();</script>';
return body;
};
