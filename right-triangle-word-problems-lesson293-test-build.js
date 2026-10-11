'use strict';
const l=require('./right-triangle-word-problems-lesson293-common.js');
require('./right-triangle-word-problems-lesson293-math-qa.js');
const q=l.data.test.map(x=>'<section class="lesson-section"><h3>'+l.esc(x.difficulty)+' — Question '+x.index+'</h3><p>'+l.esc(x.prompt)+'</p><input type="number" step="any" required data-answer="'+x.answer+'"></section>').join('');
const solutions=l.data.test.map(x=>'<p>'+l.esc(x.solution)+'</p>').join('');
const body='<form id="quiz">'+q+'<button type="submit">Submit Test</button></form><div id="review" hidden>'+solutions+'</div>';
const js='<script>document.getElementById("quiz").onsubmit=e=>{e.preventDefault();const form=e.target;const a=[...form.querySelectorAll("input")];if(a.some(x=>!x.value.trim()))return;const n=a.filter(x=>Math.abs(Number(x.value)-Number(x.dataset.answer))<0.00501).length;form.querySelector("button").disabled=true;a.forEach(x=>x.disabled=true);const r=document.getElementById("review");r.hidden=false;r.insertAdjacentText("afterbegin","Score: "+n+"/5. ")}</script>';
l.write('test',l.page('Lesson Test',body+js));
