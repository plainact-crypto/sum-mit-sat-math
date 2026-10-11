'use strict';
const {practice}=require('./unit-rates-lesson159-data-loader');
const {write,escapeText:esc,scriptData}=require('./unit-rates-lesson159-shell');
function build(){
 const segments=[['SKILL CHECK',0,3],['CORE PRACTICE',3,11],['EXAM-STYLE PRACTICE',11,16],['CHALLENGE PROBLEMS',16,18]];
 const body=segments.map(([h,a,b])=>'<section class="lesson-section"><h2>'+h+'</h2>'+practice.slice(a,b).map((x,j)=>{const i=a+j;return '<div class="practice-item"><h3>Problem '+(i+1)+'</h3><p>'+esc(x[1])+'</p><label for="p'+i+'">Numeric answer</label><input id="p'+i+'" inputmode="decimal"><button type="button" data-check="'+i+'">Check</button><p id="f'+i+'" role="status"></p></div>'}).join('')+'</section>').join('');
 const script='<script>(function(){const answers='+scriptData(practice.map(x=>x[2]))+';document.querySelectorAll("[data-check]").forEach(b=>b.onclick=function(){const i=Number(b.dataset.check),s=document.getElementById("p"+i).value.trim(),v=Number(s),a=Number(answers[i]);document.getElementById("f"+i).textContent=s!==""&&Number.isFinite(v)&&Math.abs(v-a)<1e-8?"Correct.":"Not yet. Recheck units and arithmetic."})})();</script>';
 write('problems','<p>18 questions: 3 Skill Check, 8 Core Practice, 5 Exam-Style, 2 Challenge.</p>'+body+script);
}
module.exports=build;
