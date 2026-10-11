'use strict';
const fs=require('fs'),path=require('path');
const d=require('./building-an-equation-from-center-and-radius-lesson280-data.json');
const manifest=require('./lesson-releases/building-an-equation-from-center-and-radius.json');
const slug='building-an-equation-from-center-and-radius',base=d.base;
const routes=['explanation','problems','answers','test','video/english','video/arabic'];
function assert(ok,msg){if(!ok)throw Error('[Lesson 280] '+msg)}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;':'&quot;'}[c]))}
function fmt(v,n){return v===0?n:v>0?'('+n+'-'+v+')':'('+n+'+'+(-v)+')'}
function equation(h,k,r2){return fmt(h,'x')+'² + '+fmt(k,'y')+'² = '+r2}
assert(d.lesson===slug&&d.canonicalIndex===279,'canonical identity');
assert(manifest.lesson===slug,'manifest slug');
assert(manifest.builders.length===1&&manifest.builders[0]==='building-an-equation-from-center-and-radius-lesson280-build.js','required builder');
assert(JSON.stringify(manifest.routes)===JSON.stringify(routes.map(r=>'/'+base+'/'+r+'/')),'canonical routes');
assert(d.practice.length===18&&d.test.length===5,'practice and test counts');
const groups=['Skill Check','Core Practice','Exam-Style Practice','Challenge Problems'];
const counts=[3,8,5,2];let pos=0;
for(let j=0;j<4;j++){for(let n=0;n<counts[j];n++)assert(d.practice[pos++].group===groups[j],'group order '+pos)}
assert(new Set(d.practice.map(p=>p.prompt)).size===18,'duplicate practice questions');
for(const q of [...d.practice,...d.test])assert(q.r2>0&&equation(q.h,q.k,q.r2)===q.answer,'mathematical answer '+q.id);
function pointR2(h,k,x,y){return (x-h)**2+(y-k)**2}
const p=d.practice;
for(const [id,x,y] of [[6,4,2],[7,-4,-5],[12,5,-2],[13,2,3],[15,-2,5]])assert(pointR2(p[id-1].h,p[id-1].k,x,y)===p[id-1].r2,'independent point QA '+id);
assert(p[16].h===(-4+2)/2&&p[16].k===(6-2)/2&&pointR2(-1,2,-4,6)===p[16].r2,'diameter QA');
assert(pointR2(-1,-2,1,1)===p[17].r2&&pointR2(-1,-2,-3,1)===p[17].r2,'equal-distance challenge QA');
assert(pointR2(3,-5,6,-1)===d.test[2].r2&&pointR2(2,4,-2,1)===d.test[4].r2,'test geometry QA');
assert(d.videos.english.length===8&&d.videos.arabic.length===8,'eight scenes per language');
function link(r){return '/'+base+'/'+r+'/'}
function section(label,title,body){return '<section class="lesson-section"><span class="section-kicker">'+esc(label)+'</span><h2>'+esc(title)+'</h2>'+body+'</section>'}
function shell(route,body,lang='en'){
 const names={explanation:'Explanation',problems:'Practice Problems',answers:'Answers & Solutions',test:'Lesson Test','video/english':'Full Lesson Video — English','video/arabic':'Full Lesson Video — Arabic'};
 const nav=routes.map(r=>'<a href="'+link(r)+'">'+esc(names[r])+'</a>').join(' · ');
 const html='<!doctype html><html lang="'+lang+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>'+esc(d.title+' — '+names[route])+' | SUMMIT MATH</title></head><body><header class="topbar"><a class="brand" href="/">SUMMIT<small>MATH</small></a></header><main class="page-shell"><section class="lesson-card"><div class="crumb">Geometry and Trigonometry · Circles · Circle Equation</div><div class="page-type">'+esc(names[route])+'</div><div class="lesson-title">'+esc(d.title)+'</div><article class="lesson-content"'+(lang==='ar'?' dir="rtl"':'')+'>'+body+'</article><nav class="lesson-nav">'+nav+'</nav></section></main></body></html>';
 const f=path.join(__dirname,'dist',base,route,'index.html');fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,html);return f;
}
function math(s){return '<code>'+esc(s)+'</code>'}
const graph='<figure><svg viewBox="0 0 520 360" role="img" aria-label="Exact coordinate circle centered at (2,3) with radius 4 and points (6,3), (−2,3), (2,7), (2,−1)" style="max-width:520px;width:100%;background:#f5f9fd;border:1px solid #cad6e5;border-radius:12px"><line x1="30" y1="230" x2="500" y2="230" stroke="#516b83" stroke-width="2"/><line x1="210" y1="12" x2="210" y2="345" stroke="#516b83" stroke-width="2"/><circle cx="266" cy="146" r="112" fill="none" stroke="#1677b9" stroke-width="3"/><line x1="266" y1="146" x2="378" y2="146" stroke="#b95436" stroke-width="2"/><circle cx="266" cy="146" r="5" fill="#b95436"/><circle cx="378" cy="146" r="4" fill="#1677b9"/><text x="275" y="138" font-size="15">(2,3)</text><text x="384" y="139" font-size="15">(6,3)</text><text x="309" y="136" font-size="14">r = 4</text><text x="494" y="247" font-size="15">x</text><text x="219" y="20" font-size="15">y</text></svg><figcaption>Deterministic graph: scale 28 pixels per unit; center (2,3), radius 4. Check (6−2)²+(3−3)²=16.</figcaption></figure>';
const desmos=section('DESMOS STRATEGY','Graph to verify, not to guess','<p><strong>Enter:</strong> '+math('(x-2)^2+(y-3)^2=16')+'.</p><p><strong>Look for:</strong> a circle centered at (2,3), reaching (6,3), (−2,3), (2,7) and (2,−1).</p><p><strong>Use it to answer:</strong> confirm the chosen equation has the stated center and radius 4.</p><p><strong>Why it works:</strong> every graphed point is exactly four units from (2,3).</p><p><strong>Faster or not?</strong> Substitution is faster for writing the equation; Desmos is useful for verifying signs or comparing choices.</p><p><strong>Independent check:</strong> (6−2)²+(3−3)²=16, so (6,3) lies on the circle.</p>');
let explanation='<!-- SUMMIT_RETROFIT:'+slug+':DESMOS_USEFUL -->';
explanation+=section('LESSON OBJECTIVE','Write a circle equation','<p>Given a center (h,k) and radius r, write '+math('(x−h)² + (y−k)² = r²')+' and verify it geometrically.</p>');
explanation+=section('WHAT YOU NEED TO KNOW','A circle is a set of equal distances','<p>Every point (x,y) on the circle is exactly r units from the center (h,k). Squaring the distance formula removes the square root.</p>');
explanation+=section('KEY DEFINITIONS','Center, radius, diameter','<p><b>Center:</b> (h,k). <b>Radius:</b> distance from center to circle. <b>Diameter:</b> twice the radius. A point on the circle satisfies its equation.</p>');
explanation+=section('CORE RULE','The standard circle equation','<p>'+math('(x−h)² + (y−k)² = r²')+'. Parentheses use the opposite signs from the center coordinates. The right side is r², not r.</p>');
explanation+=section('HOW IT WORKS','Three reliable steps','<ol><li>Identify h and k from the center.</li><li>Compute r² from the radius, diameter, a point, or a given area.</li><li>Substitute and check the signs and units.</li></ol>');
explanation+=section('WORKED EXAMPLES','Example 1 — positive center','<p>Center (2,3), radius 4: h=2, k=3, r²=16. Therefore '+math('(x−2)²+(y−3)²=16')+'. Check (6,3): 4²+0²=16.</p>');
explanation+=section('WORKED EXAMPLES','Example 2 — negative coordinate','<p>Center (−1,5), radius 3: subtracting −1 means adding 1. Therefore '+math('(x+1)²+(y−5)²=9')+'.</p>');
explanation+=section('WORKED EXAMPLES','Example 3 — point on the circle','<p>Center (1,−2), point (4,2): r²=(4−1)²+(2+2)²=9+16=25. Equation: '+math('(x−1)²+(y+2)²=25')+'.</p>');
explanation+=section('WORKED EXAMPLES','Example 4 — endpoints of a diameter','<p>Endpoints (−4,6) and (2,−2): midpoint is (−1,2); r²=(−4+1)²+(6−2)²=9+16=25. Equation: '+math('(x+1)²+(y−2)²=25')+'.</p>');
explanation+=section('WORKED EXAMPLES','Example 5 — tangency to an axis','<p>Center (−5,4), tangent to the y-axis: the radius is the horizontal distance |−5|=5. Equation: '+math('(x+5)²+(y−4)²=25')+'.</p>');
explanation+=section('GRAPH / VISUAL','Exact geometric check',graph);
explanation+=desmos;
explanation+=section('COMMON MISTAKES','Avoid these errors','<p>Do not copy the center signs into parentheses; do not put r instead of r² on the right; do not confuse a diameter with a radius; do not square the coordinates before subtracting them.</p>');
explanation+=section('EXAM STRATEGY','Fastest reliable method','<p>Read center coordinates directly, compute the squared radius without taking an unnecessary square root, and eliminate answer choices with wrong signs or wrong r².</p>');
explanation+=section('QUICK CHECK','Try before revealing','<p>Center (0,−3), radius 5. What is the equation?</p><details><summary>Reveal answer</summary><p>'+math('x²+(y+3)²=25')+'.</p></details>');
explanation+=section('LESSON RECAP','One formula, several ways to find r²','<p>Use '+math('(x−h)²+(y−k)²=r²')+'. A point gives squared distance; a diameter gives half its length; an axis tangent gives distance from the center to that axis.</p>');
explanation+=section('NEXT STEP','Practice and check','<p><a href="'+link('problems')+'">Solve all 18 problems</a>, <a href="'+link('answers')+'">review worked solutions</a>, then <a href="'+link('test')+'">take the five-question test</a>.</p>');
shell('explanation',explanation);
let problems='<p>Exactly 18 original questions. Solve independently; worked reasoning is on the Answers page.</p>';
for(const g of groups){const list=d.practice.filter(p=>p.group===g);problems+=section(g,g,'<ol start="'+list[0].id+'">'+list.map(p=>'<li><p>'+esc(p.prompt)+'</p></li>').join('')+'</ol>')}
shell('problems',problems);
let answers='<p>Each solution matches the same-numbered practice question.</p>';
for(const g of groups){const list=d.practice.filter(p=>p.group===g);answers+=section(g,g,'<ol start="'+list[0].id+'">'+list.map(p=>'<li><p>'+esc(p.prompt)+'</p><p><b>Working:</b> '+esc(p.steps)+'</p><p><b>Answer:</b> '+math(p.answer)+'</p></li>').join('')+'</ol>')}
shell('answers',answers);
function options(q){const vals=[q.answer,equation(-q.h,q.k,q.r2),equation(q.h,-q.k,q.r2),equation(q.h,q.k,q.r2+1),equation(q.h+1,q.k,q.r2),equation(q.h,q.k+1,q.r2)];const unique=[...new Set(vals)];assert(unique.length>=4,'test distractors '+q.id);const correct=unique[0],wrong=unique.slice(1,4);const offset=(q.id*2)%4;wrong.splice(offset,0,correct);return wrong}
const questions=d.test.map(q=>({id:q.id,difficulty:q.difficulty,prompt:q.prompt,choices:options(q),answer:q.answer,steps:q.steps}));
let test='<p>Five progressive questions. Select one answer per question, then submit once. No feedback is shown before final submission.</p><form id="lesson-test">';
for(const q of questions){test+='<fieldset><legend>Question '+q.id+' — '+esc(q.difficulty)+': '+esc(q.prompt)+'</legend>'+q.choices.map((choice,i)=>'<label style="display:block;padding:8px"><input type="radio" name="q'+q.id+'" value="'+i+'"> '+math(choice)+'</label>').join('')+'</fieldset>'}
test+='<button type="submit" id="submit-test">Submit Test</button></form><div id="test-result" role="status" aria-live="polite"></div>';
const publicQuestions=questions.map(q=>({id:q.id,choices:q.choices,answer:q.answer,steps:q.steps}));
test+='<script>(function(){const qs='+JSON.stringify(publicQuestions).replace(/</g,'\\u003c')+';let done=false;const form=document.getElementById("lesson-test");form.addEventListener("submit",function(e){e.preventDefault();if(done)return;const picks=qs.map(q=>form.querySelector("input[name=q"+q.id+"]:checked"));if(picks.some(x=>!x)){document.getElementById("test-result").textContent="Answer all five questions before submitting.";return}done=true;let score=0;let report="";qs.forEach((q,i)=>{const choice=q.choices[Number(picks[i].value)];const good=choice===q.answer;if(good)score++;report+="<p>Question "+q.id+": "+(good?"Correct":"Incorrect")+". Answer: "+q.answer+". "+q.steps+"</p>"});form.querySelectorAll("input,button").forEach(el=>el.disabled=true);document.getElementById("test-result").innerHTML="<h2>Final result: "+score+" / 5</h2>"+report})})();</script>';
shell('test',test);
for(const language of ['english','arabic']){
 const ar=language==='arabic',scenes=d.videos[language],title=ar?'الدرس الكامل — معادلة الدائرة':'Full Lesson — Circle Equation';
 const body='<section class="lesson-section"><h2>'+title+'</h2><p>'+(ar?'ثمانية مشاهد تعليمية متتابعة مع سرد صوتي ونص ظاهر.':'Eight progressive full-lesson scenes with narration and captions.')+'</p><div role="group" aria-label="Full lesson video player" style="aspect-ratio:16/9;background:#122d50;color:white;display:flex;flex-direction:column;justify-content:center;padding:4%;text-align:center"><p id="scene-count"></p><h2 id="scene-title" style="color:white"></h2><p id="scene-caption" style="font-size:clamp(1rem,2vw,1.5rem)"></p></div><div class="lesson-controls"><button id="scene-prev" type="button">'+(ar?'السابق':'Previous')+'</button> <button id="scene-play" type="button">'+(ar?'تشغيل الدرس':'Play Full Lesson')+'</button> <button id="scene-stop" type="button">'+(ar?'إيقاف':'Stop')+'</button> <button id="scene-next" type="button">'+(ar?'التالي':'Next')+'</button></div><p id="scene-status" role="status"></p></section>';
 const js='<script>(function(){const scenes='+JSON.stringify(scenes).replace(/</g,'\\u003c')+';let i=0,playing=false,token=0;const el=id=>document.getElementById(id);function show(){el("scene-count").textContent=(i+1)+" / "+scenes.length;el("scene-title").textContent="'+(ar?'المشهد ':'Scene ')+'"+(i+1);el("scene-caption").textContent=scenes[i]}function stop(){playing=false;token++;if(window.speechSynthesis)window.speechSynthesis.cancel()}function speak(){if(!playing)return;show();if(!window.speechSynthesis){el("scene-status").textContent="Narration unavailable; captions remain visible.";playing=false;return}const t=++token,u=new SpeechSynthesisUtterance(scenes[i]);u.lang="'+(ar?'ar-EG':'en-US')+'";u.rate=.9;u.onend=()=>{if(!playing||t!==token)return;if(i<scenes.length-1){i++;speak()}else{playing=false;el("scene-status").textContent="Lesson complete"}};u.onerror=()=>{if(t===token){playing=false;el("scene-status").textContent="Voice unavailable; captions remain visible."}};window.speechSynthesis.cancel();window.speechSynthesis.speak(u)}el("scene-play").onclick=()=>{stop();playing=true;speak()};el("scene-stop").onclick=stop;el("scene-prev").onclick=()=>{stop();i=Math.max(0,i-1);show()};el("scene-next").onclick=()=>{stop();i=Math.min(scenes.length-1,i+1);show()};window.addEventListener("pagehide",stop);show()})();</script>';
 shell('video/'+language,body+js,ar?'ar':'en');
}
for(const r of routes){const f=path.join(__dirname,'dist',base,r,'index.html');assert(fs.existsSync(f)&&fs.statSync(f).size>1500,'route missing '+r);const html=fs.readFileSync(f,'utf8');assert(!/coming soon|placeholder|lorem ipsum/i.test(html),'placeholder '+r)}
console.log('[Lesson 280] mathematical QA: 18 practice, 18 answers, 5 tests; six full canonical routes verified');
