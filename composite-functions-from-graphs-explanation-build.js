'use strict';
const {sec,write}=require('./composite-functions-from-graphs-page-lib');
const sections=require('./composite-functions-from-graphs-explanation-data.json');
const gallery=require('./composite-functions-from-graphs-graph-lib');
if(sections.length!==12||!sections.some(x=>x[0]==='GRAPH / VISUAL BLOCK'))throw Error('Explanation structure QA failed');
const body='<!-- SUMMIT_RETROFIT:composite-functions-from-graphs:GRAPH -->'+sections.map((s,i)=>sec(String(i+1).padStart(2,'0')+' · '+s[0],s[1]+(s[0]==='GRAPH / VISUAL BLOCK'?gallery():''))).join('');
write('explanation','Explanation',body);
console.log('Lesson 109 graph explanation built');
