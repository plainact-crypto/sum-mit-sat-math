'use strict';
const assert=require('assert');
const {math,explanation,videos,routes}=require('./distance-formula-lesson258-common.js');
assert.strictEqual(math.lesson_index,258);
assert.strictEqual(math.slug,'distance-formula');
assert.strictEqual(math.title,'Distance Formula');
assert.strictEqual(math.base,'geometry-and-trigonometry/coordinate-geometry/distance-formula');
assert.strictEqual(math.classification,'BOTH');
assert.strictEqual(math.practice.length,18);
assert.strictEqual(math.test.length,5);
assert.strictEqual(explanation.length,17);
assert.strictEqual(videos.english.length,20);
assert.strictEqual(videos.arabic.length,20);
assert.strictEqual(routes.length,6);
const groups=['Skill Check','Core Practice','Exam-Style','Challenge'];
const groupOf=i=>i<3?groups[0]:i<11?groups[1]:i<16?groups[2]:groups[3];
const diffs=['Easy','Easy / Medium','Medium','Medium / Hard','Hard / Exam-Style'];
const d=(a,b)=>Math.sqrt((a[0]-b[0])**2+(a[1]-b[1])**2);
function independentlySolve(v){
 switch(v.type){
 case 'dist':return d(v.a,v.b);
 case 'dist2':return (v.a[0]-v.b[0])**2+(v.a[1]-v.b[1])**2;
 case 'rect':return Math.sqrt(v.w*v.w+v.h*v.h);
 case 'perimeter':return d(v.a,v.b)+d(v.b,v.c)+d(v.c,v.a);
 case 'difference':return d(v.p,v.c)-d(v.p,v.b);
 case 'equalX':return (v.ax+v.bx)/2;
 case 'unknownY':{const s=Math.sqrt(v.d*v.d-(v.bx-v.a[0])**2);return v.condition==='above'?v.a[1]+s:v.a[1]-s}
 case 'unknownX':{const s=Math.sqrt(v.d*v.d-(v.b[1]-v.ay)**2);return v.condition==='left'?v.b[0]-s:v.b[0]+s}
 default:throw Error('Unsupported independent proof: '+v.type);
 }
}
const all=[...math.practice,...math.test],seen=new Set();
all.forEach((q,i)=>{
 assert.strictEqual(q.index,i<18?i+1:i-17);
 assert.ok(q.prompt.length>35&&q.solution.length>35,'Insufficient explanation at '+(i+1));
 assert.ok(!seen.has(q.prompt),'Duplicate question at '+(i+1));
 seen.add(q.prompt);
 const actual=independentlySolve(q.qa);
 assert.ok(Number.isFinite(actual)&&Math.abs(actual-Number(q.answer))<1e-9,'Math QA mismatch at '+(i+1)+': '+actual+' != '+q.answer);
 if(i<18)assert.strictEqual(q.group,groupOf(i));
 else assert.strictEqual(q.difficulty,diffs[i-18]);
});
assert.ok(explanation.some(s=>s[0]==='CORE RULE'));
assert.ok(explanation.some(s=>s[0]==='VERIFIED COORDINATE DIAGRAM'));
assert.ok(explanation.some(s=>s[0]==='DESMOS STRATEGY'));
assert.ok(explanation.some(s=>s[0]==='COMMON MISTAKES'));
for(const lang of ['english','arabic'])for(const scene of videos[lang])assert.ok(scene.length===2&&scene[0].length>5&&scene[1].length>40);
assert.strictEqual(Math.hypot(4-(-2),7-(-1)),10);
assert.strictEqual(6*6+8*8,100);
console.log('Lesson 258 mathematical QA PASS: 23/23 independently solved, 18/18 aligned solutions, 3/8/5/2 groups, 5 progressive tests, 17 explanation sections, 20+20 video scenes.');
