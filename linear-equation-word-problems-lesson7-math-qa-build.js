'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),vm=require('node:vm');
const read=n=>fs.readFileSync(require('node:path').join(__dirname,n),'utf8');
const practice=read('linear-word-problems-problems.html'),answers=read('linear-word-problems-answers.html'),test=read('linear-word-problems-test.html');
const source=practice.match(/const groups=(\[[\s\S]*?\]);let n=0;/);
assert(source,'Practice groups not found');
const groups=vm.runInNewContext(source[1],Object.create(null),{timeout:1000});
assert.deepEqual(Array.from(groups,g=>g[2].length),[3,8,5,2]);
const expected=[5,6,37,7,4,13,33,5,5,16,6,7,100,60,4,4,27,8];
const eq=[
x=>12+5*x===37,x=>7*x===42,x=>x-14===23,
x=>4+3*x===25,x=>48*x===192,x=>x+(x+5)===31,x=>x+(x+1)===67,
x=>15*x+20===95,x=>27+9*x===72,x=>2*x+14===46,x=>78-3*x===60,
x=>11+4*x===39,x=>25+.08*x===33,x=>100+6*x===460,
x=>35+28*x===147,x=>3*7+12*x===69,
x=>x+(x+2)+(x+4)===87,x=>2*(2*x+3)+2*x===54
];
assert.equal(expected.length,18);
let i=0;for(const g of groups)for(const q of g[2]){
 const v=expected[i];assert(eq[i](v)&&!eq[i](v+1),'Practice equation '+(i+1));
 const choice=Number(String(q[1][q[2]]).replace(/[^\d.-]/g,''));
 assert.equal(choice,v,'Practice answer choice '+(i+1));i++;
}
assert.equal((answers.match(/class="solution"/g)||[]).length,18);
assert.equal((test.match(/class="test-card"/g)||[]).length,5);
const tv=[4,12,18,31,7],te=[x=>6+4*x===22,x=>x+(x+3)===27,x=>2*(x+9)===54,x=>x+(x+1)+(x+2)===96,x=>18+2.5*x===35.5];
tv.forEach((x,j)=>assert(te[j](x)&&!te[j](x+1),'Test '+(j+1)));
assert.deepEqual(Array.from(test.matchAll(/data-answer="([A-D])"/g),m=>m[1]),['B','C','D','A','C']);
const practicePrompts=Array.from(groups,g=>g[2]).flat().map(q=>q[0]);
const solutionPrompts=[...answers.matchAll(/<div class="solution">[\s\S]*?<h3>([^<]+)<\/h3>/g)].map(m=>m[1]);
const testPrompts=[...test.matchAll(/<section class="test-card"[\s\S]*?<h3>([^<]+)<\/h3>/g)].map(m=>m[1]);
assert.equal(practicePrompts.length,18);
assert.deepEqual(solutionPrompts,practicePrompts,'Practice and solution wording must align exactly');
assert.equal(testPrompts.length,5);
assert.equal(new Set([...practicePrompts,...testPrompts]).size,23,'Test questions must not duplicate Practice');
console.log('[Lesson 7] 18 practice + 5 test mathematical QA PASS');