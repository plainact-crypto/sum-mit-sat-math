'use strict';
const fs=require('fs'),path=require('path');
const e=[1,2,3,4,5,6].flatMap(i=>require('./general-form-lesson282-explanation-part'+i+'.json'));
const en=[0,1,2,3,4,5,6,7,8,9,11,14].map(i=>[e[i][0],e[i][1]+' '+e[i][2]]);
const ar=[
['هدف الدرس','نتعلم تحويل معادلة الدائرة العامة إلى الصورة القياسية، وتحديد المركز ونصف القطر.'],
['الفكرة','معادلة الدائرة العامة هي سين تربيع زائد صاد تربيع زائد دي سين زائد إي صاد زائد إف يساوي صفر.'],
['المركز','المركز إحداثياه سالب دي على اثنين، وسالب إي على اثنين.'],
['نصف القطر','مربع نصف القطر يساوي مربع دي زائد مربع إي مقسوما على أربعة، ناقص إف.'],
['الخطوات','نجمع حدود سين وحدود صاد، ثم نكمل المربع في كل منهما.'],
['مثال المركز','في سين تربيع زائد صاد تربيع ناقص ستة سين زائد أربعة صاد ناقص اثني عشر يساوي صفر، المركز ثلاثة وسالب اثنين.'],
['مثال نصف القطر','مربع نصف القطر يساوي تسعة زائد أربعة زائد اثني عشر، أي خمسة وعشرون، إذن نصف القطر خمسة.'],
['الصورة القياسية','سين ناقص ثلاثة الكل تربيع زائد صاد زائد اثنين الكل تربيع يساوي خمسة وعشرين.'],
['معادلة غير حقيقية','إذا كان مربع نصف القطر سالبا فلا توجد دائرة حقيقية، وإذا كان صفرا فالحل نقطة واحدة.'],
['التحويل العكسي','للانتقال من الصورة القياسية إلى العامة، نوسع المربعات ونجمع الحدود والثوابت.'],
['استراتيجية ديسموس','أدخل المعادلة العامة في ديسموس للتحقق من الرسم، لكن إكمال المربع أسرع للقيم الدقيقة.'],
['الخلاصة','راجع إشارات المركز ومربع نصف القطر، ثم حل ثمانية عشر تمرينا واختبار الدرس المكون من خمسة أسئلة.']
];
if(en.length!==12||ar.length!==12)throw Error('full lesson scenes missing');
const base='geometry-and-trigonometry/circles/circle-equation/general-form',root=path.join(__dirname,'dist',base);
const nav=['explanation','problems','answers','test','video/english','video/arabic'].map(x=>'<a href="/'+base+'/'+x+'/">'+x+'</a>').join(' · ');
for(const [lang,scenes] of [['english',en],['arabic',ar]]){
const body='<div style="aspect-ratio:16/9;background:#102e52;color:white;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:5%"><small id="counter"></small><h2 id="heading"></h2><p id="caption"></p></div><p><button id="prev">Previous</button> <button id="play">Play full lesson</button> <button id="stop">Stop</button> <button id="next">Next</button></p><p id="status" role="status"></p>';
const js='<script>(()=>{const scenes='+JSON.stringify(scenes)+',language="'+(lang==='arabic'?'ar-EG':'en-US')+'";let i=0,playing=false;const h=document.getElementById("heading"),p=document.getElementById("caption"),c=document.getElementById("counter");function show(){h.textContent=scenes[i][0];p.textContent=scenes[i][1];c.textContent=(i+1)+"/"+scenes.length;}function stop(){playing=false;if(window.speechSynthesis)speechSynthesis.cancel();}function speak(){if(!playing)return;show();if(!window.speechSynthesis){document.getElementById("status").textContent="Audio unavailable; captions remain accessible.";return;}const u=new SpeechSynthesisUtterance(scenes[i].join(". "));u.lang=language;u.rate=.86;u.onend=()=>{if(playing&&i<scenes.length-1){i++;speak();}else playing=false;};u.onerror=()=>{playing=false;document.getElementById("status").textContent="Audio unavailable; use captions.";};speechSynthesis.speak(u);}document.getElementById("prev").onclick=()=>{stop();i=Math.max(0,i-1);show();};document.getElementById("next").onclick=()=>{stop();i=Math.min(scenes.length-1,i+1);show();};document.getElementById("stop").onclick=stop;document.getElementById("play").onclick=()=>{stop();playing=true;speak();};show();})();</script>';
const html='<!doctype html><html lang="'+(lang==='arabic'?'ar':'en')+'" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>General Form — Full Lesson '+lang+' | SUMMIT SAT MATH</title></head><body><header class="topbar"><a class="brand" href="/">SUMMIT <small>SAT MATH</small></a></header><main class="page-shell"><section class="lesson-card"><div class="crumb">Geometry and Trigonometry · Circles · Circle Equation</div><div class="page-type">Full Lesson · '+lang+'</div><div class="lesson-title">General Form</div>'+body+js+'<nav class="next-links">'+nav+'</nav></section></main></body></html>';
const dir=path.join(root,'video',lang);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html);
}
console.log('Lesson 282 bilingual full-lesson narration routes: 12 scenes each.');

