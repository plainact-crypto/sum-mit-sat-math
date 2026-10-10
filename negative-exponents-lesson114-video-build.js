'use strict';
const {load}=require('./negative-exponents-lesson114-lib');
const {write}=require('./negative-exponents-lesson114-shell');
for(const lang of ['en','ar']){
 const scenes=load('video-'+lang);if(scenes.length<7||scenes.some(s=>s.length!==3))throw Error('Full video narration missing');
 const locale=lang==='ar'?'ar-EG':'en-US';
 const player='<div '+(lang==='ar'?'dir="rtl"':'')+'><h2>Full Lesson — '+(lang==='ar'?'Arabic':'English')+'</h2><p>Eight narrated teaching scenes, worked examples and recap. Full 16:9 lesson.</p><div style="aspect-ratio:16/9;background:#14243d;color:#fff;border-radius:18px;padding:5%;display:flex;flex-direction:column;justify-content:center;text-align:center"><p id="count"></p><h2 id="title"></h2><p id="caption"></p><strong id="formula"></strong></div><button id="prev">Previous</button> <button id="play">Play Full Lesson</button> <button id="stop">Stop</button> <button id="next">Next</button><p><a href="../../explanation/">Explanation</a> · <a href="../../problems/">Practice</a> · <a href="../../test/">Test</a></p></div>';
 const script='<script>(()=>{const s='+JSON.stringify(scenes)+',locale="'+locale+'";let i=0,playing=false;const el=x=>document.getElementById(x);function show(){el("count").textContent=(i+1)+"/"+s.length;el("title").textContent=s[i][0];el("caption").textContent=s[i][1];el("formula").textContent=s[i][2]}function stop(){playing=false;window.speechSynthesis?.cancel()}function speak(){if(!playing)return;show();if(!window.speechSynthesis){playing=false;return}const u=new SpeechSynthesisUtterance(s[i][1]);u.lang=locale;u.onend=()=>{if(playing&&i<s.length-1){i++;speak()}else playing=false};window.speechSynthesis.speak(u)}el("prev").onclick=()=>{stop();i=Math.max(0,i-1);show()};el("next").onclick=()=>{stop();i=Math.min(s.length-1,i+1);show()};el("stop").onclick=stop;el("play").onclick=()=>{stop();playing=true;speak()};show()})();</script>';
 write('video/'+(lang==='ar'?'arabic':'english'),'Full Lesson Video',player+script);
}
console.log('Lesson 114 bilingual full-length video routes complete');
