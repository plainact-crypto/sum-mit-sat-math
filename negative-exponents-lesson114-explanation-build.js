'use strict';
const {E}=require('./negative-exponents-lesson114-lib');
const {sec,write}=require('./negative-exponents-lesson114-shell');
if(E.length!==12)throw Error('Explanation section count mismatch');
const html='<!-- SUMMIT_RETROFIT:negative-exponents:NEITHER -->'+E.map((s,i)=>sec(String(i+1).padStart(2,'0')+' · '+s[0],s[1])).join('');
write('explanation','Explanation',html);
console.log('Lesson 114 Explanation complete');
