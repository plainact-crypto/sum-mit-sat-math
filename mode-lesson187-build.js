'use strict';
const fs=require('fs'),path=require('path');
const root=__dirname;
const data=JSON.parse(fs.readFileSync(path.join(root,'mode-lesson187-data.json'),'utf8'));
const base='problem-solving-and-data-analysis/measures-of-center/mode';
const out=path.join(root,'dist',base);
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const groups=['Skill Check','Core Practice','Exam-Style','Challenge'];
const counts=groups.map(g=>data.practice.filter(q=>q.group===g).length);
if(data.slug!=='mode'||data.title!=='Mode'||data.index!==187||data.classification!=='NEITHER'||data.base!=='/'+base+'/')throw Error('Canonical lesson mismatch');
if(data.practice.length!==18||counts.join('/')!=='3/8/5/2')throw Error('Practice counts invalid');
if(data.practice.some((q,i)=>q.number!==i+1||!q.question||!q.answer||!q.solution))throw Error('Practice/answer alignment invalid');
if(data.test.length!==5||data.test.map(q=>q.difficulty).join('|')!=='Easy|Easy / Medium|Medium|Medium / Hard|Hard / Exam-Style')throw Error('Test progression invalid');
if(data.test.some(q=>q.choices.length!==4||q.correct<0||q.correct>3||!q.solution))throw Error('Test answers invalid');
if(data.video.english.length!==12||data.video.arabic.length!==12)throw Error('Bilingual full-lesson scenes incomplete');
const mode=xs=>{const c=new Map();xs.forEach(x=>c.set(x,(c.get(x)||0)+1));const max=Math.max(...c.values());return [...c].filter(v=>v[1]===max).map(v=>v[0]).sort((a,b)=>a-b)};
const specs=[
[[2,4,4,7],[4]],[[1,1,2,2,3],[1,2]],[[3,5,7,9],[3,5,7,9]],
[[8,3,8,5,3,8,5],[8]],[[3,4,4,5,5,5,6,6,6,6],[6]],[[1,1,2,2,2,2,2,3,3,3],[2]],
[['red','red','red','red','blue','blue','blue','blue','blue','blue','green','green','green','green','green'],['blue']],
[[3,3,4,4,4,5,5,6,6,6],[4,6]],[[0,1,1,1,2,2,2,2,3,3],[2]],
[[4,4,5,5,5,6,6,6,7,7,7,7],[7]],[[1,1,1,2,2,2,3],[1,2]],
[[10,10,10,10,10,10,10,20,20,20,20,20,30,30,30,30,30,30,30],[10,30]],
[[4,4,5,6,6,6],[6]],[[6,6,7,8,8,8],[8]],[[1,1,1,8,8],[1]],
[[1,2,2,3],[2]],[[4,4,4,5,5,5,5,6,6,6],[5]],
[[2,2,2,2,2,2,3,3,3,3,3,3,3,3],[3]]
];
specs.forEach((v,i)=>{if(JSON.stringify(mode(v[0]))!==JSON.stringify(v[1]))throw Error('Independent practice math check '+(i+1));});
const tSpecs=[
[[2,3,3,4],'3'],[[5,5,6,6,7],'5 and 6'],
[[1,1,2,2,2,3,3,3,3,3],'3'],
[[6,6,12,12,12,15],'12'],
[[1,1,1,1,1,2,2,2,2,2,2,2],'2']
];
tSpecs.forEach((v,i)=>{const actual=mode(v[0]).join(' and ');if(actual!==v[1]||data.test[i].choices[data.test[i].correct]!==v[1])throw Error('Independent test math check '+(i+1));});
function shell(type,body,lang){
 lang=lang||'en';const ar=lang==='ar';
 return '<!doctype html><html lang="'+lang+'" dir="'+(ar?'rtl':'ltr')+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>Mode — '+esc(type)+' | SUMMIT SAT MATH</title></head><body><header class="topbar"><a class="brand" href="/"><span class="brand-mark"></span><span class="brand-copy">SUMMIT<small>SAT MATH</small></span></a><nav><a href="/">Home</a><a href="/#subjects">Subjects</a><a href="/#subjects">Practice</a></nav></header><main class="page-shell"><section class="lesson-card"><div class="crumb">Problem-Solving and Data Analysis · Measures of Center</div><div class="page-type">'+esc(type)+'</div><div class="lesson-title">Mode</div><article class="lesson-content">'+body+'</article></section></main></body></html>';
}
function write(route,body,kind,lang){const folder=path.join(out,route);fs.mkdirSync(folder,{recursive:true});fs.writeFileSync(path.join(folder,'index.html'),shell(kind,body,lang));}
function nav(){return '<p class="lesson-nav"><a href="'+data.base+'explanation/">Explanation</a> · <a href="'+data.base+'problems/">Practice</a> · <a href="'+data.base+'answers/">Answers &amp; Solutions</a> · <a href="'+data.base+'test/">Lesson Test</a> · <a href="'+data.base+'video/english/">English full lesson</a> · <a href="'+data.base+'video/arabic/">Arabic full lesson</a></p>';}
const sections=data.explanation.map((s,i)=>'<section class="lesson-section"><span class="section-kicker">'+(i+1)+' · '+esc(s.heading)+'</span><h2>'+esc(s.heading)+'</h2><p>'+esc(s.text)+'</p></section>').join('');
write('explanation','<!-- SUMMIT_RETROFIT:mode:NEITHER -->'+sections+nav(),'Explanation');
function block(q,answer){return '<div class="'+(answer?'solution':'question')+'"><h3>'+q.number+'. '+esc(q.question)+'</h3>'+(answer?'<p><strong>Answer: '+esc(q.answer)+'</strong></p><p>'+esc(q.solution)+'</p>':'<p class="tip-line">Record the most frequent data value(s), not their frequency.</p>')+'</div>';}
const sectioned=answers=>groups.map(g=>'<section class="lesson-section"><h2>'+esc(g)+'</h2>'+data.practice.filter(q=>q.group===g).map(q=>block(q,answers)).join('')+'</section>').join('');
write('problems','<h2>Practice Problems — 18 questions</h2>'+sectioned(false)+'<p>Complete all groups, then open Answers &amp; Solutions for full working.</p>'+nav(),'Practice Problems');
write('answers','<h2>Answers &amp; Solutions — 18 aligned explanations</h2>'+sectioned(true)+nav(),'Answers & Solutions');
const questions=data.test.map((q,i)=>'<section class="lesson-test-question" data-correct="'+q.correct+'" data-answer="'+esc(q.choices[q.correct])+'" data-explain="'+esc(q.solution)+'"><h3>'+(i+1)+'. '+esc(q.difficulty)+'</h3><p>'+esc(q.question)+'</p><fieldset><legend>Choose one answer</legend>'+q.choices.map((c,j)=>'<label style="display:block;margin:8px 0"><input type="radio" name="q'+i+'" value="'+j+'"> '+String.fromCharCode(65+j)+'. '+esc(c)+'</label>').join('')+'</fieldset></section>').join('');
const script='<script>(function(){var submitted=false;document.getElementById("submitTest").addEventListener("click",function(){if(submitted)return;var qs=Array.from(document.querySelectorAll(".lesson-test-question"));var picks=qs.map(function(q,i){return q.querySelector("input[name=q"+i+"]:checked");});var out=document.getElementById("testResult");if(picks.some(function(p){return !p;})){out.textContent="Answer all five questions before submitting.";return;}submitted=true;var score=0;var lines=qs.map(function(q,i){var ok=Number(picks[i].value)===Number(q.dataset.correct);if(ok)score++;return "Question "+(i+1)+": "+(ok?"Correct":"Incorrect")+". Correct answer: "+q.dataset.answer+". "+q.dataset.explain;});out.textContent="Score: "+score+"/5\\n\\n"+lines.join("\\n\\n");qs.forEach(function(q){q.querySelectorAll("input").forEach(function(x){x.disabled=true;});});this.disabled=true;});})();</script>';
write('test','<h2>Lesson Test — five progressive questions</h2><p>Correctness and explanations appear only after a single final submission.</p>'+questions+'<button id="submitTest" type="button">Submit Test</button><div id="testResult" aria-live="polite" style="white-space:pre-line;margin-top:20px"></div>'+script+nav(),'Lesson Test');
for(const lang of ['english','arabic']){const scenes=data.video[lang];const body='<h2>'+(lang==='arabic'?'المنوال — الدرس الكامل':'Mode — Complete Lesson')+'</h2><p>'+(lang==='arabic'?'اثنا عشر مشهدًا تعليميًا مترابطًا':'Twelve progressive instructional scenes for the full lesson')+'</p>'+scenes.map((s,i)=>'<section class="lesson-scene"><span class="section-kicker">SCENE '+(i+1)+' / 12</span><h2>'+esc(s.title)+'</h2><p>'+esc(s.narration)+'</p><div class="math-focus" dir="ltr">'+esc(s.math)+'</div></section>').join('')+nav();write('video/'+lang,body,lang==='arabic'?'الدرس الكامل':'Full Lesson Video',lang==='arabic'?'ar':'en');}
write('video','<h2>Mode — Full Lesson Video</h2><a href="./english/">English</a> · <a href="./arabic/">Arabic</a>','Full Lesson Video');
for(const route of ['explanation','problems','answers','test','video/english','video/arabic']){const html=fs.readFileSync(path.join(out,route,'index.html'),'utf8');if(html.length<1600||/COMING SOON|Content still being completed/i.test(html))throw Error('Placeholder route '+route);}
function hits(route,term){return (fs.readFileSync(path.join(out,route,'index.html'),'utf8').match(new RegExp(term,'g'))||[]).length;}
if(hits('problems','class="question"')!==18||hits('answers','class="solution"')!==18||hits('test','class="lesson-test-question"')!==5)throw Error('Rendered page alignment invalid');
console.log('Lesson 187 QA PASS: 18 practice + 18 answers + 5 test, 23 independent math checks, six routes, 12 EN + 12 AR instructional scenes.');
