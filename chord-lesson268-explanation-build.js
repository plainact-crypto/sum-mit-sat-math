'use strict';
const {explanation,escapeHTML:esc,page,write}=require('./chord-lesson268-common.js');
if(explanation.length!==17)throw Error('Expected 17 sections');
const diagram=require('./chord-lesson268-diagram.js');
const body='<!-- SUMMIT_RETROFIT:chord:GRAPH -->'+explanation.map((s,i)=>'<section class="lesson-section"><h2>'+esc(s[0])+'</h2><p>'+esc(s[1])+'</p>'+(i===13?diagram:'')+'</section>').join('');
write('explanation',page('Explanation',body));
console.log('Lesson 268 explanation generated');