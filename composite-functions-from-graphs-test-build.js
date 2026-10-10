'use strict';
const {data,esc,sec,write}=require('./composite-functions-from-graphs-page-lib');
const gallery=require('./composite-functions-from-graphs-graph-lib');
if(data.tests.length!==5||data.tests.some(q=>q.length!==5)||data.tests.map(q=>q[0]).join('|')!=='Easy|Easy / Medium|Medium|Medium / Hard|Hard / Exam-Style')throw Error('Test progression QA failed');
const body='<p>Answer all five questions. No feedback appears before Submit Test.</p>'+gallery()+'<form id="lesson-test">'+data.tests.map((q,i)=>sec('QUESTION '+(i+1)+' · '+q[0]+' · GRAPH '+q[4],'<p>'+esc(q[1])+'</p><label>Your answer <input name="q'+i+'" required autocomplete="off"></label>')).join('')+'<button type="submit">Submit Test</button></form><div id="test-result" role="status" aria-live="polite"></div>'+
'<script>(()=>{const q='+JSON.stringify(data.tests.map(x=>({a:x[2],s:x[3]})))+';const norm=s=>String(s).toLowerCase().replace(/[−–]/g,"-").replace(/\\s+/g,"").replace(/^x=/,"").replace(/[.;]/g,"");document.getElementById("lesson-test").addEventListener("submit",e=>{e.preventDefault();let f=e.currentTarget,score=0;let results=q.map((x,i)=>{let ok=norm(f.elements["q"+i].value)===norm(x.a);if(ok)score++;return "<li>"+(ok?"Correct":"Review")+": "+x.a+" — "+x.s+"</li>"});document.getElementById("test-result").innerHTML="<h2>Final score: "+score+"/5</h2><ol>"+results.join("")+"</ol>";f.querySelectorAll("input,button").forEach(el=>el.disabled=true)})})();</script>';
write('test','Lesson Test',body);
console.log('Lesson 109: five progressive test questions built');
