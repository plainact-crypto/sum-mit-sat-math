'use strict';
const l=require('./special-angles-lesson298-common.js');require('./special-angles-lesson298-math-qa.js');
const heads={0:'SKILL CHECK',3:'CORE PRACTICE',11:'EXAM-STYLE PRACTICE',16:'CHALLENGE PROBLEMS'};
const title=i=>heads[i]?'<h2>'+heads[i]+'</h2>':'';
const cards=l.data.practice.map((q,i)=>title(i)+'<section class="lesson-section"><h3>Question '+q.index+'</h3><p>'+l.esc(q.prompt)+'</p><div>'+q.choices.map((c,j)=>'<label style="display:block;padding:.4rem"><input type="radio" name="q'+i+'" value="'+j+'"> '+l.esc(c)+'</label>').join('')+'</div><button type="button" data-check="'+i+'">Check</button><span data-feedback="'+i+'" role="status" aria-live="polite"></span></section>').join('');
const feedback='<script>const keys='+JSON.stringify(l.data.practice.map(q=>q.choices.indexOf(q.answer)))+';document.querySelectorAll("[data-check]").forEach(b=>b.addEventListener("click",()=>{const i=+b.dataset.check;const s=document.querySelector("input[name=q"+i+"]:checked");document.querySelector("[data-feedback=\\\""+i+"\\\"]").textContent=s?(+s.value===keys[i]?"Correct":"Try again") : "Choose an answer first"}))</script>';
l.write('problems',l.page('Practice Problems','<p>18 original questions: 3 Skill Check, 8 Core, 5 Exam-Style, 2 Challenge. Check gives correctness only; worked solutions are on Answers.</p>'+cards+feedback));
const answers=l.data.practice.map((q,i)=>title(i)+'<section class="lesson-section"><h3>Solution '+q.index+'</h3><p>'+l.esc(q.prompt)+'</p><p>'+l.esc(q.solution)+'</p><strong>Answer: '+l.esc(q.answer)+'</strong></section>').join('');
l.write('answers',l.page('Answers and Solutions',answers));console.log('Lesson 298 18 practice and 18 aligned answers generated');
