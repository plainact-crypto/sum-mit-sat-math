'use strict';
const fs=require('fs'),path=require('path');
const base='algebra/linear-functions/slope-from-a-graph';
const data=require('./slope-from-graph-lesson20-video-data.json');
const file=r=>path.join(__dirname,'dist',base,r,'index.html');
for(const r of ['explanation','problems','answers','test']){
 const f=file(r);if(!fs.existsSync(f)||/COMING SOON|Content still being completed/i.test(fs.readFileSync(f,'utf8')))throw Error('Lesson 20 missing '+r);
}
for(const [lang,locale] of [['english','en-US'],['arabic','ar-EG']]){
 const scenes=data[lang];if(!Array.isArray(scenes)||scenes.length!==12||scenes.some(x=>x.length!==2))throw Error('Missing lesson 15 video chapters');
 const script=`<script>(()=>{const a=${JSON.stringify(scenes)},locale=${JSON.stringify(locale)};let i=0,active=false;const $=id=>document.getElementById(id);function show(){$('chapter').textContent=(i+1)+'/12';$('title').textContent=a[i][0];$('caption').textContent=a[i][1];}function stop(){active=false;if(window.speechSynthesis)speechSynthesis.cancel();}function play(){if(!active)return;show();if(!window.speechSynthesis){$('status').textContent='Audio unavailable; captions remain visible.';return;}const u=new SpeechSynthesisUtterance(a[i].join('. '));u.lang=locale;u.onend=()=>{if(active&&i<11){i++;play();}else active=false;};u.onerror=()=>{$('status').textContent='Voice unavailable';active=false;};speechSynthesis.speak(u);}$('previous').onclick=()=>{stop();i=Math.max(0,i-1);show();};$('next').onclick=()=>{stop();i=Math.min(11,i+1);show();};$('stop').onclick=stop;$('play').onclick=()=>{stop();active=true;play();};show();})();</script>`;
 const html=`<!doctype html><html lang="${locale.slice(0,2)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>Slope from a Graph — Full ${lang} Lesson</title></head><body><main class="page-shell"><section class="lesson-card"><div class="crumb">Algebra · Linear Functions</div><h1>Slope from a Graph</h1><h2>Full ${lang} Lesson Video</h2><div style="aspect-ratio:16/9;background:#102e52;color:white;display:grid;place-content:center;padding:4%;text-align:center"><p id="chapter"></p><h2 id="title"></h2><p id="caption" dir="auto"></p></div><p><button id="previous">Previous</button> <button id="play">Play Full Lesson</button> <button id="stop">Stop</button> <button id="next">Next</button></p><p id="status" role="status"></p><nav>${['explanation','problems','answers','test'].map(r=>'<a href="/'+base+'/'+r+'/">'+r+'</a>').join(' · ')} · <a href="/${base}/video/${lang==='english'?'arabic':'english'}/">Other language</a></nav></section></main>${script}</body></html>`;
 const out=file('video/'+lang);fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,html);
 console.log('Lesson 20 full video '+lang+': 12 chapters');
}
