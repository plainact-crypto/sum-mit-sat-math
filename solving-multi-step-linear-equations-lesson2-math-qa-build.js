'use strict';
const assert=require('node:assert/strict');
const answers=[5,5,8,7,7,-7,5,5,12,9,18,7,8,9,12,20,20,7];
const eq=[x=>3*x+5===20,x=>7*x-4===31,x=>2*x+9===25,x=>5*x+7===42,x=>4*x-11===17,x=>-3*x+8===29,x=>6*x+5===2*x+25,x=>3*(x+4)===27,x=>2*(x-6)+5===17,x=>.5*x+2.5===7,x=>x/3+4===10,x=>4*x+9===37,x=>6+3*x===30,x=>5*(x-2)===35,x=>2*x+7===x+19,x=>12+.8*x===28,x=>.75*x-5===10,x=>2*(3*x-4)-5===3*x+8];
assert.equal(answers.length,18);
answers.forEach((x,i)=>{assert(eq[i](x),'Practice '+(i+1));assert(!eq[i](x+1),'Uniqueness '+(i+1))});
const t=[6,7,5,10,10],te=[x=>2*x+3===15,x=>5*x-7===2*x+14,x=>4*(x-2)+6===18,x=>.6*x+4.2===10.2,x=>18+2.5*x===43];
t.forEach((x,i)=>{assert(te[i](x),'Test '+(i+1));assert(!te[i](x+1),'Test uniqueness '+(i+1))});
console.log('[Lesson 2] 23/23 independent math checks PASS');
