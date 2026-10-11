'use strict';
const assert=require('assert');
const d=require('./finding-center-from-general-form-lesson283-math-data.json');
const parse=s=>s.replace(/[() ]/g,'').split(',').map(Number);
assert.equal(d.lesson_index,283);assert.equal(d.practice.length,18);assert.equal(d.test.length,5);
const groups=['Skill Check','Core Practice','Exam-Style','Challenge'],sizes=[3,8,5,2];let index=0;
groups.forEach((group,i)=>{for(let j=0;j<sizes[i];j++)assert.equal(d.practice[index++].group,group)});
const levels=['Easy','Easy / Medium','Medium','Medium / Hard','Hard / Exam-Style'];
d.test.forEach((q,i)=>assert.equal(q.difficulty,levels[i]));
for(const q of d.practice.concat(d.test)){
 const expected=[q.circles.reduce((a,c)=>a-c.D/2,0)/q.circles.length,q.circles.reduce((a,c)=>a-c.E/2,0)/q.circles.length];
 const actual=parse(q.answer);assert(actual.length===2&&actual.every((x,i)=>Math.abs(x-expected[i])<1e-9));
 q.circles.forEach(c=>{const r2=c.D*c.D/4+c.E*c.E/4-c.F;assert(r2>0&&Math.abs(r2-c.r2)<1e-9)});
 assert(q.prompt&&q.solution);
}
assert.equal(new Set(d.practice.map(q=>q.prompt)).size,18);
assert.equal(require('./finding-center-from-general-form-lesson283-explanation.json').length,17);
const v=require('./finding-center-from-general-form-lesson283-videos.json');assert.equal(v.english.length,20);assert.equal(v.arabic.length,20);
console.log('Lesson 283 mathematical QA: 23/23 PASS');
