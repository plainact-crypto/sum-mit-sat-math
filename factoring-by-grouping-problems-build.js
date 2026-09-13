const fs=require('fs'),path=require('path');
const root=__dirname,source=path.join(root,'factoring-by-grouping-problems.html');
const route='/advanced-math/factoring/factoring-by-grouping/problems/';
if(!fs.existsSync(source))throw new Error('Missing Factoring by Grouping problems source');
const html=fs.readFileSync(source,'utf8');
for(const marker of ['Factoring by Grouping','SKILL CHECK','CORE PRACTICE','EXAM-STYLE PRACTICE','CHALLENGE PROBLEMS','3/8/5/2 required'])if(!html.includes(marker))throw new Error('Problems marker missing: '+marker);
const out=path.join(root,'dist',route.replace(/^\//,''));
fs.mkdirSync(out,{recursive:true});fs.copyFileSync(source,path.join(out,'index.html'));
console.log('Built Factoring by Grouping problems route');
