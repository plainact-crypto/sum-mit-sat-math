'use strict';
const {data,esc,page,write}=require('./finding-center-from-standard-form-lesson278-common.js');
require('./finding-center-from-standard-form-lesson278-math-qa.js');
const questions=data.test.map(q=>'<section class="lesson-section"><h3>'+esc(q.difficulty)+' — Question '+q.index+'</h3><p>'+esc(q.prompt)+'</p><label>Center (x,y): <input type="text" placeholder="x,y" required></label></section>').join('');
const key=JSON.stringify(data.test.map(q=>({answer:q.answer,solution:q.solution})));
const js='<script>const key='+key+';document.getElementById("test").addEventListener("submit",e=>{e.preventDefault();const inputs=[...e.currentTarget.querySelectorAll("input")];if(inputs.some(x=>!x.value.trim()))return;const nums=s=>s.replace(/[() ]/g,"").split(",").map(Number);let score=0;inputs.forEach((inp,i)=>{const a=nums(inp.value),b=nums(key[i].answer);if(a.length===2&&a.every((v,j)=>Number.isFinite(v)&&Math.abs(v-b[j])<0.00001))score++;inp.disabled=true});const result=document.getElementById("result");result.textContent="Final score: "+score+"/5";key.forEach((q,i)=>{const p=document.createElement("p");p.textContent="Question "+(i+1)+": "+q.answer+". "+q.solution;result.appendChild(p)});e.currentTarget.querySelector("button").disabled=true},{once:true})</script>';
write('test',page('Lesson Test','<p>Five progressively harder questions. Review appears only after final submission.</p><form id="test">'+questions+'<button type="submit">Submit Test</button></form><div id="result" role="status"></div>'+js));
console.log('Lesson 278 progressive test built');
