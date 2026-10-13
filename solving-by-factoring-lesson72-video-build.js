'use strict';
const fs=require('fs'),path=require('path');
const base='advanced-math/quadratic-equations/solving-by-factoring';
for(const lang of ['english','arabic']){
 const scenes=require('./solving-by-factoring-lesson72-video-'+lang+'.json');
 if(scenes.length!==12||scenes.some(x=>x.length!==2||!x[0]||!x[1]))throw Error('Invalid '+lang+' narration');
 const locale=lang==='arabic'?'ar-EG':'en-US',dir=path.join(__dirname,'dist',base,'video',lang);
 fs.mkdirSync(dir,{recursive:true});
 const html=`<!doctype html><html lang="${locale.slice(0,2)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>Solving by Factoring — ${lang} Full Lesson</title></head><body><main class="page-shell"><section class="lesson-card"><h1>Solving by Factoring — ${lang}</h1><div style="aspect-ratio:16/9;background:#102e52;color:white;padding:3rem"><h2 id="heading"></h2><p id="caption"></p><small id="count"></small></div><p><button id="prev">Previous</button> <button id="play">Play Full Lesson</button> <button id="stop">Stop</button> <button id="next">Next</button></p><nav><a href="/${base}/explanation/">Explanation</a> · <a href="/${base}/problems/">Practice</a> · <a href="/${base}/answers/">Answers</a> · <a href="/${base}/test/">Test</a></nav></section></main><script>const scenes=${JSON.stringify(scenes)};let i=0,playing=false;function show(){document.getElementById('heading').textContent=scenes[i][0];document.getElementById('caption').textContent=scenes[i][1];document.getElementById('count').textContent=(i+1)+' / 12'}function stop(){playing=false;speechSynthesis.cancel()}function speak(){if(!playing)return;show();const u=new SpeechSynthesisUtterance(scenes[i].join('. '));u.lang='${locale}';u.rate=.88;u.onend=()=>{if(playing&&i<11){i++;speak()}else playing=false};u.onerror=stop;speechSynthesis.speak(u)}document.getElementById('play').onclick=()=>{stop();playing=true;speak()};document.getElementById('stop').onclick=stop;document.getElementById('prev').onclick=()=>{stop();i=Math.max(0,i-1);show()};document.getElementById('next').onclick=()=>{stop();i=Math.min(11,i+1);show()};show();</script></body></html>`;
 fs.writeFileSync(path.join(dir,'index.html'),html);
 console.log('[lesson72] '+lang+' full lesson built');
}
