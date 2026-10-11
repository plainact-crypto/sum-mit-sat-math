'use strict';
// Independent mathematical re-solves for all 18 practice and 5 test questions.
// Fail the required release builder when the canonical dataset/answer key drifts.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const d=JSON.parse(fs.readFileSync(path.join(__dirname,'quadratic-function-word-problems-lesson97-content.json'),'utf8'));
const close=(a,b,label)=>assert(Math.abs(a-b)<1e-9,label+': '+a+' != '+b);
const groups=[['Skill Check',3],['Core Practice',8],['Exam-Style',5],['Challenge',2]];
const expected=[
 '16 m','$75','$1,600 at x=4','200 m² at x=10 m','18 m at 2 s',
 '$10; $300','6 m by 12 m','Break-even x=2,10; profit positive for 2<x<10',
 '5 s','$12.50; $625','$32 at x=3','6 s','q=10 or 15',
 '10 m and 20 m','$32 at x=6','2+√7 ≈ 4.65 s','4≤x≤12',
 'Maximum $132 at x=8; break-even x=8±2√11'
];
assert.equal(d.slug,'quadratic-function-word-problems');
assert.equal(d.index,97);
assert.equal(d.practice.length,18);
let n=0;
for(const [group,count] of groups)for(let j=0;j<count;j++){
 const p=d.practice[n];assert.equal(p.number,n+1);assert.equal(p.group,group);
 assert.equal(p.answer,expected[n],'Practice answer '+(n+1));
 assert(p.question&&p.solution&&p.solution.length>20,'Missing explanation '+(n+1));n++;
}
assert.equal(new Set(d.practice.map(p=>p.question)).size,18,'Duplicate practice questions');
// Independently calculate every practice result, including exact roots.
close(-5*1**2+20*1+1,16,'P1');
close(5*(20-5),75,'P2');
close(100*(-(4-4)**2+16),1600,'P3');
close(10*(40-2*10),200,'P4');
close(-4*2**2+16*2+2,18,'P5');
close(10*(60-3*10),300,'P6');
close(6*(6+6),72,'P7');close(-12*(-12+6),72,'P7 other root');
close(-(2-2)*(2-10),0,'P8 left');close(-(10-2)*(10-10),0,'P8 right');
close(-5*5**2+25*5,0,'P9');
close(12.5*(100-4*12.5),625,'P10');
close(2*3**2-12*3+50,32,'P11');
close(-5*6**2+30*6+10,10,'P12');
close(50*10-2*10**2,300,'P13 first');close(50*15-2*15**2,300,'P13 second');
close(10*20,200,'P14');close(2*(10+20),60,'P14 perimeter');
close(-2*6**2+24*6-40,32,'P15');
close(-5*(2+Math.sqrt(7))**2+20*(2+Math.sqrt(7))+15,0,'P16');
close(-(4-8)**2+64,48,'P17 left');close(-(12-8)**2+64,48,'P17 right');
close(-3*8**2+48*8-60,132,'P18 max');
for(const x of [8-2*Math.sqrt(11),8+2*Math.sqrt(11)])close(-3*x*x+48*x-60,0,'P18 exact root');
assert.equal(d.test.length,5);
const difficulties=['Easy','Easy / Medium','Medium','Medium / Hard','Hard / Exam-Style'];
const keys=[1,2,1,0,2], answers=['9','100','10 and 30','14','t=1 and t=3'];
for(let i=0;i<5;i++){const t=d.test[i];assert.equal(t.number,i+1);assert.equal(t.difficulty,difficulties[i]);assert.equal(t.options.length,4);assert.equal(t.correct,keys[i]);assert.equal(t.options[t.correct],answers[i]);assert(t.solution&&t.solution.length>20,'Test solution '+(i+1));}
close(-4+12+1,9,'T1');
close(10*(20-10),100,'T2');
for(const q of [10,30])close(40*q-q*q,300,'T3');
close(-2*4**2+16*4-18,14,'T4');
for(const t of [1,3])close(-5*t*t+20*t+5,20,'T5');
assert(d.explanation.length>=12,'Explanation too short');
assert(d.video.english.length>=8&&d.video.arabic.length>=8,'Full video scenes missing');
console.log('[Lesson 97] independent math QA PASS: 18 practice + 5 test; answer alignment, exact roots, structure, bilingual scenes');
