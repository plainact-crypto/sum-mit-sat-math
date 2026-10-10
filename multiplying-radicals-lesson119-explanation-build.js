'use strict';
const {E}=require('./multiplying-radicals-lesson119-lib');
const {sec,write}=require('./multiplying-radicals-lesson119-shell');
if(E.length!==13)throw Error('Explanation section count mismatch');
const html='<!-- SUMMIT_RETROFIT:multiplying-radicals:NEITHER -->'+E.map((s,i)=>sec(String(i+1).padStart(2,'0')+' · '+s[0],s[1])).join('');
write('explanation','Explanation',html);
console.log('Lesson 119 Explanation complete');
