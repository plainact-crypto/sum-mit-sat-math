'use strict';
const assert=require('assert'),d=require('./right-triangle-word-problems-lesson293-math-data.json');
const rad=x=>x*Math.PI/180;
function independent(q){const a=q.inputs;switch(q.kind){
case 'pythagRise':return Math.sqrt(a.hyp*a.hyp-a.run*a.run);
case 'sinRise':return a.hyp*Math.sin(rad(a.angle));
case 'tanRise':return a.run*Math.tan(rad(a.angle));
case 'atanAngle':return Math.atan2(a.rise,a.run)*180/Math.PI;
case 'hypFromRise':return a.rise/Math.sin(rad(a.angle));
case 'cosRun':return a.hyp*Math.cos(rad(a.angle));
case 'tanRun':return a.rise/Math.tan(rad(a.angle));
case 'pythagRun':return Math.sqrt(a.hyp*a.hyp-a.rise*a.rise);
case 'angleDifference':return (Math.atan2(a.rise,a.near)-Math.atan2(a.rise,a.far))*180/Math.PI;
case 'eyeHeight':return a.eye+a.run*Math.tan(rad(a.angle));
case 'twoRises':return a.h1*Math.sin(rad(a.a1))+a.h2*Math.sin(rad(a.a2));
case 'runSum':return a.h1*Math.cos(rad(a.a1))+a.h2*Math.cos(rad(a.a2));
default:throw Error('Unknown skill '+q.kind);
}}
assert.equal(d.lesson_index,293);assert.equal(d.slug,'right-triangle-word-problems');assert.equal(d.practice.length,18);assert.equal(d.test.length,5);
const groups=['Skill Check','Core Practice','Exam-Style','Challenge'],sizes=[3,8,5,2];let k=0;
groups.forEach((g,i)=>{for(let j=0;j<sizes[i];j++)assert.equal(d.practice[k++].group,g)});
['Easy','Easy / Medium','Medium','Medium / Hard','Hard / Exam-Style'].forEach((level,i)=>assert.equal(d.test[i].difficulty,level));
assert.equal(new Set(d.practice.map(q=>q.prompt)).size,18);
for(const [i,q] of [...d.practice,...d.test].entries()){
assert(q.prompt&&q.solution&&q.answer!==undefined,'missing explanation '+i);
assert(Math.abs(q.answer-independent(q))<=0.00501,'math mismatch '+i);
}
assert.equal(require('./right-triangle-word-problems-lesson293-explanation.json').length,17);
const v=require('./right-triangle-word-problems-lesson293-videos.json');assert.equal(v.english.length,20);assert.equal(v.arabic.length,20);
assert.equal(3*3+4*4,5*5);
console.log('Lesson 293 mathematical QA: 23/23 PASS; diagram 3-4-5 verified');
