'use strict';
const d=require('./circle-standard-form-lesson277-data.json');
const pt=(x,y)=>'('+x+', '+y+')',eq=(h,k,r)=>(h===0?'x²':'(x'+(h>0?'−':'+')+Math.abs(h)+')²')+'+'+(k===0?'y²':'(y'+(k>0?'−':'+')+Math.abs(k)+')²')+'='+r;
function solve(q){const a=q.qa,s=(a.x-a.h)**2+(a.y-a.k)**2;switch(a.kind){
case'center':return pt(a.h,a.k);case'radius':return String(Math.sqrt(a.r2));case'equation':return eq(a.h,a.k,a.r2);
case'point':return s===a.r2?'On the circle':s<a.r2?'Inside the circle':'Outside the circle';
case'through':return eq(a.h,a.k,s);case'complete':return eq(-a.A/2,-a.B/2,(a.A*a.A+a.B*a.B)/4-a.C);
case'shift':return eq(a.h+a.dx,a.k+a.dy,a.r2);case'radiuspoint':return String(Math.sqrt(s));
case'completeCenterRadius':return pt(-a.A/2,-a.B/2)+', radius '+Math.sqrt((a.A*a.A+a.B*a.B)/4-a.C);
case'deltaRadius':return String(Math.sqrt(a.r2)-a.rA);case'parameter':return String(s);
case'tangentY':return eq(a.h,a.k,a.h*a.h);
case'intercepts':{const h=-a.A/2,k=-a.B/2,t=Math.sqrt(h*h+k*k-a.C-k*k);return pt(h-t,0)+' and '+pt(h+t,0)}
case'areaRatio':return s+':'+a.otherR2;
case'radicalIntercept':if(a.h!==-2||s-a.k*a.k!==99)throw Error('radical QA');return '(−2−3√11, 0) and (−2+3√11, 0)';
default:throw Error('unknown kind '+a.kind)}}
const names=['Skill Check','Core Practice','Exam-Style','Challenge Problems'],cuts=[0,3,11,16,18],diff=['Easy','Easy / Medium','Medium','Medium / Hard','Hard / Exam-Style'];
if(d.index!==277||d.slug!=='standard-form'||d.base!=='geometry-and-trigonometry/circles/circle-equation/standard-form'||d.practice.length!==18||d.test.length!==5)throw Error('canonical metadata');
const seen=new Set();
for(let i=0;i<4;i++)for(let j=cuts[i];j<cuts[i+1];j++)if(d.practice[j].group!==names[i])throw Error('group mismatch '+j);
for(const [type,items] of [['practice',d.practice],['test',d.test]])for(const [i,q] of items.entries()){
if(q.number!==i+1||q.answer!==solve(q)||q.choices.length!==4||new Set(q.choices).size!==4||!q.choices.includes(q.answer)||seen.has(q.prompt))throw Error(type+' mathematical/answer QA '+(i+1));
if(type==='test'&&q.group!==diff[i])throw Error('test progression');seen.add(q.prompt)}
console.log('Lesson 277: independent 23/23 mathematical QA, 18 answer alignments, 3/8/5/2 practice and 5 progressive tests PASS.');
