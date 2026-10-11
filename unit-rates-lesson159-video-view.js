'use strict';
const {videos}=require('./unit-rates-lesson159-data-loader');
const {write,scriptData}=require('./unit-rates-lesson159-shell');

module.exports=function buildBilingualFullLesson(){
  for(const language of ['english','arabic']){
    const scenes=videos[language],isArabic=language==='arabic';
    if(!Array.isArray(scenes)||scenes.length!==8||!scenes.every(s=>Array.isArray(s)&&s.length===3&&s.every(v=>typeof v==='string'&&v.trim()))) {
      throw Error('Lesson 159: expected eight complete '+language+' full-lesson scenes');
    }
    const title=isArabic?'الدرس الكامل — معدلات الوحدة':'Full Lesson — Unit Rates';
    const play=isArabic?'تشغيل الدرس الكامل':'Play Full Lesson';
    const stop=isArabic?'إيقاف':'Stop';
    const next=isArabic?'التالي':'Next';
    const previous=isArabic?'السابق':'Previous';
    const body='<section class="lesson-section"'+(isArabic?' dir="rtl"':'')+'><h2>'+title+'</h2>'+
      '<p>'+(isArabic?'ثمانية مشاهد تعليمية متتابعة مع شرح صوتي.':'Eight progressive narrated instructional scenes.')+'</p>'+
      '<div class="summit-full-video" style="aspect-ratio:16/9;background:#122d50;color:#fff;display:flex;flex-direction:column;justify-content:center;text-align:center;padding:4%;box-sizing:border-box" role="group" aria-label="Full lesson scene">'+
      '<p id="scene-count"></p><h2 id="scene-title" style="color:#fff"></h2><p id="scene-math" style="font-size:clamp(1.1rem,3vw,2rem);white-space:pre-wrap;direction:ltr"></p></div>'+
      '<p id="scene-caption" aria-live="polite"></p><div class="lesson-controls">'+
      '<button type="button" id="scene-prev">'+previous+'</button> <button type="button" id="scene-play">'+play+'</button> <button type="button" id="scene-stop">'+stop+'</button> <button type="button" id="scene-next">'+next+'</button></div>'+
      '<p id="scene-status" role="status"></p></section>';
    const script='<script>(function(){'+
      'const scenes='+scriptData(scenes)+';let i=0,playing=false,epoch=0;const el=id=>document.getElementById(id);'+
      'function show(){const s=scenes[i];el("scene-count").textContent=(i+1)+" / "+scenes.length;el("scene-title").textContent=s[0];el("scene-caption").textContent=s[1];el("scene-math").textContent=s[2]}'+
      'function stop(){playing=false;epoch++;if(window.speechSynthesis)window.speechSynthesis.cancel()}'+
      'function speak(){if(!playing)return;show();if(!window.speechSynthesis){el("scene-status").textContent="Voice unavailable; full captions remain visible.";playing=false;return}const t=++epoch;const u=new SpeechSynthesisUtterance(scenes[i][1]);u.lang="'+(isArabic?'ar-EG':'en-US')+'";u.rate=.9;u.onend=function(){if(!playing||t!==epoch)return;if(i<scenes.length-1){i++;speak()}else{playing=false;el("scene-status").textContent="Lesson complete"}};u.onerror=function(){if(t===epoch){playing=false;el("scene-status").textContent="Narration unavailable; captions remain visible."}};window.speechSynthesis.cancel();window.speechSynthesis.speak(u)}'+
      'el("scene-play").onclick=function(){stop();playing=true;el("scene-status").textContent="";speak()};'+
      'el("scene-stop").onclick=stop;'+
      'el("scene-prev").onclick=function(){stop();i=Math.max(0,i-1);show()};'+
      'el("scene-next").onclick=function(){stop();i=Math.min(scenes.length-1,i+1);show()};'+
      'window.addEventListener("pagehide",stop);show()'+
      '})();</script>';
    write('video/'+language,body+script,isArabic?'ar':'en');
  }
};