'use strict';
const l=require('./right-triangle-word-problems-lesson293-common.js');
require('./right-triangle-word-problems-lesson293-math-qa.js');
for(const lang of ['english','arabic']){
const scenes=l.videos[lang];if(scenes.length!==20)throw Error('20 scenes required');
const cards=scenes.map((s,i)=>'<section class="lesson-section" style="aspect-ratio:16/9;background:#102e52;color:white;padding:4%;margin:1rem 0;direction:'+(lang==='arabic'?'rtl':'ltr')+'"><p>Scene '+(i+1)+'/20</p><h2>'+l.esc(s[0])+'</h2><p>'+l.esc(s[1])+'</p></section>').join('');
l.write('video/'+lang,l.page('Full Lesson Video — '+lang,'<p>20-scene bilingual widescreen lesson.</p>'+cards,lang==='arabic'?'ar':'en'));
}
console.log('Lesson 293 bilingual full lesson routes generated');
