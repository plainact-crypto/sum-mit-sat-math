'use strict';
const fs=require('fs'),path=require('path');
const root=__dirname;
const data=JSON.parse(fs.readFileSync(path.join(root,'comparing-spread-lesson192-data.json'),'utf8'));
const base='problem-solving-and-data-analysis/measures-of-spread/comparing-spread';
const out=path.join(root,'dist',base);
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const groups=['Skill Check','Core Practice','Exam-Style','Challenge'];
const counts=groups.map(g=>data.practice.filter(q=>q.group===g).length);
if(data.slug!=='comparing-spread'||data.title!=='Comparing Spread'||data.index!==192||data.classification!=='NEITHER'||data.base!=='/'+base+'/')throw Error('Canonical lesson mismatch');
if(data.practice.length!==18||counts.join('/')!=='3/8/5/2')throw Error('Practice counts invalid');
if(data.practice.some((q,i)=>q.number!==i+1||!q.question||!q.answer||!q.solution))throw Error('Practice/answer alignment invalid');
if(data.test.length!==5||data.test.map(q=>q.difficulty).join('|')!=='Easy|Easy / Medium|Medium|Medium / Hard|Hard / Exam-Style')throw Error('Test progression invalid');
if(data.test.some(q=>q.choices.length!==4||q.correct<0||q.correct>3||!q.solution))throw Error('Test answers invalid');
if(data.video.english.length!==12||data.video.arabic.length!==12)throw Error('Bilingual full-lesson scenes incomplete');

const med=a=>a.length%2?a[(a.length-1)/2]:(a[a.length/2-1]+a[a.length/2])/2;
const spread=xs=>{const a=[...xs].sort((x,y)=>x-y),h=Math.floor(a.length/2);return {range:a[a.length-1]-a[0],iqr:med(a.slice(a.length-h))-med(a.slice(0,h))};};
const checks=[
[[2,4,7,9],7,null],[[1,3,5],4,null,[2,3,4],2,null],[[3,5,7,9,11],null,6],
[[4,5,6,7,8],4,null,[2,5,6,7,10],8,null],[[1,2,4,6,8,9],null,6],
[[2,4,6,8,10],null,6,[3,5,6,7,9],null,4],[[10,10,11,12,13,14,14],null,4],
[[1,2,3,4,20],19,null,[1,2,3,4,5],4,null],[[4,5,6,7,8],4,3,[14,15,16,17,18],4,3],
[[1,3,5,7,9,11],null,6,[2,4,5,7,8,10],null,4],[[2,4,6,8,10,12,14,16],14,8],
[[1,2,3,4,5],4,null,[1,2,3,4,50],49,null],[[0,0,0,10,10,10],10,10,[0,4,5,5,6,10],10,2],
[[2,4,6,8,10],8,6,[4,8,12,16,20],16,12],[[10,12,14,16,18,20],10,6,[9,13,14,16,19,21],12,6],
[[2,3,4,5,6,7,30],null,4],[[1,1,1,9,9,9],8,8,[1,4,5,5,6,9],8,2],
[[3,4,5,6,7,8,9,10],7,4,[0,4,6,6,7,7,9,14],14,3]
];
const testChecks=[
[[1,4,6],5,null,[2,4,5],3,null],[[1,3,5,7,9],null,6],
[[2,3,4,5,6],4,null,[1,3,4,5,7],6,null],[[2,4,4,6,8,10],8,4],
[[1,1,2,3,3,3,4,4],3,2,[0,2,2,3,3,4,4,5],5,2]
];
function checkSpread(s,label){for(let j=0;j<s.length;j+=3){if(!Array.isArray(s[j]))throw Error(label+' invalid dataset');const got=spread(s[j]);if(s[j+1]!==null&&got.range!==s[j+1])throw Error(label+' range mismatch');if(s[j+2]!==null&&got.iqr!==s[j+2])throw Error(label+' IQR mismatch');}}
checks.forEach((s,i)=>checkSpread(s,'Practice '+(i+1)));
testChecks.forEach((s,i)=>checkSpread(s,'Test '+(i+1)));
const expectedPractice=["7","A","6","B","6","A","4","A; the extreme value 20","Equal: range 4 and IQR 3 for both","A","Range 14; IQR 8","B","Both range 10; A IQR 10 and B IQR 2","Both are doubled","Both IQR 6; B range 12 vs A range 10","IQR 4; fence 13; yes","A (8 vs 2)","B has larger range; A has larger IQR"];
const expectedTest=["A","6","B","Range 8, IQR 4","B larger range; equal IQR"];
checks.forEach((_,i)=>{if(data.practice[i].answer!==expectedPractice[i])throw Error('Practice answer mismatch '+(i+1));});
testChecks.forEach((_,i)=>{if(data.test[i].choices[data.test[i].correct]!==expectedTest[i])throw Error('Test answer mismatch '+(i+1));});
if(spread([2,3,4,5,6,7,30]).iqr!==4||7+1.5*4!==13)throw Error('Outlier fence QA');

function shell(type,body,lang){
 lang=lang||'en';const ar=lang==='ar';
 return '<!doctype html><html lang="'+lang+'" dir="'+(ar?'rtl':'ltr')+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>Comparing Spread — '+esc(type)+' | SUMMIT SAT MATH</title></head><body><header class="topbar"><a class="brand" href="/"><span class="brand-mark"></span><span class="brand-copy">SUMMIT<small>SAT MATH</small></span></a><nav><a href="/">Home</a><a href="/#subjects">Subjects</a><a href="/#subjects">Practice</a></nav></header><main class="page-shell"><section class="lesson-card"><div class="crumb">Problem-Solving and Data Analysis · Measures of Spread</div><div class="page-type">'+esc(type)+'</div><div class="lesson-title">Comparing Spread</div><article class="lesson-content">'+body+'</article></section></main></body></html>';
}
function write(route,body,kind,lang){const folder=path.join(out,route);fs.mkdirSync(folder,{recursive:true});fs.writeFileSync(path.join(folder,'index.html'),shell(kind,body,lang));}
function nav(){return '<p class="lesson-nav"><a href="'+data.base+'explanation/">Explanation</a> · <a href="'+data.base+'problems/">Practice</a> · <a href="'+data.base+'answers/">Answers &amp; Solutions</a> · <a href="'+data.base+'test/">Lesson Test</a> · <a href="'+data.base+'video/english/">English full lesson</a> · <a href="'+data.base+'video/arabic/">Arabic full lesson</a></p>';}
const sections=data.explanation.map((s,i)=>'<section class="lesson-section"><span class="section-kicker">'+(i+1)+' · '+esc(s.heading)+'</span><h2>'+esc(s.heading)+'</h2><p>'+esc(s.text)+'</p></section>').join('');
write('explanation','<!-- SUMMIT_RETROFIT:comparing-spread:NEITHER -->'+sections+nav(),'Explanation');
function block(q,answer){return '<div class="'+(answer?'solution':'question')+'"><h3>'+q.number+'. '+esc(q.question)+'</h3>'+(answer?'<p><strong>Answer: '+esc(q.answer)+'</strong></p><p>'+esc(q.solution)+'</p>':'<p class="tip-line">Compute the requested spread measure; compare the same measure for both data sets.</p>')+'</div>';}
const sectioned=answers=>groups.map(g=>'<section class="lesson-section"><h2>'+esc(g)+'</h2>'+data.practice.filter(q=>q.group===g).map(q=>block(q,answers)).join('')+'</section>').join('');
write('problems','<h2>Practice Problems — 18 questions</h2>'+sectioned(false)+'<p>Complete all groups, then open Answers &amp; Solutions for full working.</p>'+nav(),'Practice Problems');
write('answers','<h2>Answers &amp; Solutions — 18 aligned explanations</h2>'+sectioned(true)+nav(),'Answers & Solutions');
const questions=data.test.map((q,i)=>'<section class="lesson-test-question" data-correct="'+q.correct+'" data-answer="'+esc(q.choices[q.correct])+'" data-explain="'+esc(q.solution)+'"><h3>'+(i+1)+'. '+esc(q.difficulty)+'</h3><p>'+esc(q.question)+'</p><fieldset><legend>Choose one answer</legend>'+q.choices.map((c,j)=>'<label style="display:block;margin:8px 0"><input type="radio" name="q'+i+'" value="'+j+'"> '+String.fromCharCode(65+j)+'. '+esc(c)+'</label>').join('')+'</fieldset></section>').join('');
const script='<script>(function(){var submitted=false;document.getElementById("submitTest").addEventListener("click",function(){if(submitted)return;var qs=Array.from(document.querySelectorAll(".lesson-test-question"));var picks=qs.map(function(q,i){return q.querySelector("input[name=q"+i+"]:checked");});var out=document.getElementById("testResult");if(picks.some(function(p){return !p;})){out.textContent="Answer all five questions before submitting.";return;}submitted=true;var score=0;var lines=qs.map(function(q,i){var ok=Number(picks[i].value)===Number(q.dataset.correct);if(ok)score++;return "Question "+(i+1)+": "+(ok?"Correct":"Incorrect")+". Correct answer: "+q.dataset.answer+". "+q.dataset.explain;});out.textContent="Score: "+score+"/5\\n\\n"+lines.join("\\n\\n");qs.forEach(function(q){q.querySelectorAll("input").forEach(function(x){x.disabled=true;});});this.disabled=true;});})();</script>';
write('test','<h2>Lesson Test — five progressive questions</h2><p>Correctness and explanations appear only after a single final submission.</p>'+questions+'<button id="submitTest" type="button">Submit Test</button><div id="testResult" aria-live="polite" style="white-space:pre-line;margin-top:20px"></div>'+script+nav(),'Lesson Test');
for(const lang of ['english','arabic']){const scenes=data.video[lang];const body='<h2>'+(lang==='arabic'?'المنوال — الدرس الكامل':'Comparing Spread — Complete Lesson')+'</h2><p>'+(lang==='arabic'?'اثنا عشر مشهدًا تعليميًا مترابطًا':'Twelve progressive instructional scenes for the full lesson')+'</p>'+scenes.map((s,i)=>'<section class="lesson-scene"><span class="section-kicker">SCENE '+(i+1)+' / 12</span><h2>'+esc(s.title)+'</h2><p>'+esc(s.narration)+'</p><div class="math-focus" dir="ltr">'+esc(s.math)+'</div></section>').join('')+nav();write('video/'+lang,body,lang==='arabic'?'الدرس الكامل':'Full Lesson Video',lang==='arabic'?'ar':'en');}
write('video','<h2>Comparing Spread — Full Lesson Video</h2><a href="./english/">English</a> · <a href="./arabic/">Arabic</a>','Full Lesson Video');
for(const route of ['explanation','problems','answers','test','video/english','video/arabic']){const html=fs.readFileSync(path.join(out,route,'index.html'),'utf8');if(html.length<1600||/COMING SOON|Content still being completed/i.test(html))throw Error('Placeholder route '+route);}
function hits(route,term){return (fs.readFileSync(path.join(out,route,'index.html'),'utf8').match(new RegExp(term,'g'))||[]).length;}
if(hits('problems','class="question"')!==18||hits('answers','class="solution"')!==18||hits('test','class="lesson-test-question"')!==5)throw Error('Rendered page alignment invalid');
console.log('Lesson 192 QA PASS: 18 practice + 18 answers + 5 test, 23 independent spread checks, six routes, 12 EN + 12 AR instructional scenes.');
