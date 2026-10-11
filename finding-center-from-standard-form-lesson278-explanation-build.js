'use strict';
const {explanations,esc,page,write}=require('./finding-center-from-standard-form-lesson278-common.js');
require('./finding-center-from-standard-form-lesson278-math-qa.js');
if(explanations.length!==17)throw Error('Explanation section count');
const centerX=200+3*20,centerY=150-(-2)*20,radius=5*20;
const graph='<figure><svg role="img" aria-label="Verified circle centered at (3,-2) with radius 5" viewBox="0 0 430 340" style="max-width:100%;background:white;border:1px solid #ddd"><line x1="10" y1="150" x2="420" y2="150" stroke="#666"/><line x1="200" y1="10" x2="200" y2="330" stroke="#666"/><circle cx="'+centerX+'" cy="'+centerY+'" r="'+radius+'" fill="#c5def5" fill-opacity=".4" stroke="#1969b0" stroke-width="3"/><circle cx="'+centerX+'" cy="'+centerY+'" r="5" fill="#bd2835"/><text x="266" y="181" font-size="14">Center (3,-2)</text><circle cx="360" cy="190" r="4" fill="#1969b0"/><text x="310" y="212" font-size="12">(8,-2)</text></svg><figcaption>(x−3)²+(y+2)²=25. Center and radius calculated from the equation.</figcaption></figure>';
const html='<!-- SUMMIT_RETROFIT:finding-center-from-standard-form:BOTH -->'+explanations.map((s,i)=>'<section class="lesson-section"'+(i===11?' data-retrofit-graph="true"':'')+'><h2>'+esc(s[0])+'</h2><p>'+esc(s[1])+'</p>'+(i===11?graph:'')+'</section>').join('');
write('explanation',page('Explanation',html));
console.log('Lesson 278 explanation generated');
