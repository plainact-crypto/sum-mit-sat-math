'use strict';
const {math,videos,esc,page,write}=require('./distance-formula-lesson258-common.js');
for(const language of ['english','arabic']){
 const scenes=videos[language];
 if(!Array.isArray(scenes)||scenes.length!==20||scenes.some(s=>!Array.isArray(s)||s.length!==2||s[1].length<40))throw Error('Incomplete full lesson narrative: '+language);
 const lang=language==='arabic'?'ar':'en',locale=language==='arabic'?'ar-EG':'en-US';
 const controls='<div class="video-controls"><button type="button" id="previous">Previous</button><button type="button" id="play">Play full lesson</button><button type="button" id="stop">Stop</button><button type="button" id="next">Next</button></div>';
 const stage='<section class="full-lesson-stage" style="aspect-ratio:16/9;background:#102e52;color:#fff;padding:4%;display:flex;flex-direction:column;justify-content:center;text-align:center"'+(lang==='ar'?' dir="rtl"':'')+'><p id="scene-count"></p><h2 id="scene-title"></h2><p id="scene-text"></p></section>';
 const script='<script>const scenes='+JSON.stringify(scenes).replace(/</g,'\\u003c')+';let index=0,playing=false;const count=document.getElementById("scene-count"),title=document.getElementById("scene-title"),text=document.getElementById("scene-text");function show(){count.textContent=(index+1)+" / "+scenes.length;title.textContent=scenes[index][0];text.textContent=scenes[index][1]}function stop(){playing=false;if("speechSynthesis" in window)speechSynthesis.cancel()}function step(n){stop();index=Math.max(0,Math.min(index+n,scenes.length-1));show()}function speak(){if(!playing)return;if(!("speechSynthesis" in window)){playing=false;return}const u=new SpeechSynthesisUtterance(scenes[index][1]);u.lang="'+locale+'";u.rate=0.94;u.onend=()=>{if(!playing)return;if(index+1<scenes.length){index++;show();speak()}else playing=false};speechSynthesis.speak(u)}document.getElementById("previous").onclick=()=>step(-1);document.getElementById("next").onclick=()=>step(1);document.getElementById("stop").onclick=stop;document.getElementById("play").onclick=()=>{stop();playing=true;speak()};show()</script>';
 write('video/'+language,page('Full Lesson Video — '+language,stage+controls+'<p>20 progressive narrated landscape scenes. Select Play full lesson for continuous narration.</p>'+script,lang));
}
console.log('Lesson 258 full video routes: English and Arabic, 20 scenes each, landscape 16:9');
