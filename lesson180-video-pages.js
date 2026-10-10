(function pages175(){
const fs=require('fs'),path=require('path'),d=require('./frequency-tables-worker5-data.json');
const en=[...require('./lesson180-video-en-1'),...require('./lesson180-video-en-2')],ar=[...require('./lesson180-video-ar-1'),...require('./lesson180-video-ar-2a'),...require('./lesson180-video-ar-2b')];
if(en.length!==12||ar.length!==12)throw Error('Frequency Tables video needs 12 bilingual chapters');
const client=require('./lesson180-video-client');
for(const [lang,scenes,locale] of [['english',en,'en-US'],['arabic',ar,'ar-EG']]){
const body='<main class="page-shell"><section class="lesson-card"><div class="crumb">Problem Solving and Data Analysis · One-Variable Data</div><div class="page-type">FULL LESSON VIDEO</div><h1>Frequency Tables</h1><p>Complete 12-chapter horizontal 16:9 lesson with '+lang+' narration.</p><div id="scene" style="aspect-ratio:16/9;background:#122c4a;color:white;padding:3rem;border-radius:16px"><h2 id="title"></h2><p id="body"></p><small id="counter"></small></div><button id="play">Play full lesson</button><button id="prev">Previous</button><button id="next">Next</button><button id="stop">Stop</button><nav><a href="../../explanation/">Explanation</a> · <a href="../../problems/">Practice</a> · <a href="../../answers/">Answers</a> · <a href="../../test/">Test</a></nav></section></main>';
const html='<!doctype html><html lang="'+(lang==='arabic'?'ar':'en')+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>Frequency Tables — '+lang+' Full Video</title></head><body>'+body+client(scenes,locale)+'</body></html>';
const f=path.join(__dirname,'dist',d.base,'video',lang,'index.html');fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,html);
}
})();
