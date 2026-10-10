'use strict';
const {T}=require('./multiplying-radicals-lesson119-lib');
const {esc,sec,write}=require('./multiplying-radicals-lesson119-shell');
if(T.length!==5||T.map(q=>q[0]).join('|')!=='Easy|Easy / Medium|Medium|Medium / Hard|Hard / Exam-Style')throw Error('Test progression QA');
const form='<p>Complete all five questions; results appear after Submit Test.</p><form id="lesson-test">'+T.map((q,i)=>sec('QUESTION '+(i+1)+' · '+q[0],'<p>'+esc(q[1])+'</p><label>Your answer <input name="q'+i+'" required autocomplete="off"></label>')).join('')+'<button type="submit">Submit Test</button></form><div id="test-result" role="status"></div>';
const js='<script>(()=>{const q='+JSON.stringify(T.map(x=>[x[2],x[3]]))+';const norm=s=>String(s).toLowerCase().replace(/\\s+/g,"").replace(/[−–]/g,"-");document.getElementById("lesson-test").onsubmit=e=>{e.preventDefault();let score=0;const list=document.createElement("ol");q.forEach((v,i)=>{const good=norm(e.target.elements["q"+i].value)===norm(v[0]);if(good)score++;const li=document.createElement("li");li.textContent=(good?"Correct: ":"Review: ")+v[0]+" — "+v[1];list.appendChild(li)});const h=document.createElement("h2");h.textContent="Final score: "+score+"/5";document.getElementById("test-result").append(h,list);e.target.querySelectorAll("input,button").forEach(el=>el.disabled=true)}})();</script>';
write('test','Lesson Test',form+js);
console.log('Lesson 119: five progressive test questions');
