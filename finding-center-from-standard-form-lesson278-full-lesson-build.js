'use strict';
const {videos,esc,page,write}=require('./finding-center-from-standard-form-lesson278-common.js');
require('./finding-center-from-standard-form-lesson278-math-qa.js');
for(const lang of ['english','arabic']){
 const scenes=videos[lang],rtl=lang==='arabic';
 if(scenes.length!==20)throw Error('20 full-lesson scenes required');
 const cards=scenes.map((s,i)=>'<section data-scene="'+i+'" style="aspect-ratio:16/9;background:#102e52;color:white;padding:4%;margin:1rem 0;direction:'+(rtl?'rtl':'ltr')+';display:'+(i?'none':'block')+'"><p>Scene '+(i+1)+'/20</p><h2>'+esc(s[0])+'</h2><p>'+esc(s[1])+'</p></section>').join('');
 const script='<script>(()=>{const scenes=[...document.querySelectorAll("[data-scene]")],status=document.getElementById("status");let i=0,playing=false;function show(n){i=Math.max(0,Math.min(19,n));scenes.forEach((s,j)=>s.style.display=j===i?"block":"none");status.textContent="Scene "+(i+1)+"/20"}function speak(){if(!playing)return;if(!("speechSynthesis" in window)){playing=false;status.textContent="Narration unavailable";return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(scenes[i].querySelector("p:last-child").textContent);u.lang="'+(rtl?'ar-EG':'en-US')+'";u.onend=()=>{if(playing&&i<19){show(i+1);speak()}else playing=false};speechSynthesis.speak(u)}document.getElementById("play").onclick=()=>{playing=true;speak()};document.getElementById("pause").onclick=()=>{playing=false;if("speechSynthesis" in window)speechSynthesis.cancel()};for(const [id,d] of [["prev",-1],["next",1]])document.getElementById(id).onclick=()=>{if("speechSynthesis" in window)speechSynthesis.cancel();show(i+d);if(playing)speak()};show(0)})()</script>';
 const controls='<p id="status" role="status"></p><button id="play">Play</button> <button id="pause">Pause</button> <button id="prev">Previous</button> <button id="next">Next</button>';
 write('video/'+lang,page('Full Lesson Video — '+lang,'<p>Complete 20-scene widescreen lesson with browser narration controls.</p>'+controls+cards+script,rtl?'ar':'en'));
}
console.log('Lesson 278 full English and Arabic lesson routes built');
