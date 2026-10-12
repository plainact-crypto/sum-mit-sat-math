const fs=require('fs'),path=require('path');
const data=require('./linear-equation-word-problems-lesson7-full-scenes.json');
const base='algebra/linear-equations-in-one-variable/linear-equation-word-problems';
for(const lang of ['english','arabic']){
 const scenes=data[lang],locale=lang==='arabic'?'ar-EG':'en-US';
 if(scenes.length!==12)throw Error('Expected 12 chapters');
 const player=`<script>(()=>{const scenes=${JSON.stringify(scenes)};let i=0;const e=x=>document.getElementById(x);function show(){e('chapter').textContent=(i+1)+'/12 — '+scenes[i][0];e('caption').textContent=scenes[i][1]}function stop(){speechSynthesis.cancel()}function speak(){stop();show();const u=new SpeechSynthesisUtterance(scenes[i].join('. '));u.lang='${locale}';u.onend=()=>{if(i<11){i++;speak()}};speechSynthesis.speak(u)}e('play').onclick=speak;e('stop').onclick=stop;e('next').onclick=()=>{stop();i=Math.min(11,i+1);show()};e('prev').onclick=()=>{stop();i=Math.max(0,i-1);show()};show()})();</script>`;
 const html='<html lang="'+locale.slice(0,2)+'"><head><meta charset="utf-8"><link rel="stylesheet" href="/styles.css"><title>Linear Equation Word Problems Full Lesson</title></head><body><main class="page-shell"><h1>Linear Equation Word Problems — '+lang+'</h1><div style="aspect-ratio:16/9"><h2 id="chapter"></h2><p id="caption"></p></div><button id="prev">Previous</button><button id="play">Play</button><button id="stop">Stop</button><button id="next">Next</button><nav><a href="/'+base+'/explanation/">Explanation</a> · <a href="/'+base+'/problems/">Problems</a> · <a href="/'+base+'/answers/">Answers</a> · <a href="/'+base+'/test/">Test</a></nav></main>'+player+'</body></html>';
 const target=path.join(__dirname,'dist',base,'video',lang,'index.html');
 fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,html);
}
