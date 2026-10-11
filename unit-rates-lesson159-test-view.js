'use strict';
const {test}=require('./unit-rates-lesson159-data-loader');
const {write,escapeText:esc,scriptData}=require('./unit-rates-lesson159-shell');
function build(){
 const body=test.map((x,i)=>'<section class="lesson-section"><h2>Question '+(i+1)+' - '+esc(x[0])+'</h2><p>'+esc(x[1])+'</p><label for="t'+i+'">Numeric answer</label><input id="t'+i+'" inputmode="decimal"><p id="r'+i+'" hidden></p></section>').join('');
 const script='<script>(function(){const keys='+scriptData(test.map(x=>[x[2],x[3]]))+';let submitted=false;document.getElementById("submit-test").onclick=function(){if(submitted)return;submitted=true;let score=0;keys.forEach(([answer,solution],i)=>{const input=document.getElementById("t"+i),review=document.getElementById("r"+i),raw=input.value.trim(),value=Number(raw),correct=raw!==""&&Number.isFinite(value)&&Math.abs(value-Number(answer))<1e-8;if(correct)score++;input.disabled=true;review.hidden=false;review.textContent=(correct?"Correct. ":"Incorrect. ")+"Answer: "+answer+". "+solution});document.getElementById("score").textContent="Final score: "+score+" / 5";this.disabled=true}})();</script>';
 write('test','<p>Submit once after all five questions. No correctness feedback is shown before submission.</p>'+body+'<button id="submit-test" type="button">Submit Test</button><p id="score" role="status"></p>'+script);
}
module.exports=build;
