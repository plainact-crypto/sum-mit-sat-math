'use strict';
const {videos,page,write}=require('./chord-lesson268-common.js');
for(const language of ['english','arabic']){
const scenes=videos[language];
if(scenes.length!==20)throw Error('Expected 20 scenes');
const body=scenes.map((s,i)=>'<section class="full-lesson-stage" style="aspect-ratio:16/9;background:#102e52;color:#fff;padding:4%;margin:1rem 0"><p>Scene '+(i+1)+' / '+scenes.length+'</p><h2>'+s[0]+'</h2><p>'+s[1]+'</p></section>').join('');
write('video/'+language,page('Full Lesson Video — '+language,body,language==='arabic'?'ar':'en'));
}
console.log('Lesson 268 bilingual full lesson routes generated');