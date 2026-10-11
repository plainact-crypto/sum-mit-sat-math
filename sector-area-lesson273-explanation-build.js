'use strict';
const {explanation,escapeHTML:esc,page,write}=require('./sector-area-lesson273-common.js');
if(explanation.length!==17)throw Error('Expected 17 sections');
require('./sector-area-lesson273-math-qa.js');
const diagram=require('./sector-area-lesson273-diagram.js');
const body='<!-- SUMMIT_RETROFIT:sector-area:GRAPH -->'+explanation.map((s,i)=>'<section class="lesson-section"><h2>'+esc(s[0])+'</h2><p>'+esc(s[1])+'</p>'+(i===12?diagram:'')+'</section>').join('');
write('explanation',page('Explanation',body));
console.log('Lesson 273 explanation generated');