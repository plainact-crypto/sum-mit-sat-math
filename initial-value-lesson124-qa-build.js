'use strict';
const fs=require('fs'),path=require('path'),d=require('./initial-value-lesson124-data.json');
const root=path.join(__dirname,'dist',d.base);
const eq=(a,b)=>{if(Math.abs(a-b)>1e-8)throw Error('Math QA '+a+' vs '+b)};
for(const [a,b] of [[8*9,72],[30*1.5,45],[20/2,10],[16*3.375,54],[2400*.64,1536],[125*27,3375],[12*4,48],[12*16,192],[40/2,20],[40*2,80],[5*8,40],[90/1.44,62.5],[6*3,18],[6*27,162],[80*8,640],[6*.25,1.5],[2*49,98],[30/2,15],[30*4,120]])eq(a,b);
if(d.explanation.length!==13||d.practice.length!==18||d.test.length!==5)throw Error('Count QA');
const groups=['Skill Check','Core Practice','Exam-Style','Challenge'],counts=[3,8,5,2];let n=0;
for(let i=0;i<4;i++)for(let j=0;j<counts[i];j++,n++)if(d.practice[n][0]!==groups[i]||d.practice[n].length!==4)throw Error('Alignment QA');
for(const r of ['explanation','problems','answers','test','video/english','video/arabic']){
 const f=path.join(root,r,'index.html');if(!fs.existsSync(f)||fs.readFileSync(f,'utf8').length<700)throw Error('Route QA '+r);
}
console.log('Lesson 124: numeric, grouping, and six-route QA passed');
