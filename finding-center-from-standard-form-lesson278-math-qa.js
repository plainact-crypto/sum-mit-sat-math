'use strict';
const assert=require('assert'),d=require('./finding-center-from-standard-form-lesson278-math-data.json');
const parse=s=>s.replace(/[()\s]/g,'').split(',').map(Number);
assert.strictEqual(d.lesson_index,278);assert.strictEqual(d.slug,'finding-center-from-standard-form');
assert.strictEqual(d.practice.length,18);assert.strictEqual(d.test.length,5);
const groups=['Skill Check','Core Practice','Exam-Style','Challenge'],sizes=[3,8,5,2];let n=0;
for(let i=0;i<4;i++)for(let j=0;j<sizes[i];j++)assert.strictEqual(d.practice[n++].group,groups[i]);
assert.strictEqual(new Set(d.practice.map(q=>q.prompt)).size,18);
const diff=['Easy','Easy / Medium','Medium','Medium / Hard','Hard / Exam-Style'];
d.test.forEach((q,i)=>assert.strictEqual(q.difficulty,diff[i]));
for(const [i,q] of [...d.practice,...d.test].entries()){
 assert.strictEqual(q.index,i<18?i+1:i-17);assert(q.prompt&&q.solution&&q.answer);
 const center=parse(q.answer);assert.strictEqual(center.length,2);assert(center.every(Number.isFinite));
 const x=q.circles.reduce((a,c)=>a+c.h,0)/q.circles.length;
 const y=q.circles.reduce((a,c)=>a+c.k,0)/q.circles.length;
 assert(Math.abs(center[0]-x)<1e-9&&Math.abs(center[1]-y)<1e-9,'center mismatch '+i);
 for(const c of q.circles){assert(c.r2>0);const radius=Math.sqrt(c.r2);assert(Math.abs((c.h+radius-c.h)**2+(c.k-c.k)**2-c.r2)<1e-9)}
}
assert.strictEqual(require('./finding-center-from-standard-form-lesson278-explanation.json').length,17);
const v=require('./finding-center-from-standard-form-lesson278-videos.json');assert.strictEqual(v.english.length,20);assert.strictEqual(v.arabic.length,20);
console.log('Lesson 278 QA PASS: 18 practice + 5 test; 18 solutions; 20 bilingual scenes each');
