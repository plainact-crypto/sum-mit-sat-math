'use strict';
const {videos,esc,page,write}=require('./cosine-lesson288-common.js');
require('./cosine-lesson288-math-qa.js');
for(const lang of ['english','arabic']){
const scenes=videos[lang];
if(scenes.length!==20)throw Error('20 scenes required');
const cards=scenes.map((s,i)=>'<section class="lesson-section" style="aspect-ratio:16/9;background:#102e52;color:white;padding:4%;margin:1rem 0"><p>Scene '+(i+1)+'/20</p><h2>'+esc(s[0])+'</h2><p>'+esc(s[1])+'</p></section>').join('');
write('video/'+lang,page('Full Lesson Video — '+lang,'<p>Complete 20-scene bilingual lesson presentation.</p>'+cards,lang==='arabic'?'ar':'en'));
}
console.log('Lesson 288 full lesson pages built');
