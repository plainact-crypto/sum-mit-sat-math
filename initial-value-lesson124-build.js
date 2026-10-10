'use strict';
const fs=require('fs'),path=require('path');
const d=require('./initial-value-lesson124-data.json');
const root=path.join(__dirname,'dist',d.base);
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const section=(title,body)=>'<section class="lesson-section"><span class="section-kicker">'+title+'</span>'+body+'</section>';
function write(route,label,body,lang='en'){
 const dir=path.join(root,route);fs.mkdirSync(dir,{recursive:true});
 const html='<!doctype html><html lang="'+lang+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>Initial Value — '+label+'</title></head><body><header class="topbar"><a class="brand" href="/">SUMMIT SAT MATH</a><nav><a href="'+d.base+'/explanation/">Explanation</a> · <a href="'+d.base+'/problems/">Practice</a> · <a href="'+d.base+'/answers/">Answers</a> · <a href="'+d.base+'/test/">Test</a></nav></header><main class="page-shell"><section class="lesson-card"><div class="crumb">Advanced Math · Exponential Functions</div><div class="page-type">'+label+'</div><h1 class="lesson-title">Initial Value</h1><article class="lesson-content">'+body+'</article></section></main></body></html>';
 fs.writeFileSync(path.join(dir,'index.html'),html);
}
const groups=[['SKILL CHECK',0,3],['CORE PRACTICE',3,11],['EXAM-STYLE PRACTICE',11,16],['CHALLENGE PROBLEMS',16,18]];
const labels=[...Array(3).fill('Skill Check'),...Array(8).fill('Core Practice'),...Array(5).fill('Exam-Style'),...Array(2).fill('Challenge')];
if(d.explanation.length!==13||d.practice.length!==18||d.test.length!==5||d.practice.some((q,i)=>q.length!==4||q[0]!==labels[i]||!q[2]||!q[3]))throw Error('Lesson 124 content count/alignment mismatch');
if(new Set(d.practice.map(q=>q[1])).size!==18)throw Error('Duplicate practice question');
const expl='<!-- SUMMIT_RETROFIT:initial-value:DESMOS -->'+d.explanation.map((s,i)=>section(String(i+1).padStart(2,'0')+' · '+s[0],s[1])).join('');
write('explanation','Explanation',expl);
const problems=groups.map(g=>section(g[0],d.practice.slice(g[1],g[2]).map((q,i)=>'<div class="question"><h3>Question '+(g[1]+i+1)+'</h3><p>'+esc(q[1])+'</p></div>').join(''))).join('');
const answers=groups.map(g=>section(g[0],d.practice.slice(g[1],g[2]).map((q,i)=>'<div class="solution"><h3>Solution '+(g[1]+i+1)+'</h3><p>'+esc(q[1])+'</p><p>'+esc(q[3])+'</p><strong>Answer: '+esc(q[2])+'</strong></div>').join(''))).join('');
write('problems','Practice Problems',problems);write('answers','Answers & Solutions',answers);
if(d.test.map(x=>x[0]).join('|')!=='Easy|Easy / Medium|Medium|Medium / Hard|Hard / Exam-Style')throw Error('Test difficulty progression mismatch');
const form='<p>Answer all five questions. Results are shown only after Submit Test.</p><form id="lesson-test">'+d.test.map((q,i)=>section('QUESTION '+(i+1)+' · '+q[0],'<p>'+esc(q[1])+'</p><label>Your answer <input name="q'+i+'" required autocomplete="off"></label>')).join('')+'<button type="submit">Submit Test</button></form><div id="test-result" role="status"></div>';
const testJs='<script>(()=>{const q='+JSON.stringify(d.test.map(x=>[x[2],x[3]]))+';const norm=s=>String(s).toLowerCase().replace(/\\s+/g,"").replace(/[−–]/g,"-");document.getElementById("lesson-test").onsubmit=e=>{e.preventDefault();let score=0;const list=document.createElement("ol");q.forEach((v,i)=>{const good=norm(e.target.elements["q"+i].value)===norm(v[0]);if(good)score++;const li=document.createElement("li");li.textContent=(good?"Correct: ":"Review: ")+v[0]+" — "+v[1];list.appendChild(li)});const h=document.createElement("h2");h.textContent="Final score: "+score+"/5";document.getElementById("test-result").append(h,list);e.target.querySelectorAll("input,button").forEach(el=>el.disabled=true)}})();</script>';
write('test','Lesson Test',form+testJs);
for(const lang of ['english','arabic']){
 const scenes=d.video[lang];if(scenes.length!==8||scenes.some(s=>s.length!==3))throw Error('Full lesson video scenes missing');
 const locale=lang==='arabic'?'ar-EG':'en-US';
 const player='<div '+(lang==='arabic'?'dir="rtl"':'')+'><h2>Full Lesson — '+lang+'</h2><p>Eight narrated instructional scenes, worked examples, and recap. Full 16:9 lesson format.</p><div style="aspect-ratio:16/9;background:#14243d;color:#fff;border-radius:18px;padding:5%;display:flex;flex-direction:column;justify-content:center;text-align:center"><p id="count"></p><h2 id="title"></h2><p id="caption"></p><strong id="formula"></strong></div><button id="prev">Previous</button> <button id="play">Play Full Lesson</button> <button id="stop">Stop</button> <button id="next">Next</button><p><a href="../../explanation/">Explanation</a> · <a href="../../problems/">Practice</a> · <a href="../../test/">Test</a></p></div>';
 const script='<script>(()=>{const s='+JSON.stringify(scenes)+',locale="'+locale+'";let i=0,playing=false;const el=x=>document.getElementById(x);function show(){el("count").textContent=(i+1)+"/"+s.length;el("title").textContent=s[i][0];el("caption").textContent=s[i][1];el("formula").textContent=s[i][2]}function stop(){playing=false;window.speechSynthesis?.cancel()}function speak(){if(!playing)return;show();if(!window.speechSynthesis){playing=false;return}const u=new SpeechSynthesisUtterance(s[i][1]);u.lang=locale;u.onend=()=>{if(playing&&i<s.length-1){i++;speak()}else playing=false};window.speechSynthesis.speak(u)}el("prev").onclick=()=>{stop();i=Math.max(0,i-1);show()};el("next").onclick=()=>{stop();i=Math.min(s.length-1,i+1);show()};el("stop").onclick=stop;el("play").onclick=()=>{stop();playing=true;speak()};show()})();</script>';
 write('video/'+lang,'Full Lesson Video',player+script,lang==='arabic'?'ar':'en');
}
console.log('Lesson 124 Initial Value: explanation, 18 practice, 18 answers, 5 test, two full lesson video routes');
