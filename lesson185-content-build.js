'use strict';
const fs=require('fs'),path=require('path');
const d=require('./lesson185-math-data.json'),P=d.practice,T=d.test;
const groups=[['Skill Check',0,3],['Core Practice',3,11],['Exam-Style',11,16],['Challenge',16,18]];
if(P.length!==18||T.length!==5||groups.some(([g,a,b])=>P.slice(a,b).some(q=>q.group!==g)))throw Error('Lesson 185 count/group mismatch');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const base=d.base;
const css='<style>.w5-question,.w5-solution{border:1px solid #c8d8e8;padding:16px;margin:12px 0;border-radius:12px}.w5-question button,.w5-button{padding:10px 14px;background:#164e82;color:#fff;border:0;border-radius:8px;cursor:pointer}.w5-question input[type=text]{padding:10px;border:1px solid #b7c9da;border-radius:8px}.w5-option{display:block;padding:8px;margin:6px 0;border:1px solid #d6e0eb;border-radius:7px}.w5-video-stage{aspect-ratio:16/9;background:linear-gradient(125deg,#102b4a,#195d8d);color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:5%;box-sizing:border-box;border-radius:12px}.w5-video-stage h2,.w5-video-stage p{color:#fff}.w5-video-stage h2{font-size:clamp(1.4rem,3vw,2.8rem)}.w5-video-stage p{font-size:clamp(1rem,2vw,1.4rem);line-height:1.5}.w5-video-controls button{margin:7px}.lesson-section{padding:18px;margin:14px 0;border:1px solid #dce6f0;border-radius:12px}</style>';
const nav=['explanation','problems','answers','test','video/english','video/arabic'].map(x=>'<a href="/'+base+'/'+x+'/">'+x+'</a>').join(' · ');
function shell(type,body,js=''){return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css">'+css+'<title>Mean — '+esc(type)+' | SUMMIT SAT MATH</title></head><body><header class="topbar"><a class="brand" href="/">SUMMIT SAT MATH</a><nav><a href="/">Home</a><a href="/#subjects">Subjects</a></nav></header><main class="page-shell"><section class="lesson-card"><div class="crumb">Problem Solving and Data Analysis · One-Variable Data</div><div class="page-type">'+esc(type)+'</div><div class="lesson-title">Mean</div><article class="lesson-content">'+body+'</article><nav>'+nav+'</nav></section></main>'+js+'</body></html>'}
const sec=(n,t,body)=>'<section class="lesson-section"><span class="section-kicker">'+esc(n)+'</span><h2>'+esc(t)+'</h2>'+body+'</section>';
const topics=[
['LESSON OBJECTIVE','Find arithmetic means from lists, frequency tables, and combined groups; work backward to missing values.'],
['WHAT YOU NEED TO KNOW','The mean is a fair-share value: add every observation, then divide by how many observations there are.'],
['KEY DEFINITIONS','Sum is the total; count n is the number of observations; frequency is how often a value occurs.'],
['CORE RULE','Mean = sum/count. Therefore sum = mean × count. For a frequency table: mean = sum(value × frequency)/sum(frequencies).'],
['HOW IT WORKS','For a list, add then divide. For a table, multiply values by frequencies, add products, then divide by total frequency.'],
['WORKED EXAMPLE 1','Values 4, 6, 8 total 18; 18/3=6.'],
['WORKED EXAMPLE 2','Four numbers average 12: sum=48. If three total 36, the fourth is 48−36=12.'],
['WORKED EXAMPLE 3','Values 1,2,3 have frequencies 2,3,5. Weighted sum=2+6+15=23; count=10; mean=2.3.'],
['WORKED EXAMPLE 4','Eight students average 12, twelve average 17: (8×12+12×17)/(8+12)=300/20=15.'],
['WORKED EXAMPLE 5','Thirty scores average 70; remove ten averaging 64. Remaining mean=(2100−640)/20=73.'],
['FREQUENCY TABLE VISUAL','Value: 1,2,3; frequency: 2,3,5; weighted contributions: 2,6,15. Count=10 and sum=23.'],
['COMMON MISTAKES','Divide weighted totals by total frequency, not by number of table rows. Do not average two group means unless group sizes are equal.'],
['EXAM STRATEGY','For missing-value and group questions, calculate each sum as mean×count before combining or subtracting.'],
['QUICK CHECK','Mean of 5,7,9 is 7. Five values totaling 125 have mean 25. Four values averaging 15 total 60.'],
['LESSON RECAP','Mean=sum/count. For frequency tables use weighted sums. For combined groups add totals and counts.'],
['NEXT STEP','Complete 18 Practice questions, read 18 aligned solutions, then submit the 5-question Lesson Test.']
];
let exp='<!-- SUMMIT_RETROFIT:mean:NEITHER -->';
topics.forEach(([title,body],i)=>{let extra='';if(title==='FREQUENCY TABLE VISUAL')extra='<table border="1" cellpadding="8"><tr><th>Value</th><td>1</td><td>2</td><td>3</td></tr><tr><th>Frequency</th><td>2</td><td>3</td><td>5</td></tr><tr><th>Contribution</th><td>2</td><td>6</td><td>15</td></tr></table>';exp+=sec(String(i+1).padStart(2,'0')+' · '+title,title,'<p>'+esc(body)+'</p>'+extra)});
let problems=sec('PRACTICE','18 Practice Problems','<p>3 Skill Check, 8 Core Practice, 5 Exam-Style, 2 Challenge. Feedback gives correctness only; see Answers for worked solutions.</p>');
let answers=sec('ANSWERS','18 Aligned Solutions','<p>Solution number matches Practice question number exactly.</p>');
for(const [group,a,b] of groups){let cards='',solutions='';for(let i=a;i<b;i++){const q=P[i];cards+='<div class="w5-question" data-practice="'+(i+1)+'" data-answer="'+esc(q.answer)+'"><h3>'+(i+1)+'. '+esc(q.question)+'</h3><input type="text" aria-label="Answer '+(i+1)+'"> <button type="button" class="check">Check</button><p class="feedback" role="status"></p></div>';solutions+='<div class="w5-solution" data-solution="'+(i+1)+'"><h3>'+(i+1)+'. '+esc(q.question)+'</h3><p><b>Answer: '+esc(q.answer)+'</b></p><p>'+esc(q.solution)+'</p></div>'}problems+=sec(group,group,cards);answers+=sec(group,group,solutions)}
const practiceJS='<script>(()=>{const n=s=>s.trim().toLowerCase().replace(/[,\\s$]/g,"");document.querySelectorAll("[data-practice]").forEach(c=>c.querySelector(".check").onclick=()=>{const ok=n(c.querySelector("input").value)===n(c.dataset.answer);c.querySelector(".feedback").textContent=ok?"Correct. Open Answers for the worked solution.":"Try again: check the sum, count, and statistic."})})();</script>';
let test=sec('LESSON TEST','Five-question test','<p>Easy → Easy/Medium → Medium → Medium/Hard → Hard/Exam-Style. Results appear only after final submission.</p>')+'<form id="w5-test">';
T.forEach((q,i)=>{test+='<fieldset class="w5-question" data-test="'+(i+1)+'"><legend>'+esc(q.difficulty)+' · Question '+(i+1)+'</legend><p>'+esc(q.question)+'</p>';q.options.forEach((o,j)=>test+='<label class="w5-option"><input type="radio" name="q'+i+'" value="'+j+'" required> '+esc(o)+'</label>');test+='</fieldset>'});
test+='<button class="w5-button" type="submit" id="w5-submit">Submit Test</button></form><div id="w5-result" hidden role="status"></div>';
const testJS='<script>(()=>{const key='+JSON.stringify(T.map(q=>q.options.indexOf(q.answer)))+',solutions='+JSON.stringify(T.map(q=>q.solution))+';const form=document.getElementById("w5-test"),result=document.getElementById("w5-result");let done=false;form.onsubmit=e=>{e.preventDefault();if(done)return;const chosen=key.map((_,i)=>form.querySelector("input[name=q"+i+"]:checked"));if(chosen.some(x=>!x))return;done=true;let score=0,review=[];chosen.forEach((x,i)=>{const ok=Number(x.value)===key[i];if(ok)score++;review.push("Question "+(i+1)+": "+(ok?"Correct. ":"Incorrect. ")+solutions[i])});result.hidden=false;result.textContent="Final score: "+score+"/5. "+review.join(" | ");form.querySelectorAll("input,button").forEach(x=>x.disabled=true)}})();</script>';
const en=[
['Arithmetic mean','Mean is the sum of all observations divided by their number.'],
['Simple example','Four plus six plus eight is eighteen. Divide by three to get six.'],
['Reverse a mean','Four values averaging twelve total forty eight. Subtract known values to find the missing number.'],
['Frequency table','Multiply each value by its frequency, then divide the weighted sum by total frequency.'],
['Frequency example','Values one, two, three with frequencies two, three, five give weighted sum twenty three and mean two point three.'],
['Combine groups','Eight students average twelve and twelve average seventeen. The combined mean is fifteen.'],
['Adding a score','Five values averaging eighteen total ninety. Add thirty and divide by six to get twenty.'],
['Removing scores','Thirty scores average seventy. Remove ten averaging sixty four; the remaining mean is seventy three.'],
['Avoid this mistake','Never average two group means without considering their different group sizes.'],
['SAT strategy','Find totals using mean times count before combining groups or solving missing values.'],
['Quick check','The mean of five, seven, nine is seven. Five values totaling one hundred twenty five average twenty five.'],
['Next step','Complete eighteen practice questions, eighteen solutions and the five-question test.']
];
const ar=[
['الوسط الحسابي','المتوسط يساوي مجموع القيم مقسوماً على عددها.'],
['مثال','أربعة زائد ستة زائد ثمانية يساوي ثمانية عشر، نقسم على ثلاثة فيكون المتوسط ستة.'],
['قيمة ناقصة','أربع قيم متوسطها اثنا عشر، مجموعها ثمانية وأربعون. اطرح القيم المعروفة.'],
['جدول التكرار','اضرب كل قيمة في عدد مرات ظهورها، ثم اقسم المجموع على إجمالي التكرارات.'],
['مثال تكراري','قيم واحد واثنين وثلاثة بتكرارات اثنين وثلاثة وخمسة تعطينا متوسط اثنين فاصلة ثلاثة.'],
['دمج مجموعتين','ثمانية طلاب متوسطهم اثنا عشر، واثنا عشر طالباً متوسطهم سبعة عشر. المتوسط المشترك خمسة عشر.'],
['إضافة درجة','خمس درجات متوسطها ثمانية عشر، نضيف ثلاثين ثم نقسم المجموع الجديد على ستة فنحصل على عشرين.'],
['حذف درجات','ثلاثون درجة متوسطها سبعون، نحذف عشر درجات متوسطها أربعة وستون. المتوسط المتبقي ثلاثة وسبعون.'],
['خطأ شائع','لا تحسب متوسط متوسطين دون مراعاة عدد العناصر في كل مجموعة.'],
['استراتيجية الاختبار','احسب مجموع كل مجموعة بضرب المتوسط في العدد قبل الجمع أو الطرح.'],
['تأكد بنفسك','متوسط خمسة وسبعة وتسعة هو سبعة. وخمس قيم مجموعها مئة وخمسة وعشرون متوسطها خمسة وعشرون.'],
['التالي','أكمل ثماني عشرة مسألة تدريبية ثم راجع الحلول واختبار الدرس.']
];
function video(lang){const scenes=lang==='ar'?ar:en;const body='<p>Full landscape 16:9 captioned narrated lesson; playback uses browser speech synthesis when available.</p><div class="w5-video-stage"><small id="v-progress"></small><h2 id="v-title"></h2><p id="v-body"></p></div><div class="w5-video-controls"><button type="button" class="w5-button" id="v-prev">Previous</button><button type="button" class="w5-button" id="v-play">Play All</button><button type="button" class="w5-button" id="v-stop">Stop</button><button type="button" class="w5-button" id="v-next">Next</button></div><p role="status" id="v-status"></p>';const js='<script>(()=>{const scenes='+JSON.stringify(scenes)+',lang="'+lang+'";let i=0,playing=false;const title=document.getElementById("v-title"),body=document.getElementById("v-body"),progress=document.getElementById("v-progress"),status=document.getElementById("v-status");function show(){title.textContent=scenes[i][0];body.textContent=scenes[i][1];progress.textContent=(i+1)+" / "+scenes.length}function stop(){playing=false;if("speechSynthesis" in window)speechSynthesis.cancel()}function speak(){if(!playing)return;show();if(!("speechSynthesis" in window)){status.textContent="Audio unavailable; captions remain visible.";playing=false;return}const u=new SpeechSynthesisUtterance(scenes[i].join(". "));u.lang=lang==="ar"?"ar-EG":"en-US";u.rate=.87;u.onend=()=>{if(playing&&i<scenes.length-1){i++;speak()}else playing=false};u.onerror=()=>{status.textContent="Voice unavailable; use captions.";playing=false};speechSynthesis.speak(u)}document.getElementById("v-prev").onclick=()=>{stop();i=Math.max(0,i-1);show()};document.getElementById("v-next").onclick=()=>{stop();i=Math.min(scenes.length-1,i+1);show()};document.getElementById("v-stop").onclick=stop;document.getElementById("v-play").onclick=()=>{stop();playing=true;speak()};window.addEventListener("pagehide",stop);show()})();</script>';return shell('Video · '+(lang==='ar'?'Arabic':'English'),body,js)}
const pages={explanation:shell('Explanation',exp),problems:shell('Practice Problems',problems,practiceJS),answers:shell('Answers & Solutions',answers),test:shell('Lesson Test',test,testJS),'video/english':video('en'),'video/arabic':video('ar')};
for(const [route,html] of Object.entries(pages)){const file=path.join(__dirname,'dist',base,route,'index.html');fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,html,'utf8')}
console.log('Lesson 185 Mean: 18 practice, 18 answers, 5 test, 6 routes');
