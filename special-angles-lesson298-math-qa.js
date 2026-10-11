'use strict';
const assert=require('assert'),d=require('./special-angles-lesson298-math-data.json');
const vals=d.circle;const trig=(deg,fn)=>vals[((deg%360)+360)%360][{cos:0,sin:1,tan:2}[fn]];
const n=s=>{if(s==='undefined')return NaN;return Function('return ('+s.replace(/√2/g,String(Math.sqrt(2))).replace(/√3/g,String(Math.sqrt(3)))+')')()};
function scale(s,r){const neg=s[0]==='-',a=neg?s.slice(1):s;if(a==='0')return '0';if(a==='1')return String(neg?-r:r);const parts=a.split('/'),coef=r/Number(parts[1]);assert(Number.isInteger(coef));const value=parts[0]==='1'?String(coef):coef===1?parts[0]:String(coef)+parts[0];return (neg?'-':'')+value}
function expected(q){switch(q.kind){
case 'trig':return trig(q.deg,q.fn);
case 'quadrant':return ['I','II','III','IV'][Math.floor(q.deg/90)];
case 'radians':{const gcd=(a,b)=>b?gcd(b,a%b):a,g=gcd(q.deg,180);return (q.deg/g===1?'':q.deg/g)+'π'+(180/g===1?'':'/'+180/g)}
case 'reference':return (q.deg%180>90?180-q.deg%180:q.deg%180)+'°';
case 'coord':return '('+trig(q.deg,'cos')+', '+trig(q.deg,'sin')+')';
case 'angleFromPoint':return Object.keys(vals).find(x=>trig(+x,'cos')===q.x&&trig(+x,'sin')===q.y)+'°';
case 'solutions':return Object.keys(vals).map(Number).filter(x=>trig(x,q.fn)===q.value).map(x=>x+'°').join(', ');
case 'signs':return Math.cos(q.deg*Math.PI/180)<0&&Math.sin(q.deg*Math.PI/180)<0?'both negative':'other';
case 'doubleProduct':assert(Math.abs(2*Math.sin(Math.PI/6)*Math.cos(Math.PI/6)-Math.sqrt(3)/2)<1e-12);return '√3/2';
case 'degrees':return q.numerator*180/q.denominator+'°';
case 'compare':return Math.abs(n(trig(q.a.deg,q.a.fn))-n(trig(q.b.deg,q.b.fn)))<1e-10?'Equal':'Not equal';
case 'scaledCoord':return '('+scale(trig(q.deg,'cos'),q.radius)+', '+scale(trig(q.deg,'sin'),q.radius)+')';
default:throw Error('Unknown operation '+q.kind);
}}
assert.equal(d.lesson_index,298);assert.equal(d.slug,'special-angles');assert.equal(d.practice.length,18);assert.equal(d.test.length,5);
const sizes=[3,8,5,2],groups=['Skill Check','Core Practice','Exam-Style','Challenge'];let k=0;
groups.forEach((g,i)=>{for(let j=0;j<sizes[i];j++)assert.equal(d.practice[k++].group,g)});
['Easy','Easy / Medium','Medium','Medium / Hard','Hard / Exam-Style'].forEach((x,i)=>assert.equal(d.test[i].difficulty,x));
assert.equal(new Set(d.practice.map(x=>x.prompt)).size,18);assert.equal(new Set(d.test.map(x=>x.prompt)).size,5);
for(const [i,q] of [...d.practice,...d.test].entries()){assert.equal(q.index,i<18?i+1:i-17);assert(q.solution.length>55,'insufficient working '+i);assert.equal(q.answer,expected(q),'wrong answer '+i);assert.equal(q.choices.length,4);assert.equal(new Set(q.choices).size,4);assert.equal(q.choices.filter(x=>x===q.answer).length,1)}
for(const [deg,triplet] of Object.entries(vals)){const t=Number(deg)*Math.PI/180;assert(Math.abs(n(triplet[0])-Math.cos(t))<1e-9);assert(Math.abs(n(triplet[1])-Math.sin(t))<1e-9);assert(Math.abs(n(triplet[0])**2+n(triplet[1])**2-1)<1e-9);if(triplet[2]!=='undefined')assert(Math.abs(n(triplet[2])-Math.tan(t))<1e-9)}
assert.equal(require('./special-angles-lesson298-explanation.json').length,17);const v=require('./special-angles-lesson298-videos.json');assert.equal(v.english.length,20);assert.equal(v.arabic.length,20);
console.log('Lesson 298 independent mathematical QA: 23/23 PASS; 16 unit-circle points, quadrant signs, exact ratios, answers and alignment PASS');
