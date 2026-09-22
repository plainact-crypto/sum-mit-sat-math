const fs=require('fs'),path=require('path');
const root=__dirname,dist=path.join(root,'dist');
const source=path.join(root,'function-notation-linear-functions-explanation.html');
const target=path.join(dist,'algebra','linear-functions','function-notation-for-linear-functions','explanation');
fs.mkdirSync(target,{recursive:true});
fs.copyFileSync(source,path.join(target,'index.html'));
console.log('Function Notation for Linear Functions explanation published.');
