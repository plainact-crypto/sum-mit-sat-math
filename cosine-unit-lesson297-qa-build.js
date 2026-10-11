'use strict';
const d=require('./cosine-unit-lesson297-data.json');
const e=[1,2,3].flatMap(i=>require('./cosine-unit-lesson297-explanation-part'+i+'.json'));
if(d.index!==297||e.length!==17||e.filter(x=>x[0].startsWith('WORKED EXAMPLE')).length!==5||d.practice.length!==18||d.test.length!==5)throw Error('Content counts');
const counts=[3,8,5,2],groups=['Skill Check','Core Practice','Exam-Style','Challenge Problems'];let i=0;
groups.forEach((g,j)=>{for(let k=0;k<counts[j];k++)if(d.practice[i++].group!==g)throw Error('Group order');});
const angle={0:'1',30:'√3/2',45:'√2/2',60:'1/2',90:'0',120:'-1/2',135:'-√2/2',150:'-√3/2',180:'-1',210:'-√3/2',225:'-√2/2',240:'-1/2',270:'0',300:'1/2',315:'√2/2',330:'√3/2'};
const gcd=(a,b)=>b?gcd(b,a%b):a;
function solve(z){if(z.kind==='angle')return angle[((z.deg%360)+360)%360];
if(z.kind==='point'){if(z.x*z.x+z.y*z.y!==z.den*z.den)throw Error('Point not on circle');const g=gcd(Math.abs(z.x),z.den);return (z.x<0?'-':'')+Math.abs(z.x)/g+'/'+z.den/g;}
if(z.kind==='missing'){const v=Math.sqrt(z.den*z.den-z.y*z.y);if(!Number.isInteger(v))throw Error('Invalid coordinate');const g=gcd(v,z.den);return (z.sign<0?'-':'')+v/g+'/'+z.den/g;}
if(z.kind==='solutions')return z.cos==='-√2/2'?'135° and 225°':z.cos==='-1/2'?'120° and 240°':null;throw Error('Unknown QA type');}
const seen=new Set();[...d.practice,...d.test].forEach((q,i)=>{if(solve(q.qa)!==q.answer||!q.choices.includes(q.answer)||new Set(q.choices).size!==4||seen.has(q.prompt))throw Error('Question '+(i+1));seen.add(q.prompt);});
if(Math.abs((-.5)**2+(Math.sqrt(3)/2)**2-1)>1e-10)throw Error('Circle geometry');
console.log('Lesson 297 QA: 23/23 math, 18 aligned answers, exact groups and circle geometry.');
