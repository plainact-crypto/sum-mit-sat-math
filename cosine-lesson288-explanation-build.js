'use strict';
const {explanations,esc,page,write}=require('./cosine-lesson288-common.js');
require('./cosine-lesson288-math-qa.js');
if(explanations.length!==17)throw Error('Explanation section count');
const diagram='<figure><pre>             C (3,4)\n            /|\n      H=5  / | 4 opposite\n          /  |\n A (0,0)----B (3,0)\n       adjacent = 3</pre><figcaption>Verified: 3²+4²=5². At angle A, cos θ=3/5.</figcaption></figure>';
const body='<!-- SUMMIT_RETROFIT:cosine:DESMOS -->'+explanations.map((s,i)=>'<section class="lesson-section"><h2>'+esc(s[0])+'</h2><p>'+esc(s[1])+'</p>'+(i===12?diagram:'')+'</section>').join('');
write('explanation',page('Explanation',body));
console.log('Lesson 288 explanation generated');
