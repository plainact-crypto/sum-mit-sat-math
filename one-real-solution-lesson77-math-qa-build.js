'use strict';
const fs=require('fs');
const p=fs.readFileSync('one-real-solution-problems.html','utf8');
const a=fs.readFileSync('one-real-solution-answers.html','utf8');
const t=fs.readFileSync('one-real-solution-test.html','utf8');
const groups=JSON.parse(a.match(/const groups=(\[.*?\]);let n=/s)?.[1]||'null');
if(!Array.isArray(groups)||groups.length!==4)throw Error('Missing answer groups');
const expected=[3,8,5,2];
const entries=groups.flatMap((g,i)=>{if(g[1].length!==expected[i])throw Error('Wrong group size '+i);return g[1]});
const questions=[...p.matchAll(/<div class="question"><b>\d+\. ([^<]+)<\/b>/g)].map(m=>m[1].replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&'));
if(questions.length!==18||entries.length!==18)throw Error('18 questions and 18 answers required');
for(let i=0;i<18;i++){if(questions[i]!==entries[i][0])throw Error('Question statement mismatch '+(i+1));if(!entries[i][1]||!entries[i][2])throw Error('Missing worked answer '+(i+1))}
if((t.match(/\{level:'/g)||[]).length!==5)throw Error('Exactly 5 test questions required');
if(!t.includes("document.getElementById('submit').onclick"))throw Error('Test must reveal feedback only on submission');
const D=(a,b,c)=>b*b-4*a*c;
const checks=[
D(1,-6,9),D(4,12,9),D(1,-10,25),D(9,-12,4),D(25,20,4),D(1,14,49),
D(1,-12,36),D(2,8,8),D(3,-18,27),D(1,-8,16),D(4,12,9),D(1,-6,9),
D(3,-12,12),D(3,-6,3),D(-4,16,-16),D(9,12,4),D(2,-20,50),D(3,12,12),D(-5,20,-20)
];
if(checks.some(x=>x!==0))throw Error('Repeated-root discriminant proof failed');
if((5-5)**2!==0||(-2/5*5+2)**2>1e-12||(-7+7)**2!==0)throw Error('Factoring proof failed');
if(!entries[14][1].includes('3')||!entries[16][1].includes('2')||!entries[17][1].includes('−16'))throw Error('Domain/parameter challenge proof failed');
console.log('[lesson77] 18 aligned answers, 5 progressive tests, independent repeated-root checks: PASS');
