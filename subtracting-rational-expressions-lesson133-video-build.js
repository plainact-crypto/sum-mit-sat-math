// Canonical Lesson 133 — bilingual full-length landscape lesson video routes (no Shorts).
const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'dist/advanced-math/rational-expressions-and-functions/subtracting-rational-expressions/video');
const scenes={
english:[
['Subtract rational expressions','Today: subtract algebraic fractions correctly, simplify, and keep all original restrictions.'],
['What is a rational expression?','A rational expression is a ratio of polynomials. Its denominator cannot be zero.'],
['The subtraction rule','With a shared denominator D: A over D minus B over D equals (A minus B) over D.'],
['Like denominators example','Seven over x minus two over x equals five over x, where x is not zero.'],
['The negative sign matters','(2x+1) over x minus (x−3) over x becomes (x+4) over x. Subtract every term in the second numerator.'],
['Unlike denominators','Factor the denominators, find their least common denominator, then rewrite both fractions.'],
['LCD example','Two over x minus three over x+1 uses LCD x times (x+1).'],
['Combine and simplify','The numerator is 2(x+1) minus 3x, which becomes 2 minus x. Denominator x(x+1).'],
['Factoring first','x squared minus 9 factors as (x−3)(x+3). Factoring reveals the LCD and excluded values.'],
['Restrictions','Original denominator zeros are forbidden even if a factor cancels later. Keep those restrictions with your answer.'],
['Worked cancellation','(x+1) over (x squared minus 1) minus 2 over (x−1) simplifies to negative one over (x−1); still exclude both x=−1 and x=1.'],
['Repeated factors','Two over (x squared minus 4) minus one over (x+2) squared needs LCD (x−2)(x+2) squared.'],
['SAT strategy','Factor, list restrictions, build the LCD, subtract grouped numerators, simplify, and test an allowed value.'],
['Practice and review','Now solve eighteen practice questions, compare the aligned solutions, and finish the five-question test.']
],
arabic:[
['طرح الكسور الجبرية','في هذا الدرس سنتعلم طرح التعبيرات النسبية وتبسيط الناتج مع الحفاظ على قيم المنع.'],
['ما التعبير النسبي؟','التعبير النسبي كسر بسطه ومقامه كثيرات حدود. لا يجوز أن يساوي المقام صفراً.'],
['قاعدة الطرح','عند تساوي المقامين نطرح البسط الثاني بالكامل من البسط الأول، ونبقي المقام كما هو.'],
['مثال مقام مشترك','سبعة على س ناقص اثنين على س تساوي خمسة على س، بشرط ألا تساوي س صفراً.'],
['انتبه للإشارة السالبة','عند طرح س ناقص ثلاثة من اثنين س زائد واحد، نوزع السالب على الحدين فيصبح الناتج س زائد أربعة.'],
['المقامات المختلفة','نحلل المقامات أولاً، ثم نوجد المضاعف المشترك الأصغر ونعيد كتابة الكسرين.'],
['مثال المضاعف المشترك','اثنان على س ناقص ثلاثة على س زائد واحد. المقام المشترك هو س مضروبة في س زائد واحد.'],
['اجمع الحدود المتشابهة','البسط يصبح اثنين مضروبة في س زائد واحد ناقص ثلاثة س، ويساوي اثنين ناقص س.'],
['التحليل قبل الطرح','س تربيع ناقص تسعة تساوي س ناقص ثلاثة مضروبة في س زائد ثلاثة.'],
['القيم الممنوعة','أي قيمة تجعل المقام الأصلي صفراً تبقى ممنوعة حتى لو اختصرنا العامل أثناء التبسيط.'],
['مثال على الاختصار','س زائد واحد على س تربيع ناقص واحد ناقص اثنين على س ناقص واحد تساوي سالب واحد على س ناقص واحد، مع منع سالب واحد وواحد.'],
['العوامل المتكررة','عند وجود س زائد اثنين تربيع نحتاج هذا العامل بأعلى أس في المقام المشترك.'],
['خطة الامتحان','حلل المقامات، حدد القيم الممنوعة، وحد المقامات، اطرح البسطين مع الأقواس، ثم بسط وتحقق.'],
['تدريب واختبار','ابدأ الآن بثماني عشرة مسألة تدريبية، راجع الحلول خطوة بخطوة، ثم أكمل اختبار الأسئلة الخمسة.']
]};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function render(lang,items){const ar=lang==='arabic',voice=ar?'ar-EG':'en-US';if(items.length!==14)throw Error(lang+' must contain 14 full-lesson scenes');const slides=items.map((s,i)=>'<section class="lesson-slide" '+(i?'hidden':'')+'><span>'+(i+1)+' / '+items.length+'</span><h2>'+esc(s[0])+'</h2><p>'+esc(s[1])+'</p></section>').join('');return '<!doctype html><html lang="'+(ar?'ar':'en')+'" dir="'+(ar?'rtl':'ltr')+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>Subtracting Rational Expressions — Full '+(ar?'Arabic':'English')+' Lesson | SUMMIT</title><style>.lesson-slide{aspect-ratio:16/9;min-height:310px;max-width:1080px;margin:20px auto;padding:36px;border-radius:18px;background:#162d49;color:white;display:flex;flex-direction:column;justify-content:center}.lesson-slide[hidden]{display:none}.lesson-slide h2{font-size:clamp(1.4rem,3vw,2.5rem)}.lesson-slide p{font-size:clamp(1.05rem,2vw,1.6rem);line-height:1.8}.lesson-controls{display:flex;gap:12px;flex-wrap:wrap;margin:20px 0}.lesson-controls button{padding:12px 18px;cursor:pointer}</style></head><body><header class="topbar"><a class="brand" href="/">SUMMIT SAT MATH</a></header><main class="page-shell"><section class="lesson-card"><div class="crumb">Advanced Math · Rational Expressions and Functions</div><div class="page-type">FULL LESSON · '+(ar?'ARABIC':'ENGLISH')+'</div><h1>Subtracting Rational Expressions</h1><p>Complete landscape lesson presentation with browser narration. Narration availability depends on your browser voices.</p>'+slides+'<div class="lesson-controls"><button id="prev" type="button">Previous</button><button id="play" type="button">Play narration</button><button id="pause" type="button">Pause</button><button id="next" type="button">Next</button></div><p id="status" aria-live="polite"></p><nav><a href="../../explanation/">Explanation</a> · <a href="../../problems/">Practice</a> · <a href="../../answers/">Solutions</a> · <a href="../../test/">Test</a> · <a href="../'+(ar?'english':'arabic')+'/">'+(ar?'English':'Arabic')+'</a></nav></section></main><script>(function(){const data='+JSON.stringify(items)+';let i=0,playing=false;const slides=[...document.querySelectorAll(".lesson-slide")],status=document.getElementById("status");function show(n){i=Math.max(0,Math.min(n,data.length-1));slides.forEach((s,k)=>s.hidden=k!==i);status.textContent=(i+1)+"/"+data.length}function stop(){playing=false;if("speechSynthesis"in window)speechSynthesis.cancel()}function speak(){if(!playing)return;if(!("speechSynthesis"in window)){stop();status.textContent="Narration unavailable";return}const u=new SpeechSynthesisUtterance(data[i][1]);u.lang="'+voice+'";u.rate=0.88;u.onend=()=>{if(playing){if(i<data.length-1){show(i+1);speak()}else stop()}};u.onerror=stop;speechSynthesis.speak(u)}document.getElementById("play").onclick=()=>{stop();playing=true;speak()};document.getElementById("pause").onclick=stop;document.getElementById("prev").onclick=()=>{stop();show(i-1)};document.getElementById("next").onclick=()=>{stop();show(i+1)};window.addEventListener("pagehide",stop);show(0)})();</script></body></html>'}
for(const [lang,items] of Object.entries(scenes)){const dir=path.join(root,lang);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),render(lang,items))}
console.log('Lesson 133: English and Arabic full-lesson routes, 14 landscape narrated scenes each.');
