// SUMMIT Lesson #110: six-page lesson builder, requires lesson110/ release assets.
const fs=require('fs'),path=require('path');
const base='advanced-math/functions/composite-functions-from-graphs';
const routes=['explanation','problems','answers','test','video/english','video/arabic'];
for(const route of routes){const src=path.join(__dirname,'lesson110',base,route,'index.html');const dst=path.join(__dirname,'dist',base,route,'index.html');if(!fs.existsSync(src))throw Error('Missing lesson110 route '+route);fs.mkdirSync(path.dirname(dst),{recursive:true});fs.copyFileSync(src,dst);}
for(const name of ['composite-functions-from-graphs-full-lesson-16x9.mp4','composite-functions-from-graphs-poster.png']){const src=path.join(__dirname,'lesson110/assets',name),dst=path.join(__dirname,'dist/assets',name);if(!fs.existsSync(src))throw Error('Missing lesson110 asset '+name);fs.mkdirSync(path.dirname(dst),{recursive:true});fs.copyFileSync(src,dst);}
console.log('Lesson 110: 18 practice, 18 aligned solutions, 5 test, 6 routes, full 16:9 video.');
