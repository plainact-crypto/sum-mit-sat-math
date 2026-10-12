'use strict';
const assert=require('node:assert/strict');
const answers=[5,5,8,7,7,-7,5,5,12,9,18,7,8,9,12,20,20,7];
const eq=[x=>3*x+5===20,x=>7*x-4===31,x=>2*x+9===25,x=>5*x+7===42,x=>4*x-11===17,x=>-3*x+8===29,x=>6*x+5===2*x+25,x=>3*(x+4)===27,x=>2*(x-6)+5===17,x=>.5*x+2.5===7,x=>x/3+4===10,x=>4*x+9===37,x=>6+3*x===30,x=>5*(x-2)===35,x=>2*x+7===x+19,x=>12+.8*x===28,x=>.75*x-5===10,x=>2*(3*x-4)-5===3*x+8];
assert.equal(answers.length,18);
answers.forEach((x,i)=>{assert(eq[i](x),'Practice '+(i+1));assert(!eq[i](x+1),'Uniqueness '+(i+1))});
const t=[6,7,5,10,10],te=[x=>2*x+3===15,x=>5*x-7===2*x+14,x=>4*(x-2)+6===18,x=>.6*x+4.2===10.2,x=>18+2.5*x===43];
t.forEach((x,i)=>{assert(te[i](x),'Test '+(i+1));assert(!te[i](x+1),'Test uniqueness '+(i+1))});
console.log('[Lesson 2] 23/23 independent math checks PASS');

// Reapply registry markers after publish-existing-content.js overwrites Explanation HTML.
require('./explanation-retrofit-build.js');


const fs=require('fs'),path=require('path');
const lessonRoot=path.join(__dirname,'dist','algebra','linear-equations-in-one-variable','solving-multi-step-linear-equations');
const readRoute=n=>fs.readFileSync(path.join(lessonRoot,n,'index.html'),'utf8');
const [practicePage,answersPage,testPage]=['problems','answers','test'].map(readRoute);
const headings=s=>[...s.matchAll(/<h3>([^<]+)<\/h3>/g)].map(m=>m[1]);
const groupCounts=(s,sec,item)=>[...s.matchAll(new RegExp('<section class="'+sec+'">([\\s\\S]*?)<\\/section>','g'))].map(m=>(m[1].match(new RegExp('class="'+item+'"','g'))||[]).length);
assert.deepEqual(groupCounts(practicePage,'practice-section','question'),[3,8,5,2]);
assert.deepEqual(groupCounts(answersPage,'answers-section','solution'),[3,8,5,2]);
const practiceTitles=headings(practicePage),answerTitles=headings(answersPage),testTitles=headings(testPage);
assert.equal(practiceTitles.length,18);assert.deepEqual(answerTitles,practiceTitles);
assert.equal(testTitles.length,5);assert.equal(new Set([...practiceTitles,...testTitles]).size,23);
assert.equal((practicePage.match(/<div class="question" data-answer=/g)||[]).length,18);
assert.equal((answersPage.match(/class="answer-badge"/g)||[]).length,18);
assert.equal((testPage.match(/<section class="test-card" data-answer=/g)||[]).length,5);
console.log('[Lesson 2] source-to-dist page alignment, 3/8/5/2 practice/answers, 5 unique tests PASS');
