const fs=require('fs'),path=require('path'),d=require('./isosceles-triangles-lesson233-data.json');
for(const name of ['english','arabic']){
 const scenes=require('./isosceles-triangles-lesson233-video-'+name+'.json');
 if(scenes.length<16)throw Error('Full lesson scene count');
 const lang=name==='arabic'?'ar-EG':'en-US';
 const script=`<script>
 const scenes=${JSON.stringify(scenes)};let position=0;
 function show(){document.getElementById('heading').textContent=scenes[position][0];document.getElementById('words').textContent=scenes[position][1];document.getElementById('counter').textContent=(position+1)+'/'+scenes.length;}
 function next(){position=Math.min(position+1,scenes.length-1);show();}
 function previous(){position=Math.max(position-1,0);show();}
 function narrate(){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(scenes[position][1]);u.lang='${lang}';u.onend=()=>{if(position<scenes.length-1){next();narrate();}};speechSynthesis.speak(u);}
 function stop(){speechSynthesis.cancel();}
 show();
 </script>`;
 const html=`<!doctype html><html lang="${lang.slice(0,2)}"><head><meta charset="utf-8"><link rel="stylesheet" href="/styles.css"><title>${d.title} Full Lesson</title></head><body><main class="page-shell"><section class="lesson-card"><h1>${d.title}</h1><div style="aspect-ratio:16/9;background:#102e52;color:white;padding:5%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center"><small id="counter"></small><h2 id="heading"></h2><p id="words"></p></div><button onclick="previous()">Previous</button><button onclick="narrate()">Play full lesson</button><button onclick="stop()">Stop</button><button onclick="next()">Next</button></section></main>${script}</body></html>`;
 const dir=path.join(__dirname,'dist',d.base,'video',name);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html);
}
