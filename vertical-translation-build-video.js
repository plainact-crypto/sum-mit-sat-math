const {d,esc,page,save}=require('./vertical-translation-build-core');
const additions={
  english:[
    ['What stays fixed','The x-coordinate never changes in a vertical translation. The axis of symmetry stays at the same x-value.'],
    ['Another point check','For f(x)=(x-1)^2 and g(x)=f(x)-3, the outputs at x=0 are 1 and negative 2. The difference is negative 3.'],
    ['Watch the intercepts','Shifting a parabola changes its height. Its x-intercepts may move, appear, or disappear, so do not copy the old roots.'],
    ['Practice challenge','If the vertex starts at (2,-3) and the translated minimum is 5, solve negative 3 plus k equals 5. The shift is up 8.']
  ],
  arabic:[
    ['ما الذي لا يتغير','في الإزاحة الرأسية لا يتغير إحداثي س، ويظل محور التماثل عند قيمة س نفسها.'],
    ['تحقق بنقطة أخرى','إذا كانت f(x)=(x-1)^2 و g(x)=f(x)-3، فعند س يساوي صفر تكون القيمتان 1 وسالب 2. الفرق سالب 3.'],
    ['انتبه لنقاط التقاطع','الإزاحة الرأسية تغير ارتفاع القطع المكافئ، وقد تتغير نقاط تقاطعه مع محور س أو تختفي.'],
    ['تحدي للتدريب','إذا بدأ الرأس عند (2,-3) وأصبحت القيمة الصغرى 5، فنحل سالب 3 زائد k يساوي 5. الإزاحة لأعلى 8 وحدات.']
  ]
};
function fullScenes(lang){
  const original=d.video[lang];
  if(!Array.isArray(original)||original.length!==8)throw Error('Expected eight canonical video scenes');
  const extra=additions[lang],all=[];
  original.forEach((scene,i)=>{
    all.push(scene);
    if(i===1)all.push(extra[0]);
    if(i===2)all.push(extra[1]);
    if(i===5)all.push(extra[2]);
    if(i===6)all.push(extra[3]);
  });
  if(all.length!==12)throw Error('Full lesson must have twelve scenes');
  return all;
}
function video(lang){
  const scenes=fullScenes(lang),arabic=lang==='arabic';
  const data=JSON.stringify(scenes).replace(/</g,'\\u003c');
  let html='<section class="lesson-section"'+(arabic?' dir="rtl"':'')+'><span class="section-kicker">STANDARD FULL LESSON · '+lang.toUpperCase()+'</span><h2>'+esc(arabic?'الإزاحة الرأسية':'Vertical Translation')+'</h2><p>'+esc(arabic?'شرح كامل مع أمثلة وحل وتحقق ومراجعة. اضغط تشغيل لسماع الشرح.':'Full lesson with worked examples, graph checks, exam strategy, and recap. Select Play for narration.')+'</p>';
  html+='<div class="vt-player" data-video-language="'+lang+'"><p id="vt-progress-'+lang+'" aria-live="polite">1 / 12</p><h3 id="vt-title-'+lang+'">'+esc(scenes[0][0])+'</h3><p id="vt-caption-'+lang+'">'+esc(scenes[0][1])+'</p><div class="vt-controls"><button type="button" id="vt-play-'+lang+'">'+(arabic?'تشغيل':'Play')+'</button><button type="button" id="vt-pause-'+lang+'">'+(arabic?'إيقاف مؤقت':'Pause')+'</button><button type="button" id="vt-prev-'+lang+'">'+(arabic?'السابق':'Previous')+'</button><button type="button" id="vt-next-'+lang+'">'+(arabic?'التالي':'Next')+'</button></div><p id="vt-status-'+lang+'" role="status"></p></div></section>';
  html+='<section class="lesson-section"'+(arabic?' dir="rtl"':'')+'><h2>'+esc(arabic?'فهرس مشاهد الدرس':'Full lesson chapters')+'</h2><ol>'+scenes.map(x=>'<li><strong>'+esc(x[0])+'</strong> — '+esc(x[1])+'</li>').join('')+'</ol></section>';
  html+='<style>.vt-player{border:1px solid #cbd5e1;border-radius:16px;padding:22px;margin:18px 0}.vt-controls{display:flex;flex-wrap:wrap;gap:10px}.vt-controls button{padding:10px 16px;border:1px solid #64748b;border-radius:8px;cursor:pointer}.vt-player [role=status]{min-height:1.4em}</style>';
  html+='<script>(function(){const scenes='+data+',lang="'+(arabic?'ar-EG':'en-US')+'",tag="'+lang+'";let index=0,active=false,paused=false;const $=id=>document.getElementById("vt-"+id+"-"+tag);const synth=window.speechSynthesis;function render(){ $("progress").textContent=(index+1)+" / "+scenes.length;$("title").textContent=scenes[index][0];$("caption").textContent=scenes[index][1];}function stop(){active=false;paused=false;if(synth)synth.cancel();}function speak(){if(!synth||typeof SpeechSynthesisUtterance==="undefined"){$("status").textContent="Speech playback is unavailable in this browser. All lesson captions are available below.";return;}synth.cancel();const u=new SpeechSynthesisUtterance(scenes[index][0]+". "+scenes[index][1]);u.lang=lang;u.rate=.93;u.onend=()=>{if(!active||paused)return;if(index<scenes.length-1){index++;render();speak();}else{active=false;$("status").textContent="Lesson complete.";}};u.onerror=()=>{$("status").textContent="Narration unavailable. Read the scene captions below.";active=false;};active=true;paused=false;$("status").textContent="Narrating scene "+(index+1);synth.speak(u);} $("play").addEventListener("click",()=>{if(paused&&synth){paused=false;active=true;synth.resume();return;}speak();});$("pause").addEventListener("click",()=>{if(synth&&active){synth.pause();paused=true;$("status").textContent="Paused.";}});$("prev").addEventListener("click",()=>{stop();index=Math.max(0,index-1);render();});$("next").addEventListener("click",()=>{stop();index=Math.min(scenes.length-1,index+1);render();});window.addEventListener("pagehide",stop);render();})();</script>';
  return page(arabic?'Video Explanation · Arabic':'Video Explanation · English',html,arabic?'ar':'en');
}
save('video/english',video('english'));
save('video/arabic',video('arabic'));
save('video',video('english'));
