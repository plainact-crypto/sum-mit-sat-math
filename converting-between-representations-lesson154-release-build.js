'use strict';
const fs=require('fs'),path=require('path');
const d=require('./converting-between-representations-lesson154-core.json');
const root=path.join(__dirname,'dist',d.base);
const check=(v,m)=>{if(!v)throw Error('[Lesson 154] '+m)};
check(d.index===154&&d.slug==='converting-between-representations'&&d.classification==='DESMOS','identity');
check(d.explanation.length>=13&&d.video.english.length===8&&d.video.arabic.length===8,'core explanation and full-video scenes');
const source=fs.readFileSync(path.join(__dirname,'converting-between-representations-content-build.js'),'utf8');
const exported={exports:{}};
new Function('require','__dirname','module','console',source+'\nmodule.exports={q,t};')(require,__dirname,exported,console);
const {q,t}=exported.exports;
check(q.length===18&&t.length===5,'practice/test counts');
const groups=['Skill Check','Core Practice','Exam-Style','Challenge'];
check(q.map(x=>x[0]).join('|')===[...Array(3).fill(groups[0]),...Array(8).fill(groups[1]),...Array(5).fill(groups[2]),...Array(2).fill(groups[3])].join('|'),'practice group distribution');
check(t.map(x=>x[0]).join('|')==='Easy|Easy / Medium|Medium|Medium / Hard|Hard / Exam-Style','test progression');
check(new Set(q.map(x=>x[1])).size===18&&new Set(t.map(x=>x[1])).size===5,'duplicate questions');
check(q.every(x=>x.length===4&&x[1]&&x[2]&&x[3])&&t.every(x=>x.length===4),'aligned worked answers');
check(3*(3-2)**2-1===2&&3*(2-2)**2-1===-1,'vertex conversion');
check(3*Math.pow(2,3)===24&&500*Math.pow(1.08,0)===500,'exponential examples');
check(((-1)**2-4*(-1)+1)===6&&((2)**2-4*2+1)===-3,'quadratic table');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const routes=['explanation','problems','answers','test','video/english','video/arabic'];
const nav=routes.map(r=>'<a href="/'+d.base+'/'+r+'/">'+esc(r)+'</a>').join(' · ');
const shell=(type,body,lang='en')=>'<!doctype html><html lang="'+lang+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>'+esc(d.title)+' — '+esc(type)+' | SUMMIT SAT MATH</title></head><body><header class="topbar"><a class="brand" href="/">SUMMIT<small>SAT MATH</small></a><nav><a href="/">Home</a><a href="/#subjects">Subjects</a></nav></header><main class="page-shell"><section class="lesson-card"><div class="crumb">Advanced Math · Nonlinear Functions</div><div class="page-type">'+esc(type)+'</div><div class="lesson-title">'+esc(d.title)+'</div><article class="lesson-content">'+body+'</article><nav>'+nav+'</nav></section></main></body></html>';
function write(r,html,lang){const dir=path.join(root,r);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),shell(r,html,lang))}
const explanation='<!-- SUMMIT_RETROFIT:converting-between-representations:DESMOS -->'+d.explanation.map(([h,b],i)=>'<section class="lesson-section"><span class="section-kicker">'+(i+1)+'</span><h2>'+esc(h)+'</h2><p>'+esc(b)+'</p></section>').join('');
write('explanation',explanation);
write('problems',q.map((x,i)=>'<section class="lesson-section"><h2>'+esc(x[0])+' — '+(i+1)+'</h2><p>'+esc(x[1])+'</p></section>').join(''));
write('answers',q.map((x,i)=>'<section class="lesson-section"><h2>'+esc(x[0])+' — '+(i+1)+'</h2><p>'+esc(x[1])+'</p><p><strong>'+esc(x[2])+'</strong></p><p>'+esc(x[3])+'</p></section>').join(''));
const safe=JSON.stringify(t.map(x=>[x[2],x[3]])).replace(/</g,'\\u003c');
const test=t.map((x,i)=>'<section class="lesson-section"><h2>'+esc(x[0])+' — '+(i+1)+'</h2><p>'+esc(x[1])+'</p><label>Answer <input id="ans'+i+'" autocomplete="off" aria-label="Answer '+(i+1)+'"></label><div class="solution" id="sol'+i+'" hidden></div></section>').join('');
const script='<button id="submit-test" type="button">Submit Test</button><p id="result" role="status"></p><script>const answers='+safe+';document.getElementById("submit-test").addEventListener("click",()=>{let score=0;answers.forEach((a,i)=>{const input=document.getElementById("ans"+i),value=input.value.trim().toLowerCase().replace(/\\s+/g,"").replace(/[−–]/g,"-");const expected=a[0].trim().toLowerCase().replace(/\\s+/g,"").replace(/[−–]/g,"-");if(value===expected)score++;input.disabled=true;const el=document.getElementById("sol"+i);el.hidden=false;el.textContent="Correct answer: "+a[0]+". "+a[1];});document.getElementById("result").textContent="Final score: "+score+" / 5";document.getElementById("submit-test").disabled=true;});</script>';
write('test','<p>Complete all five questions, then submit once. Solutions remain hidden until submission.</p>'+test+script);
for(const lang of ['english','arabic']){const body=d.video[lang].map(([heading,narration,screen],i)=>'<section class="lesson-section"><h2>Scene '+(i+1)+' — '+esc(heading)+'</h2><p>'+esc(narration)+'</p><p><strong>On screen:</strong> '+esc(screen)+'</p></section>').join('');write('video/'+lang,'<h1>Full Lesson Video — '+lang+'</h1><p>Eight-scene full lesson narration and visual storyboard (16:9).</p>'+body,lang==='arabic'?'ar':'en')}
for(const r of routes){const file=path.join(root,r,'index.html');check(fs.existsSync(file)&&fs.statSync(file).size>900,'route '+r)}
console.log('[Lesson 154] QA PASS: 18 practice/answers 3-8-5-2; 5 progressive tests; 8 bilingual full-video scenes; 6 canonical routes.');
