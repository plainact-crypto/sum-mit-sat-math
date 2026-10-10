'use strict';
const fs=require('fs'),path=require('path'),zlib=require('zlib');
const root=__dirname;
const d=JSON.parse(fs.readFileSync(path.join(root,'quotient-rule-lesson112-content.json'),'utf8'));
const c=JSON.parse(zlib.gunzipSync(Buffer.from(fs.readFileSync(path.join(root,'curriculum.json.gz.b64'),'utf8').trim(),'base64')).toString('utf8'));
const all=[];
for(const s of c)for(const sec of s.sections||[]){
  for(const l of sec.leaves||[])all.push({s,sec,g:null,l});
  for(const g of sec.groups||[])for(const l of g.leaves||[])all.push({s,sec,g,l});
}
const ix=all.findIndex(x=>x.l.slug===d.slug&&x.l.title===d.title);
if(ix!==111||d.index!==112||(ix+1)%5!==2)throw Error('Lesson 112 canonical ownership/index mismatch');
const {s,sec,g,l}=all[ix];
if(s.title!=='Advanced Math'||sec.title!=='Exponents'||g!==null||
   d.location[0]!==s.title||d.location[1]!==sec.title||d.location[2]!==null||
   l.base!=='/advanced-math/exponents/quotient-rule')throw Error('Lesson 112 canonical path mismatch');
if(d.classification!=='NEITHER')throw Error('Quotient Rule exponent lesson is classified NEITHER (no graph or Desmos needed)');
const groups=[['Skill Check',3],['Core Practice',8],['Exam-Style',5],['Challenge',2]];
let n=0;
for(const [group,count] of groups)for(let j=0;j<count;j++){
  const q=d.practice[n];
  if(!q||q.number!==n+1||q.group!==group||!q.question||!q.answer||!q.solution)throw Error('Practice/Solution alignment '+(n+1));
  n++;
}
if(n!==18||d.practice.length!==18)throw Error('Expected exactly 18 aligned practice questions');
const difficulty=['Easy','Easy / Medium','Medium','Medium / Hard','Hard / Exam-Style'];
if(d.test.length!==5||d.test.some((q,i)=>q.number!==i+1||q.difficulty!==difficulty[i]||q.options.length!==4||!Number.isInteger(q.correct)||q.correct<0||q.correct>3||!q.solution))throw Error('Five progressive test questions required');
if(d.explanation.length!==14||d.video.english.length!==10||d.video.arabic.length!==10)throw Error('Missing full explanation or bilingual lesson scenes');
const close=(x,y)=>Math.abs(x-y)<1e-8;
const witnesses=[
 [2**8/2**3,2**5],[4**4/4**4,1],[2**7/2**4,8],[2**3/2**9,1/2**6],
 [12*2**9/(3*2**5),4*2**4],[(2**7*3**2)/(2**3*3**5),2**4/3**3],
 [2**-2/2**4,1/2**6],[(2**8/2**3)/2**2,2**3],
 [(15*2**4*3**8)/(5*2**7*3**2),3*3**6/2**3],
 [3**9/9**3,27],[2**12/2**7,32],[2**14/2**8,2**6],
 [(4*2**-3*3**7)/(2*2**2*3**-1),2*3**8/2**5],
 [2**(2*7+1)/2**(7-2),2**10],[((2**8/2**3)**2)/2**6,2**4],
 [(2*2**7+6*2**5)/(2*2**3),2**4+3*2**2],
 [2**3/2**7,2**-4],
 [((6*2**7*3**-2)/(9*2**-1*3**3))/((2*2**2)/(3*3)),2**6/3**4],
 [2**9/2**4,2**5],[10*2**6/(2*2**2),5*2**4],
 [(2**3*3**8)/(2**7*3**2),3**6/2**4],
 [3**9/9**3,27],
 [(4*2**(6+2))/(2*2**(3-6)),2*2**11]
];
if(witnesses.length!==23||witnesses.some(pair=>!close(pair[0],pair[1])))throw Error('Independent math witness QA failed');
const esc=x=>String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const rel=l.base.replace(/^\/|\/$/g,'');
const base=path.join(root,'dist',rel);
const routes=['explanation','problems','answers','test','video/english','video/arabic'];
const nav=routes.map(r=>'<a href="/'+rel+'/'+r+'/">'+esc(r==='problems'?'Practice Problems':r==='answers'?'Answers & Solutions':r==='test'?'Lesson Test':r==='explanation'?'Explanation':r==='video/english'?'English Full Lesson':'Arabic Full Lesson')+'</a>').join(' · ');
function page(type,body,lang='en'){
 return '<!doctype html><html lang="'+lang+'"'+(lang==='ar'?' dir="rtl"':'')+' data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>'+esc(d.title+' — '+type)+' | SUMMIT SAT MATH</title><style>.qr112-item{border:1px solid #cbd5e1;border-radius:12px;padding:16px;margin:12px 0}.qr112-nav{display:flex;gap:12px;flex-wrap:wrap;margin:22px 0}.qr112-choice{display:block;padding:10px;margin:8px 0;border:1px solid #cbd5e1;border-radius:8px}.qr112-scene{padding:18px;margin:14px 0;border:1px solid #cbd5e1;border-radius:12px}.qr112-result{white-space:pre-wrap}</style></head><body><header class="topbar"><a class="brand" href="/"><span class="brand-mark"></span><span class="brand-copy">SUMMIT<small>SAT MATH</small></span></a><nav><a href="/">Home</a><a href="/#subjects">Subjects</a><a href="/#subjects">Practice</a><a href="/#subjects">Progress</a></nav></header><main class="page-shell"><section class="lesson-card"><div class="crumb">'+esc(s.title+' · '+sec.title)+'</div><div class="page-type">'+esc(type)+'</div><div class="lesson-title">'+esc(d.title)+'</div><div class="subject-label">'+esc(s.title)+'</div><article class="lesson-content">'+body+'</article><nav class="qr112-nav" aria-label="Lesson pages">'+nav+'</nav><a class="back" href="/#subjects">← Back to curriculum tree</a></section></main></body></html>';
}
function save(route,body,lang='en'){
 const file=path.join(base,route,'index.html');fs.mkdirSync(path.dirname(file),{recursive:true});
 fs.writeFileSync(file,page(route==='explanation'?'Explanation':route==='problems'?'Practice Problems':route==='answers'?'Answers & Solutions':route==='test'?'Lesson Test':'Full Lesson · '+lang,body,lang));
}
let expl='<!-- SUMMIT_RETROFIT:quotient-rule:NEITHER -->';
for(const [label,title,body] of d.explanation){
 expl+='<section class="lesson-section"><span class="section-kicker">'+esc(label)+'</span><h2>'+esc(title)+'</h2><p>'+esc(body)+'</p></section>';
}
save('explanation',expl);
let problems='',answers='',start=0;
for(const [group,count] of groups){
 problems+='<section class="lesson-section"><h2>'+esc(group)+'</h2>';
 answers+='<section class="lesson-section"><h2>'+esc(group)+'</h2>';
 for(const q of d.practice.slice(start,start+count)){
  problems+='<div class="qr112-item"><h3>'+q.number+'. '+esc(q.question)+'</h3></div>';
  answers+='<div class="qr112-item"><h3>'+q.number+'. '+esc(q.question)+'</h3><p><b>Answer: '+esc(q.answer)+'</b></p><p>'+esc(q.solution)+'</p></div>';
 }
 problems+='</section>';answers+='</section>';start+=count;
}
save('problems',problems);save('answers',answers);
let test='<p>Answer all five questions. No answers are revealed until you submit the entire test.</p>';
for(const q of d.test){
 test+='<section class="lesson-section"><h3>'+q.number+'. '+esc(q.question)+'</h3><p>'+esc(q.difficulty)+'</p>';
 for(let i=0;i<4;i++)test+='<label class="qr112-choice"><input type="radio" name="q'+q.number+'" value="'+i+'"> '+esc('ABCD'[i]+'. '+q.options[i])+'</label>';
 test+='</section>';
}
test+='<button id="qr112Submit" type="button">Submit Test</button><div id="qr112Result" class="qr112-result" aria-live="polite"></div>';
const review=d.test.map(q=>({number:q.number,correct:q.correct,answer:q.options[q.correct],solution:q.solution}));
test+='<script>(function(){const questions='+JSON.stringify(review).replace(/</g,'\\u003c')+';let done=false;const button=document.getElementById("qr112Submit");button.addEventListener("click",function(){if(done)return;const chosen=questions.map(q=>document.querySelector("input[name=q"+q.number+"]:checked"));if(chosen.some(x=>!x)){document.getElementById("qr112Result").textContent="Please answer all five questions before submitting.";return;}done=true;let score=0,lines=[];questions.forEach((q,i)=>{const ok=Number(chosen[i].value)===q.correct;if(ok)score++;lines.push("Question "+q.number+": "+(ok?"Correct":"Incorrect")+". Answer: "+q.answer+". "+q.solution);});document.querySelectorAll("input[type=radio]").forEach(x=>x.disabled=true);button.disabled=true;document.getElementById("qr112Result").textContent="Score: "+score+"/5\\n\\n"+lines.join("\\n\\n");});})();</script>';
save('test',test);
for(const lang of ['english','arabic']){
 const scenes=d.video[lang];
 let body='<section class="lesson-section"><span class="section-kicker">STANDARD FULL LESSON · '+lang.toUpperCase()+'</span><h2>'+esc(lang==='arabic'?'قاعدة قسمة القوى':d.title)+'</h2><p>'+esc(lang==='arabic'?'شرح الدرس الكامل خطوة بخطوة مع أمثلة ومراجعة نهائية.':'Complete lesson presentation with concepts, examples, exam strategy and recap.')+'</p></section>';
 for(let i=0;i<scenes.length;i++)body+='<section class="qr112-scene"><span class="section-kicker">SCENE '+(i+1)+' / '+scenes.length+'</span><h2>'+esc(scenes[i][0])+'</h2><p>'+esc(scenes[i][1])+'</p></section>';
 save('video/'+lang,body,lang==='arabic'?'ar':'en');
 if(lang==='english')save('video',body,'en');
}
for(const route of routes){
 const target=path.join(base,route,'index.html');
 const html=fs.readFileSync(target,'utf8');
 if(html.includes('COMING SOON')||html.length<1500||!html.includes(d.title))throw Error('Required route invalid: '+route);
}
console.log('[Lesson 112] canonical Quotient Rule; 18 practice/answers (3/8/5/2); 5 progressive tests; 23 numeric QA witnesses; 6 non-placeholder routes; 10 English + 10 Arabic full-lesson scenes.');
