const fs=require('fs'),path=require('path');
const base='dist/algebra/linear-inequalities/reversing-the-inequality-sign/video';
for(const lang of ['english','arabic']){
 const scenes=require('./reversing-the-inequality-sign-lesson47-'+lang+'-scenes.json');
 if(scenes.length!==12)throw Error('Expected twelve chapters');
 const dir=path.join(base,lang);fs.mkdirSync(dir,{recursive:true});
 const items=scenes.map((s,i)=>'<section><h2>'+(i+1)+'. '+s[0]+'</h2><p>'+s[1]+'</p><button onclick="speak('+i+')">Play chapter</button></section>').join('');
 const speech='<script>const lines='+JSON.stringify(scenes.map(s=>s[1]))+';function speak(i){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(lines[i]);u.lang="'+(lang==='arabic'?'ar-EG':'en-US')+'";speechSynthesis.speak(u)}function full(i=0){if(i>=lines.length)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(lines[i]);u.lang="'+(lang==='arabic'?'ar-EG':'en-US')+'";u.onend=()=>full(i+1);speechSynthesis.speak(u)}</script>';
 fs.writeFileSync(path.join(dir,'index.html'),'<html><head><title>Reversing the Inequality Sign</title></head><body><h1>Full Lesson '+lang+'</h1><button onclick="full()">Play full lesson</button><button onclick="speechSynthesis.cancel()">Stop</button>'+items+speech+'</body></html>');
}
