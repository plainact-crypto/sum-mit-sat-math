const fs=require('fs'),path=require('path');
require('./opens-up-or-down-content-build.js');
const dist=path.join(__dirname,'dist'),src=path.join(dist,'advanced-math','quadratic-functions','standard-form','opens-up-or-down'),dst=path.join(dist,'advanced-math','quadratic-functions','opens-up-or-down');
fs.mkdirSync(dst,{recursive:true});
for(const name of ['explanation','problems','answers','test']){const from=path.join(src,name),to=path.join(dst,name);fs.rmSync(to,{recursive:true,force:true});fs.cpSync(from,to,{recursive:true});}
console.log('Published Opens Up or Down lesson routes');