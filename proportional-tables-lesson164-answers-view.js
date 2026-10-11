'use strict';
const {check,esc}=require('./proportional-tables-lesson164-runtime.js');
const P=require('./proportional-tables-lesson164-practice.json');
module.exports=function(){
check(P.length===18&&P.every(x=>x.question&&x.answer!==undefined&&x.solution),'18 aligned answers');
let body='<p>Each numbered solution answers the identically numbered Practice Problem.</p>';
for(let i=0;i<P.length;i++){const x=P[i];if([0,3,11,16].includes(i))body+='<h2>'+esc(x.group)+'</h2>';body+='<section class="lesson-section"><h3>Solution '+(i+1)+'</h3><p>'+esc(x.question)+'</p><p><strong>Answer: '+esc(x.answer)+'</strong></p><p>'+esc(x.solution)+'</p></section>'}
return body;
};
