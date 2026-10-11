'use strict';
const {check,esc}=require('./proportional-tables-lesson164-runtime.js');
const E=require('./proportional-tables-lesson164-explanation.json');
module.exports=function(){check(E.length===16,'explanation sections');check(E.some(x=>x[0]==='DESMOS STRATEGY'&&x[1].includes('Enter:')&&x[1].includes('Look for:')&&x[1].includes('Faster or not?')),'Desmos strategy');return '<!-- SUMMIT_RETROFIT:proportional-tables:DESMOS -->'+E.map((x,i)=>'<section class="lesson-section"><span class="section-kicker">'+(i+1)+'</span><h2>'+esc(x[0])+'</h2><p>'+esc(x[1])+'</p></section>').join('')};
