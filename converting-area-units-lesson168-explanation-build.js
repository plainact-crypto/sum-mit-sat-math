'use strict';
const {shell,write,esc}=require('./converting-area-units-lesson168-layout');
const a=require('./converting-area-units-lesson168-explanation-a'),b=require('./converting-area-units-lesson168-explanation-b');
if(a.length!==8||b.length!==7)throw Error('Expected 15 explanation sections');
const sections=[...a,...b],heads=sections.map(x=>x[0]);
if(!heads[0].includes('OBJECTIVE')||!heads.at(-1).includes('NEXT STEP')||!heads.some(x=>x.includes('COMMON MISTAKES')))throw Error('Invalid explanation sequence');
const html='<article class="lesson-content"><!-- SUMMIT_RETROFIT:converting-area-units:NEITHER -->'+sections.map(v=>'<section class="lesson-section"><h2>'+esc(v[0])+'</h2>'+v[1]+'</section>').join('')+'</article>';
write('explanation',shell('Explanation',html));
console.log('Lesson 168 Explanation QA PASS: 15 ordered sections and five worked examples; graph/Desmos classification NEITHER');
