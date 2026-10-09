// SUMMIT Worker 5 lesson 130: copy six canonical routes and horizontal full lesson video.
const fs=require('fs'),path=require('path');
const base='advanced-math/rational-expressions/multiplying-rational-expressions';
for(const route of ['explanation','problems','answers','test','video/english','video/arabic']){
const src=path.join(__dirname,'lesson130',base,route,'index.html'),dst=path.join(__dirname,'dist',base,route,'index.html');
if(!fs.existsSync(src))throw Error('Missing lesson130 route '+route);
fs.mkdirSync(path.dirname(dst),{recursive:true});fs.copyFileSync(src,dst);
}
for(const name of ['multiplying-rational-expressions-lesson130-16x9.mp4','multiplying-rational-expressions-lesson130-poster.png']){
const src=path.join(__dirname,'lesson130/assets',name),dst=path.join(__dirname,'dist/assets',name);
if(!fs.existsSync(src))throw Error('Missing lesson130 video asset '+name);
fs.mkdirSync(path.dirname(dst),{recursive:true});fs.copyFileSync(src,dst);
}
console.log('SUMMIT lesson130 six routes and full lesson video built');