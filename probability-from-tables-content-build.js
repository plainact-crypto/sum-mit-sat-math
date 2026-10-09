const fs=require('fs'),path=require('path'),zlib=require('zlib');
const d=require('./probability-from-tables-lesson205-data.js');
const curriculum=JSON.parse(zlib.gunzipSync(Buffer.from(fs.readFileSync(path.join(__dirname,'curriculum.json.gz.b64'),'utf8').trim(),'base64')).toString('utf8'));
const leaves=[];for(const subject of curriculum)for(const section of subject.sections||[]){for(const leaf of section.leaves||[])leaves.push(leaf);for(const group of section.groups||[])for(const leaf of group.leaves||[])leaves.push(leaf);}
if(leaves.length!==298||leaves[204].title!=='Probability from Tables')throw Error('Canonical lesson #205 mismatch');
const base=leaves[204].base.replace(/^\//,'').replace(/\/$/,'');
const title='Probability from Tables';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const CSS='<style>.lesson-content{line-height:1.7;color:#20354d}.lesson-content section{margin:16px 0;padding:20px;border:1px solid #dce6f0;border-radius:15px;background:#fff}.lesson-content h2{font-size:1.26rem;color:#12304c}.section-kicker{font-weight:800;font-size:.78rem;color:#12709e}.table-figure{overflow-x:auto;margin:18px 0}.table-figure table{border-collapse:collapse;width:100%;min-width:390px}.table-figure th,.table-figure td{border:1px solid #bdd0df;padding:9px;text-align:center}.table-figure th{background:#eaf4fb}.table-figure figcaption{font-weight:700;margin-bottom:9px}.question{padding:17px;margin:12px 0;border:1px solid #d5e3ed;border-radius:12px;background:#f7fafc}.choices{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:12px 0}.choices label{display:flex;gap:8px;align-items:center;padding:11px;background:white;border:1px solid #c4d6e5;border-radius:10px;cursor:pointer}.question button,#submitTest,.video-controls button{background:#0678aa;color:white;border:0;border-radius:9px;padding:11px 18px;cursor:pointer}.solution{padding:16px;border-bottom:1px solid #dbe5ee}.summit-full-lesson-player{padding:24px;background:#10233f;color:white;border-radius:16px}.summit-stage{min-height:300px;aspect-ratio:16/9;display:flex;flex-direction:column;justify-content:center;gap:12px}.summit-stage h2{color:white}.summit-stage code{font-size:1.35rem;color:#a8eaff}.video-controls{display:flex;gap:12px;flex-wrap:wrap}@media(max-width:640px){.choices{grid-template-columns:1fr}}</style>';
const HEADER='<header class="topbar"><a class="brand" href="/"><span class="brand-mark"></span><span class="brand-copy">SUMMIT<small>SAT MATH</small></span></a><nav><a href="/">Home</a><a href="/#subjects">Subjects</a><a href="/#subjects">Practice</a><a href="/#subjects">Progress</a></nav><div class="actions"><button class="lang">EN <span>|</span> عربي</button><button id="themeToggle" class="theme">◐</button></div></header>';
const THEME='<script>(()=>{const s=localStorage.getItem("summit-theme")||"light";document.documentElement.dataset.theme=s;document.getElementById("themeToggle")?.addEventListener("click",()=>{const n=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=n;localStorage.setItem("summit-theme",n)})})();</script>';
function shell(type,route,body){
 const prefix=route.startsWith('video/')?'../../':'../';
 const links=[['explanation','Explanation'],['problems','Practice Problems'],['answers','Answers & Solutions'],['test','Lesson Test'],['video/english','English Full Lesson']].map(([k,v])=>'<a href="'+prefix+k+'/">'+v+'</a>').join(' · ');
 return '<!doctype html><html lang="en" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>'+esc(title)+' — '+esc(type)+' | SUMMIT SAT MATH</title>'+CSS+'</head><body>'+HEADER+'<main class="page-shell"><section class="lesson-card"><div class="crumb">Problem Solving and Data Analysis · Probability</div><div class="page-type">'+esc(type)+'</div><div class="lesson-title">'+esc(title)+'</div><div class="subject-label">Problem Solving and Data Analysis</div><article class="lesson-content">'+body+'</article><nav class="lesson-nav">'+links+'</nav><a class="back" href="/#subjects">← Back to curriculum tree</a></section></main>'+THEME+'</body></html>';
}
function table(k){
 const t=d.tables[k];if(!t)throw Error('Missing table '+k);
 const total=t.rows.reduce((s,r)=>s+r[1]+r[2],0),cols=[0,1].map(c=>t.rows.reduce((s,r)=>s+r[c+1],0));
 if(cols[0]+cols[1]!==total)throw Error('Bad totals '+k);
 let h='<figure class="table-figure"><figcaption>'+esc(t.title)+'</figcaption><table><thead><tr><th>Category</th>'+t.cols.map(c=>'<th>'+esc(c)+'</th>').join('')+'<th>Row total</th></tr></thead><tbody>';
 for(const r of t.rows)h+='<tr><th>'+esc(r[0])+'</th><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+(r[1]+r[2])+'</td></tr>';
 return h+'<tr><th>Column total</th><td>'+cols[0]+'</td><td>'+cols[1]+'</td><td>'+total+'</td></tr></tbody></table></figure>';
}
function choices(q,prefix,i){
 const a=[q[3],...q[4]];
 return '<div class="choices">'+a.map((v,j)=>'<label><input type="radio" name="'+prefix+i+'" value="'+j+'"><span><b>'+String.fromCharCode(65+j)+'.</b> '+esc(v)+'</span></label>').join('')+'</div>';
}
let explanation='<!-- SUMMIT_RETROFIT:probability-from-tables:NEITHER -->';
for(let i=0;i<d.sections.length;i++){const s=d.sections[i];explanation+='<section data-section="'+(i+1)+'"><span class="section-kicker">'+String(i+1).padStart(2,'0')+' · '+esc(s[0])+'</span><h2>'+esc(s[1])+'</h2><p>'+esc(s[2])+'</p>';
 if(i===5)explanation+=table('transport');
 if(i===8)explanation+=table('sport');
 if(i===10)explanation+=table('transport')+table('sport');
 if(i===11)explanation+=table('library');
 explanation+='</section>';
}
let problems='<p>Answer the 18 original questions. Instant correctness feedback is available; worked solutions appear on the Answers page.</p>';
let answers='<p>Every numbered solution matches the same-numbered Practice question exactly.</p>';
const names=['Skill Check','Core Practice','Exam-Style Practice','Challenge Problems'];
for(let g=0;g<4;g++){problems+='<section><h2>'+names[g].toUpperCase()+'</h2>';answers+='<section><h2>'+names[g].toUpperCase()+'</h2>';const shown=new Set();
 for(let i=0;i<d.practice.length;i++){const q=d.practice[i];if(q[0]!==g)continue;const n=i+1;
 if(!shown.has(q[1])){problems+=table(q[1]);answers+=table(q[1]);shown.add(q[1]);}
 problems+='<div class="question" id="pq'+n+'" data-correct="0"><h3>'+n+'. '+esc(q[2])+'</h3>'+choices(q,'p',n)+'<button type="button" onclick="checkPractice('+n+')">Check Answer</button><p id="pf'+n+'" aria-live="polite"></p></div>';
 answers+='<div class="solution" data-practice-id="'+n+'"><h3>'+n+'. '+esc(q[2])+'</h3><p><b>Reasoning:</b> '+esc(q[5])+'</p><p><b>Answer:</b> '+esc(q[3])+'</p></div>';
 }problems+='</section>';answers+='</section>';
}
problems+='<script>function checkPractice(i){const q=document.getElementById("pq"+i),p=q.querySelector("input:checked"),r=document.getElementById("pf"+i);r.textContent=!p?"Choose an option first.":Number(p.value)===Number(q.dataset.correct)?"Correct.":"Not yet. Recheck the sample space and denominator.";}</script>';
let test='<p>Complete all five questions. Correctness and solutions are revealed only after Submit Test.</p><form id="lessonTest">';
const levels=['Easy','Easy / Medium','Medium','Medium / Hard','Hard / Exam-Style'];
for(let i=0;i<d.test.length;i++){const q=d.test[i];test+='<section><span class="section-kicker">'+(i+1)+' · '+levels[i]+'</span>'+table(q[0])+'<div class="question"><h3>'+(i+1)+'. '+esc(q[1])+'</h3>'+choices([0,0,0,q[2],q[3]],'t',i+1)+'</div></section>';}
test+='</form><button type="submit" form="lessonTest" id="submitTest">Submit Test</button><div id="result" hidden aria-live="polite"></div>';
test+='<script>const reviews='+JSON.stringify(d.test.map(q=>[q[2],q[4]]))+';document.getElementById("lessonTest").addEventListener("submit",e=>{e.preventDefault();let score=0,items=[];for(let i=0;i<5;i++){const p=document.querySelector(\'input[name="t\'+(i+1)+\'"]:checked\');const ok=p&&Number(p.value)===0;if(ok)score++;items.push("<li>"+(ok?"Correct":"Review")+": "+reviews[i][0]+" — "+reviews[i][1]+"</li>");}const r=document.getElementById("result");r.hidden=false;r.innerHTML="<h2>Final score: "+score+"/5</h2><ol>"+items.join("")+"</ol>";document.getElementById("submitTest").disabled=true;document.querySelectorAll("#lessonTest input").forEach(x=>x.disabled=true);});</script>';
let video='<div class="summit-full-lesson-player" data-format="16:9"><div class="summit-stage"><small>SUMMIT SAT MATH · FULL LESSON · 16:9</small><h2 id="vtitle"></h2><p id="vbody"></p><code id="vformula"></code><small id="vprogress"></small></div><div class="video-controls"><button id="vplay">Play Full Narration</button><button id="vpause">Pause</button><button id="vnext">Next Scene</button></div><p>Complete narrated English lesson, with 15 teaching scenes. Narration uses your browser speech engine.</p></div>';
video+='<script>const scenes='+JSON.stringify(d.scenes)+';let n=0,playing=false;function show(){let s=scenes[n];document.getElementById("vtitle").textContent=s[0];document.getElementById("vbody").textContent=s[1];document.getElementById("vformula").textContent=s[2];document.getElementById("vprogress").textContent=(n+1)+" / "+scenes.length;}function speak(){if(!playing||!("speechSynthesis" in window))return;speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(scenes[n][3]);u.lang="en-US";u.rate=.9;u.onend=()=>{if(playing&&n<scenes.length-1){n++;show();speak();}else playing=false;};speechSynthesis.speak(u);}document.getElementById("vplay").onclick=()=>{playing=true;speak();};document.getElementById("vpause").onclick=()=>{playing=false;if("speechSynthesis" in window)speechSynthesis.cancel();};document.getElementById("vnext").onclick=()=>{n=(n+1)%scenes.length;show();if(playing)speak();};show();</script>';
const arabic='<section><h2>Arabic narration pending</h2><p>The full English lesson is available. This route does not claim a completed Arabic dub.</p><a href="../english/">Open English lesson</a></section>';
const pages={explanation:shell('Explanation','explanation',explanation),problems:shell('Practice Problems','problems',problems),answers:shell('Answers & Solutions','answers',answers),test:shell('Lesson Test','test',test),'video/english':shell('Full English Video','video/english',video),'video/arabic':shell('Arabic Video','video/arabic',arabic)};
if(d.practice.length!==18||d.test.length!==5||d.practice.filter(q=>q[0]===0).length!==3||d.practice.filter(q=>q[0]===1).length!==8||d.practice.filter(q=>q[0]===2).length!==5||d.practice.filter(q=>q[0]===3).length!==2)throw Error('Canonical counts failed');
for(const [route,h] of Object.entries(pages)){const dir=path.join(__dirname,'dist',base,route);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),h);}
console.log('[SUMMIT #205] 6 full lesson routes written at '+base);
