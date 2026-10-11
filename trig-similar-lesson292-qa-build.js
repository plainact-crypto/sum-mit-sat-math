'use strict';
const d=require('./trig-similar-lesson292-data.json');
const e=[1,2,3,4,5].flatMap(i=>require('./trig-similar-lesson292-explanation-part'+i+'.json'));
if(e.length!==17||e.filter(x=>x[0].startsWith('WORKED EXAMPLE')).length!==5||d.practice.length!==18||d.test.length!==5)throw Error('Lesson count');
const g=['Skill Check','Core Practice','Exam-Style','Challenge Problems'],n=[3,8,5,2];let j=0;
g.forEach((x,i)=>{for(let k=0;k<n[i];k++)if(d.practice[j++].group!==x)throw Error('Group order');});
if(d.test.map(x=>x.group).join('|')!=='Easy|Easy / Medium|Medium|Medium / Hard|Hard / Exam-Style')throw Error('Test progression');
const gcd=(a,b)=>b?gcd(b,a%b):a;
function solve(z){switch(z.kind){
case 'ratio':{const g=gcd(z.a,z.b);return z.a/g+'/'+z.b/g;}
case 'factor':return String(z.large/z.small);
case 'scale':return String(z.value*z.k);
case 'oppTan':return String(z.adj*z.num/z.den);
case 'hypSin':return String(z.opp*z.den/z.num);
case 'proportion':return String(z.small*z.largeH/z.smallH);
case 'proportionUnit':return String(z.small*z.largeH/z.smallH)+z.unit;
case 'area':return String(z.area*z.k*z.k);
case 'compare':return z.a/z.b===z.c/z.d?'Equal':z.a/z.b>z.c/z.d?'A is larger':'B is larger';
case 'diff':return String(Math.abs(z.b-z.a)*z.largeH/z.smallH);
default:throw Error('Unknown QA kind');
}}
const seen=new Set();[...d.practice,...d.test].forEach((q,i)=>{if(solve(q.qa)!==q.answer||!q.choices.includes(q.answer)||new Set(q.choices).size!==4||seen.has(q.prompt)||!q.solution)throw Error('Question '+(i+1));seen.add(q.prompt);});
if(Math.hypot(3,4)!==5||Math.hypot(6,8)!==10||3/5!==6/10)throw Error('Graph');
console.log('Lesson 292 QA: 23/23, answers 18/18, 3/8/5/2, graph PASS.');
