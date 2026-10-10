'use strict';
const data=require('./repeated-percent-change-lesson178-data');
const fmt=x=>String(Number(x.toFixed(6)));
for(const x of data.practice.concat(data.test)){
 const f=data.factor(x.changes),v=data.round(x.start*f);
 if(Math.abs(v-x.end)>1e-8)throw Error('Independent math QA failed');
 const first=x.changes.map(n=>fmt(1+n/100)).join(' × ');
 x.steps='Multiply successive factors: '+first+' = '+fmt(f)+'. '+(x.mode==='original'?'Original = '+x.end+' ÷ '+fmt(f)+' = '+x.start+'.':'Final = '+x.start+' × '+fmt(f)+' = '+x.end+'.')+' Check by applying each change.';
 x.why=x.steps;
 if(Math.abs((x.mode==='original'?x.end/f:x.end)-x.answer)>1e-8)throw Error('Answer QA failed');
}
module.exports=data;
