'use strict';
const fs=require('fs'),path=require('path');
const base='algebra/linear-equations-in-two-variables/point-slope-form';
const videos=require('./point-slope-lesson10-video-data.json');
const dir=route=>path.join(__dirname,'dist',base,route,'index.html');
for(const page of ['explanation','problems','answers','test']){
 const file=dir(page);if(!fs.existsSync(file))throw Error('Missing lesson 10 '+page);
 const html=fs.readFileSync(file,'utf8');
 if(!html.includes('Point-Slope Form')||/COMING SOON|Content still being completed/i.test(html))throw Error('Incomplete lesson 10 '+page);
}
const test=dir('test'),original=fs.readFileSync(test,'utf8');
if(!original.includes('id="lessonTest"')||(original.match(/class="test-card"/g)||[]).length!==5)throw Error('Lesson 10 requires five test questions');
const lock=`<script>(()=>{const form=document.getElementById('lessonTest'),handler=form.onsubmit;let done=false;form.onsubmit=function(event){event.preventDefault();if(done)return;const cards=[...form.querySelectorAll('.test-card')];if(cards.some(c=>!c.querySelector('input[type=radio]:checked')&&!c.querySelector('input:not([type=radio])')?.value.trim())){alert('Answer all five questions before submitting.');return;}done=true;handler.call(form,event);form.querySelectorAll('input').forEach(el=>el.disabled=true);form.querySelector('button[type=submit]').disabled=true;};})();</script>`;
fs.writeFileSync(test,original.replace('</body>',lock+'</body>'));
for(const [lang,locale] of [['english','en-US'],['arabic','ar-EG']]){
 const scenes=videos[lang];
 if(!Array.isArray(scenes)||scenes.length!==12||scenes.some(x=>!Array.isArray(x)||x.length!==2||x.some(y=>typeof y!=='string'||!y.trim())))throw Error('Incomplete lesson 10 video '+lang);
 const html=`<!doctype html><html lang="${locale.slice(0,2)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>Point-Slope Form — ${lang} Full Lesson | SUMMIT</title></head><body><header class="topbar"><a class="brand" href="/">SUMMIT MATH</a></header><main class="page-shell"><section class="lesson-card"><div class="crumb">Algebra · Linear Equations in Two Variables</div><h1>Point-Slope Form</h1><h2>${lang} Full Lesson Video</h2><div style="aspect-ratio:16/9;background:#102e52;color:white;display:grid;place-content:center;text-align:center;padding:3%"><p id="chapter"></p><h2 id="heading"></h2><p id="caption" dir="auto"></p></div><p><button id="previous">Previous</button> <button id="play">Play Full Lesson</button> <button id="stop">Stop</button> <button id="next">Next</button></p><p id="status" role="status"></p><nav><a href="/${base}/explanation/">Explanation</a> · <a href="/${base}/problems/">Practice</a> · <a href="/${base}/answers/">Answers</a> · <a href="/${base}/test/">Test</a> · <a href="/${base}/video/${lang==='english'?'arabic':'english'}/">Other language</a></nav></section></main><script>(()=>{const scenes=${JSON.stringify(scenes)},locale=${JSON.stringify(locale)};let i=0,playing=false;const $=id=>document.getElementById(id);function show(){$('chapter').textContent=(i+1)+' / 12';$('heading').textContent=scenes[i][0];$('caption').textContent=scenes[i][1];}function stop(){playing=false;if(window.speechSynthesis)window.speechSynthesis.cancel();}function speak(){if(!playing)return;show();if(!window.speechSynthesis){$('status').textContent='Audio unavailable; read captions.';stop();return;}const u=new SpeechSynthesisUtterance(scenes[i].join('. '));u.lang=locale;u.rate=.87;u.onend=()=>{if(playing&&i<11){i++;speak();}else{playing=false;$('status').textContent='Lesson finished.';}};u.onerror=()=>{playing=false;$('status').textContent='Voice unavailable; captions remain visible.';};speechSynthesis.speak(u);}$('previous').onclick=()=>{stop();i=Math.max(0,i-1);show();};$('next').onclick=()=>{stop();i=Math.min(11,i+1);show();};$('stop').onclick=stop;$('play').onclick=()=>{stop();playing=true;speak();};show();})();</script></body></html>`;
 const out=dir('video/'+lang);fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,html);
 console.log('Point-Slope Form full video '+lang+': 12 chapters');
}
console.log('Lesson 10 four content routes + bilingual full video routes validated');
