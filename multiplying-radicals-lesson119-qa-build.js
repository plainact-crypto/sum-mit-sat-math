'use strict';
const {P,T,E,fs,path,root}=require('./multiplying-radicals-lesson119-lib');
const eq=(a,b)=>{if(Math.abs(a-b)>1e-8)throw Error('Math mismatch: '+a+' / '+b)};
for(const x of [0.5,1,2,5,10]){
 eq(Math.sqrt(3*x)*Math.sqrt(12*x),6*x);
 eq(Math.sqrt(2*x)*Math.sqrt(8*x),4*x);
 eq(Math.sqrt(2*x)*Math.sqrt(8*x**3),4*x*x);
}
eq(Math.sqrt(2)*Math.sqrt(8),4);
eq(Math.sqrt(3)*Math.sqrt(12),6);
eq(Math.sqrt(6)*Math.sqrt(15),3*Math.sqrt(10));
eq(2*Math.sqrt(3)*4*Math.sqrt(6),24*Math.sqrt(2));
eq((2*Math.sqrt(3)+Math.sqrt(5))*(Math.sqrt(3)-2*Math.sqrt(5)),-4-3*Math.sqrt(15));
eq(Math.sqrt(2*2+1)*Math.sqrt(2*2-1),Math.sqrt(15));
if(P.length!==18||T.length!==5||E.length!==13)throw Error('Lesson 119 count mismatch');
const counts=P.reduce((a,x)=>(a[x[0]]=(a[x[0]]||0)+1,a),{});
for(const [k,n] of [['Skill Check',3],['Core Practice',8],['Exam-Style',5],['Challenge',2]])if(counts[k]!==n)throw Error('Practice grouping '+k);
for(const r of ['explanation','problems','answers','test','video/english','video/arabic']){
 const f=path.join(root,r,'index.html');if(!fs.existsSync(f)||fs.readFileSync(f,'utf8').length<500)throw Error('Missing route '+r);
}
console.log('Lesson 119: numeric, counts, and six-route QA passed');
