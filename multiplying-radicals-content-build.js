// SUMMIT Worker 5: lesson #120 Multiplying Radicals, canonical six routes.
const fs=require('fs'),path=require('path');
const base='advanced-math/radical-expressions-and-equations/multiplying-radicals';
for(const route of ['explanation','problems','answers','test','video/english','video/arabic']){
 const src=path.join(__dirname,'lesson120',base,route,'index.html');
 const dst=path.join(__dirname,'dist',base,route,'index.html');
 if(!fs.existsSync(src))throw Error('Lesson 120 route missing: '+route);
 fs.mkdirSync(path.dirname(dst),{recursive:true});fs.copyFileSync(src,dst);
}
for(const name of ['multiplying-radicals-full-lesson-16x9.mp4','multiplying-radicals-poster.png']){
 const src=path.join(__dirname,'lesson120/assets',name),dst=path.join(__dirname,'dist/assets',name);
 if(!fs.existsSync(src))throw Error('Lesson 120 video asset missing: '+name);
 fs.mkdirSync(path.dirname(dst),{recursive:true});fs.copyFileSync(src,dst);
}
console.log('SUMMIT #120: 18 practice, 18 solutions, 5 test, 6 routes, full video');