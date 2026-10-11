'use strict';
const {explanation,practice}=require('./unit-rates-lesson159-data-loader');
const {write,escapeText:esc}=require('./unit-rates-lesson159-shell');
function build(){
 const body='<!-- SUMMIT_RETROFIT:unit-rates:NEITHER -->'+explanation.map(([h,t],i)=>'<section class="lesson-section"><span class="section-kicker">'+(i+1)+'</span><h2>'+esc(h)+'</h2><p>'+esc(t)+'</p></section>').join('');
 write('explanation',body);
 const segments=[['SKILL CHECK',0,3],['CORE PRACTICE',3,11],['EXAM-STYLE PRACTICE',11,16],['CHALLENGE PROBLEMS',16,18]];
 const answers=segments.map(([h,a,b])=>'<section class="lesson-section"><h2>'+h+'</h2>'+practice.slice(a,b).map((x,j)=>'<div class="answer-item"><h3>Solution '+(a+j+1)+'</h3><p>'+esc(x[1])+'</p><p><strong>Answer: '+esc(x[2])+'</strong></p><p>'+esc(x[3])+'</p></div>').join('')+'</section>').join('');
 write('answers',answers);
}
module.exports=build;
