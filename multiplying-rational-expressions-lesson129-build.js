'use strict';
const fs=require('fs'),path=require('path');
const d=require('./multiplying-rational-expressions-lesson129-data.json');
const sections=require('./multiplying-rational-expressions-lesson129-explanation.json');
const videos=require('./multiplying-rational-expressions-lesson129-video.json');
const slug='multiplying-rational-expressions';
const base='advanced-math/rational-expressions-and-functions/'+slug;
const title='Multiplying Rational Expressions';
const groups=[['Skill Check',0,3],['Core Practice',3,11],['Exam-Style Practice',11,16],['Challenge Problems',16,18]];
function check(ok,msg){if(!ok)throw Error('[Lesson 129 QA] '+msg)}
check(d.slug===slug&&d.lesson===title,'canonical slug/title mismatch');
check(d.classification==='NEITHER','classification mismatch');
check(JSON.stringify(d.groups)==='[3,8,5,2]','distribution mismatch');
check(d.practice.length===18&&d.tests.length===5,'practice/test count mismatch');
check(sections.length>=12,'explanation sections missing');
check(videos.english.length>=8&&videos.arabic.length>=8,'bilingual full video scenes missing');
for(const [i,x] of d.practice.entries())check(x.length===3&&x.every(s=>typeof s==='string'&&s.trim()),'practice/solution '+(i+1)+' incomplete');
for(const [i,x] of d.tests.entries())check(x.length===4&&x.every(s=>typeof s==='string'&&s.trim()),'test '+(i+1)+' incomplete');
check(new Set(d.practice.map(x=>x[0])).size===18,'duplicate practice prompt');
check(new Set(d.tests.map(x=>x[1])).size===5,'duplicate test prompt');
check(d.tests.map(x=>x[0]).join('|')==='Easy|Easy / Medium|Medium|Medium / Hard|Hard / Exam-Style','test progression mismatch');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nav=['explanation','problems','answers','test','video/english','video/arabic'].map(t=>'<a href="/'+base+'/'+t+'/">'+esc(t)+'</a>').join(' · ');
function shell(type,body,lang='en'){
return '<!doctype html><html lang="'+lang+'" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>'+title+' — '+esc(type)+' | SUMMIT SAT MATH</title></head><body><header class="topbar"><a class="brand" href="/"><span class="brand-mark"></span><span class="brand-copy">SUMMIT<small>SAT MATH</small></span></a><nav><a href="/">Home</a><a href="/#subjects">Subjects</a><a href="/#subjects">Practice</a></nav></header><main class="page-shell"><section class="lesson-card"><div class="crumb">Advanced Math · Rational Expressions and Functions</div><div class="page-type">'+esc(type)+'</div><div class="lesson-title">'+title+'</div><div class="subject-label">Advanced Math</div><article class="lesson-content">'+body+'</article><nav aria-label="Lesson pages">'+nav+'</nav></section></main></body></html>';
}
function write(route,html){const dir=path.join(__dirname,'dist',base,route);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html,'utf8');}
const explanation='<!-- SUMMIT_RETROFIT:'+slug+':NEITHER -->'+sections.map(([heading,body],i)=>'<section class="lesson-section"><span class="section-kicker">'+String(i+1).padStart(2,'0')+' · '+esc(heading)+'</span><h2>'+esc(heading)+'</h2><p>'+esc(body)+'</p></section>').join('')+'<section class="lesson-section next-step"><h2>Continue learning</h2><p><a href="../problems/">Practice 18 problems</a> · <a href="../answers/">Review worked solutions</a> · <a href="../test/">Take the lesson test</a></p></section>';
write('explanation',shell('Explanation',explanation));
const groupAt=i=>groups.filter(([,start])=>i===start).map(([name])=>'<h2>'+esc(name)+'</h2>').join('');
const problems=d.practice.map(([prompt],i)=>groupAt(i)+'<section class="lesson-section question" data-question="'+(i+1)+'"><h3>Question '+(i+1)+'</h3><p>'+esc(prompt)+'</p><label>Your work <textarea aria-label="Work for question '+(i+1)+'" rows="2"></textarea></label></section>').join('');
write('problems',shell('Practice Problems',problems));
const answers=d.practice.map(([prompt,answer,solution],i)=>groupAt(i)+'<section class="lesson-section solution" data-solution="'+(i+1)+'"><h3>Solution '+(i+1)+'</h3><p>'+esc(prompt)+'</p><p>'+esc(solution)+'</p><strong>Answer: '+esc(answer)+'</strong></section>').join('');
write('answers',shell('Answers & Solutions',answers));
const testForm=d.tests.map(([difficulty,prompt],i)=>'<section class="lesson-section question" data-test="'+(i+1)+'"><h3>Question '+(i+1)+' · '+esc(difficulty)+'</h3><p>'+esc(prompt)+'</p><label>Answer <input name="q'+i+'" autocomplete="off" aria-label="Test answer '+(i+1)+'" required></label></section>').join('');
const testAnswers=d.tests.map(x=>({answer:x[2],explanation:x[3]}));
const js='<script>(()=>{const key='+JSON.stringify(testAnswers).replace(/</g,'\\u003c')+';const f=document.getElementById("lesson-test"),out=document.getElementById("test-result");function norm(s){return String(s).toLowerCase().replace(/−/g,"-").replace(/\\s+/g,"").replace(/;/g,",").replace(/\\.+$/,"")}f.addEventListener("submit",e=>{e.preventDefault();let score=0;const review=[];key.forEach((q,i)=>{const got=f.elements["q"+i].value;if(norm(got)===norm(q.answer))score++;review.push("<li><b>Question "+(i+1)+":</b> "+(norm(got)===norm(q.answer)?"Correct":"Review")+". Correct answer: "+q.answer.replace(/&/g,"&amp;").replace(/</g,"&lt;")+". "+q.explanation.replace(/&/g,"&amp;").replace(/</g,"&lt;")+"</li>")});out.innerHTML="<h2>Final score: "+score+"/5</h2><ol>"+review.join("")+"</ol>";f.querySelectorAll("input,button").forEach(x=>x.disabled=true);out.focus()},{once:true})})();</script>';
write('test',shell('Lesson Test','<p>Five questions, from easy to exam-style. Answers and explanations appear only after submission. Equivalent mathematical forms may need manual review.</p><form id="lesson-test">'+testForm+'<button type="submit">Submit Test</button></form><div id="test-result" tabindex="-1" role="status" aria-live="polite"></div>'+js));
for(const [language,lang] of [['english','en-US'],['arabic','ar-EG']]){
const scenes=videos[language];check(scenes.every(s=>s.length===3&&s.every(t=>typeof t==='string'&&t.trim())),'video scene malformed '+language);
const content='<div class="lesson-section" style="aspect-ratio:16/9;background:#102e52;color:white;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:5%"><p id="scene-count"></p><h2 id="scene-heading"></h2><p id="scene-caption"></p><strong id="scene-math"></strong></div><p><button id="prev">Previous</button> <button id="play">Play Full Lesson</button> <button id="stop">Stop</button> <button id="next">Next</button></p><p id="video-status" role="status"></p>';
const player='<script>(()=>{const scenes='+JSON.stringify(scenes).replace(/</g,'\\u003c')+',lang="'+lang+'";let i=0,playing=false;const el=id=>document.getElementById(id);function show(){el("scene-count").textContent=(i+1)+" / "+scenes.length;el("scene-heading").textContent=scenes[i][0];el("scene-caption").textContent=scenes[i][1];el("scene-math").textContent=scenes[i][2]}function stop(){playing=false;if(window.speechSynthesis)window.speechSynthesis.cancel()}function speak(){if(!playing)return;show();if(!window.speechSynthesis){el("video-status").textContent="Audio unavailable; full captions remain visible.";playing=false;return}const u=new SpeechSynthesisUtterance(scenes[i][0]+". "+scenes[i][1]+". "+scenes[i][2]);u.lang=lang;u.rate=.86;u.onend=()=>{if(playing&&i<scenes.length-1){i++;speak()}else playing=false};u.onerror=()=>{playing=false;el("video-status").textContent="Audio unavailable; captions remain visible."};speechSynthesis.speak(u)}el("prev").onclick=()=>{stop();i=Math.max(0,i-1);show()};el("next").onclick=()=>{stop();i=Math.min(scenes.length-1,i+1);show()};el("stop").onclick=stop;el("play").onclick=()=>{stop();playing=true;speak()};show()})();</script>';
write('video/'+language,shell('Full Lesson Video · '+language,content+player,lang.slice(0,2)));
}
console.log('[Lesson 129] six canonical pages built; 18 practice/18 aligned solutions/5 test/8 EN+8 AR scenes; classification NEITHER');
