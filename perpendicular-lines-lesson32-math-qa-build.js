const near=(a,b)=>Math.abs(a-b)<1e-9;
const slopes=[
3*(-1/3),(-2/5)*(5/2),2*(-1/2),-4*(1/4),(3/2)*(-2/3),(1/3)*(-3),2*(-2/4),-5*(.4/2),-1,-1,-.5*2,2.5*(-.4),-.5*2,(-2/3)*(3/2),(7/2)*(-2/7),5*(-.2),(4/3)*(8/(6-50/3)),-.5*2,
2*(-.5),-3*(1/3),2*(-2/4),(-3/6)*2,.8*(-1.25)
];
if(slopes.length!==23||slopes.some(x=>!near(x,-1)))throw Error('Lesson 32 mathematical QA failed');
if(!near(-.4*4+16.6,15)||!near(-1.25*10+17.5,5)||!near(2*1+4,6))throw Error('Lesson 32 point check failed');
console.log('[Lesson 32] 23 independent mathematical checks PASS');


const fs=require('fs'),assert=require('assert'),vm=require('vm');
const p=fs.readFileSync('perpendicular-lines-problems.html','utf8');
const a=fs.readFileSync('perpendicular-lines-answers.html','utf8');
const t=fs.readFileSync('perpendicular-lines-test.html','utf8');
const groups=JSON.parse(p.match(/const groups=(\[[\s\S]*?\]);let n=0;/)[1]);
assert.deepStrictEqual(groups.map(g=>g[2].length),[3,8,5,2]);
const practice=groups.flatMap(g=>g[2]);
const answer=[...a.matchAll(/<div class="answer"><h3>(\d+)\.\s*([^<]+)<\/h3>[\s\S]*?<div class="final">Answer: ([A-D])\)/g)];
assert.strictEqual(practice.length,18);assert.strictEqual(answer.length,18);
practice.forEach((q,i)=>{
 assert.strictEqual(answer[i][1],String(i+1));
 assert.strictEqual(answer[i][2],q[0],'Answer/Practice prompt mismatch '+(i+1));
 assert.strictEqual(answer[i][3],'ABCD'[q[2]],'Answer choice mismatch '+(i+1));
});
const test=Array.from(vm.runInNewContext(t.match(/const qs=(\[[\s\S]*?\]);const root=/)[1]));
assert.strictEqual(test.length,5);
assert.deepStrictEqual(test.map(x=>x.level),['EASY','EASY-MEDIUM','MEDIUM','HARD','HARD / EXAM-STYLE']);
assert.strictEqual(new Set([...practice.map(x=>x[0]),...test.map(x=>x.q)]).size,23);
assert.deepStrictEqual(test.map(x=>x.a),[0,0,2,2,1]);
console.log('[Lesson 32] 18/18 exact answer alignment, 3/8/5/2, five progressive unique tests PASS');
