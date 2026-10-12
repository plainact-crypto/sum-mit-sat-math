const fs=require('fs'),vm=require('vm'),assert=require('assert'),data=require('./slope-from-standard-form-lesson17-qa-data.json');
const read=f=>fs.readFileSync(require('path').join(__dirname,f),'utf8');
const p=read('slope-from-standard-form-problems.html'),a=read('slope-from-standard-form-answers.html'),t=read('slope-from-standard-form-test.html');
const groups=vm.runInNewContext(p.match(/const groups=(\[[\s\S]*?\]);let n=0;/)[1]);
const tests=vm.runInNewContext(t.match(/const qs=(\[[\s\S]*?\]);const root=/)[1]);
assert.deepStrictEqual(Array.from(groups,g=>g[2].length),[3,8,5,2]);
const q=Array.from(groups).flatMap(g=>Array.from(g[2]));
const letters=Array.from(a.matchAll(/class="final">Answer: ([A-D])\)/g),m=>m[1]);
assert(q.length===18&&letters.length===18&&tests.length===5);
const slope=(a,b)=>b===0?null:-a/b;
q.forEach((item,i)=>{const [a,b]=data.practice.ab[i],m=data.practice.slopes[i];assert(item[2]===data.practice.choices[i]&&letters[i]==='ABCD'[item[2]]);assert(m===null?slope(a,b)===null:Math.abs(m-slope(a,b))<1e-9)});
tests.forEach((item,i)=>{const [a,b]=data.test.ab[i];assert(item.a===data.test.choices[i]&&Math.abs(data.test.slopes[i]-slope(a,b))<1e-9)});
console.log('[Lesson 17] 23/23 mathematical QA and 18 aligned answers PASS');

require('./explanation-retrofit-build.js');
