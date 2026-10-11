'use strict';
const {data,esc,page,write}=require('./cosine-lesson288-common.js');
require('./cosine-lesson288-math-qa.js');
const questions=data.test.map(q=>'<section class="lesson-section"><h3>'+esc(q.difficulty)+' — Question '+q.index+'</h3><p>'+esc(q.prompt)+'</p><label>Answer: <input type="number" step="any" required></label></section>').join('');
const answers=JSON.stringify(data.test.map(q=>q.answer));
const reviews=JSON.stringify(data.test.map(q=>q.solution));
const js='<script>const answers='+answers+',reviews='+reviews+';document.getElementById("test").onsubmit=function(e){e.preventDefault();const a=Array.from(this.querySelectorAll("input"));if(a.some(x=>!x.value.trim()))return;const score=a.reduce((s,x,i)=>s+(Math.abs(Number(x.value)-answers[i])<=0.00501?1:0),0);a.forEach(x=>x.disabled=true);this.querySelector("button").disabled=true;const result=document.getElementById("result");result.textContent="Score: "+score+"/5. "+reviews.join(" | ")}</script>';
write('test',page('Lesson Test','<p>Five questions. Submit once to see results.</p><form id="test">'+questions+'<button type="submit">Submit Test</button></form><div id="result" role="status"></div>'+js));
console.log('Lesson 288 test generated');
