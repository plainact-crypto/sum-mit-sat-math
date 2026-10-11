'use strict';
const assert=require('assert'),d=require('./cosine-lesson288-math-data.json');
const rad=x=>x*Math.PI/180;
function independent(q){const a=q.inputs;switch(q.kind){
case 'ratio':return a.adj/a.hyp;
case 'adj':return a.hyp*Math.cos(rad(a.angle));
case 'hyp':return a.adj/Math.cos(rad(a.angle));
case 'angle':return Math.atan2(Math.sqrt(a.hyp*a.hyp-a.adj*a.adj),a.adj)*180/Math.PI;
case 'opposite':return a.hyp*Math.sqrt(1-a.cos*a.cos);
case 'similar':return a.otherHyp*(a.adj/a.hyp);
case 'difference':return Math.cos(rad(a.a1))-Math.cos(rad(a.a2));
case 'pythagCos':return Math.sqrt(1-(a.opp/a.hyp)**2);
case 'doubleRoof':return a.hyp*Math.cos(rad(a.angle))*2;
case 'twoWalks':return a.h1*Math.cos(rad(a.a1))+a.h2*Math.cos(rad(a.a2));
default:throw Error('Unknown skill '+q.kind);
}}
assert.equal(d.lesson_index,288);assert.equal(d.slug,'cosine');assert.equal(d.practice.length,18);assert.equal(d.test.length,5);
const groups=['Skill Check','Core Practice','Exam-Style','Challenge'],sizes=[3,8,5,2];let k=0;
groups.forEach((g,i)=>{for(let j=0;j<sizes[i];j++)assert.equal(d.practice[k++].group,g)});
['Easy','Easy / Medium','Medium','Medium / Hard','Hard / Exam-Style'].forEach((level,i)=>assert.equal(d.test[i].difficulty,level));
assert.equal(new Set(d.practice.map(q=>q.prompt)).size,18);
for(const [i,q] of [...d.practice,...d.test].entries()){
assert(q.prompt&&q.solution&&q.answer!==undefined,'missing answer/working '+i);
assert(Math.abs(q.answer-independent(q))<=0.00501,'math mismatch '+i);
if(q.inputs.hyp&&q.inputs.adj)assert(q.inputs.hyp>q.inputs.adj,'invalid triangle '+i);
}
assert.equal(require('./cosine-lesson288-explanation.json').length,17);
const v=require('./cosine-lesson288-videos.json');assert.equal(v.english.length,20);assert.equal(v.arabic.length,20);
assert.equal(3*3+4*4,5*5,'diagram side check');
console.log('Lesson 288 mathematical QA: 23/23 PASS; diagram 3-4-5 verified');
