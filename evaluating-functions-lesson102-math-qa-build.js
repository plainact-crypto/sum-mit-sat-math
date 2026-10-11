'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const d=JSON.parse(fs.readFileSync(path.join(__dirname,'evaluating-functions-lesson102-content.json'),'utf8'));
const expected=['14','−1','4','6','3','5','−5','a²+4a+3','−5','6k−1','p(1)=0; p(0)=3','8','g(5)=1; g(2) undefined','$24 for an 8-mile trip','f(11)=4; domain x≥−5','4a','f(5)=8; f(3) undefined','p=−1; f(3)=10'];
const values=[
3*4+2,(-2)**2-5,10-2*3,2*(-1)**2-3*(-1)+1,(5+4)/3,Math.abs(2-7),-5,
((2+1)**2+2*(2+1)),(4-(-3)**2)+(4-2**2),2*(3*2)-1,
(1**2-1)+(2*0+3),(5**2-4*5+2)-(1**2-4*1+2),
3/(5-2),4+2.5*8,Math.sqrt(11+5),((-3)**2+2*3)-((3)**2-2*3),
(5**2-9)/(5-3),3**2-3+4
];
const numeric=[14,-1,4,6,3,5,-5,15,-5,11,3,8,1,24,4,12,8,10];
for(let i=0;i<18;i++){
 const p=d.practice[i];assert.equal(p.number,i+1);assert.equal(p.answer,expected[i]);assert(p.solution.trim().length>=8);
 if(i!==7&&i!==9&&i!==10&&i!==15)assert.equal(values[i],numeric[i],'math '+(i+1));
}
assert.equal(d.practice.length,18);
const groups=[...Array(3).fill('Skill Check'),...Array(8).fill('Core Practice'),...Array(5).fill('Exam-Style'),...Array(2).fill('Challenge')];
for(let i=0;i<18;i++)assert.equal(d.practice[i].group,groups[i]);
const keys=[1,3,2,2,0],answers=['6','19','18','8','−6'];
assert.equal(d.test.length,5);
for(let i=0;i<5;i++){const q=d.test[i];assert.equal(q.number,i+1);assert.equal(q.correct,keys[i]);assert.equal(q.options[q.correct],answers[i]);assert(q.solution.trim().length>=8)}
assert.equal(5*2-4,6);assert.equal((-4)**2+3,19);assert.equal(2*(4-1)**2-2*(1-1)**2,18);
assert.equal((-2+5)+(2**2+1),8);assert.equal(3**2-4*3-3,-6);
assert.equal(d.video.english.length,10);assert.equal(d.video.arabic.length,10);
console.log('[Lesson 102] math QA PASS: 18 practice + 5 test');
