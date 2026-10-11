'use strict';
const fs=require('fs'),path=require('path');
const d=require('./completing-the-square-for-circle-equations-lesson285-data.json');
const manifest=require('./lesson-releases/completing-the-square-for-circle-equations.json');
const base=d.base,slug=d.slug;
const routes=['explanation','problems','answers','test','video/english','video/arabic'];
function check(ok,msg){if(!ok)throw Error('[Lesson 285] '+msg)}
function esc(s){return String(s).replace(/[&<>"]/g,c=>c==='&'?'&amp;':c==='<'?'&lt;':c==='>'?'&gt;':'&quot;')}
function num(n){return Number.isInteger(n)?String(n):Number.isInteger(n*2)?(n<0?'−':'')+Math.abs(n*2)+'/2':String(n)}
function square(v,x){return v===0?x+'²':v>0?'('+x+'−'+num(v)+')²':'('+x+'+'+num(-v)+')²'}
function standard(h,k,r2){return square(h,'x')+' + '+square(k,'y')+' = '+num(r2)}
function expanded(h,k,r2){const D=-2*h,E=-2*k,F=h*h+k*k-r2;let s='x² + y²';for(const [n,v] of [[D,'x'],[E,'y'],[F,'']]){if(n===0)continue;s+=(n>0?' + ':' − ')+(Math.abs(n)===1&&v?'':num(Math.abs(n)))+v}return s+' = 0'}
check(d.canonicalIndex===284&&d.lessonNumber===285&&slug==='completing-the-square-for-circle-equations','canonical identity');
check(manifest.lesson===slug&&manifest.builders.length===1&&manifest.builders[0]==='completing-the-square-for-circle-equations-lesson285-build.js','release manifest');
check(JSON.stringify(manifest.routes)===JSON.stringify(routes.map(r=>'/'+base+'/'+r+'/')),'canonical route list');
check(d.practice.length===18&&d.test.length===5,'question counts');
const groups=['Skill Check','Core Practice','Exam-Style Practice','Challenge Problems'],sizes=[3,8,5,2];
let idx=0;for(let j=0;j<4;j++)for(let n=0;n<sizes[j];n++)check(d.practice[idx++].group===groups[j],'3/8/5/2 practice order');
check(new Set(d.practice.map(q=>q.given)).size===18,'original questions');
for(const q of [...d.practice,...d.test]){const [h,k]=q.center;check(q.answer===standard(h,k,q.r2),'answer alignment '+q.id);check(q.given===expanded(h,k,q.r2),'independent expansion '+q.id);check(q.r2>0,'positive squared radius')}
check(d.videos.english.length===8&&d.videos.arabic.length===8,'bilingual scenes');
const link=r=>'/'+base+'/'+r+'/';
function write(route,body,lang='en'){
 const names={explanation:'Explanation',problems:'Practice Problems',answers:'Answers & Solutions',test:'Lesson Test','video/english':'Full Lesson Video — English','video/arabic':'Full Lesson Video — Arabic'};
 const nav=routes.map(r=>'<a href="'+link(r)+'">'+esc(names[r])+'</a>').join(' · ');
 const html='<!doctype html><html lang="'+lang+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>'+esc(d.title+' — '+names[route])+' | SUMMIT MATH</title></head><body><header class="topbar"><a class="brand" href="/">SUMMIT<small>MATH</small></a></header><main class="page-shell"><section class="lesson-card"><div class="crumb">Geometry and Trigonometry · Circles · Circle Equation</div><div class="page-type">'+esc(names[route])+'</div><div class="lesson-title">'+esc(d.title)+'</div><article class="lesson-content"'+(lang==='ar'?' dir="rtl"':'')+'>'+body+'</article><nav class="lesson-nav">'+nav+'</nav></section></main></body></html>';
 const file=path.join(__dirname,'dist',base,route,'index.html');fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,html);return file;
}
const math=s=>'<code>'+esc(s)+'</code>';
const sec=(label,title,body)=>'<section class="lesson-section"><span class="section-kicker">'+esc(label)+'</span><h2>'+esc(title)+'</h2>'+body+'</section>';
let exp='<!-- SUMMIT_RETROFIT:'+slug+':DESMOS_USEFUL -->';
exp+=sec('LESSON OBJECTIVE','Convert expanded circle equations to standard form','<p>Use completing the square to rewrite '+math('x²+y²+Dx+Ey+F=0')+' as '+math('(x−h)²+(y−k)²=r²')+' and read the center and radius.</p>');
exp+=sec('WHAT YOU NEED TO KNOW','Completing a square is a reversible identity','<p>'+math('x²+Dx=(x+D/2)²−(D/2)²')+'. The same identity works for y. You must balance additions on both sides.</p>');
exp+=sec('KEY DEFINITIONS','Expanded form and standard form','<p><b>Expanded form:</b> x²+y²+Dx+Ey+F=0. <b>Standard form:</b> (x−h)²+(y−k)²=r². <b>Center:</b> (h,k); <b>radius:</b> √(r²).</p>');
exp+=sec('CORE RULE','Half the linear coefficient, then square it','<p>From x²+Dx, add (D/2)². From y²+Ey, add (E/2)². The center is '+math('(−D/2, −E/2)')+' and '+math('r²=(D²+E²)/4−F')+'.</p>');
exp+=sec('HOW IT WORKS','A four-step routine','<ol><li>Group x terms and y terms.</li><li>Move F to the right.</li><li>Add (D/2)² and (E/2)² to both sides.</li><li>Factor both perfect squares and simplify r².</li></ol>');
exp+=sec('WORKED EXAMPLES','Example 1 — two nonzero coefficients','<p>'+math('x²+y²−4x−6y−3=0')+'. Move −3: x²−4x+y²−6y=3. Add 4 and 9 to both sides. Result '+math('(x−2)²+(y−3)²=16')+'. Center (2,3), radius 4.</p>');
exp+=sec('WORKED EXAMPLES','Example 2 — a positive linear coefficient','<p>'+math('x²+y²+2x−8y+8=0')+'. Move 8: x²+2x+y²−8y=−8. Add 1+16 to both sides. Result '+math('(x+1)²+(y−4)²=9')+'. Center (−1,4), radius 3.</p>');
exp+=sec('WORKED EXAMPLES','Example 3 — a missing linear term','<p>'+math('x²+y²+4y−21=0')+'. x is already a square. Move 21 and add 4: '+math('x²+(y+2)²=25')+'. Center (0,−2), radius 5.</p>');
exp+=sec('WORKED EXAMPLES','Example 4 — zero constant','<p>'+math('x²+y²−6x+8y=0')+'. Add 9 and 16: '+math('(x−3)²+(y+4)²=25')+'. Center (3,−4), radius 5. Zero F does not mean zero radius.</p>');
exp+=sec('WORKED EXAMPLES','Example 5 — half-integer center','<p>'+math('x²+y²−x+3y−4=0')+'. Add 1/4 and 9/4 after moving 4: r²=4+1/4+9/4=13/2. Thus '+math('(x−1/2)²+(y+3/2)²=13/2')+'.</p>');
exp+=sec('VISUAL / ALGEBRA CHECK','The balancing table','<table><thead><tr><th>Term</th><th>Half coefficient</th><th>Square added</th></tr></thead><tbody><tr><td>x²−4x</td><td>−2</td><td>4</td></tr><tr><td>y²−6y</td><td>−3</td><td>9</td></tr></tbody></table><p>Adding 4 and 9 to the left also requires adding 13 to the right. Expand the result to verify exactly.</p>');
exp+=sec('DESMOS STRATEGY','Use a graph as a cross-check','<p><b>Enter:</b> '+math('x^2+y^2-4x-6y-3=0')+' and '+math('(x-2)^2+(y-3)^2=16')+'.</p><p><b>Look for:</b> two coincident circles centered at (2,3), radius 4.</p><p><b>Use it to answer:</b> verify that the standard-form equation matches the original locus.</p><p><b>Why it works:</b> expanding the completed squares gives exactly the original equation.</p><p><b>Faster or not?</b> Algebra is faster for finding the exact center and radius; Desmos is useful for checking the result.</p><p><b>Independent verification:</b> expanding gives x²−4x+4+y²−6y+9=16, hence x²+y²−4x−6y−3=0.</p>');
exp+=sec('COMMON MISTAKES','Three frequent traps','<p>Adding a square to one side only; forgetting to halve D or E before squaring; reading the sign inside parentheses as the sign of the center. Also check r²&gt;0 for a genuine circle.</p>');
exp+=sec('EXAM STRATEGY','Efficient choice elimination','<p>Read h=−D/2 and k=−E/2 first. Compute r²=(D²+E²)/4−F. Use these to eliminate wrong choices without fully expanding each option.</p>');
exp+=sec('QUICK CHECK','Try before revealing','<p>Rewrite '+math('x²+y²+6x−4y−12=0')+'.</p><details><summary>Reveal</summary><p>Add 9 and 4 after moving 12: '+math('(x+3)²+(y−2)²=25')+'.</p></details>');
exp+=sec('LESSON RECAP','Remember the balance','<p>Half each linear coefficient, square, and add to both sides. Center (−D/2,−E/2); radius squared (D²+E²)/4−F. Expand to check.</p>');
exp+=sec('NEXT STEP','Apply the method','<p><a href="'+link('problems')+'">18 practice problems</a> · <a href="'+link('answers')+'">18 aligned solutions</a> · <a href="'+link('test')+'">five-question final test</a>.</p>');
write('explanation',exp);
let problems='<p>Solve all 18 questions in increasing difficulty. Full solutions are on the separate Answers page.</p>';
let answers='<p>Worked solutions correspond exactly to the numbered practice questions.</p>';
for(const g of groups){const list=d.practice.filter(q=>q.group===g);problems+=sec(g,g,'<ol start="'+list[0].id+'">'+list.map(q=>'<li><p>'+esc(q.prompt)+'</p></li>').join('')+'</ol>');answers+=sec(g,g,'<ol start="'+list[0].id+'">'+list.map(q=>'<li><p>'+esc(q.prompt)+'</p><p><b>Working:</b> '+esc(q.steps)+'</p><p><b>Answer:</b> '+math(q.answer)+'</p></li>').join('')+'</ol>')}
write('problems',problems);write('answers',answers);
function choices(q){const [h,k]=q.center;const candidates=[q.answer,standard(-h,k,q.r2),standard(h,-k,q.r2),standard(h,k,q.r2+1),standard(h+1,k,q.r2),standard(h,k+1,q.r2)];const u=[...new Set(candidates)];check(u.length>=4,'unique test options');const right=u.shift();const opts=u.slice(0,3);opts.splice((q.id*3)%4,0,right);return opts}
const qs=d.test.map(q=>({id:q.id,prompt:q.prompt,difficulty:q.difficulty,choices:choices(q),answer:q.answer,steps:q.steps}));
let test='<p>Five questions from easy to hard. You receive your result only after final submission.</p><form id="lesson-test">';
for(const q of qs){test+='<fieldset><legend>Question '+q.id+' — '+esc(q.difficulty)+': '+esc(q.prompt)+'</legend>'+q.choices.map((v,i)=>'<label style="display:block;padding:8px"><input type="radio" name="q'+q.id+'" value="'+i+'"> '+math(v)+'</label>').join('')+'</fieldset>'}
test+='<button type="submit">Submit Test</button></form><div id="test-result" role="status" aria-live="polite"></div>';
test+='<script>(function(){const qs='+JSON.stringify(qs).replace(/</g,'\\u003c')+';let submitted=false;const form=document.getElementById("lesson-test");form.addEventListener("submit",e=>{e.preventDefault();if(submitted)return;const picks=qs.map(q=>form.querySelector("input[name=q"+q.id+"]:checked"));if(picks.some(x=>!x)){document.getElementById("test-result").textContent="Answer all five questions before submitting.";return}submitted=true;let score=0,review="";qs.forEach((q,i)=>{const good=q.choices[Number(picks[i].value)]===q.answer;if(good)score++;review+="<p>Question "+q.id+": "+(good?"Correct":"Incorrect")+". "+q.steps+"</p>"});form.querySelectorAll("input,button").forEach(el=>el.disabled=true);document.getElementById("test-result").innerHTML="<h2>Final result: "+score+" / 5</h2>"+review})})();</script>';
write('test',test);
for(const language of ['english','arabic']){
 const ar=language==='arabic',scenes=d.videos[language];
 const body='<section class="lesson-section"><h2>'+(ar?'الدرس الكامل — إكمال المربع':'Full Lesson — Completing the Square for Circles')+'</h2><p>'+(ar?'ثمانية مشاهد مع سرد صوتي وترجمة نصية.':'Eight progressive narrated full-lesson scenes with captions.')+'</p><div role="group" aria-label="Full lesson scene" style="aspect-ratio:16/9;background:#122d50;color:#fff;display:flex;flex-direction:column;justify-content:center;text-align:center;padding:4%"><p id="scene-count"></p><h2 id="scene-title" style="color:#fff"></h2><p id="scene-caption" style="font-size:clamp(1rem,2vw,1.5rem)"></p></div><div class="lesson-controls"><button type="button" id="scene-prev">'+(ar?'السابق':'Previous')+'</button> <button type="button" id="scene-play">'+(ar?'تشغيل الدرس':'Play Full Lesson')+'</button> <button type="button" id="scene-stop">'+(ar?'إيقاف':'Stop')+'</button> <button type="button" id="scene-next">'+(ar?'التالي':'Next')+'</button></div><p id="scene-status" role="status"></p></section>';
 const script='<script>(function(){const scenes='+JSON.stringify(scenes).replace(/</g,'\\u003c')+';let i=0,playing=false,epoch=0;const el=id=>document.getElementById(id);function show(){el("scene-count").textContent=(i+1)+" / "+scenes.length;el("scene-title").textContent="'+(ar?'المشهد ':'Scene ')+'"+(i+1);el("scene-caption").textContent=scenes[i]}function stop(){playing=false;epoch++;if(window.speechSynthesis)window.speechSynthesis.cancel()}function speak(){if(!playing)return;show();if(!window.speechSynthesis){el("scene-status").textContent="Narration unavailable; captions remain visible.";playing=false;return}const token=++epoch,u=new SpeechSynthesisUtterance(scenes[i]);u.lang="'+(ar?'ar-EG':'en-US')+'";u.rate=.9;u.onend=()=>{if(!playing||token!==epoch)return;if(i<scenes.length-1){i++;speak()}else{playing=false;el("scene-status").textContent="Lesson complete"}};u.onerror=()=>{if(token===epoch){playing=false;el("scene-status").textContent="Voice unavailable; captions remain visible."}};window.speechSynthesis.cancel();window.speechSynthesis.speak(u)}el("scene-play").onclick=()=>{stop();playing=true;speak()};el("scene-stop").onclick=stop;el("scene-prev").onclick=()=>{stop();i=Math.max(0,i-1);show()};el("scene-next").onclick=()=>{stop();i=Math.min(scenes.length-1,i+1);show()};window.addEventListener("pagehide",stop);show()})();</script>';
 write('video/'+language,body+script,ar?'ar':'en');
}
for(const r of routes){const file=path.join(__dirname,'dist',base,r,'index.html');check(fs.existsSync(file)&&fs.statSync(file).size>1500,'missing route '+r);check(!/coming soon|placeholder|lorem ipsum/i.test(fs.readFileSync(file,'utf8')),'placeholder '+r)}
console.log('[Lesson 285] 18 aligned problems and answers, five tests, eight scenes each language, six routes: PASS');
